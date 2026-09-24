import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

export type LessonInfo = {
  title: string;
  category: string;
  level: string;
  minutes: number;
  summary: string;
};

const sipRows = [
  { month: "Jan", amount: 5000, nav: 50 },
  { month: "Feb", amount: 5000, nav: 40 },
  { month: "Mar", amount: 5000, nav: 25 },
  { month: "Apr", amount: 5000, nav: 40 },
  { month: "May", amount: 5000, nav: 50 },
];

const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 2 });

function H({ children }: { children: ReactNode }) {
  return <h3 className="mt-10 text-xl text-foreground">{children}</h3>;
}
function P({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</p>;
}

function SipContent() {
  const totals = sipRows.reduce(
    (a, r) => ({ amount: a.amount + r.amount, units: a.units + r.amount / r.nav }),
    { amount: 0, units: 0 },
  );
  const avgCost = totals.amount / totals.units;
  const avgNav = sipRows.reduce((a, r) => a + r.nav, 0) / sipRows.length;
  return (
    <>
      <H>What is a SIP?</H>
      <P>
        A Systematic Investment Plan invests a fixed amount into a mutual fund at regular
        intervals — usually monthly. Each instalment buys units at that day's NAV (Net Asset
        Value), so you accumulate units steadily regardless of market mood.
      </P>
      <H>The mechanics</H>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {[
          "You pick a scheme, an amount (often from ₹500) and a debit date.",
          "On each date, the amount is auto-debited from your bank account.",
          "Units allotted = instalment ÷ NAV on that day.",
          "Units accumulate; your value = total units × current NAV.",
        ].map((t) => (
          <li key={t}>
            <span className="mr-2 text-primary">·</span>
            {t}
          </li>
        ))}
      </ul>
      <H>Rupee-cost averaging</H>
      <P>
        Because the amount is fixed, you automatically buy more units when prices are low and
        fewer when prices are high. Over time, your average cost per unit tends to be lower than
        the simple average of the NAVs you bought at.
      </P>
      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface/70">
            <tr className="mono-label text-left text-muted-foreground">
              <th className="px-4 py-3">Month</th>
              <th className="px-4 py-3 text-right">Invested</th>
              <th className="px-4 py-3 text-right">NAV</th>
              <th className="px-4 py-3 text-right">Units bought</th>
            </tr>
          </thead>
          <tbody>
            {sipRows.map((r) => (
              <tr key={r.month} className="border-t border-border">
                <td className="px-4 py-3">{r.month}</td>
                <td className="px-4 py-3 text-right">{inr(r.amount)}</td>
                <td className="px-4 py-3 text-right">{inr(r.nav)}</td>
                <td className="px-4 py-3 text-right">{(r.amount / r.nav).toFixed(2)}</td>
              </tr>
            ))}
            <tr className="border-t border-border bg-surface/50 font-medium">
              <td className="px-4 py-3">Total</td>
              <td className="px-4 py-3 text-right">{inr(totals.amount)}</td>
              <td className="px-4 py-3 text-right">—</td>
              <td className="px-4 py-3 text-right text-primary">{totals.units.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <P>
        Average NAV: <span className="text-foreground">{inr(avgNav)}</span> · Your average cost
        per unit: <span className="text-primary">{inr(avgCost)}</span>. The dip in March let
        the same ₹5,000 buy twice as many units.
      </P>
      <H>Key takeaways</H>
      <P>
        Consistency matters more than timing. SIPs don't guarantee profits or protect against
        losses in falling markets, but they remove the pressure of picking the "right" moment.
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
