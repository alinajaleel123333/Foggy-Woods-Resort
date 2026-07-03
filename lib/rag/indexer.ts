import fs from 'fs';
import path from 'path';
import { ai, isGeminiEnabled } from './gemini';

export interface IndexChunk {
  id: string;
  route: string;
  title: string;
  content: string;
  embedding?: number[];
}

// Pages to index — add new pages here and they will be auto-crawled
const PAGES_TO_INDEX = [
  { route: '/', title: 'Home — About, Accommodations & Amenities' },
  { route: '/faq', title: 'Frequently Asked Questions' },
];

// ---------------------------------------------------------------------------
// HTML → clean plain text
// Strips everything a visitor cannot see: scripts, styles, SVGs, HTML tags,
// attributes, URLs, and whitespace noise.
// ---------------------------------------------------------------------------
function htmlToText(html: string): string {
  let text = html;

  // 1. Remove <script> blocks (including inline JS)
  text = text.replace(/<script[\s\S]*?<\/script>/gi, ' ');

  // 2. Remove <style> / <link rel="stylesheet"> blocks
  text = text.replace(/<style[\s\S]*?<\/style>/gi, ' ');
  text = text.replace(/<link[^>]*>/gi, ' ');

  // 3. Remove <svg> blocks entirely
  text = text.replace(/<svg[\s\S]*?<\/svg>/gi, ' ');

  // 4. Remove <nav>, <header>, <footer> — pure UI chrome
  text = text.replace(/<nav[\s\S]*?<\/nav>/gi, ' ');
  text = text.replace(/<header[\s\S]*?<\/header>/gi, ' ');
  text = text.replace(/<footer[\s\S]*?<\/footer>/gi, ' ');

  // 4b. Remove the chatbot widget itself (it renders into the HTML)
  //     It is contained in the fixed-position div with class font-sans
  //     We target by aria-label to be precise
  text = text.replace(/<div[^>]*aria-label="AI Concierge Chatbox"[\s\S]*?<\/div>\s*<\/div>/gi, ' ');
  // Broad fallback: strip everything from "Misty AI Concierge" through any HH:MM AM/PM timestamp
  text = text.replace(/Misty\s+AI Concierge[\s\S]{0,800}?\d{1,2}:\d{2}\s*[AP]M/g, ' ');

  // 5. Remove HTML comments
  text = text.replace(/<!--[\s\S]*?-->/g, ' ');

  // 6. Remove <meta> and other self-closing non-content tags
  text = text.replace(/<meta[^>]*>/gi, ' ');
  text = text.replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ');

  // 7. Replace block-level tags with a newline to preserve sentence boundaries
  text = text.replace(/<\/(p|h1|h2|h3|h4|h5|h6|li|div|section|article|blockquote|td|th|dt|dd)>/gi, '\n');

  // 8. Strip remaining HTML tags (opening/closing/self-closing)
  text = text.replace(/<[^>]+>/g, ' ');

  // 9. Decode common HTML entities
  text = text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;|&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—');

  // 10. Remove any leftover URLs (http/https)
  text = text.replace(/https?:\/\/\S+/g, ' ');

  // 11. Collapse excessive whitespace and blank lines
  text = text
    .replace(/[ \t]+/g, ' ')        // multiple spaces → single space
    .replace(/\n{3,}/g, '\n\n')     // 3+ newlines → 2
    .trim();

  return text;
}

