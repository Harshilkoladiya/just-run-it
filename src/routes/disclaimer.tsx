import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/primitives";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer & Privacy — CapitalScale" },
      {
        name: "description",
        content:
          "CapitalScale publishes educational content only. Read our risk disclaimer, no-advice policy and privacy practices.",
      },
      { property: "og:title", content: "Disclaimer & Privacy — CapitalScale" },
      {
        property: "og:description",
        content: "Educational purposes only. Risk disclaimer and privacy policy.",
      },
      { property: "og:url", content: "/disclaimer" },
    ],
    links: [{ rel: "canonical", href: "/disclaimer" }],
  }),
  component: DisclaimerPage,
});

const sections = [
  {
    heading: "What CapitalScale provides",
    body: [
      "CapitalScale is a financial education and information website. Its articles, lessons, checklists, charts, calculators and planners are intended to help readers understand money and investing concepts in a clear, practical way.",
      "The information is general in nature. It does not take account of your income, goals, risk tolerance, tax position, time horizon or other personal circumstances.",
    ],
  },
  {
    heading: "No personalised advice",
    body: [
      "CapitalScale does not provide personalised investment, financial, tax or legal advice through this website. Nothing here should be treated as a recommendation to buy, sell or hold a particular investment, mutual fund, security, property or other financial product.",
      "Unless a service is explicitly identified as authorised advice provided by an appropriately qualified professional, nothing on this website creates an adviser-client relationship. Consider speaking with a suitably qualified professional before acting on financial information.",
    ],
  },
  {
    heading: "Investment risk",
    body: [
      "Investments involve risk. The value of market-linked investments can go up or down, and you may lose some or all of the money you invest. Real estate can also fall in value and may be difficult to sell quickly.",
      "Past performance does not guarantee future results. Before investing in an Indian mutual fund or another financial product, read its current scheme information, offer documents and risk disclosures, and consider advice from a SEBI-registered investment adviser or another qualified professional.",
    ],
  },
  {
    heading: "Calculators and projections",
    body: [
      "Calculator results, projections, charts and worked examples use assumptions and are estimates for educational purposes only. They are not forecasts, promises or guaranteed returns.",
      "Actual results may differ substantially because returns, inflation, taxes, fees, timing, contributions and other conditions can change. Do not use calculator outputs alone to make a financial decision.",
    ],
  },
  {
    heading: "No real-time market data",
    body: [
      "CapitalScale does not publish live prices, NAVs or market commentary. Any numbers shown are static examples and should not be used as the basis for a transaction or investment decision.",
    ],
  },
  {
    heading: "Information and external sources",
    body: [
      "We aim to keep CapitalScale content clear and useful, but information may be incomplete, delayed or contain errors. Check official product documents and other reliable sources before making a decision.",
      "We may link to third-party websites for context. Their content, availability and privacy practices are outside CapitalScale's control.",
    ],
  },
  {
    heading: "Information you choose to share",
    body: [
      "Calculators and planners run in your browser; the values entered into those tools are not sent to CapitalScale by the tools themselves.",
      "If you use the Contact form, the information you submit may be processed by the form service configured for this website so that your message can be received and answered. Please do not include passwords, bank or account numbers, or other sensitive financial details.",
      "The newsletter signup currently provides a confirmation in the browser and is not connected to a newsletter delivery service.",
    ],
  },
  {
    heading: "Updates to this information",
    body: [
      "We may update this page when CapitalScale's content, tools or information practices change. The version shown here applies while it is published.",
    ],
  },
];

function DisclaimerPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Disclaimer & privacy."
        description="CapitalScale is an educational platform. This page sets out what that means, what we do not do, and how information you enter is handled."
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-12">
          {sections.map((s) => (
            <article key={s.heading}>
              <h2 className="text-2xl sm:text-3xl">{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p} className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
