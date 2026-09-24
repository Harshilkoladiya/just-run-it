import { useMemo, useState, type ComponentType, type ReactNode } from "react";
import {
  Calculator,
  DollarSign,
  Percent,
  PieChart,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Disclaimer, Section, SectionHeading } from "./primitives";
import { inr } from "@/lib/finance";
import {
  calculateBrokerage,
  calculateCagr,
  calculateEmi,
  calculateIncomeTax,
  calculateMargin,
  calculatePositionSize,
} from "@/lib/advanced-finance";
import { cn } from "@/lib/utils";

type ToolKey = "emi" | "tax" | "brokerage" | "margin" | "cagr" | "position";
type IconType = ComponentType<{ className?: string }>;

const tools: { key: ToolKey; label: string; icon: IconType }[] = [
  { key: "emi", label: "EMI / Loan", icon: Calculator },
  { key: "tax", label: "Income Tax", icon: Percent },
  { key: "brokerage", label: "Brokerage", icon: TrendingUp },
  { key: "margin", label: "Margin", icon: ShieldAlert },
  { key: "cagr", label: "CAGR", icon: DollarSign },
  { key: "position", label: "Position Size", icon: PieChart },
];

function valid(...values: number[]) {
  return values.every((value) => Number.isFinite(value) && value > 0);
}

function money(value: number | undefined) {
  return value !== undefined && Number.isFinite(value) ? inr(value, 2) : "—";
}

function percent(value: number | undefined, digits = 2) {
  return value !== undefined && Number.isFinite(value) ? `${value.toFixed(digits)}%` : "—";
}

function NumberInput({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
  error,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  suffix?: string | undefined;
  error?: string | undefined;
}) {
  const sliderValue = Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm text-muted-foreground">{label}</label>
        <span className="font-mono text-sm">{Number.isFinite(value) ? `${value.toLocaleString("en-IN")}${suffix ?? ""}` : "—"}</span>
      </div>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        value={Number.isFinite(value) ? value : ""}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(event.target.value === "" ? Number.NaN : Number(event.target.value))}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
      />
      <input
        type="range"
        aria-label={`${label} slider`}
        value={sliderValue}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 w-full accent-primary"
      />
      {error ? <p id={`${id}-error`} className="mt-2 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function SelectInput({ id, label, value, onChange, children }: { id: string; label: string; value: string; onChange: (value: string) => void; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm text-muted-foreground">{label}</label>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary">
        {children}
      </select>
    </div>
  );
}