// ---------------------------------------------------------------------------
// Filter out lines that are clearly code fragments or noise
// ---------------------------------------------------------------------------
function filterNoisyLines(text: string): string {
  const noisePatterns = [
    /^import\s/,
    /^export\s/,
    /^const\s|^let\s|^var\s/,
    /=>/,
    /\.(map|filter|reduce|forEach)\(/,
    /^\s*[\{\}\[\];\(\)]+\s*$/,
    /className=/,
    /\bstyle=\{/,
    /^\/\//,
    /\bpng\b|\bjpg\b|\bjpeg\b|\bwebp\b/i,
    /^[a-zA-Z_$]+\s*:\s*["']/,
    /\b(null|undefined|true|false)\b/,
    /\bfunction\s*\(/,
    /src=|href=|alt=/,
    // Footer / legal chrome — not useful for Q&A
    /^Privacy Policy$/i,
    /^Terms of Service$/i,
    /^© \d{4}/,
    /All rights reserved/i,
    /^Explore$/i,
    /^Information$/i,
    /^Contact$/i,
    /^Book Your Stay$/i,
    /^Home$/i,
    /^The Retreat$/i,
    /^Accommodations$/i,
    /^Experiences$/i,
    /^Gallery$/i,
    /^About Us$/i,
    /^Policies$/i,
    /^FAQ$/i,
    /^Scroll$/i,
    /^\d{2}\/\d{2}$/, // slide counter like "01 / 04"
    /^More$|^Discover More$|^Book Now$/i,
    // Repeated chatbot intro noise
    /I'm Misty, your AI concierge/i,
    /Feel free to ask about our accommodations/i,
  ];

  return text
    .split('\n')
    .filter(line => {
      const trimmed = line.trim();
      if (trimmed.length < 3) return false;  // Skip very short lines
      return !noisePatterns.some(pattern => pattern.test(trimmed));
    })
    .join('\n');
}

// ---------------------------------------------------------------------------
// Chunk text into segments with a sliding window for context continuity
// ---------------------------------------------------------------------------
function chunkText(text: string, maxWords = 200, overlapWords = 30): string[] {
  const paragraphs = text.split(/\n{2,}/);  // Split on double newlines first
  const chunks: string[] = [];
  let currentWords: string[] = [];

  for (const para of paragraphs) {
    const words = para.trim().split(/\s+/);
    if (words.length === 0 || (words.length === 1 && words[0] === '')) continue;

    currentWords.push(...words);

    if (currentWords.length >= maxWords) {
      chunks.push(currentWords.join(' '));
      currentWords = currentWords.slice(maxWords - overlapWords);
    }
  }

  if (currentWords.length > 5) {
    chunks.push(currentWords.join(' '));
  }

  return chunks
    .map(c => c.trim())
    .filter(c => c.split(/\s+/).length >= 10);  // Only chunks with ≥10 words
}

// ---------------------------------------------------------------------------
// Fetch a page from the running local server and return clean plain text
// ---------------------------------------------------------------------------
async function fetchPageText(baseUrl: string, route: string): Promise<string | null> {
  const url = `${baseUrl}${route}`;
  try {
    console.log(`  Fetching rendered HTML: ${url}`);
    const response = await fetch(url, {
      headers: { 'User-Agent': 'FoggyWoods-RAG-Indexer/1.0' },
      // 8-second timeout using AbortController
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.warn(`  HTTP ${response.status} for ${url}`);
      return null;
    }

    const html = await response.text();
    const rawText = htmlToText(html);
    const cleanText = filterNoisyLines(rawText);
    return cleanText;
  } catch (err: any) {
    console.warn(`  Could not fetch ${url}: ${err.message}`);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Fallback: extract string literals from TSX source files when server is down
// ---------------------------------------------------------------------------
function extractStringLiteralsFromTsx(code: string): string {
  const strings: string[] = [];

  // Match JSX text content between tags — e.g. <p>Some visible text</p>
  const jsxTextRegex = />([^<>{}\n]{10,})</g;
  let match: RegExpExecArray | null;
  while ((match = jsxTextRegex.exec(code)) !== null) {
    const text = match[1].trim();
    if (text.length >= 10 && !/[{}=]/.test(text) && !/^\s*\/\//.test(text)) {
      strings.push(text);
    }
  }

  // Match string literals inside data arrays/objects (description, content, etc.)
  // e.g.  description: "Some meaningful text here"
  const stringValueRegex = /(?:description|content|title|text|label|a|q|answer|question)\s*:\s*"([^"]{15,})"/g;
  while ((match = stringValueRegex.exec(code)) !== null) {
    const text = match[1].trim();
    if (text.length >= 15) {
      strings.push(text);
    }
  }

  // Also match single-quoted strings in data objects
  const singleQuotedRegex = /(?:description|content|title|text|label|a|q|answer|question)\s*:\s*'([^']{15,})'/g;
  while ((match = singleQuotedRegex.exec(code)) !== null) {
    const text = match[1].trim();
    if (text.length >= 15) {
      strings.push(text);
    }
  }

  return strings.join('\n');
}

// ---------------------------------------------------------------------------
// Extract structured Q&A pairs from the FAQ TSX source file
// Returns an array of { q, a } objects, one per question.
// ---------------------------------------------------------------------------
function extractQAPairsFromFaqTsx(faqFilePath: string): { q: string; a: string }[] {
  if (!fs.existsSync(faqFilePath)) return [];
  const code = fs.readFileSync(faqFilePath, 'utf-8');
  const pairs: { q: string; a: string }[] = [];

  // Match patterns like:  q: "...", a: "..."
  // The TSX data uses the pattern:  { q: "...", a: "..." }
  const qRegex = /q:\s*"((?:[^"\\]|\\.)*)"/g;
  const aRegex = /a:\s*"((?:[^"\\]|\\.)*)"/g;

  const questions: string[] = [];
  const answers: string[] = [];

  let m: RegExpExecArray | null;
  while ((m = qRegex.exec(code)) !== null) {
    questions.push(m[1].replace(/\\n/g, '\n').replace(/\\"/g, '"').trim());
  }
  while ((m = aRegex.exec(code)) !== null) {
    answers.push(m[1].replace(/\\n/g, '\n').replace(/\\"/g, '"').trim());
  }

  // Pair them by index
  const count = Math.min(questions.length, answers.length);
  for (let i = 0; i < count; i++) {
    pairs.push({ q: questions[i], a: answers[i] });
  }

  return pairs;
}

// ---------------------------------------------------------------------------
// Main: rebuild the search index
// ---------------------------------------------------------------------------
export async function rebuildIndex(workspaceRoot: string): Promise<{ count: number; status: string }> {
  const chunks: IndexChunk[] = [];
  let idCounter = 1;
  let method = 'html_crawl';

  // Try to detect whether the local server is running
  const BASE_URL = 'http://localhost:3000';
  let serverAvailable = false;
  try {
    const probe = await fetch(`${BASE_URL}/`, {
      method: 'HEAD',
      signal: AbortSignal.timeout(3000),
    });
    serverAvailable = probe.ok;
  } catch {
    serverAvailable = false;
  }

  console.log(`Server available: ${serverAvailable}`);

  if (serverAvailable) {
    // ── PRIMARY PATH: Crawl rendered HTML from local server ────────────────
    console.log('Using HTML-crawl mode (rendered output from local Next.js server)...');

    for (const page of PAGES_TO_INDEX) {
      const pageText = await fetchPageText(BASE_URL, page.route);
      if (!pageText || pageText.trim().length < 50) {
        console.warn(`  Skipping ${page.route} — insufficient content`);
        continue;
      }

      const textChunks = chunkText(pageText, 200, 30);
      console.log(`  → ${textChunks.length} chunks extracted from ${page.route}`);

      for (const tChunk of textChunks) {
        chunks.push({
          id: `chunk_${idCounter++}`,
          route: page.route,
          title: page.title,
          content: tChunk,
        });
      }
    }

    // ── SUPPLEMENT: Extract individual Q&A pairs from TSX source ──────────
    // This gives the retriever fine-grained, single-answer chunks that are
    // far more precise than the large HTML-crawl blobs above.
    console.log('\nSupplementing with structured Q&A chunks from TSX source...');
    const qaPairs = extractQAPairsFromFaqTsx(path.join(workspaceRoot, 'app/faq/page.tsx'));
    for (const qa of qaPairs) {
      chunks.push({
        id: `qa_${idCounter++}`,
        route: '/faq',
        title: `FAQ: ${qa.q.slice(0, 60)}`,
        content: `Question: ${qa.q}\nAnswer: ${qa.a}`,
      });
    }
    console.log(`  → ${qaPairs.length} Q&A pair chunks added`);
  } else {
    // ── FALLBACK PATH: Parse string literals from TSX source files ─────────
    method = 'tsx_fallback';
    console.log('Server offline. Falling back to TSX string-literal extraction...');

    const fileRouteMap: Record<string, { route: string; title: string }> = {
      'app/components/Introduction.tsx': { route: '/', title: 'About the Resort' },
      'app/components/Accommodations.tsx': { route: '/#accommodations', title: 'Accommodations & Rooms' },
      'app/components/Amenities.tsx': { route: '/#experiences', title: 'Amenities & Experiences' },
      'app/components/ContactCTA.tsx': { route: '/#contact', title: 'Contact & Location' },
      'app/faq/page.tsx': { route: '/faq', title: 'Frequently Asked Questions' },
    };

    for (const [relPath, routeInfo] of Object.entries(fileRouteMap)) {
      const filePath = path.join(workspaceRoot, relPath);
      if (!fs.existsSync(filePath)) continue;

      const code = fs.readFileSync(filePath, 'utf-8');
      const cleanText = extractStringLiteralsFromTsx(code);
      const textChunks = chunkText(cleanText, 200, 30);

      console.log(`  ${relPath} → ${textChunks.length} chunks`);
      for (const tChunk of textChunks) {
        chunks.push({
          id: `chunk_${idCounter++}`,
          route: routeInfo.route,
          title: routeInfo.title,
          content: tChunk,
        });
      }
    }
  }

  console.log(`\nTotal chunks extracted: ${chunks.length}`);

  if (chunks.length === 0) {
    console.error('No content was extracted. The index will be empty.');
  }

  // ── EMBEDDINGS ────────────────────────────────────────────────────────────
  const geminiActive = isGeminiEnabled();
  if (geminiActive && chunks.length > 0) {
    console.log('\nGenerating vector embeddings via text-embedding-004...');
    for (const chunk of chunks) {
      try {
        const response = await ai.models.embedContent({
          model: 'text-embedding-004',
          contents: chunk.content,
        });
        if (response.embedding?.values) {
          chunk.embedding = response.embedding.values;
        }
      } catch (e) {
        console.error(`Error embedding chunk ${chunk.id}:`, e);
      }
    }
    console.log('Embeddings complete.');
  } else if (!geminiActive) {
    console.log('No GEMINI_API_KEY — skipping embeddings. Will use keyword fallback at query time.');
  }

  // ── SAVE INDEX ────────────────────────────────────────────────────────────
  const dataDir = path.join(workspaceRoot, 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  const indexPath = path.join(dataDir, 'rag-index.json');
  fs.writeFileSync(indexPath, JSON.stringify(chunks, null, 2), 'utf-8');
  console.log(`\nIndex saved to: ${indexPath}`);

  return {
    count: chunks.length,
    status: geminiActive
      ? `${method}_with_embeddings`
      : `${method}_keyword_fallback`,
  };
}
