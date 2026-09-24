import { createFileRoute } from "@tanstack/react-router";
import {
  Disclaimer,
  PageHero,
  Panel,
  Section,
  SectionHeading,
} from "@/components/site/primitives";
import { SipCalculator } from "@/components/site/Calculators";

export const Route = createFileRoute("/mutual-funds")({
  head: () => ({
    meta: [
      { title: "SIP & Mutual Funds — CapitalScale" },
      {
        name: "description",
        content:
          "Understand SIPs, equity, debt, hybrid and index funds, expense ratios, diversification and compounding — with an illustrative SIP calculator in rupees.",
      },
      { property: "og:title", content: "SIP & Mutual Funds explained" },
      {
        property: "og:description",
        content: "Fund types, costs, risk levels and an illustrative SIP calculator.",
      },
      { property: "og:url", content: "/mutual-funds" },
    ],
    links: [{ rel: "canonical", href: "/mutual-funds" }],
  }),
  component: MutualFunds,
});

const fundTypes = [
  {
    title: "Equity funds",
    risk: "Higher risk",
    text: "Invest mainly in company shares. Historically higher long-term growth potential with large short-term swings.",
  },
  {
    title: "Debt funds",
    risk: "Lower to moderate risk",
    text: "Invest in bonds and money-market instruments. Steadier, but exposed to interest-rate and credit risk.",
  },
  {
    title: "Hybrid funds",
    risk: "Moderate risk",
    text: "Blend equity and debt in one scheme, aiming to smooth the ride for investors who dislike volatility.",
  },
  {
    title: "Index funds",
    risk: "Market risk, low cost",
    text: "Track an index rather than picking stocks. Typically the lowest expense ratios in their category.",
  },
] as const;

const concepts = [
  {
    title: "Expense ratio",
    text: "The annual percentage a fund charges for managing your money. It is deducted from returns quietly — a 1% difference compounds into a large gap over decades.",
  },
  {
    title: "Risk level",
    text: "Every scheme publishes a riskometer and scheme documents. Higher expected return always travels with higher potential loss; there is no exception to this.",
  },
  {
    title: "Diversification",
    text: "Spreading money across companies, sectors and asset classes so that one bad outcome cannot sink the whole plan.",
  },
  {
    title: "Compounding",
    text: "Returns earning further returns. It needs two ingredients most people underestimate: consistency and time.",
  },
] as const;

function MutualFunds() {
  return (
    <>
      <PageHero
        eyebrow="Mutual funds & SIPs"
        title="Understand mutual funds from first principles"
        description="Look beyond past returns to evaluate fund structures, management fees, and risk exposure before committing your monthly capital."
      />

      <Section>
        <SipCalculator withChart />
      </Section>

      <Section muted>
        <SectionHeading
          eyebrow="Fund types"
          title="Four categories worth knowing"
          description="Most beginner confusion disappears once these four buckets are clear."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {fundTypes.map((f) => (
            <Panel key={f.title} className="h-full bg-background/60">
              <span className="mono-label rounded-full border border-border px-3 py-1 text-primary">
                {f.risk}
              </span>
              <h3 className="mt-5 text-xl">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Core concepts" title="The four ideas that decide outcomes" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {concepts.map((c) => (
            <Panel key={c.title} className="h-full">
              <h3 className="text-2xl">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
            </Panel>
          ))}
        </div>
        <Disclaimer className="mt-10">
          Calculator results and examples on this page are estimates generated from an assumed
          constant rate. They are not guaranteed returns and not a recommendation to invest in any
          scheme. Mutual fund investments are subject to market risks; read all scheme-related
          documents carefully.
        </Disclaimer>
      </Section>
    </>
  );
}
