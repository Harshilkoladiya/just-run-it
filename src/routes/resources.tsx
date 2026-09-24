import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { PageHero, Panel, Section } from "@/components/site/primitives";
import dashboardImage from "@/assets/dashboard.jpg";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources & Blog — CapitalScale" },
      {
        name: "description",
        content:
          "Articles and guides on investing, SIPs, real estate, budgeting and financial literacy, with categories and search.",
      },
      { property: "og:title", content: "Resources & Blog — CapitalScale" },
      {
        property: "og:description",
        content: "Articles on investing, SIPs, real estate and financial literacy.",
      },
      { property: "og:url", content: "/resources" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: Resources,
});

const categories = ["All", "Investing", "Real Estate", "Budgeting", "Behaviour"] as const;

const posts = [
  {
    title: "Rupee cost averaging, without the jargon",
    category: "Investing",
    date: "12 Aug",
    read: "6 min",
    excerpt:
      "Buying the same amount every month means you buy more units when prices fall. Here is what that does — and does not — protect you from.",
  },
  {
    title: "Reading a scheme document in ten minutes",
    category: "Investing",
    date: "04 Aug",
    read: "9 min",
    excerpt:
      "Where to find the expense ratio, benchmark, exit load and riskometer, and which sections beginners can safely skim.",
  },
  {
    title: "The hidden costs of buying property",
    category: "Real Estate",
    date: "28 Jul",
    read: "7 min",
    excerpt:
      "Stamp duty, registration, brokerage, interiors and society dues can add meaningfully to the sticker price. An illustrative breakdown.",
  },
  {
    title: "A first budget that survives month two",
    category: "Budgeting",
    date: "19 Jul",
    read: "5 min",
    excerpt:
      "Most budgets fail because they ignore irregular expenses. Build a small annual buffer line and the plan stops collapsing.",
  },
  {
    title: "Why your brain sells at the bottom",
    category: "Behaviour",
    date: "08 Jul",
    read: "8 min",
    excerpt:
      "Loss aversion, recency bias and herd behaviour explain most investing mistakes better than any market model.",
  },
  {
    title: "REITs versus owning a shop",
    category: "Real Estate",
    date: "01 Jul",
    read: "10 min",
    excerpt:
      "Ticket size, liquidity, diversification and control — a structured comparison using illustrative figures.",
  },
];

const featured = {
  title: "The complete SIP setup framework",
  excerpt:
    "Master the mechanics of recurring investments. Learn how fund categories work, evaluate costs, and establish annual review routines built on clear assumptions.",
  category: "Investing",
  read: "14 min read",
};

function Resources() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(
    () =>
      posts.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          (p.title + p.excerpt).toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query, category],
  );

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Guides to Smart Investing"
        description="Comprehensive guides and short primers designed to build durable financial literacy—free from hype, market noise, or product pitches."
      />

      <Section>
        <article className="grid overflow-hidden rounded-3xl border border-border bg-surface/50 lg:grid-cols-2">
          <img
            src={dashboardImage}
            alt="Abstract chart illustration"
            loading="lazy"
            width={1440}
            height={960}
            className="h-64 w-full object-cover lg:h-full"
          />
          <div className="p-8 sm:p-12">
            <span className="mono-label rounded-full border border-border px-3 py-1 text-primary">
              Featured · {featured.category}
            </span>
            <h2 className="mt-6 text-3xl sm:text-4xl">{featured.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{featured.excerpt}</p>
            <p className="mono-label mt-8 text-muted-foreground">{featured.read}</p>
          </div>
        </article>
      </Section>

      <Section muted>
        <div className="rounded-2xl border border-border bg-background/60 p-6">
          <label htmlFor="post-search" className="mono-label text-muted-foreground">
            Search articles
          </label>
          <div className="relative mt-3">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="post-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by topic or keyword…"
              className="w-full rounded-full border border-border bg-surface py-3 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={cn(
                  "mono-label rounded-full border px-4 py-2 transition-colors",
                  category === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border p-12 text-center">
            <h3 className="text-xl">Nothing published here yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              No articles match that search. Try another keyword or browse all categories.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <Panel key={p.title} className="flex h-full flex-col bg-background/60">
                <div className="mono-label flex items-center justify-between text-muted-foreground">
                  <span className="text-primary">{p.category}</span>
                  <span>{p.date}</span>
                </div>
                <h3 className="mt-5 text-xl leading-snug">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.excerpt}
                </p>
                <p className="mono-label mt-6 text-muted-foreground">{p.read}</p>
              </Panel>
            ))}
          </div>
        )}
      </Section>

    </>
  );
}

