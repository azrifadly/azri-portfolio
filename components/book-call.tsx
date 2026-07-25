"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "15:00", "16:00", "16:30",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE = 180;

// --- Anti-spam: front-end guardrail, backed by localStorage ---
const BOOKINGS_KEY = "discovery_bookings";
// One booking per device inside this window; email + slot are also de-duped.
const COOLDOWN_MS = 24 * 60 * 60 * 1000;

interface Booking {
  email: string;
  date: string;
  time: string;
  ts: number;
}

function loadBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveBookings(list: Booking[]) {
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable — booking still succeeds for this session */
  }
}

function iso(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function prettyDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function daySeed(dateStr: string) {
  const d = new Date(dateStr);
  return d.getFullYear() * 372 + (d.getMonth() + 1) * 31 + d.getDate();
}

/**
 * A handful of "fully booked" days — only in the current month so it looks like
 * near-term demand rather than a permanent state, and weighted toward weekends.
 */
function isFullyBooked(dateStr: string, today: Date) {
  const d = new Date(dateStr);
  if (
    d.getFullYear() !== today.getFullYear() ||
    d.getMonth() !== today.getMonth()
  ) {
    return false;
  }
  const seed = daySeed(dateStr);
  const weekend = d.getDay() === 0 || d.getDay() === 6;
  return weekend ? seed % 2 === 0 : seed % 4 === 0;
}

/** A few slots look taken per day (deterministic), plus anything booked locally. */
function bookedSlotsFor(
  dateStr: string,
  takenLocally: string[],
  fullyBooked: boolean
): Set<string> {
  if (fullyBooked) return new Set(SLOTS);
  const seed = daySeed(dateStr);
  const booked = new Set<string>();
  const n = 3 + (seed % 3); // 3–5 of 12 look taken
  for (let i = 0; i < n; i++) {
    booked.add(SLOTS[(seed * (i + 2) * 5) % SLOTS.length]);
  }
  takenLocally.forEach((t) => booked.add(t));
  return booked;
}

interface DayCell {
  day: number;
  key: string;
  disabled: boolean;
  full: boolean;
}

export function BookCall() {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);
  const reducedMotion = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<Booking | null>(null);
  const [blockedMsg, setBlockedMsg] = useState<string | null>(null);
  const [rovingKey, setRovingKey] = useState<string | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const calRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const keyboardNav = useRef(false);

  useEffect(() => setMounted(true), []);

  const messageError =
    message.length > MAX_MESSAGE
      ? `Please keep your message under ${MAX_MESSAGE} characters.`
      : null;

  const atCurrentMonth =
    view.getFullYear() === today.getFullYear() &&
    view.getMonth() === today.getMonth();

  const { cells, firstEnabledKey } = useMemo(() => {
    const year = view.getFullYear();
    const month = view.getMonth();
    const startDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const out: (DayCell | null)[] = [];
    let firstEnabled: string | null = null;
    for (let b = 0; b < startDay; b++) out.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const key = iso(date);
      const disabled = date < today; // past only — weekends stay open
      const full = !disabled && isFullyBooked(key, today);
      if (!disabled && !full && firstEnabled === null) firstEnabled = key;
      out.push({ day, key, disabled, full });
    }
    return { cells: out, firstEnabledKey: firstEnabled };
  }, [view, today]);

  const monthHasFull = useMemo(
    () => cells.some((c) => c?.full),
    [cells]
  );

  const activeKey =
    rovingKey && cells.some((c) => c?.key === rovingKey)
      ? rovingKey
      : selectedDate && cells.some((c) => c?.key === selectedDate)
        ? selectedDate
        : firstEnabledKey;

  const bookedSlots = useMemo(() => {
    if (!selectedDate) return null;
    const takenLocally = loadBookings()
      .filter((b) => b.date === selectedDate)
      .map((b) => b.time);
    return bookedSlotsFor(
      selectedDate,
      takenLocally,
      isFullyBooked(selectedDate, today)
    );
  }, [selectedDate, today]);

  const closePanel = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const changeMonth = useCallback(
    (dir: number) => {
      setView((v) => {
        const next = new Date(v.getFullYear(), v.getMonth() + dir, 1);
        const floor = new Date(today.getFullYear(), today.getMonth(), 1);
        return next < floor ? v : next;
      });
    },
    [today]
  );

  // On open: enforce the per-device cooldown, lock body scroll, move focus in.
  useEffect(() => {
    if (!open) return;
    const recent = loadBookings().find((b) => Date.now() - b.ts < COOLDOWN_MS);
    setBlockedMsg(
      recent && !done
        ? `You already have a call booked for ${prettyDate(recent.date)} at ${recent.time}. I'll be in touch — email me if you need to reschedule.`
        : null
    );

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => dialogRef.current?.focus());

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closePanel();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, done, closePanel]);

  // Scroll (wheel) over the calendar to page through months.
  useEffect(() => {
    if (!open) return;
    const el = calRef.current;
    if (!el) return;
    let last = 0;
    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaY) < 6) return;
      e.preventDefault();
      const now = Date.now();
      if (now - last < 220) return;
      last = now;
      changeMonth(e.deltaY > 0 ? 1 : -1);
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [open, changeMonth]);

  // Move DOM focus when navigating the grid with arrow keys.
  useEffect(() => {
    if (!keyboardNav.current || !activeKey) return;
    keyboardNav.current = false;
    gridRef.current
      ?.querySelector<HTMLButtonElement>(`[data-key="${activeKey}"]`)
      ?.focus();
  }, [activeKey]);

  function pickDate(key: string) {
    setSelectedDate(key);
    setSelectedTime(null);
    setNotice(null);
    setRovingKey(key);
  }

  function onGridKeyDown(e: React.KeyboardEvent) {
    const delta: Record<string, number> = {
      ArrowRight: 1, ArrowLeft: -1, ArrowDown: 7, ArrowUp: -7,
    };
    if (!(e.key in delta)) return;
    e.preventDefault();
    const days = cells.filter((c): c is DayCell => c !== null);
    const idx = days.findIndex((c) => c.key === activeKey);
    if (idx === -1) return;
    const next = days[idx + delta[e.key]];
    if (next) {
      keyboardNav.current = true;
      setRovingKey(next.key);
    }
  }

  // Swipe left/right on the calendar (touch) to change months.
  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      changeMonth(dx < 0 ? 1 : -1);
    }
  }

  async function confirm() {
    if (!selectedDate || !selectedTime || submitting) return;
    const em = email.trim().toLowerCase();
    if (!EMAIL_RE.test(em)) {
      setEmailError("Please enter a valid email.");
      return;
    }
    setEmailError(null);
    if (messageError) return;

    const bookings = loadBookings();
    if (bookings.some((b) => Date.now() - b.ts < COOLDOWN_MS)) {
      setBlockedMsg("You've recently booked a call from this device. Please try again later.");
      return;
    }
    if (bookings.some((b) => b.email === em)) {
      setNotice("This email already has a call booked with me.");
      return;
    }
    if (bookings.some((b) => b.date === selectedDate && b.time === selectedTime)) {
      setNotice("That time was just taken — please pick another.");
      setSelectedTime(null);
      return;
    }

    const rec: Booking = {
      email: em,
      date: selectedDate,
      time: selectedTime,
      ts: Date.now(),
    };

    // Build an unambiguous absolute start time from the visitor's local pick.
    const [hh, mm] = selectedTime.split(":").map(Number);
    const [yr, mo, dy] = selectedDate.split("-").map(Number);
    const startISO = new Date(yr, mo - 1, dy, hh, mm).toISOString();

    setSubmitting(true);
    setNotice(null);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: em,
          date: selectedDate,
          time: selectedTime,
          message: message.trim(),
          tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
          startISO,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setNotice(data?.error ?? "Something went wrong booking that slot. Please try again.");
        return;
      }
      saveBookings([...bookings, rec]);
      setDone(rec);
    } catch {
      setNotice("Couldn't reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const panelTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const };
  const slideTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const };
  const arrowMotion = reducedMotion
    ? {}
    : { whileHover: { scale: 1.08 }, whileTap: { scale: 0.9 } };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="btn-scale inline-flex items-center gap-2 rounded-full bg-primary px-[26px] py-3.5 text-[15px] font-medium text-primary-foreground"
      >
        Book a discovery call
        <ArrowRight className="size-4" />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                key="overlay"
                className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.18 }}
                onMouseDown={() => setOpen(false)}
              >
                <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
                <motion.div
                  ref={dialogRef}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Schedule a discovery call"
                  tabIndex={-1}
                  initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.96, y: reducedMotion ? 0 : 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.96, y: reducedMotion ? 0 : 8 }}
                  transition={panelTransition}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="no-scrollbar relative z-10 max-h-[88vh] w-[340px] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-2xl border border-border bg-card p-5 text-left shadow-2xl outline-none"
                >
                  {done ? (
                    <div className="py-4 text-center">
                      <div className="mx-auto mb-4 flex size-11 items-center justify-center rounded-full bg-brand-soft text-brand">
                        <Check className="size-5" />
                      </div>
                      <h3 className="mb-1.5 font-display text-lg font-extrabold">
                        Request sent
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Thanks — I&apos;ve got your call for {prettyDate(done.date)} at{" "}
                        {done.time}. I&apos;ll confirm at{" "}
                        <span className="text-foreground">{done.email}</span> shortly.
                      </p>
                    </div>
                  ) : blockedMsg ? (
                    <div className="py-4 text-center">
                      <h3 className="mb-1.5 font-display text-lg font-extrabold">
                        Already booked
                      </h3>
                      <p className="text-sm text-muted-foreground">{blockedMsg}</p>
                    </div>
                  ) : (
                    <>
                      <div
                        ref={calRef}
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <motion.button
                            type="button"
                            {...arrowMotion}
                            onClick={() => changeMonth(-1)}
                            disabled={atCurrentMonth}
                            aria-label="Previous month"
                            className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:shadow-md disabled:opacity-35 disabled:shadow-none disabled:hover:bg-transparent"
                          >
                            <ChevronLeft className="size-4" />
                          </motion.button>
                          <div aria-live="polite" className="text-sm font-semibold">
                            {MONTHS[view.getMonth()]} {view.getFullYear()}
                          </div>
                          <motion.button
                            type="button"
                            {...arrowMotion}
                            onClick={() => changeMonth(1)}
                            aria-label="Next month"
                            className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:shadow-md"
                          >
                            <ChevronRight className="size-4" />
                          </motion.button>
                        </div>

                        <div role="grid" aria-label="Choose a date">
                          <div role="row" className="mb-1.5 grid grid-cols-7">
                            {DOW.map((d) => (
                              <span
                                key={d}
                                role="columnheader"
                                className="py-1 text-center text-[11px] font-semibold text-muted-foreground/70"
                              >
                                {d}
                              </span>
                            ))}
                          </div>
                          <div
                            ref={gridRef}
                            className="grid grid-cols-7 gap-0.5"
                            onKeyDown={onGridKeyDown}
                          >
                            {cells.map((cell, i) =>
                              cell === null ? (
                                <span key={`e${i}`} role="gridcell" aria-hidden="true" />
                              ) : (
                                <button
                                  key={cell.key}
                                  type="button"
                                  role="gridcell"
                                  data-key={cell.key}
                                  tabIndex={cell.key === activeKey ? 0 : -1}
                                  aria-disabled={cell.disabled || cell.full || undefined}
                                  aria-selected={cell.key === selectedDate}
                                  aria-label={`${new Date(cell.key).toDateString()}${cell.full ? " — fully booked" : ""}`}
                                  onClick={() =>
                                    !cell.disabled && !cell.full && pickDate(cell.key)
                                  }
                                  className={cn(
                                    "relative flex aspect-square items-center justify-center rounded-lg text-[13px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-foreground",
                                    cell.disabled
                                      ? "cursor-not-allowed text-muted-foreground/30"
                                      : cell.full
                                        ? "cursor-not-allowed text-muted-foreground/50"
                                        : "text-foreground hover:bg-muted",
                                    cell.key === selectedDate &&
                                      "bg-foreground text-background hover:bg-foreground"
                                  )}
                                >
                                  {cell.day}
                                  {cell.full && cell.key !== selectedDate && (
                                    <span className="absolute bottom-[3px] left-1/2 size-1 -translate-x-1/2 rounded-full bg-amber-500" />
                                  )}
                                </button>
                              )
                            )}
                          </div>
                        </div>

                        {monthHasFull && (
                          <div className="mt-2.5 flex items-center justify-end gap-1 text-[10px] text-muted-foreground/60">
                            <span className="size-1 rounded-full bg-amber-500" />
                            Fully booked
                          </div>
                        )}
                      </div>

                      <AnimatePresence initial={false}>
                        {selectedDate && bookedSlots && (
                          <motion.div
                            key={selectedDate}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={slideTransition}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 border-t border-border pt-4">
                              <div className="mb-2.5 text-xs font-medium text-muted-foreground/70">
                                Available times
                              </div>
                              <div
                                role="listbox"
                                aria-label="Available time slots"
                                className="grid grid-cols-3 gap-1.5"
                              >
                                {SLOTS.map((t) => {
                                  const isBooked = bookedSlots.has(t);
                                  const isSel = selectedTime === t;
                                  return (
                                    <button
                                      key={t}
                                      type="button"
                                      role="option"
                                      aria-selected={isSel}
                                      aria-disabled={isBooked || undefined}
                                      aria-label={`${t} — ${isBooked ? "unavailable" : "available"}`}
                                      onClick={() => {
                                        if (isBooked) return;
                                        setSelectedTime(t);
                                        setNotice(null);
                                      }}
                                      className={cn(
                                        "rounded-lg border py-2 text-center text-[12.5px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-foreground",
                                        isBooked
                                          ? "cursor-not-allowed border-border bg-muted text-muted-foreground/40 line-through"
                                          : "border-border text-foreground hover:border-foreground",
                                        isSel &&
                                          "border-foreground bg-foreground text-background hover:border-foreground"
                                      )}
                                    >
                                      {t}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence initial={false}>
                        {selectedTime && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={slideTransition}
                            className="overflow-hidden"
                          >
                            <div className="mt-4">
                              <label
                                htmlFor="dcw-email"
                                className="mb-1.5 block text-xs font-medium text-muted-foreground/70"
                              >
                                Your email
                              </label>
                              <input
                                id="dcw-email"
                                type="email"
                                inputMode="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                  if (emailError) setEmailError(null);
                                  if (notice) setNotice(null);
                                }}
                                aria-invalid={emailError ? true : undefined}
                                aria-describedby={emailError ? "dcw-email-err" : undefined}
                                className={cn(
                                  "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-foreground",
                                  emailError ? "border-red-500" : "border-border"
                                )}
                              />
                              {emailError && (
                                <p id="dcw-email-err" className="mt-1 text-xs text-red-500">
                                  {emailError}
                                </p>
                              )}
                            </div>

                            <div className="mt-3">
                              <label
                                htmlFor="dcw-message"
                                className="mb-1.5 flex items-center justify-between text-xs font-medium text-muted-foreground/70"
                              >
                                <span>Message (optional)</span>
                                <span
                                  className={cn(
                                    "tabular-nums",
                                    messageError ? "text-red-500" : "text-muted-foreground/50"
                                  )}
                                >
                                  {message.length}/{MAX_MESSAGE}
                                </span>
                              </label>
                              <textarea
                                id="dcw-message"
                                rows={2}
                                placeholder="A line about what you'd like to discuss…"
                                value={message}
                                onChange={(e) => {
                                  setMessage(e.target.value);
                                  if (notice) setNotice(null);
                                }}
                                aria-invalid={messageError ? true : undefined}
                                aria-describedby={messageError ? "dcw-message-err" : undefined}
                                className={cn(
                                  "w-full resize-none rounded-lg border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-foreground",
                                  messageError ? "border-red-500" : "border-border"
                                )}
                              />
                              {messageError && (
                                <p id="dcw-message-err" className="mt-1 text-xs text-red-500">
                                  {messageError}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {notice && (
                        <p role="alert" className="mt-3 text-xs text-amber-600">
                          {notice}
                        </p>
                      )}

                      <p className="mt-3.5 text-[11px] text-muted-foreground/70">
                        All times shown in your local timezone.
                      </p>

                      <button
                        type="button"
                        onClick={confirm}
                        disabled={
                          !selectedDate ||
                          !selectedTime ||
                          !email.trim() ||
                          !!messageError ||
                          submitting
                        }
                        className="mt-3.5 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground/60"
                      >
                        {submitting ? "Booking…" : "Confirm booking"}
                      </button>
                    </>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
