import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHeading } from "@/components/site/primitives";
import {
  CompoundCalculator,
  EmergencyFundCalculator,
  LumpsumCalculator,
  SipCalculator,
} from "@/components/site/Calculators";
import { AdvancedCalculators } from "@/components/site/AdvancedCalculators";

export const Route = createFileRoute("/calculators")({
  head: () => ({
    meta: [
      { title: "Investment Calculators — CapitalScale" },
      {
        name: "description",
        content:
          "Free illustrative investment, loan, tax, brokerage, margin and trading-risk calculators in Indian rupees. Educational estimates only.",
      },
      { property: "og:title", content: "Financial & Investment Calculators — CapitalScale" },
      {
        property: "og:description",
        content: "Interactive calculators for SIPs, loans, taxes, brokerage, returns and trading risk in Indian rupees.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/calculators" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/calculators" }],
  }),
  component: Calculators,
});

function Calculators() {
  return (
    <>
      <PageHero
        eyebrow="Tools"
        title="See the math behind your wealth."
        description="Adjust timelines, rates, and contribution sizes in real time. Gain instant perspective on how small changes compound over the long run."
      />

      <Section>
        <SectionHeading
          eyebrow="Interactive calculators"
          title="Interactive tools built for clarity"
          description="Transparent, assumption-driven models designed to help you visualize growth—no live feeds or sales pitches."
        />
        <div className="mt-12 space-y-6">
          <SipCalculator withChart />
          <LumpsumCalculator />
          <CompoundCalculator />
          <EmergencyFundCalculator />
        </div>
      </Section>
      <AdvancedCalculators />
    </>
  );
}
