import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Rahul Gehlot",
  openGraph: {
    title: "Resume — Rahul Gehlot",
    description: "Full-stack & AI developer. B.Tech CSE at VIT Bhopal.",
    images: [{ url: "/og?subtitle=Resume", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og?subtitle=Resume"],
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
