import { Mail } from "lucide-react";
import { PillLink } from "@/components/pill-link";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

/* lucide-react no longer ships brand icons, so these are the marks from the approved preview */
function GithubIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.9-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      className="size-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="bg-[linear-gradient(160deg,#2A2A2E_0%,#1C1C1F_55%,#151517_100%)] px-6 py-28"
    >
      <Reveal className="mx-auto max-w-[1120px] text-center">
        <h2 className="mb-5 font-display text-[clamp(30px,4.2vw,44px)] font-extrabold tracking-[-0.02em] text-[#FAFAFA]">
          Let&apos;s build something together.
        </h2>
        <p className="mb-10 text-base text-[#A8A8AD]">
          Open to hearing about roles, projects, and things worth building.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <PillLink href={`mailto:${site.email}`} variant="accent">
            <Mail className="size-4" />
            Email
          </PillLink>
          <PillLink href={site.github} variant="ghost-dark">
            <GithubIcon />
            GitHub
          </PillLink>
          <PillLink href={site.linkedin} variant="ghost-dark">
            <LinkedinIcon />
            LinkedIn
          </PillLink>
        </div>
      </Reveal>
    </section>
  );
}
