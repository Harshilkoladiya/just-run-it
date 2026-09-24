import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Container,
  Disclaimer,
  Eyebrow,
  Panel,
  Section,
  SectionHeading,
  Stat,
} from "@/components/site/primitives";
import { GrowthChart } from "@/components/site/Calculators";
import { sipSeries } from "@/lib/finance";
import heroImage from "@/assets/hero-skyline.jpg";
import { Building2, LineChart, PiggyBank, Wallet, Compass, Calculator, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CapitalScale — Learn & Grow Your Wealth" },
      {
        name: "description",
        content:
          "Learn about investing, mutual funds, SIPs, real estate and personal finance with CapitalScale's practical educational resources and illustrative calculators.",
      },
      { property: "og:title", content: "CapitalScale — Learn & Grow Your Wealth" },
      {
        property: "og:description",
        content:
          "Learn about investing, mutual funds, SIPs, real estate and personal finance with CapitalScale's practical educational resources and illustrative calculators.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "CapitalScale — Learn & Grow Your Wealth" },
      {
        name: "twitter:description",
        content:
          "Learn about investing, mutual funds, SIPs, real estate and personal finance with CapitalScale's practical educational resources and illustrative calculators.",
      },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const categories = [
  {
    icon: LineChart,
    title: "Mutual Funds & SIPs",
    text: "A SIP is an automated repeating payment plan used to invest in a mutual fund over time, whereas a mutual fund is a managed pool of money invested in stocks or bonds.",
    to: "/mutual-funds",
  },
  {
    icon: Building2,
    title: "Real Estate",
    text: "Property bought with the intention of making money through consistent rental income, value growth, or tax benefits is known as investment real estate. Although it necessitates funding, market research, and continuous management, it offers a physical asset with significant wealth-building potential.",
    to: "/real-estate",
  },
  {
    icon: Wallet,
    title: "Personal Finance",
    text: "The process of managing your finances to become financially independent through investing, saving, budgeting, and insurance is known as personal finance. It gives you control over your everyday spending while protecting your long-term wealth against inflation and unforeseen circumstances.",
    to: "/personal-finance",
  },
  {
    icon: PiggyBank,
    title: "Digital Investing",
    text: "Building wealth through the use of automated software and internet-connected platforms to trade stocks, mutual funds, and digital assets is known as \"digital investing.\" With reduced costs, quick setup, and round-the-clock account management from your computer or phone, it gives you direct control over your investments.",
    to: "/learn",
  },
] as const;

const steps = [
  {
    icon: Compass,
    title: "Discover",
    text: "Uncover core financial principles through clear, jargon-free lessons—no prior experience required.",
  },
  {
    icon: Calculator,
    title: "Calculate",
    text: "Use interactive calculators to project growth, model SIP returns, and translate goals into actionable numbers.",
  },
  {
    icon: TrendingUp,
    title: "Build",
    text: "Put your strategy into motion, stay disciplined, and construct a resilient long-term investment portfolio.",
  },
] as const;

const articles = [
  {
    tag: "SIP",
    title: "Smart SIP strategies for long-term growth",
    excerpt:
      "Discover how automated compounding reduces market stress, smoothes out volatility over time, and builds long-term wealth effortlessly.",
    read: "6 min read",
  },
  {
    tag: "Real Estate",
    title: "What every buyer should know about rental yield",
    excerpt:
      "Learn how to evaluate property cash flows by factoring in hidden maintenance fees, vacancy periods, and tax implications.",
    read: "8 min read",
  },
  {
    tag: "Personal Finance",
    title: "Building your emergency fund from scratch",
    excerpt:
      "A practical blueprint to calculate essential living expenses, choose high-liquidity funds, and shield yourself against unexpected events.",
    read: "5 min read",
  },
] as const;

const testimonials = [
  {
    quote:
      "The lessons finally made SIPs click for me. No hype, no pressure—just clear principles and transparent risk breakdowns.",
    name: "Ananya R.",
    role: "Software Engineer, Pune",
  },
  {
    quote:
      "I used the calculator suite to structure my savings for the first time. It is refreshingly simple and completely free of sales pitches.",
    name: "Rahul M.",
    role: "Design Consultant, Bengaluru",
  },
  {
    quote:
      "The property framework saved me from making a hasty investment. It gave me the exact analytical questions I needed to evaluate returns.",
    name: "Sneha K.",
    role: "Marketing Associate, Mumbai",
  },
] as const;

const faqs = [
  {
    q: "Is CapitalScale a financial advisory service?",
    a: "No. CapitalScale is an independent financial education platform. We provide practical guides, analytical frameworks, and interactive calculators to build understanding—not personalized investment advice or specific stock recommendations.",
  },
  {
    q: "Do your calculators guarantee or predict exact market returns?",
    a: "No. Our calculators use mathematical formulas and user-input assumptions for illustrative modeling only. They are designed to help you project potential scenarios, not predict future market performance.",
  },
  {
    q: "Do I need an existing portfolio or capital to start learning?",
    a: "Not at all. CapitalScale is built from first principles. Whether you are building your very first savings fund or organizing an established portfolio, our resources cater to all experience levels.",
  },
  {
    q: "Do you track live stock market prices or execution services?",
    a: "No. We focus purely on foundational concepts, structural planning, and financial literacy. CapitalScale does not offer broker integrations, real-time trading feeds, or execution services.",
  },
] as const;

function Home() {
  const data = sipSeries(5000, 12, 10);

  return (
    <>
      <section className="relative overflow-hidden">
        <img
          src={heroImage}
          alt="Night skyline of a modern financial district"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/75 to-background" />
        <Container className="relative py-24 sm:py-36">
          <div className="reveal max-w-3xl">
            <Eyebrow>Financial learning hub</Eyebrow>
            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl">Build your financial future.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Everything you need to know about mutual funds, real estate, personal finance, and
              digital markets—demystified through calm, practical education.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/learn"
                className="mono-label rounded-full bg-foreground px-6 py-3.5 text-background transition-opacity hover:opacity-85"
              >
                Start exploring
              </Link>
              <Link
                to="/calculators"
                className="mono-label rounded-full border border-border px-6 py-3.5 text-foreground transition-colors hover:border-primary hover:bg-surface"
              >
                Calculate investment
              </Link>
            </div>
            <dl className="mt-14 grid max-w-2xl gap-4 sm:grid-cols-3">
              <Stat value="120+" label="Free lessons" />
              <Stat value="4" label="Illustrative calculators" />
              <Stat value="0" label="Product recommendations" />
            </dl>
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeading
          eyebrow="Where to start"
          title="Four Pillars of Financial Success"
          description="Select a topic to begin your journey. Each track breaks down complex concepts into simple steps."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ icon: Icon, ...c }) => (
            <Link key={c.title} to={c.to} className="group">
              <Panel className="h-full">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-2">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                <span className="mono-label mt-6 inline-block text-muted-foreground transition-colors group-hover:text-primary">
                  Explore →
                </span>
              </Panel>
            </Link>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading
          eyebrow="How CapitalScale works"
          title="Discover, calculate, build"
          description="A simple three-step blueprint for mastering concepts, modeling numbers, and growing wealth."
        />
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="rounded-2xl border border-border bg-background/60 p-6">
              <p className="mono-label text-primary">Step 0{i + 1}</p>
              <Icon className="mt-6 h-6 w-6 text-foreground" aria-hidden="true" />
              <h3 className="mt-4 text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Compounding, visualised"
              title="A ₹5,000 monthly SIP over 10 years"
              description="This chart assumes a constant 12% annual return purely to show the shape of compounding. It is an example, not a forecast — real returns move up and down."
            />
            <Disclaimer className="mt-8" />
          </div>
          <GrowthChart data={data} />
        </div>
      </Section>

      <Section muted>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Featured guides" title="Guides to Smart Investing" />
          <Link
            to="/resources"
            className="mono-label text-muted-foreground transition-colors hover:text-foreground"
          >
            All articles →
          </Link>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {articles.map((a) => (
            <Link key={a.title} to="/resources" className="group">
              <article className="flex h-full flex-col rounded-2xl border border-border bg-background/60 p-6 transition-colors hover:border-primary/50">
                <span className="mono-label w-fit rounded-full border border-border px-3 py-1 text-muted-foreground">
                  {a.tag}
                </span>
                <h3 className="mt-5 text-xl leading-snug">{a.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {a.excerpt}
                </p>
                <p className="mono-label mt-6 text-muted-foreground">{a.read}</p>
              </article>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Learner perspectives"
          title="Perspectives from our community"
          description="Practical experiences from professionals using CapitalScale to navigate their financial decisions."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-border bg-surface/50 p-6">
              <blockquote className="text-lg leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="text-sm text-foreground">{t.name}</p>
                <p className="mono-label mt-1 text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section muted>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="Frequently asked questions" title="Everything you need to know" />
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      <Section>
        <div className="aurora overflow-hidden rounded-3xl border border-border bg-surface/60 p-10 text-center sm:p-16">
          <h2 className="mx-auto max-w-2xl text-3xl sm:text-5xl">
            Start with one lesson today.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            No sign-up walls, no product pitches — just structured learning for people building
            long-term financial confidence.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              to="/learn"
              className="mono-label rounded-full bg-foreground px-6 py-3.5 text-background transition-opacity hover:opacity-85"
            >
              Start Learning
            </Link>
            <Link
              to="/contact"
              className="mono-label rounded-full border border-border px-6 py-3.5 transition-colors hover:border-primary"
            >
              Talk to us
            </Link>
          </div>
        </div>
        <Disclaimer className="mt-8" />
      </Section>
    </>
  );
}
