"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { navLinks, site } from "@/lib/site";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-transparent transition-all duration-300",
        scrolled &&
          "border-border bg-[rgba(250,250,250,0.85)] backdrop-blur-[10px]"
      )}
    >
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-[18px]">
        <Link
          href="/"
          className="font-display text-[17px] font-bold tracking-[-0.01em] text-foreground"
        >
          {site.name}
        </Link>
        <nav className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground min-[861px]:block"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="btn-scale inline-flex items-center gap-2 rounded-full bg-primary px-[18px] py-[9px] text-sm font-medium text-primary-foreground"
          >
            Let&apos;s talk
          </Link>
        </nav>
      </div>
    </header>
  );
}
