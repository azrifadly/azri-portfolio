import Image from "next/image";
import type { BlogCover } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Abstract geometric cover illustrations for blog cards — one motif per
 * topic: connected nodes (AI), gear pair (automation), ascending path
 * (career), path into a wall (startup). The first three are ported 1:1
 * from the approved preview.
 */

const ACCENT = "#5B5CEB";
const COVER_BG = "#F4F4FD";

function AiCover() {
  const pts: [number, number][] = [
    [40, 40], [110, 30], [180, 55], [250, 35],
    [60, 100], [140, 90], [210, 110], [260, 95],
    [30, 140], [100, 130], [170, 145], [240, 125],
  ];
  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [4, 5], [5, 6], [6, 7], [1, 5], [2, 6],
    [8, 9], [9, 10], [10, 11], [5, 9], [6, 10],
  ];
  return (
    <svg viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="300" height="160" fill={COVER_BG} />
      {pts.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i % 3 === 0 ? 5 : 3.5}
          fill={ACCENT}
          opacity={i % 3 === 0 ? 0.9 : 0.45}
        />
      ))}
      <g stroke={ACCENT} strokeWidth="1" opacity="0.35">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={pts[a][0]}
            y1={pts[a][1]}
            x2={pts[b][0]}
            y2={pts[b][1]}
          />
        ))}
      </g>
    </svg>
  );
}

function AutomationCover() {
  const bigTeeth = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4;
    return {
      x1: 95 + Math.cos(a) * 30,
      y1: 80 + Math.sin(a) * 30,
      x2: 95 + Math.cos(a) * 38,
      y2: 80 + Math.sin(a) * 38,
    };
  });
  const smallTeeth = Array.from({ length: 6 }, (_, i) => {
    const a = (i * Math.PI) / 3;
    return {
      x1: 185 + Math.cos(a) * 19,
      y1: 80 + Math.sin(a) * 19,
      x2: 185 + Math.cos(a) * 25,
      y2: 80 + Math.sin(a) * 25,
    };
  });
  return (
    <svg viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="300" height="160" fill={COVER_BG} />
      <g fill="none" stroke={ACCENT} strokeWidth="1.4">
        <circle cx="95" cy="80" r="30" opacity="0.9" />
        <circle cx="185" cy="80" r="19" opacity="0.55" />
        {bigTeeth.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
        ))}
        {smallTeeth.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} opacity="0.55" />
        ))}
      </g>
      <line
        x1="120"
        y1="80"
        x2="166"
        y2="80"
        stroke={ACCENT}
        strokeWidth="1.4"
        strokeDasharray="3 3"
        opacity="0.5"
      />
    </svg>
  );
}

function CareerCover() {
  const pts: [number, number][] = [
    [30, 130], [90, 110], [140, 120], [190, 70], [250, 40],
  ];
  return (
    <svg viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="300" height="160" fill={COVER_BG} />
      <polyline
        points="30,130 90,110 140,120 190,70 250,40"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      {pts.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === 4 ? 5 : 3.5}
          fill={ACCENT}
          opacity={i === 4 ? 1 : 0.6}
        />
      ))}
    </svg>
  );
}

/**
 * Deliberate rhyme with CareerCover: the same ascending path, stopped dead by
 * a wall, with the route it can't reach ghosted on the far side.
 */
function StartupCover() {
  const reached: [number, number][] = [
    [30, 132], [72, 118], [114, 96], [152, 78],
  ];
  const beyond: [number, number][] = [
    [212, 66], [248, 44], [278, 36],
  ];
  const wallX = 182;
  const hatches = Array.from({ length: 5 }, (_, i) => 40 + i * 21);
  return (
    <svg viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="300" height="160" fill={COVER_BG} />

      <polyline
        points={reached.map(([x, y]) => `${x},${y}`).join(" ")}
        fill="none"
        stroke={ACCENT}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      {reached.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === reached.length - 1 ? 5 : 3.5}
          fill={ACCENT}
          opacity={i === reached.length - 1 ? 1 : 0.6}
        />
      ))}

      <g stroke={ACCENT}>
        <line x1={wallX} y1="26" x2={wallX} y2="140" strokeWidth="2" opacity="0.9" />
        {hatches.map((y) => (
          <line
            key={y}
            x1={wallX}
            y1={y}
            x2={wallX + 9}
            y2={y - 9}
            strokeWidth="1.2"
            opacity="0.4"
          />
        ))}
      </g>

      <polyline
        points={beyond.map(([x, y]) => `${x},${y}`).join(" ")}
        fill="none"
        stroke={ACCENT}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="4 5"
        opacity="0.3"
      />
      {beyond.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3.5} fill={ACCENT} opacity="0.25" />
      ))}
    </svg>
  );
}

const COVERS: Record<BlogCover, React.ReactNode> = {
  ai: <AiCover />,
  automation: <AutomationCover />,
  career: <CareerCover />,
  startup: <StartupCover />,
};

export function BlogCoverArt({
  cover,
  image,
  className,
}: {
  cover: BlogCover;
  /** Photo thumbnail; replaces the geometric art when present. */
  image?: { src: string; alt: string };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-[140px] w-full [&>svg]:block [&>svg]:size-full",
        className
      )}
    >
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 760px) 100vw, 760px"
          className="object-cover"
        />
      ) : (
        COVERS[cover]
      )}
    </div>
  );
}
