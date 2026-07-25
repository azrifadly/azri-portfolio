import type { MarqueeBadge } from "@/lib/content";

/**
 * Monochrome tech marks for the marquee, ported 1:1 from the approved
 * preview. All draw with currentColor so they inherit text color.
 */
export const techIcons: Record<MarqueeBadge, React.ReactNode> = {
  OpenAI: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21.55 10.03a5.4 5.4 0 0 0-.5-4.51 5.6 5.6 0 0 0-5.9-2.6A5.6 5.6 0 0 0 4.98 5.19a5.4 5.4 0 0 0-3.6 2.6 5.6 5.6 0 0 0 .7 6.55 5.4 5.4 0 0 0 .49 4.5 5.6 5.6 0 0 0 5.9 2.6 5.6 5.6 0 0 0 10.17-2.26 5.4 5.4 0 0 0 3.6-2.6 5.6 5.6 0 0 0-.7-6.55h.01Zm-8.44 10.6a4.1 4.1 0 0 1-2.6-.93l.13-.07 4.42-2.53a.75.75 0 0 0 .38-.65v-6.2l1.87 1.08c.02.01.03.03.03.05v5.12a4.1 4.1 0 0 1-4.23 4.13ZM4.5 16.9a4.05 4.05 0 0 1-.5-2.76l.13.08 4.42 2.53c.23.13.51.13.74 0l5.4-3.1v2.15a.06.06 0 0 1-.02.05l-4.47 2.55a4.13 4.13 0 0 1-5.7-1.5ZM3.31 8.4a4.1 4.1 0 0 1 2.15-1.8v5.2c0 .28.14.52.38.65l5.39 3.1-1.87 1.07a.07.07 0 0 1-.06 0L4.83 14.1A4.13 4.13 0 0 1 3.3 8.4Zm15.35 3.58-5.4-3.11 1.87-1.07a.07.07 0 0 1 .06 0l4.47 2.56a4.12 4.12 0 0 1-.63 7.43v-5.2a.75.75 0 0 0-.37-.61Zm1.86-2.8-.13-.08-4.42-2.55a.76.76 0 0 0-.75 0l-5.39 3.1V7.5a.06.06 0 0 1 .02-.05l4.47-2.55a4.12 4.12 0 0 1 6.2 4.29ZM9.28 12.85l-1.87-1.07a.06.06 0 0 1-.03-.05V6.61a4.12 4.12 0 0 1 6.76-3.16l-.13.07-4.42 2.53a.75.75 0 0 0-.38.65l.07 6.15Zm1.01-2.19 2.4-1.38 2.41 1.38v2.76l-2.4 1.38-2.41-1.38v-2.76Z"
        fill="currentColor"
      />
    </svg>
  ),
  Claude: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2.5 13.8 9l5.7-3.3-3.3 5.7 6.5 1.8-6.5 1.8 3.3 5.7-5.7-3.3L12 23.5 10.2 17l-5.7 3.3 3.3-5.7-6.5-1.8 6.5-1.8-3.3-5.7 5.7 3.3z"
        fill="currentColor"
      />
    </svg>
  ),
  Cursor: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 3l14 6-6 2-2 6z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "Next.js": (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M9.2 8.4v7.3M9.2 8.4l6 7.3M15 8.4v5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Tailwind: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 10.5c.6-2.4 2.1-3.6 4.5-3.6 3.6 0 4.05 2.7 5.85 3.15.6.15 1.35-.15 1.65-.9-.6 2.4-2.1 3.6-4.5 3.6-3.6 0-4.05-2.7-5.85-3.15-.6-.15-1.35.15-1.65.9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 15.9c.6-2.4 2.1-3.6 4.5-3.6 3.6 0 4.05 2.7 5.85 3.15.6.15 1.35-.15 1.65-.9-.6 2.4-2.1 3.6-4.5 3.6-3.6 0-4.05-2.7-5.85-3.15-.6-.15-1.35.15-1.65.9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Supabase: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M13 2.5 4.5 13.8h6.2L11 21.5l8.5-11.3h-6.2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),
  Postgres: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <ellipse cx="12" cy="7" rx="7" ry="3.2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M5 7v6c0 1.8 3.1 3.2 7 3.2s7-1.4 7-3.2V7"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M5 13v4c0 1.8 3.1 3.2 7 3.2s7-1.4 7-3.2v-4"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  ),
  Vercel: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.5 21 19.5H3z" fill="currentColor" />
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.9-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
        fill="currentColor"
      />
    </svg>
  ),
};
