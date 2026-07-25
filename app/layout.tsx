import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Manrope, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "AzriFadli — Building AI software",
  description:
    "I'm Azri. By day I work in Identity and Access Management. Outside work I build AI products, SaaS applications and automations that solve real business problems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Font variables must live on <html>: Tailwind's preflight resolves
    // font-family on the root, so defining them on <body> leaves the var()
    // chain undefined there and the page falls back to the browser default.
    <html
      lang="en"
      className={`${manrope.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <SiteNav />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
