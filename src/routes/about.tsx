import { createFileRoute } from "@tanstack/react-router";
import {
  Disclaimer,
  PageHero,
  Panel,
  Section,
  SectionHeading,
} from "@/components/site/primitives";
import { Compass, Scale, ShieldCheck, Hourglass } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CapitalScale — Our mission and values" },
      {
        name: "description",
        content:
          "CapitalScale exists to make financial learning simple, accessible and practical. Meet the mission, values and vision behind the platform.",
      },
      { property: "og:title", content: "About CapitalScale" },
      {
        property: "og:description",
        content: "Making financial learning simple, accessible and practical.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const values = [
  {
    icon: Compass,
    title: "Clarity",
    text: "Plain language over jargon. If a concept needs three acronyms to explain, we rewrite it.",
  },
  {
    icon: Scale,
    title: "Discipline",
    text: "Process beats prediction. We teach habits and frameworks, never hot tips.",
  },
  {
    icon: ShieldCheck,
    title: "Transparency",
    text: "Assumptions are always visible. Every figure we publish is labelled as illustrative.",
  },
  {
    icon: Hourglass,
    title: "Long-term thinking",
    text: "We optimise for decades of compounding, not the next quarter's momentum.",
  },
] as const;

const timeline = [
  { year: "Year 1", title: "The idea", text: "Started as a set of shared notes explaining SIPs to friends starting their first jobs." },
  { year: "Year 2", title: "Structured tracks", text: "Notes became beginner-to-advanced learning paths across four investment areas." },
  { year: "Year 3", title: "Tools for planning", text: "Added illustrative calculators and a budget planner to turn concepts into numbers." },
  { year: "Ahead", title: "Deeper literacy", text: "Expanding into taxation basics, insurance literacy and regional-language explainers." },
] as const;

function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="First-principles framework for money"
        description="CapitalScale is an independent website for general financial education and information. We explain how investing works, what can go wrong, and how to think about money over decades — never what to buy."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Mission"
            title="Make financial learning simple, accessible and practical"
            description="Most beginners meet finance through sales pitches. We wanted the opposite: a calm, structured place where concepts are explained once, properly, with the risks stated as clearly as the upside."
          />
          <Panel interactive={false} className="text-sm leading-relaxed text-muted-foreground">
            <p>
              All of the content we publish is intended for non-financial readers. Every worked
              example uses Indian rupees and realistic middle-income figures; lessons are organized
              chronologically; and words are defined the first time they appear.
            </p>
            <p className="mt-4">
              We don't publish real-time market calls, take commissions for suggestions, or sell
              financial products. Unless a service is specifically authorized to do so, CapitalScale
              offers general education rather than individualized investment, financial, tax, or
              legal advice. This keeps the incentive straightforward: educate effectively.
            </p>
          </Panel>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Values" title="Four principles we edit against" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }) => (
            <Panel key={title} className="h-full bg-background/60">
              <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="mt-5 text-xl">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Vision" title="Where CapitalScale is heading" />
        <ol className="mt-12 space-y-0 border-l border-border pl-6">
          {timeline.map((t) => (
            <li key={t.year} className="relative pb-10 last:pb-0">
              <span
                className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full border border-primary bg-background"
                aria-hidden="true"
              />
              <p className="mono-label text-primary">{t.year}</p>
              <h3 className="mt-2 text-2xl">{t.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {t.text}
              </p>
            </li>
          ))}
        </ol>
        <Disclaimer className="mt-10" />
      </Section>
    </>
  );
}
