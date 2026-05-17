import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { BGPattern } from "@/components/bg-pattern";
import FloatingChat from "@/components/chat/FloatingChat";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = localFont({
  src: [
    { path: "../fonts/inter/inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/inter/inter-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/inter/inter-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/inter/inter-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
});

const jetbrainsMono = localFont({
  src: [
    { path: "../fonts/jetbrains-mono/jetbrains-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/jetbrains-mono/jetbrains-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/jetbrains-mono/jetbrains-mono-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/jetbrains-mono/jetbrains-mono-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rahulgehlot.me"),
  title: "Rahul Gehlot",
  description:
    "B.Tech CSE at VIT Bhopal. Building full-stack web apps & ML systems — Hisaab Pro, Skillence, and more. Open to freelance work and internships.",
  icons: [{ rel: "icon", url: "/favicon.png", type: "image/png" }],
  openGraph: {
    title: "Rahul Gehlot — Full-stack & AI Developer",
    description:
      "Full-stack & AI developer building Hisaab Pro (expense tracking), Skillence (skill assessment), and intelligent systems. Explore projects, chat with the AI bot, or connect for freelance & internships.",
    url: "https://rahulgehlot.me",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-mono", jetbrainsMono.variable)}
    >
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased relative min-h-screen font-sans`}
      >
        {/* Prevent scroll restoration — always start at top on reload */}
        <Script id="scroll-restoration" strategy="beforeInteractive">
          {"history.scrollRestoration='manual';window.scrollTo(0,0);"}
        </Script>
        {/* Unique Cyber-System Greeting */}
        <Script id="console-greeting" strategy="afterInteractive">
          {`
            var head = "color:#3B82F6; font-family:monospace; font-weight:bold; font-size:14px;";
            var label = "color:#6B7280; font-family:monospace; font-size:12px;";
            var value = "color:#3B82F6; font-family:monospace; font-size:12px; font-weight:bold;";
            var success = "color:#10B981; font-family:monospace; font-size:12px; font-weight:bold;";

            setTimeout(() => {
              console.clear();
              console.log("%c[»] INITIALIZING RAHUL.OS v2.5...", head);
              console.log("%c");
              console.log("%cRAHUL", "font-family:monospace; font-size:60px; font-weight:bold; color:#3B82F6; text-shadow: 2px 2px #1E40AF;");
              console.log("%c");
              console.log("%c" + "─".repeat(50), value);
              console.log("%c[STATUS]  %cSYSTEM STABLE", label, success);
              console.log("%c[SOURCE]  %chttps://rahulgehlot.me", label, value);
              console.log("%c[KNOWLEDGE] %cRAG Knowledge Base [Injected]", label, value);
              console.log("%c[INTEREST] %cFull-stack, AI/ML, Cloud Architecture", label, value);
              console.log("%c" + "─".repeat(50), value);
              console.log("%cHey there! You've successfully bypassed the UI. Welcome to the source.", value);
              var sigStyle = "color:#C25B26; font-family:monospace; font-size:14px; font-weight:bold;";
              console.log("%c" + " ".repeat(45) + "Signed, DTxSD", sigStyle);
            }, 2000);
          `}
        </Script>
        {/* Base dotted pattern — sections can layer their own for different effects */}
        <BGPattern
          variant="dots"
          mask="none"
          size={24}
          dotSize={1.2}
          fill="var(--theme-dot)"
          className="opacity-100 z-[-1]"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {children}
          <FloatingChat />
        </ThemeProvider>
      </body>
    </html>
  );
}
