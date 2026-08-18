import Link from "next/link";
import { footerLinks, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-4 px-6 py-8">
        <span className="font-display text-[15px] font-extrabold">{site.name}</span>
        {/*
          Must wrap: six links in a single non-wrapping row overflow a phone
          viewport and make the whole page scroll sideways.
        */}
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <span className="text-[13px] text-muted-foreground">
          © {new Date().getFullYear()} Azri. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
