import { NextResponse } from 'next/server';
import { retrieveContext } from '@/lib/rag/retriever';
import { ai, isGeminiEnabled } from '@/lib/rag/gemini';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const workspaceRoot = process.cwd();
    const { chunks, method } = await retrieveContext(message, workspaceRoot, 4);

    // Build a clean, well-labeled context block — no raw code, no JSON keys
    const contextText = chunks.length > 0
      ? chunks.map(c => `[${c.title}]\n${c.content.trim()}`).join('\n\n---\n\n')
      : null;

    const geminiActive = isGeminiEnabled();

    if (geminiActive && contextText) {
      // ── VECTOR / GEMINI RAG PATH ──────────────────────────────────────────
      const systemInstruction = `You are "Misty", the AI Concierge for Foggy Woods — a luxury nature resort nestled in misty pine forests.

Your role is to warmly assist guests with any questions about the resort. You speak in a refined, welcoming, and sophisticated tone that matches the resort's editorial brand.

STRICT RULES:
1. Answer ONLY using the information provided in the "Website Context" sections below.
2. Do NOT hallucinate, invent prices, policies, or features that are not mentioned.
3. If a guest asks about something not covered in the context, politely explain that you don't have that information on the website and invite them to contact the resort directly at info@foggywoods.com or call +1 (555) 123-4567.
4. NEVER expose, reference, or quote source labels like "[FAQ Page]" or "[Source: ...]" in your reply to the guest. Speak as a knowledgeable staff member who simply knows this information.
5. When the guest asks about multiple rooms or options, COMPARE them clearly and recommend the best fit based on what the guest seems to need.
6. Keep responses concise (3–6 sentences unless comparison is needed). Use natural paragraph structure.
7. Do not use bullet points unless listing multiple distinct items (like room types). Prefer flowing prose for single-answer queries.

Website Context:
${contextText}`;

      console.log(`Querying gemini-2.5-flash — retrieval method: ${method}`);

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: message,
        config: {
          systemInstruction,
          temperature: 0.15,
        },
      });

      const reply = response.text?.trim() || "I'm sorry, I had trouble generating a response. Please try again.";

      return NextResponse.json({
        reply,
        sources: chunks.map(c => ({ title: c.title, route: c.route })),
        method,
      });

    } else if (geminiActive && !contextText) {
      // Gemini active but nothing retrieved
      const noContextReply = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: message,
        config: {
          systemInstruction: `You are "Misty", the AI Concierge for Foggy Woods resort. A guest has asked a question, but you could not find relevant information about it on the website. Politely let them know you don't have that specific detail, and suggest they contact the resort at info@foggywoods.com or call +1 (555) 123-4567 for further assistance. Keep the tone warm and luxurious.`,
          temperature: 0.2,
        },
      });

      return NextResponse.json({
        reply: noContextReply.text?.trim() || "I'm sorry, I couldn't find that information on our website. Please reach out to us at info@foggywoods.com or call +1 (555) 123-4567 — our team would be happy to help.",
        sources: [],
        method: 'no_context',
      });

    } else {
      // ── LOCAL FALLBACK (no API key) ───────────────────────────────────────
      // This path extracts the most relevant sentences from the retrieved chunks
      // rather than dumping the full raw text at the user.
      if (!chunks.length) {
        return NextResponse.json({
          reply: "I'm sorry, I couldn't find information about that on our website. Please feel free to contact us at info@foggywoods.com or call +1 (555) 123-4567 and our team will be delighted to assist you.",
          sources: [],
          method: 'fallback_no_match',
        });
      }

      // Extract the most relevant ANSWER sentences from each retrieved chunk
      const queryWords = message
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(w => w.length > 3);

      // Noise patterns that indicate UI-chrome or section headings, not answers
      const sentenceNoisePatterns = [
        /^Foggy Woods\s*\|/i,
        /^Book Your Stay$/i,
        /^Where fog meets serenity$/i,
        /^Back to Home$/i,
        /^Frequently Asked Questions$/i,
        /^Find details on check-in/i,
        /^General\s*&\s*Booking$/i,
        /^Check-In\s*&/i,
        /^Accommodations\s*&\s*Amenities$/i,
        /^A Sanctuary in the Woods$/i,
        /^Explore the Retreat$/i,
        /^\d{1,2}:\d{2}\s*[AP]M$/,   // timestamps
      ];

      function extractRelevantSentences(content: string, keywords: string[], maxSentences = 3): string {
        // Split by sentence-ending punctuation or double-space boundaries
        const sentences = content
          .replace(/([.!])\s+/g, '$1\n')
          .split('\n')
          .map(s => s.trim())
          // Drop very short lines (headings/labels) and question lines
          .filter(s => {
            if (s.length < 25) return false;
            if (s.endsWith('?')) return false;  // Skip question lines
            if (sentenceNoisePatterns.some(p => p.test(s))) return false;
            return true;
          });

        if (sentences.length === 0) return '';

        // Score each sentence by keyword match frequency
        // Prefer longer sentences (more information dense) as a tiebreaker
        const scored = sentences.map(sentence => {
          const lower = sentence.toLowerCase();
          const keywordScore = keywords.reduce((acc, kw) => acc + (lower.includes(kw) ? 2 : 0), 0);
          const lengthBonus = Math.min(sentence.split(' ').length / 20, 1); // Max +1 for long sentences
          return { sentence, score: keywordScore + lengthBonus };
        });

        const sorted = scored
          .filter(s => s.score > 0)
          .sort((a, b) => b.score - a.score);

        // If nothing scored, fall back to first 3 long sentences
        const best = sorted.length > 0
          ? sorted.slice(0, maxSentences).map(s => s.sentence)
          : sentences.slice(0, maxSentences);

        return best.join(' ').trim();
      }

      // Collect best sentences from top 2 chunks
      const allExtracted = chunks.slice(0, 2)
        .map(c => extractRelevantSentences(c.content, queryWords, 3))
        .filter(s => s.length > 20);

      // Deduplicate near-identical blocks
      const seen = new Set<string>();
      const uniqueSentences: string[] = [];
      for (const block of allExtracted) {
        const key = block.slice(0, 60).toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          uniqueSentences.push(block);
        }
      }

      const bestAnswer = uniqueSentences.join('\n\n') || chunks[0].content.slice(0, 500);
      const sourceTitle = chunks[0].title;

      const reply = `${bestAnswer}\n\n_For more details, visit our [${sourceTitle}](${chunks[0].route}) page or contact us at info@foggywoods.com._\n\n*(Note: AI is in local keyword-search mode — add a GEMINI_API_KEY to .env.local for fully conversational responses.)*`;

      return NextResponse.json({
        reply,
        sources: chunks.map(c => ({ title: c.title, route: c.route })),
        method: 'fallback_keyword',
      });
    }

  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json({
      reply: "I apologize — I encountered an error processing your request. Please try again shortly.",
      error: error.message,
    }, { status: 500 });
  }
}
