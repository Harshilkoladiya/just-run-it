import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

export type LessonInfo = {
  title: string;
  category: string;
  level: string;
  minutes: number;
  summary: string;
};

function H({ children }: { children: ReactNode }) {
  return <h3 className="mt-10 text-xl text-foreground">{children}</h3>;
}
function P({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</p>;
}

function B({ label, children }: { label: string; children: ReactNode }) {
  return (
    <li>
      <span className="mr-2 text-primary">·</span>
      <span className="text-foreground">{label}:</span> {children}
    </li>
  );
}

function SipContent() {
  return (
    <>
      <H>What is a SIP?</H>
      <P>
        A Systematic Investment Plan (SIP) represents an investment methodology that enables you
        to allocate a predetermined sum of capital into a mutual fund scheme at consistent
        intervals—typically on a monthly, quarterly, or weekly basis. Rather than committing a
        substantial lump sum simultaneously, you progressively develop your investment portfolio
        throughout an extended timeframe.
      </P>
      <p className="mt-6 text-sm font-semibold text-foreground">Operational Mechanism</p>
      <ul className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
        <B label="Establishment & Automated Processing">
          You select a mutual fund scheme, designate an investment amount (frequently commencing
          at ₹500 or $10), and establish a recurring transaction date. On the designated date,
          funds are automatically withdrawn from your bank account.
        </B>
        <B label="Unit Acquisition">
          The fund manager deploys your capital to purchase "units" of the mutual fund at the
          prevailing market valuation, referred to as the Net Asset Value (NAV).
        </B>
        <B label="Currency-Cost Averaging">
          During periods of market decline, the NAV diminishes, enabling your consistent monthly
          contribution to acquire a greater quantity of units. Conversely, during market
          appreciation, the NAV increases, resulting in the acquisition of fewer units. This
          systematic approach reduces your average acquisition cost per unit over time without
          necessitating precise market timing.
        </B>
        <B label="Compounding Accumulation">
          The earnings generated from your investments produce supplementary returns
          progressively. As your cumulative invested capital expands, the compounding mechanism
          accelerates wealth accumulation.
        </B>
      </ul>
      <p className="mt-6 text-sm font-semibold text-foreground">Illustrative Scenario</p>
      <P>Consider establishing a monthly SIP contribution of ₹2,000:</P>
      <ul className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
        <B label="Month 1">The fund NAV stands at ₹20 → You obtain 100 units (₹2,000 ÷ ₹20).</B>
        <B label="Month 2">
          Market conditions deteriorate and NAV declines to ₹10 → You obtain 200 units (₹2,000 ÷ ₹10).
        </B>
        <B label="Month 3">
          Market conditions improve and NAV increases to ₹25 → You obtain 80 units (₹2,000 ÷ ₹25).
        </B>
      </ul>
      <P>
        Throughout the 3-month period, your total capital invested amounts to ₹6,000, and you
        have accumulated 380 units at an average acquisition cost of ₹15.78 per unit—illustrating
        how market downturns facilitate the procurement of additional units at reduced valuations.
      </P>
    </>
  );
}

function GenericContent({ lesson }: { lesson: LessonInfo }) {
  return (
    <>
      <H>Overview</H>
      <P>{lesson.summary}</P>
      <H>What you'll learn</H>
      <P>
        This lesson walks through the core ideas step by step, with practical examples in Indian
        Rupees. Full content for this lesson is coming soon.
      </P>
    </>
  );
}

export function LessonModal({ lesson, onClose }: { lesson: LessonInfo | null; onClose: () => void }) {
  useEffect(() => {
    if (!lesson) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lesson, onClose]);

  if (!lesson) return null;
  const isSip = lesson.title === "SIP Basics";
  const title = isSip ? "SIP Basics: Mechanics & Rupee-Cost Averaging" : lesson.title;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-[85vh] w-full max-w-[850px] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative flex items-center gap-3 border-b border-border px-6 py-4">
          <span className="mono-label rounded-full border border-border px-3 py-1 text-muted-foreground">
            <span className="text-primary">•</span> {lesson.category}
          </span>
          <span className="mono-label rounded-full bg-primary/15 px-3 py-1 text-primary">
            {lesson.level}
          </span>
          <span className="mono-label text-muted-foreground">{lesson.minutes} min</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lesson"
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="relative flex-1 overflow-y-auto px-6 py-8 sm:px-10">
          <h2 className="text-3xl leading-tight sm:text-4xl">{title}</h2>
          <div className="mt-6 rounded-xl border border-primary/40 bg-primary/10 p-5">
            <p className="mono-label text-primary">Summary</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{lesson.summary}</p>
          </div>
          {isSip ? <SipContent /> : <GenericContent lesson={lesson} />}
        </div>
      </div>
    </div>
  );
}
