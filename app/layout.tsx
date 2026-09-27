import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import "./motion.css";

export const metadata: Metadata = {
  // Ganti kalau domain portofolio berubah (dipakai untuk URL absolut gambar pratinjau link).
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio.codewithus.me"),
  title: { default: "Arva Mada | Computer Engineering", template: "%s | Arva Mada" },
  description: "Computer Engineering student at Universitas Brawijaya. Embedded systems, C++, and the code that runs on small hardware.",
  openGraph: { title: "Arva Mada | Computer Engineering", images: ["/profile.jpg"], type: "website" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f6f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1012" },
  ],
};

// Dijalankan sebelum paint supaya tidak ada kedip tema. motion: "full" | "reduce" | kosong (ikut OS).
const prefs = `try{var d=document.documentElement.dataset,t=localStorage.getItem('theme'),m=localStorage.getItem('motion');if(t)d.theme=t;if(m)d.motion=m;var l=localStorage.getItem('lang');if(l)document.documentElement.lang=l}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prefs }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
