import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { BGPattern } from "@/components/bg-pattern";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rahulgehlot.vercel.app"),
  title: "Rahul Gehlot — Full-stack & AI Developer",
  description:
    "B.Tech CSE at VIT Bhopal. I build full-stack web apps and machine learning systems. Open to freelance and internships.",
  icons: [{ rel: "icon", url: "/favicon.png", type: "image/png" }],
  openGraph: {
    title: "Rahul Gehlot — Full-stack & AI Developer",
    description:
      "Building Hisaab Pro, Skillence, and full-stack systems. Ask the chatbot about my work.",
    url: "https://rahulgehlot.vercel.app",
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
        </ThemeProvider>
      </body>
    </html>
  );
}
