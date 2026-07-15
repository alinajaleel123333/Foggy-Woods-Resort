import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Foggy Woods | Where Fog Meets Serenity",
  description: "A luxury resort tucked away in misty pine woods. Experience ultimate serenity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=boska@400,500,700&f[]=satoshi@1,2&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-50 font-sans text-zinc-900">
        {children}
      </body>
    </html>
  );
}