function Results({ items }: { items: { label: string; value: string; accent?: boolean }[] }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className={cn("rounded-xl border p-4", item.accent ? "border-primary/50 bg-primary/10" : "border-border bg-surface")}>
          <dt className="mono-label text-muted-foreground">{item.label}</dt>
          <dd className="mt-2 break-words text-xl sm:text-2xl">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ToolShell({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-background/60 p-5 sm:p-8">
      <h3 className="text-2xl">{title}</h3>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{description}</p>
      <div className="mt-7 space-y-7">{children}</div>
    </div>
  );
}

function EmiCalculator() {
  const [principal, setPrincipal] = useState(25_00_000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [unit, setUnit] = useState<"years" | "months">("years");
  const months = unit === "years" ? tenure * 12 : tenure;
  const isValid = valid(principal, months) && Number.isFinite(rate) && rate >= 0 && rate <= 30;
  const result = useMemo(() => isValid ? calculateEmi(principal, rate, months) : undefined, [isValid, months, principal, rate]);
  const principalShare = result ? principal / result.totalPayment * 100 : 0;
  return (
    <ToolShell title="EMI / Loan Calculator" description="Estimate an equal monthly instalment for a reducing-balance loan.">
      <div className="grid gap-6 md:grid-cols-3">
        <NumberInput id="emi-principal" label="Principal loan amount (₹)" value={principal} onChange={setPrincipal} min={10_000} max={5_00_00_000} step={10_000} error={!valid(principal) ? "Enter a loan amount greater than zero." : undefined} />
        <NumberInput id="emi-rate" label="Annual interest rate" value={rate} onChange={setRate} min={0} max={30} step={0.1} suffix="%" error={!Number.isFinite(rate) || rate < 0 || rate > 30 ? "Enter a rate from 0% to 30%." : undefined} />
        <div>
          <NumberInput id="emi-tenure" label={`Loan tenure (${unit})`} value={tenure} onChange={setTenure} min={1} max={unit === "years" ? 40 : 480} step={1} error={!valid(tenure) ? "Enter a valid loan tenure." : undefined} />
          <div className="mt-3 flex gap-2" role="group" aria-label="Loan tenure unit">
            {(["years", "months"] as const).map((option) => <Button key={option} type="button" size="sm" variant={unit === option ? "default" : "outline"} onClick={() => { setUnit(option); setTenure(option === "years" ? Math.max(1, Math.round(months / 12)) : months); }} className="flex-1 capitalize">{option}</Button>)}
          </div>
        </div>
      </div>
      <Results items={[{ label: "Monthly EMI", value: money(result?.emi), accent: true }, { label: "Total interest", value: money(result?.totalInterest) }, { label: "Total payment", value: money(result?.totalPayment) }]} />
      <div>
        <div className="mb-2 flex justify-between gap-4 text-xs text-muted-foreground"><span>Principal {principalShare.toFixed(1)}%</span><span>Interest {(100 - principalShare).toFixed(1)}%</span></div>
        <div className="flex h-3 overflow-hidden rounded-full bg-surface-2" role="img" aria-label="Principal and interest share of total repayment">
          <span className="bg-primary" style={{ width: `${principalShare}%` }} />
          <span className="bg-chart-2" style={{ width: `${100 - principalShare}%` }} />
        </div>
      </div>
      <Disclaimer>Illustrative reducing-balance estimate only. Lender fees, changing rates, insurance, taxes, and repayment timing can alter the actual EMI.</Disclaimer>
    </ToolShell>
  );
}

function TaxCalculator() {
  const [income, setIncome] = useState(12_00_000);
  const [deductions, setDeductions] = useState(1_50_000);
  const isValid = valid(income) && Number.isFinite(deductions) && deductions >= 0;
  const result = useMemo(() => isValid ? calculateIncomeTax(income, deductions) : undefined, [deductions, income, isValid]);
  return (
    <ToolShell title="Income Tax / Regime Calculator" description="Compare simplified Indian individual income-tax estimates for FY 2025–26 (AY 2026–27).">
      <div className="grid gap-6 md:grid-cols-2">
        <NumberInput id="tax-income" label="Annual gross income (₹)" value={income} onChange={setIncome} min={1_00_000} max={1_00_00_000} step={25_000} error={!valid(income) ? "Enter annual gross income." : undefined} />
        <NumberInput id="tax-deductions" label="Eligible old-regime deductions (₹)" value={deductions} onChange={setDeductions} min={0} max={1_50_000} step={5_000} error={!Number.isFinite(deductions) || deductions < 0 || deductions > 1_50_000 ? "Enter deductions from ₹0 to ₹1,50,000." : undefined} />
      </div>
      <Results items={[{ label: "Old regime tax", value: money(result?.oldTax) }, { label: "New regime tax", value: money(result?.newTax) }, { label: "Recommended regime", value: result?.recommended ?? "—", accent: true }, { label: "Estimated savings", value: money(result?.savings) }]} />
      <p className="text-xs leading-relaxed text-muted-foreground">Includes old-regime ₹50,000 and new-regime ₹75,000 standard deductions, Section 87A rebate where applicable, and 4% cess. Old-regime deductions entered here are capped at ₹1,50,000. Surcharge and special-rate income are excluded.</p>
      <Disclaimer>This is a simplified educational estimate, not tax advice. Eligibility for deductions, rebates, cess, surcharge, and special tax rates depends on your circumstances. Verify with a qualified tax professional.</Disclaimer>
    </ToolShell>
  );
}

function BrokerageCalculator() {
  const [buy, setBuy] = useState(500);
  const [sell, setSell] = useState(540);
  const [quantity, setQuantity] = useState(100);
  const [type, setType] = useState<"intraday" | "delivery">("delivery");
  const isValid = valid(buy, sell, quantity);
  const result = useMemo(() => isValid ? calculateBrokerage(buy, sell, Math.floor(quantity), type) : undefined, [buy, isValid, quantity, sell, type]);
  return (
    <ToolShell title="Brokerage & Transaction Cost Calculator" description="Estimate Indian equity trade charges and see the effect of fees on profit or loss.">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <NumberInput id="broker-buy" label="Buy price (₹)" value={buy} onChange={setBuy} min={1} max={1_00_000} step={1} />
        <NumberInput id="broker-sell" label="Sell price (₹)" value={sell} onChange={setSell} min={1} max={1_00_000} step={1} />
        <NumberInput id="broker-quantity" label="Number of shares" value={quantity} onChange={setQuantity} min={1} max={1_00_000} step={1} error={!valid(quantity) ? "Enter at least one share." : undefined} />
        <SelectInput id="broker-type" label="Transaction type" value={type} onChange={(value) => setType(value as "intraday" | "delivery")}><option value="intraday">Intraday</option><option value="delivery">Delivery</option></SelectInput>
      </div>
      <Results items={[{ label: "Gross profit / loss", value: money(result?.grossProfit) }, { label: "Total charges", value: money(result?.totalCharges) }, { label: "Net profit / loss", value: money(result?.netProfit), accent: true }]} />
      <dl className="grid gap-x-8 gap-y-3 border-y border-border py-5 text-sm sm:grid-cols-2 lg:grid-cols-5">
        {[['Brokerage', result?.brokerage], ['STT', result?.stt], ['Exchange + SEBI', result?.exchangeFees], ['GST', result?.gst], ['Stamp duty', result?.stampDuty]].map(([label, value]) => <div key={String(label)} className="flex justify-between gap-3"><dt className="text-muted-foreground">{label}</dt><dd className="font-mono">{money(value as number | undefined)}</dd></div>)}
      </dl>
      <Disclaimer>Illustrative charges use a common discount-broker model and current indicative statutory rates. Actual brokerage, exchange rates, taxes, rounding, and regulatory charges vary by broker and trade date.</Disclaimer>
    </ToolShell>
  );
}

function MarginCalculator() {
  const [balance, setBalance] = useState(1_00_000);
  const [price, setPrice] = useState(500);
  const [shares, setShares] = useState(500);
  const [leverage, setLeverage] = useState(5);
  const isValid = valid(balance, price, shares, leverage) && leverage >= 1;
  const result = useMemo(() => isValid ? calculateMargin(balance, price, Math.floor(shares), leverage) : undefined, [balance, isValid, leverage, price, shares]);
  return (
    <ToolShell title="Margin / Leverage Calculator" description="Model the cash and borrowed funds behind a leveraged stock position.">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <NumberInput id="margin-balance" label="Current account balance (₹)" value={balance} onChange={setBalance} min={1_000} max={1_00_00_000} step={1_000} />
        <NumberInput id="margin-price" label="Stock purchase price (₹)" value={price} onChange={setPrice} min={1} max={1_00_000} step={1} />
        <NumberInput id="margin-shares" label="Number of shares" value={shares} onChange={setShares} min={1} max={1_00_000} step={1} />
        <NumberInput id="margin-leverage" label="Provided leverage" value={leverage} onChange={setLeverage} min={1} max={20} step={1} suffix="x" error={!Number.isFinite(leverage) || leverage < 1 ? "Leverage must be at least 1x." : undefined} />
      </div>
      <Results items={[{ label: "Position value", value: money(result?.positionValue) }, { label: "Required margin", value: money(result?.requiredMargin), accent: true }, { label: "Borrowed funds", value: money(result?.borrowedFunds) }, { label: "Adverse-move threshold", value: result ? `≈ ${percent(result.adverseMovePercent, 1)}` : "—" }]} />
      {result ? <div className={cn("flex gap-3 rounded-xl border p-4 text-sm", result.exceedsBalance ? "border-destructive/50 bg-destructive/10" : "border-primary/40 bg-primary/10")}><ShieldAlert className={cn("mt-0.5 h-5 w-5 shrink-0", result.exceedsBalance ? "text-destructive" : "text-primary")} aria-hidden="true" /><p>{result.exceedsBalance ? `Required margin exceeds your balance by ${money(result.requiredMargin - balance)}.` : `This margin fits within the entered balance, leaving ${money(balance - result.requiredMargin)} available.`} A move of roughly {percent(result.adverseMovePercent, 1)} against the position could consume the initial margin before broker maintenance rules.</p></div> : null}
      <Disclaimer>This is not a broker liquidation price. Brokers apply maintenance margin, mark-to-market, fees, slippage, and product-specific rules. Leverage can magnify losses beyond your deposited margin.</Disclaimer>
    </ToolShell>
  );
}

function CagrCalculator() {
  const [initial, setInitial] = useState(1_00_000);
  const [finalValue, setFinalValue] = useState(2_00_000);
  const [years, setYears] = useState(5);
  const isValid = valid(initial, finalValue, years);
  const result = useMemo(() => isValid ? calculateCagr(initial, finalValue, years) : undefined, [finalValue, initial, isValid, years]);
  return (
    <ToolShell title="CAGR / Stock Return Calculator" description="Measure annualized growth and the total change in an investment over time.">
      <div className="grid gap-6 md:grid-cols-3">
        <NumberInput id="cagr-initial" label="Initial investment (₹)" value={initial} onChange={setInitial} min={1} max={10_00_00_000} step={1_000} />
        <NumberInput id="cagr-final" label="Final investment value (₹)" value={finalValue} onChange={setFinalValue} min={1} max={10_00_00_000} step={1_000} />
        <NumberInput id="cagr-years" label="Time horizon (years)" value={years} onChange={setYears} min={0.25} max={50} step={0.25} error={!valid(years) ? "Time horizon must be greater than zero." : undefined} />
      </div>
      <Results items={[{ label: "CAGR", value: percent(result?.cagr), accent: true }, { label: "Total return", value: percent(result?.totalReturn) }, { label: "Absolute gain / loss", value: money(result?.absoluteGain) }]} />
      <Disclaimer>CAGR smooths the entire period into one annualized rate and does not show volatility, cash flows, taxes, fees, or investment risk. Past returns do not guarantee future performance.</Disclaimer>
    </ToolShell>
  );
}

function PositionCalculator() {
  const [capital, setCapital] = useState(5_00_000);
  const [risk, setRisk] = useState(1);
  const [entry, setEntry] = useState(500);
  const [stop, setStop] = useState(480);
  const [target, setTarget] = useState(550);
  const isValid = valid(capital, risk, entry, stop, target) && risk <= 100 && stop < entry && target > entry;
  const result = useMemo(() => isValid ? calculatePositionSize(capital, risk, entry, stop, target) : undefined, [capital, entry, isValid, risk, stop, target]);
  return (
    <ToolShell title="Position Size & Risk-Reward Calculator" description="Size a long trade using a defined portfolio-risk limit, stop-loss, and target.">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        <NumberInput id="position-capital" label="Portfolio capital (₹)" value={capital} onChange={setCapital} min={1_000} max={10_00_00_000} step={1_000} />
        <NumberInput id="position-risk" label="Maximum risk per trade" value={risk} onChange={setRisk} min={0.1} max={10} step={0.1} suffix="%" error={!Number.isFinite(risk) || risk <= 0 || risk > 10 ? "Use a risk level from 0.1% to 10%." : undefined} />
        <NumberInput id="position-entry" label="Entry price (₹)" value={entry} onChange={setEntry} min={1} max={1_00_000} step={1} />
        <NumberInput id="position-stop" label="Stop-loss price (₹)" value={stop} onChange={setStop} min={0.01} max={1_00_000} step={1} error={Number.isFinite(stop) && stop >= entry ? "For a long trade, stop-loss must be below entry." : undefined} />
        <NumberInput id="position-target" label="Take-profit price (₹)" value={target} onChange={setTarget} min={0.01} max={2_00_000} step={1} error={Number.isFinite(target) && target <= entry ? "For a long trade, target must be above entry." : undefined} />
      </div>
      <Results items={[{ label: "Maximum capital at risk", value: money(result?.maxRisk) }, { label: "Recommended shares", value: result ? result.shares.toLocaleString("en-IN") : "—", accent: true }, { label: "Risk-to-reward", value: result ? `1:${result.riskReward.toFixed(2)}` : "—" }, { label: "Target profit", value: money(result?.targetProfit) }]} />
      {result?.shares === 0 ? <p className="rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-sm">The portfolio and risk limit do not support one whole share at the entered stop distance.</p> : null}
      <Disclaimer>Educational sizing model for a long trade only. It assumes execution exactly at entry, stop, and target prices and excludes gaps, slippage, brokerage, taxes, and liquidity risk.</Disclaimer>
    </ToolShell>
  );
}

const toolViews: Record<ToolKey, () => ReactNode> = {
  emi: () => <EmiCalculator />,
  tax: () => <TaxCalculator />,
  brokerage: () => <BrokerageCalculator />,
  margin: () => <MarginCalculator />,
  cagr: () => <CagrCalculator />,
  position: () => <PositionCalculator />,
};

export function AdvancedCalculators() {
  const [active, setActive] = useState<ToolKey>("emi");
  const ActiveTool = toolViews[active];
  return (
    <Section muted>
      <SectionHeading eyebrow="Advanced calculators" title="Calculators built for critical decisions" description="Interactive models built to calculate debt, evaluate trading risk, and optimize investment strategies." />
      <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6" role="tablist" aria-label="Advanced financial calculators">
        {tools.map(({ key, label, icon: Icon }) => (
          <Button key={key} type="button" role="tab" aria-selected={active === key} variant={active === key ? "default" : "outline"} onClick={() => setActive(key)} className="h-auto min-h-20 whitespace-normal px-3 py-4 text-center">
            <span className="flex flex-col items-center gap-2"><Icon className="h-5 w-5" /><span>{label}</span></span>
          </Button>
        ))}
      </div>
      <div className="mt-4" role="tabpanel">{ActiveTool()}</div>
    </Section>
  );
}