import { createFileRoute } from "@tanstack/react-router";
import {
  Disclaimer,
  PageHero,
  Panel,
  Section,
  SectionHeading,
} from "@/components/site/primitives";
import { inr } from "@/lib/finance";
import realEstateImage from "@/assets/real-estate.jpg";
import { Check } from "lucide-react";

export const Route = createFileRoute("/real-estate")({
  head: () => ({
    meta: [
      { title: "Real Estate Investing Basics — CapitalScale" },
      {
        name: "description",
        content:
          "Learn residential, commercial and REIT investing, rental yield, property research, down payment planning and the risks — with illustrative rupee examples.",
      },
      { property: "og:title", content: "Real Estate Investing Basics" },
      {
        property: "og:description",
        content: "Rental yield, REITs, research checklists and rent-vs-buy, explained simply.",
      },
      { property: "og:url", content: "/real-estate" },
    ],
    links: [{ rel: "canonical", href: "/real-estate" }],
  }),
  component: RealEstate,
});

const types = [
  {
    title: "Residential",
    text: "Apartments and independent homes. Easier to understand and finance, but yields are usually modest and liquidity is slow.",
  },
  {
    title: "Commercial",
    text: "Offices, retail and warehousing. Longer leases and higher yields, with larger ticket sizes and tenant-concentration risk.",
  },
  {
    title: "REITs",
    text: "Listed trusts that own income-generating property. Bought like units on an exchange, so entry sizes are small and exit is quicker.",
  },
  {
    title: "Land & plots",
    text: "No rental income and high title-verification risk. Returns depend entirely on future development and demand.",
  },
] as const;

const research = [
  "Verify title documents, encumbrance certificate and approvals",
  "Check builder track record and project completion history",
  "Study locality demand: employment hubs, transport, schools",
  "Compare per-square-foot rates against recent registered sales",
  "Estimate all-in cost: stamp duty, registration, GST, brokerage, interior",
  "Model vacancy and maintenance before assuming rental income",
];

const risks = [
  "Illiquidity — selling can take months, sometimes longer",
  "Concentration — one asset can dominate your net worth",
  "Leverage — an EMI continues even if the property sits vacant",
  "Regulatory and approval delays in under-construction projects",
  "Maintenance, society dues and tenant turnover costs",
];

const rentBuy = [
  { label: "Upfront cash needed", rent: "Deposit ≈ " + inr(200000), buy: "Down payment ≈ " + inr(2000000) },
  { label: "Monthly outflow", rent: inr(30000) + " rent", buy: inr(62000) + " EMI + " + inr(4000) + " upkeep" },
  { label: "Flexibility", rent: "Move with ~1 month notice", buy: "Exit takes months" },
  { label: "Equity built", rent: "None", buy: "Grows as principal is repaid" },
  { label: "Main risk", rent: "Rent inflation", buy: "Price stagnation with high interest cost" },
];

function RealEstate() {
  return (
    <>
      <PageHero
        eyebrow="Real estate"
        title="Analyze the true cost of real estate"
        description="Before investing money, look beyond listed pricing to assess long-term liquidity, hidden maintenance expenses, and genuine rental rates."
        image={realEstateImage}
      />

      <Section>
        <SectionHeading eyebrow="Asset types" title="Four ways people invest in property" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {types.map((t) => (
            <Panel key={t.title} className="h-full">
              <h3 className="text-xl">{t.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section muted>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Rental yield"
              title="Calculate what you actually take home"
              description="Rental income looks higher on paper. Subtract maintenance, property taxes, and idle months to measure true net returns."
            />
            <Disclaimer className="mt-8">
              All figures below are illustrative examples chosen for teaching. They are not market
              data, valuations, or a forecast of any specific property.
            </Disclaimer>
          </div>
          <Panel interactive={false} className="bg-background/60">
            <p className="mono-label text-primary">Worked example</p>
            <dl className="mt-6 space-y-4 text-sm">
              {[
                ["Property cost (illustrative)", inr(8000000)],
                ["Monthly rent (illustrative)", inr(22000)],
                ["Annual rent", inr(264000)],
                ["Gross yield", "3.3%"],
                ["Annual costs (maintenance, tax, vacancy)", inr(70000)],
                ["Net yield", "2.4%"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-border pb-3">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-mono">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Gross yield = annual rent ÷ property cost. Net yield subtracts running costs first.
              Any expected price appreciation is separate — and never guaranteed.
            </p>
          </Panel>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Rent vs buy"
          title="A side-by-side comparison"
          description="Same household, two choices. Numbers are illustrative examples only and will differ by city, loan terms and lifestyle."
        />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
            <caption className="sr-only">Illustrative rent versus buy comparison</caption>
            <thead>
              <tr className="bg-surface">
                <th scope="col" className="mono-label p-4 text-muted-foreground">Factor</th>
                <th scope="col" className="mono-label p-4 text-muted-foreground">Renting</th>
                <th scope="col" className="mono-label p-4 text-muted-foreground">Buying</th>
              </tr>
            </thead>
            <tbody>
              {rentBuy.map((r) => (
                <tr key={r.label} className="border-t border-border">
                  <th scope="row" className="p-4 font-normal text-foreground">{r.label}</th>
                  <td className="p-4 text-muted-foreground">{r.rent}</td>
                  <td className="p-4 text-muted-foreground">{r.buy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Disclaimer className="mt-8" />
      </Section>

      <Section muted>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Beginner checklist" title="Before you sign anything" />
            <ul className="mt-8 space-y-3">
              {research.map((r) => (
                <li key={r} className="flex gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Down payment planning" title="Fund the gap, not just the EMI" />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Lenders typically finance a portion of the property value, so buyers plan for a down
              payment plus registration and interior costs. A common approach is to save that lump
              sum in low-volatility instruments over a defined horizon, because the money is needed
              on a fixed date.
            </p>
            <h3 className="mt-10 text-2xl">Risks to weigh</h3>
            <ul className="mt-5 space-y-3">
              {risks.map((r) => (
                <li key={r} className="text-sm text-muted-foreground">
                  <span className="mr-2 text-primary" aria-hidden="true">·</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Disclaimer className="mt-12" />
      </Section>
    </>
  );
}
