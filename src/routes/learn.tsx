import { useCallback, useMemo, useState } from "react";
import { LessonModal } from "@/components/site/LessonModal";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import {
  Disclaimer,
  PageHero,
  Panel,
  Section,
  SectionHeading,
} from "@/components/site/primitives";
import learnImage from "@/assets/dashboard.jpg";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn — CapitalScale content hub" },
      {
        name: "description",
        content:
          "Browse beginner-to-advanced learning paths on SIPs, mutual funds, real estate, personal finance and risk. Free educational guides.",
      },
      { property: "og:title", content: "Learn — CapitalScale content hub" },
      {
        property: "og:description",
        content: "Beginner-to-advanced learning paths across investing and personal finance.",
      },
      { property: "og:url", content: "/learn" },
    ],
    links: [{ rel: "canonical", href: "/learn" }],
  }),
  component: LearnPage,
});

const categories = ["All", "Mutual Funds", "Real Estate", "Personal Finance", "Risk"] as const;
const levels = ["All levels", "Beginner", "Intermediate", "Advanced"] as const;

type Course = {
  title: string;
  category: (typeof categories)[number];
  level: (typeof levels)[number];
  minutes: number;
  summary: string;
};

const courses: Course[] = [
  {
    title: "SIP Basics",
    category: "Mutual Funds",
    level: "Beginner",
    minutes: 25,
    summary: "What a systematic investment plan is, how instalments are invested, and why consistency matters more than timing.",
  },
  {
    title: "How Mutual Funds Work",
    category: "Mutual Funds",
    level: "Beginner",
    minutes: 35,
    summary: "Pooled investing, NAV, fund houses, scheme documents and the role of the fund manager explained end to end.",
  },
  {
    title: "Real Estate Fundamentals",
    category: "Real Estate",
    level: "Beginner",
    minutes: 40,
    summary: "Residential vs commercial property, REITs, transaction costs and what actually drives long-term property value.",
  },
  {
    title: "Build an Emergency Fund",
    category: "Personal Finance",
    level: "Beginner",
    minutes: 15,
    summary: "Sizing a safety buffer, where to park it, and how to rebuild it after you use it.",
  },
  {
    title: "Understanding Risk",
    category: "Risk",
    level: "Intermediate",
    minutes: 30,
    summary: "Volatility, drawdowns, sequence risk and behaviour — the difference between risk and uncertainty.",
  },
  {
    title: "Index Funds & Diversification",
    category: "Mutual Funds",
    level: "Intermediate",
    minutes: 28,
    summary: "Why broad exposure beats concentration for most beginners, and how expense ratios compound against you.",
  },
  {
    title: "Rental Yield & Cash Flow",
    category: "Real Estate",
    level: "Intermediate",
    minutes: 32,
    summary: "Gross vs net yield, vacancy assumptions, maintenance and how to sanity-check a property's numbers.",
  },
  {
    title: "Debt Payoff Strategies",
    category: "Personal Finance",
    level: "Beginner",
    minutes: 20,
    summary: "Avalanche vs snowball, EMI restructuring basics, and when prepaying a loan makes sense.",
  },
  {
    title: "Asset Allocation Frameworks",
    category: "Risk",
    level: "Advanced",
    minutes: 45,
    summary: "Building a policy for equity, debt and cash weights — and rebalancing without emotion.",
  },
];

const paths = [
  {
    level: "Beginner",
    title: "Money foundations",
    text: "Budgeting → emergency fund → your first SIP. Roughly four weeks at two lessons a week.",
    items: ["Budgeting basics", "Emergency fund", "SIP Basics", "How Mutual Funds Work"],
  },
  {
    level: "Intermediate",
    title: "Building a portfolio",
    text: "Understand diversification, costs, and how property fits alongside market-linked investing.",
    items: ["Index Funds & Diversification", "Understanding Risk", "Rental Yield & Cash Flow"],
  },
  {
    level: "Advanced",
    title: "Long-horizon planning",
    text: "Policy-based allocation, tax-aware sequencing and goal mapping across decades.",
    items: ["Asset Allocation Frameworks", "Tax planning basics", "Goal-based investing"],
  },
] as const;

function LearnPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [level, setLevel] = useState<(typeof levels)[number]>("All levels");
  const [open, setOpen] = useState<Course | null>(null);
  const closeModal = useCallback(() => setOpen(null), []);

  const filtered = useMemo(
    () =>
      courses.filter(
        (c) =>
          (category === "All" || c.category === category) &&
          (level === "All levels" || c.level === level) &&
          (c.title + c.summary).toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query, category, level],
  );

  return (
    <>
      <PageHero
        eyebrow="Content hub"
        title="Learn investing, one clear lesson at a time."
        description="Free guides covering mutual funds, SIPs, real estate, personal finance and risk — sequenced from absolute beginner to advanced planning."
        image={learnImage}
      />

      <Section>
        <div className="rounded-2xl border border-border bg-surface/50 p-6">
          <label htmlFor="learn-search" className="mono-label text-muted-foreground">
            Search lessons
          </label>
          <div className="relative mt-3">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="learn-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try “SIP”, “risk”, “rental yield”…"
              className="w-full rounded-full border border-border bg-background py-3 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
                {c}
              </Chip>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {levels.map((l) => (
              <Chip key={l} active={level === l} onClick={() => setLevel(l)}>
                {l}
              </Chip>
            ))}
          </div>
        </div>

        <p className="mono-label mt-8 text-muted-foreground">
          {filtered.length} lesson{filtered.length === 1 ? "" : "s"}
        </p>

        {filtered.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-border p-12 text-center">
            <h3 className="text-xl">No lessons match those filters</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a broader keyword or reset the category and level filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
                setLevel("All levels");
              }}
              className="mono-label mt-6 rounded-full border border-border px-5 py-2.5 transition-colors hover:border-primary"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <button
                key={c.title}
                type="button"
                onClick={() => setOpen(c)}
                className="h-full text-left transition-transform hover:-translate-y-0.5"
              >
              <Panel className="flex h-full flex-col transition-colors hover:border-primary">
                <div className="flex items-center gap-2">
                  <span className="mono-label rounded-full border border-border px-3 py-1 text-muted-foreground">
                    {c.category}
                  </span>
                  <span className="mono-label text-primary">{c.level}</span>
                </div>
                <h3 className="mt-5 text-xl leading-snug">{c.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {c.summary}
                </p>
                <p className="mono-label mt-6 text-muted-foreground">{c.minutes} min</p>
              </Panel>
              </button>
            ))}
          </div>
        )}
      </Section>

      <Section muted>
        <SectionHeading
          eyebrow="Learning paths"
          title="Beginner to advanced, in order"
          description="Follow a path end to end instead of jumping between topics. Each path assumes only what came before it."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {paths.map((p) => (
            <Panel key={p.title} className="h-full bg-background/60">
              <p className="mono-label text-primary">{p.level}</p>
              <h3 className="mt-4 text-2xl">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              <ul className="mt-6 space-y-2 border-t border-border pt-5">
                {p.items.map((i) => (
                  <li key={i} className="text-sm text-muted-foreground">
                    <span className="mr-2 text-primary" aria-hidden="true">
                      ·
                    </span>
                    {i}
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/calculators"
            className="mono-label rounded-full bg-foreground px-6 py-3.5 text-background transition-opacity hover:opacity-85"
          >
            Try the calculators
          </Link>
          <Link
            to="/resources"
            className="mono-label rounded-full border border-border px-6 py-3.5 transition-colors hover:border-primary"
          >
            Read articles
          </Link>
        </div>
        <Disclaimer className="mt-10" />
      </Section>
      <LessonModal lesson={open} onClose={closeModal} />
    </>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "mono-label rounded-full border px-4 py-2 transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:border-primary hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
