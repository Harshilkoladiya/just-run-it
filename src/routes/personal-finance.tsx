import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Disclaimer,
  PageHero,
  Panel,
  Section,
  SectionHeading,
} from "@/components/site/primitives";
import { inr } from "@/lib/finance";
import { Wallet, ShieldCheck, CreditCard, Receipt, Target, PiggyBank } from "lucide-react";

export const Route = createFileRoute("/personal-finance")({
  head: () => ({
    meta: [
      { title: "Personal Finance Basics — CapitalScale" },
      {
        name: "description",
        content:
          "Budgeting, emergency funds, debt management, insurance basics, tax planning and goal setting — plus an interactive monthly budget planner in rupees.",
      },
      { property: "og:title", content: "Personal Finance Basics" },
      {
        property: "og:description",
        content: "Budgeting, emergency funds, debt, insurance and goals — explained simply.",
      },
      { property: "og:url", content: "/personal-finance" },
    ],
    links: [{ rel: "canonical", href: "/personal-finance" }],
  }),
  component: PersonalFinance,
});

const pillars = [
  { icon: Wallet, title: "Budgeting", text: "Give every rupee a job before the month starts. A simple needs / wants / savings split is enough to begin." },
  { icon: PiggyBank, title: "Emergency fund", text: "Three to six months of essential expenses in a liquid, boring account you can reach the same day." },
  { icon: CreditCard, title: "Debt management", text: "Clear high-interest borrowing first. Understand the real cost of EMIs, revolving credit and minimum payments." },
  { icon: ShieldCheck, title: "Insurance basics", text: "Term life and health cover protect the plan itself. Insurance is protection, not an investment product." },
  { icon: Receipt, title: "Tax planning", text: "Know your regime, deductions and filing deadlines so tax is a calendar task, not an annual panic." },
  { icon: Target, title: "Goal setting", text: "Attach an amount and a date to every goal. That converts vague ambition into a monthly number." },
] as const;

function PersonalFinance() {
  return (
    <>
      <PageHero
        eyebrow="Personal finance"
        title="Secure the baseline before taking market risk"
        description="Capital growth requires a dependable financial cushion. Master foundational money management habits to protect your long-term strategy from short-term shocks."
      />

      <Section>
        <SectionHeading eyebrow="The six pillars" title="What to build, in order" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }) => (
            <Panel key={title} className="h-full">
              <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="mt-5 text-xl">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading
          eyebrow="Interactive tool"
          title="Monthly budget planner"
          description="Enter your own numbers to see what is left over each month. Nothing is stored or sent anywhere — this runs entirely in your browser."
        />
        <div className="mt-12">
          <BudgetPlanner />
        </div>
      </Section>
    </>
  );
}

const defaultExpenses = [
  { id: "housing", label: "Rent / EMI", value: 22000 },
  { id: "utilities", label: "Utilities & bills", value: 4000 },
  { id: "food", label: "Food & groceries", value: 9000 },
  { id: "transport", label: "Transport", value: 3500 },
  { id: "insurance", label: "Insurance premiums", value: 2500 },
  { id: "lifestyle", label: "Lifestyle & subscriptions", value: 5000 },
  { id: "debt", label: "Other loan repayments", value: 0 },
];

function BudgetPlanner() {
  const [income, setIncome] = useState(70000);
  const [savingsTarget, setSavingsTarget] = useState(10000);
  const [expenses, setExpenses] = useState(defaultExpenses);

  const totalExpenses = useMemo(
    () => expenses.reduce((sum, e) => sum + (Number.isFinite(e.value) ? e.value : 0), 0),
    [expenses],
  );
  const leftover = income - totalExpenses - savingsTarget;
  const savingsRate = income > 0 ? (savingsTarget / income) * 100 : 0;

  const update = (id: string, value: number) =>
    setExpenses((prev) => prev.map((e) => (e.id === id ? { ...e, value } : e)));

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <div className="rounded-2xl border border-border bg-background/60 p-6 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <NumberField
            id="bp-income"
            label="Monthly take-home income"
            value={income}
            onChange={setIncome}
          />
          <NumberField
            id="bp-savings"
            label="Planned monthly savings / SIP"
            value={savingsTarget}
            onChange={setSavingsTarget}
          />
        </div>

        <h3 className="mono-label mt-10 text-muted-foreground">Monthly expenses</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {expenses.map((e) => (
            <NumberField
              key={e.id}
              id={`bp-${e.id}`}
              label={e.label}
              value={e.value}
              onChange={(v) => update(e.id, v)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Panel interactive={false} className="bg-background/60">
          <dl className="space-y-4 text-sm">
            <Row label="Income" value={inr(income)} />
            <Row label="Total expenses" value={inr(totalExpenses)} />
            <Row label="Planned savings" value={inr(savingsTarget)} />
            <div className="flex justify-between gap-4 border-t border-border pt-4">
              <dt className="mono-label text-muted-foreground">Left unallocated</dt>
              <dd className={leftover < 0 ? "text-xl text-destructive" : "text-xl text-primary"}>
                {inr(leftover)}
              </dd>
            </div>
          </dl>
          <div className="mt-6">
            <div className="flex items-baseline justify-between">
              <p className="mono-label text-muted-foreground">Savings rate</p>
              <p className="font-mono text-sm">{savingsRate.toFixed(1)}%</p>
            </div>
            <div
              className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-2"
              role="progressbar"
              aria-valuenow={Math.round(savingsRate)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Savings rate"
            >
              <div
                className="h-full gradient-accent"
                style={{ width: `${Math.min(100, Math.max(0, savingsRate))}%` }}
              />
            </div>
          </div>
          {leftover < 0 ? (
            <p className="mt-6 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-xs leading-relaxed text-foreground">
              Your expenses plus savings target exceed your income. Reduce a category or lower the
              savings target until this balances.
            </p>
          ) : null}
        </Panel>
        <Disclaimer>
          This planner is an educational budgeting exercise. It does not account for taxes,
          irregular expenses or inflation, and it is not personalised financial advice.
        </Disclaimer>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-mono">{value}</dd>
    </div>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={0}
        step={500}
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
        className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
      />
    </div>
  );
}
