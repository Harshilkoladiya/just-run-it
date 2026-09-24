import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import {
  compactInr,
  compoundInterest,
  emergencyFund,
  inr,
  lumpsumFutureValue,
  sipFutureValue,
  sipSeries,
} from "@/lib/finance";
import {
  downloadCalculatorSummary,
  summaryFieldsAreValid,
  type SummaryField,
} from "@/lib/calculator-summary";
import logoAsset from "@/assets/logo.png.asset.json";
import { Disclaimer } from "./primitives";

function formatBound(value: number, suffix?: string) {
  return suffix === "₹" ? inr(value) : `${value}${suffix ?? ""}`;
}

function validationMessage(
  value: number,
  label: string,
  suffix: string | undefined,
  min: number,
  max: number,
) {
  if (!Number.isFinite(value)) return `Enter a valid ${label.toLowerCase()}.`;
  if (value < min) return `${label} must be at least ${formatBound(min, suffix)}.`;
  if (value > max) return `${label} must be no more than ${formatBound(max, suffix)}.`;
  return undefined;
}

function hasValidationErrors(errors: Record<string, string | undefined>) {
  return Object.values(errors).some(Boolean);
}

function hasFiniteValues(values: number[]) {
  return values.every(Number.isFinite);
}

function resultInr(value: number | undefined) {
  return value !== undefined && Number.isFinite(value) ? inr(value) : "—";
}

function resultPercent(value: number | undefined) {
  return value !== undefined && Number.isFinite(value) ? `${value.toFixed(0)}%` : "—";
}

type CalculatorKey = "sip" | "lumpsum" | "compound" | "emergency";

const CALCULATOR_NAMES: Record<CalculatorKey, string> = {
  sip: "SIP calculator",
  lumpsum: "Lumpsum calculator",
  compound: "Compound interest calculator",
  emergency: "Emergency fund calculator",
};

function readQueryNumber(
  params: URLSearchParams,
  key: string,
  min: number,
  max: number,
) {
  const raw = params.get(key);
  if (raw === null || raw.trim() === "") return null;
  const value = Number(raw);
  return Number.isFinite(value) && value >= min && value <= max ? value : null;
}

/** Builds a shareable URL for the current page containing only the calculator id and its numeric inputs. */
function buildCalculatorUrl(calculator: CalculatorKey, values: Record<string, number>) {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  const params = new URLSearchParams({ calc: calculator });
  for (const [key, value] of Object.entries(values)) {
    if (!Number.isFinite(value)) return null;
    params.set(key, String(value));
  }
  url.search = params.toString();
  return url.toString();
}

function Field({
  id,
  label,
  suffix,
  value,
  min,
  max,
  step,
  error,
  onChange,
}: {
  id: string;
  label: string;
  suffix?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  error?: string | undefined;
  onChange: (v: number) => void;
}) {
  const inputValue = Number.isFinite(value) ? value : "";
  const sliderValue = Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;
  const displayedValue = Number.isFinite(value)
    ? suffix === "₹"
      ? inr(value)
      : `${value}${suffix ?? ""}`
    : "—";

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm text-muted-foreground">
          {label}
        </label>
        <span className="font-mono text-sm text-foreground">
          {displayedValue}
        </span>
      </div>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        value={inputValue}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(e.target.value === "" ? Number.NaN : Number(e.target.value))}
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
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-primary"
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Result({
  items,
  actions,
}: {
  items: { label: string; value: string; accent?: boolean }[];
  actions?: ReactNode | undefined;
}) {
  return (
    <>
      <dl className="grid gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className={
              item.accent
                ? "rounded-xl border border-primary/50 bg-primary/10 p-4"
                : "rounded-xl border border-border bg-surface p-4"
            }
          >
            <dt className="mono-label text-muted-foreground">{item.label}</dt>
            <dd className="mt-2 text-2xl">{item.value}</dd>
          </div>
        ))}
      </dl>
      {actions}
    </>
  );
}

function ResultActions({
  calculator,
  values,
  inputs,
  results,
  enabled,
}: {
  calculator: CalculatorKey;
  values: Record<string, number>;
  inputs: SummaryField[];
  results: SummaryField[];
  enabled: boolean;
}) {
  const [downloading, setDownloading] = useState(false);
  const canAct =
    enabled &&
    Object.values(values).every(Number.isFinite) &&
    summaryFieldsAreValid(inputs) &&
    summaryFieldsAreValid(results);

  const copyLink = async () => {
    if (!canAct) {
      toast.error("Enter valid values to generate a shareable link.");
      return;
    }
    const link = buildCalculatorUrl(calculator, values);
    if (!link) {
      toast.error("Enter valid values to generate a shareable link.");
      return;
    }
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(link);
      toast.success("Link copied successfully.");
    } catch {
      toast.error("Could not copy the link. Please copy the URL from your browser's address bar.");
    }
  };

  const downloadSummary = async () => {
    if (!canAct || downloading) {
      if (!canAct) toast.error("Enter valid values before downloading a summary.");
      return;
    }
    setDownloading(true);
    try {
      const ok = await downloadCalculatorSummary({
        calculatorName: CALCULATOR_NAMES[calculator],
        inputs,
        results,
        logoUrl: logoAsset.url,
      });
      if (ok) toast.success("Summary downloaded successfully.");
      else toast.error("The summary could not be generated. Please check your inputs.");
    } catch {
      toast.error("The summary could not be downloaded. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const buttonClass =
    "mono-label rounded-full border border-border px-4 py-2.5 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border";

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <button type="button" onClick={copyLink} disabled={!canAct} className={buttonClass}>
        Copy Link
      </button>
      <button
        type="button"
        onClick={downloadSummary}
        disabled={!canAct || downloading}
        aria-busy={downloading}
        className={buttonClass}
      >
        {downloading ? "Preparing…" : "Download Summary"}
      </button>
    </div>
  );
}

export function CalculatorShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface/40 p-6 sm:p-8">
      <h3 className="text-2xl">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <div className="mt-6 space-y-6">{children}</div>
    </div>
  );
}

export function SipCalculator({ withChart = false }: { withChart?: boolean }) {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("calc") !== "sip") return;
    const nextMonthly = readQueryNumber(params, "monthly", 500, 200000);
    const nextRate = readQueryNumber(params, "rate", 1, 20);
    const nextYears = readQueryNumber(params, "years", 1, 50);
    if (nextMonthly === null || nextRate === null || nextYears === null) return;
    setMonthly(nextMonthly);
    setRate(nextRate);
    setYears(nextYears);
  }, []);

  const errors = {
    monthly: validationMessage(monthly, "Monthly contribution", "₹", 500, 200000),
    rate: validationMessage(rate, "Assumed annual return", "%", 1, 20),
    years: validationMessage(years, "Investment period", " yrs", 1, 50),
  };
  const isValid = !hasValidationErrors(errors);
  const calculation = useMemo(() => {
    if (!isValid) return null;
    const result = sipFutureValue(monthly, rate, years);
    return hasFiniteValues([result.invested, result.futureValue, result.gain]) ? result : null;
  }, [isValid, monthly, rate, years]);
  const data = useMemo(
    () => (calculation ? sipSeries(monthly, rate, years) : []),
    [calculation, monthly, rate, years],
  );

  return (
    <CalculatorShell
      title="SIP calculator"
      description="Estimate how a monthly systematic investment plan could grow at a constant assumed rate."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <Field
          id="sip-monthly"
          label="Monthly contribution"
          suffix="₹"
          value={monthly}
          min={500}
          max={200000}
          step={500}
          error={errors.monthly}
          onChange={setMonthly}
        />
        <Field
          id="sip-rate"
          label="Assumed annual return"
          suffix="%"
          value={rate}
          min={1}
          max={20}
          step={0.5}
          error={errors.rate}
          onChange={setRate}
        />
        <Field
          id="sip-years"
          label="Investment period"
          suffix=" yrs"
          value={years}
          min={1}
          max={50}
          step={1}
          error={errors.years}
          onChange={setYears}
        />
      </div>

      <Result
        items={[
          { label: "Invested amount", value: resultInr(calculation?.invested) },
          { label: "Estimated gain", value: resultInr(calculation?.gain) },
          { label: "Estimated value", value: resultInr(calculation?.futureValue), accent: true },
        ]}
        actions={
          <ResultActions
            calculator="sip"
            values={{ monthly, rate, years }}
            inputs={[
              { label: "Monthly contribution", value: resultInr(monthly) },
              { label: "Assumed annual return", value: `${rate}%` },
              { label: "Investment period", value: `${years} years` },
            ]}
            results={[
              { label: "Invested amount", value: resultInr(calculation?.invested) },
              { label: "Estimated gain", value: resultInr(calculation?.gain) },
              { label: "Estimated value", value: resultInr(calculation?.futureValue) },
            ]}
            enabled={Boolean(calculation)}
          />
        }
      />

      {withChart ? <GrowthChart data={data} /> : null}

      <Disclaimer>
        Calculator results are illustrative estimates based on a fixed assumed return. Actual
        mutual fund returns vary, can be negative, and are not guaranteed. This is educational
        content, not investment advice.
      </Disclaimer>
    </CalculatorShell>
  );
}

export function LumpsumCalculator() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(10);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("calc") !== "lumpsum") return;
    const nextAmount = readQueryNumber(params, "amount", 1000, 10000000);
    const nextRate = readQueryNumber(params, "rate", 1, 20);
    const nextYears = readQueryNumber(params, "years", 1, 50);
    if (nextAmount === null || nextRate === null || nextYears === null) return;
    setAmount(nextAmount);
    setRate(nextRate);
    setYears(nextYears);
  }, []);

  const errors = {
    amount: validationMessage(amount, "Investment amount", "₹", 1000, 10000000),
    rate: validationMessage(rate, "Assumed annual return", "%", 1, 20),
    years: validationMessage(years, "Investment period", " yrs", 1, 50),
  };
  const isValid = !hasValidationErrors(errors);
  const calculation = useMemo(() => {
    if (!isValid) return null;
    const result = lumpsumFutureValue(amount, rate, years);
    return hasFiniteValues([result.invested, result.futureValue, result.gain]) ? result : null;
  }, [amount, isValid, rate, years]);

  return (
    <CalculatorShell
      title="Single Investment Calculator"
      description="Project how a single upfront contribution grows over your target timeframe through annual compounding."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <Field
          id="lump-amount"
          label="Investment amount"
          suffix="₹"
          value={amount}
          min={1000}
          max={10000000}
          step={1000}
          error={errors.amount}
          onChange={setAmount}
        />
        <Field
          id="lump-rate"
          label="Assumed annual return"
          suffix="%"
          value={rate}
          min={1}
          max={20}
          step={0.5}
          error={errors.rate}
          onChange={setRate}
        />
        <Field
          id="lump-years"
          label="Investment period"
          suffix=" yrs"
          value={years}
          min={1}
          max={50}
          step={1}
          error={errors.years}
          onChange={setYears}
        />
      </div>
      <Result
        items={[
          { label: "Invested amount", value: resultInr(calculation?.invested) },
          { label: "Estimated gain", value: resultInr(calculation?.gain) },
          { label: "Estimated value", value: resultInr(calculation?.futureValue), accent: true },
        ]}
        actions={
          <ResultActions
            calculator="lumpsum"
            values={{ amount, rate, years }}
            inputs={[
              { label: "Investment amount", value: resultInr(amount) },
              { label: "Assumed annual return", value: `${rate}%` },
              { label: "Investment period", value: `${years} years` },
            ]}
            results={[
              { label: "Invested amount", value: resultInr(calculation?.invested) },
              { label: "Estimated gain", value: resultInr(calculation?.gain) },
              { label: "Estimated value", value: resultInr(calculation?.futureValue) },
            ]}
            enabled={Boolean(calculation)}
          />
        }
      />
      <Disclaimer>
        Illustrative only. A constant annual return never happens in real markets — values shown
        are a simplified teaching model, not a projection or a promise of returns.
      </Disclaimer>
    </CalculatorShell>
  );
}

export function CompoundCalculator() {
  const [principal, setPrincipal] = useState(50000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(5);
  const [perYear, setPerYear] = useState(4);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("calc") !== "compound") return;
    const nextPrincipal = readQueryNumber(params, "principal", 1000, 5000000);
    const nextRate = readQueryNumber(params, "rate", 1, 20);
    const nextYears = readQueryNumber(params, "years", 1, 50);
    const nextPerYear = readQueryNumber(params, "frequency", 1, 12);
    if (
      nextPrincipal === null ||
      nextRate === null ||
      nextYears === null ||
      nextPerYear === null ||
      ![1, 2, 4, 12].includes(nextPerYear)
    ) {
      return;
    }
    setPrincipal(nextPrincipal);
    setRate(nextRate);
    setYears(nextYears);
    setPerYear(nextPerYear);
  }, []);

  const errors = {
    principal: validationMessage(principal, "Principal", "₹", 1000, 5000000),
    rate: validationMessage(rate, "Annual interest rate", "%", 1, 20),
    years: validationMessage(years, "Time period", " yrs", 1, 50),
    perYear: [1, 2, 4, 12].includes(perYear)
      ? undefined
      : "Choose a valid compounding frequency.",
  };
  const isValid = !hasValidationErrors(errors);
  const calculation = useMemo(() => {
    if (!isValid) return null;
    const result = compoundInterest(principal, rate, years, perYear);
    return hasFiniteValues([result.futureValue, result.gain]) ? result : null;
  }, [isValid, perYear, principal, rate, years]);

  return (
    <CalculatorShell
      title="Compound interest calculator"
      description="Understand how compounding frequency changes the growth of a deposit or savings balance."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Field
          id="ci-principal"
          label="Principal"
          suffix="₹"
          value={principal}
          min={1000}
          max={5000000}
          step={1000}
          error={errors.principal}
          onChange={setPrincipal}
        />
        <Field
          id="ci-rate"
          label="Annual interest rate"
          suffix="%"
          value={rate}
          min={1}
          max={20}
          step={0.25}
          error={errors.rate}
          onChange={setRate}
        />
        <Field
          id="ci-years"
          label="Time period"
          suffix=" yrs"
          value={years}
          min={1}
          max={50}
          step={1}
          error={errors.years}
          onChange={setYears}
        />
        <div>
          <label htmlFor="ci-freq" className="text-sm text-muted-foreground">
            Compounding frequency
          </label>
          <select
            id="ci-freq"
            value={perYear}
            onChange={(e) => setPerYear(Number(e.target.value))}
            className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
          >
            <option value={1}>Yearly</option>
            <option value={2}>Half-yearly</option>
            <option value={4}>Quarterly</option>
            <option value={12}>Monthly</option>
          </select>
          {errors.perYear ? (
            <p className="mt-2 text-xs text-destructive">{errors.perYear}</p>
          ) : null}
        </div>
      </div>
      <Result
        items={[
          { label: "Principal", value: resultInr(calculation?.invested) },
          { label: "Interest earned", value: resultInr(calculation?.gain) },
          { label: "Maturity value", value: resultInr(calculation?.futureValue), accent: true },
        ]}
        actions={
          <ResultActions
            calculator="compound"
            values={{ principal, rate, years, frequency: perYear }}
            inputs={[
              { label: "Principal", value: resultInr(principal) },
              { label: "Annual interest rate", value: `${rate}%` },
              { label: "Time period", value: `${years} years` },
              { label: "Compounding frequency", value: `${perYear} times per year` },
            ]}
            results={[
              { label: "Principal", value: resultInr(calculation?.invested) },
              { label: "Interest earned", value: resultInr(calculation?.gain) },
              { label: "Maturity value", value: resultInr(calculation?.futureValue) },
            ]}
            enabled={Boolean(calculation)}
          />
        }
      />
      <Disclaimer>
        Educational example only. Interest rates, taxes, and charges are not modelled here and will
        change real-world outcomes.
      </Disclaimer>
    </CalculatorShell>
  );
}

export function EmergencyFundCalculator() {
  const [expenses, setExpenses] = useState(30000);
  const [months, setMonths] = useState(6);
  const [saved, setSaved] = useState(50000);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("calc") !== "emergency") return;
    const nextExpenses = readQueryNumber(params, "expenses", 5000, 500000);
    const nextMonths = readQueryNumber(params, "months", 3, 12);
    const nextSaved = readQueryNumber(params, "saved", 0, 5000000);
    if (nextExpenses === null || nextMonths === null || nextSaved === null) return;
    setExpenses(nextExpenses);
    setMonths(nextMonths);
    setSaved(nextSaved);
  }, []);

  const errors = {
    expenses: validationMessage(expenses, "Essential monthly expenses", "₹", 5000, 500000),
    months: validationMessage(months, "Months of cover", " mo", 3, 12),
    saved: validationMessage(saved, "Already saved", "₹", 0, 5000000),
  };
  const isValid = !hasValidationErrors(errors);
  const calculation = useMemo(() => {
    if (!isValid) return null;
    const result = emergencyFund(expenses, months, saved);
    return hasFiniteValues([result.target, result.shortfall, result.progress]) ? result : null;
  }, [expenses, isValid, months, saved]);

  return (
    <CalculatorShell
      title="Emergency fund calculator"
      description="Work out a cushion of essential expenses to keep in a safe, liquid account."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <Field
          id="ef-expenses"
          label="Essential monthly expenses"
          suffix="₹"
          value={expenses}
          min={5000}
          max={500000}
          step={1000}
          error={errors.expenses}
          onChange={setExpenses}
        />
        <Field
          id="ef-months"
          label="Months of cover"
          suffix=" mo"
          value={months}
          min={3}
          max={12}
          step={1}
          error={errors.months}
          onChange={setMonths}
        />
        <Field
          id="ef-saved"
          label="Already saved"
          suffix="₹"
          value={saved}
          min={0}
          max={5000000}
          step={1000}
          error={errors.saved}
          onChange={setSaved}
        />
      </div>
      <Result
        items={[
          { label: "Target fund", value: resultInr(calculation?.target), accent: true },
          { label: "Still to save", value: resultInr(calculation?.shortfall) },
          { label: "Progress", value: resultPercent(calculation?.progress) },
        ]}
        actions={
          <ResultActions
            calculator="emergency"
            values={{ expenses, months, saved }}
            inputs={[
              { label: "Essential monthly expenses", value: resultInr(expenses) },
              { label: "Months of cover", value: `${months} months` },
              { label: "Already saved", value: resultInr(saved) },
            ]}
            results={[
              { label: "Target fund", value: resultInr(calculation?.target) },
              { label: "Still to save", value: resultInr(calculation?.shortfall) },
              { label: "Progress", value: resultPercent(calculation?.progress) },
            ]}
            enabled={Boolean(calculation)}
          />
        }
      />
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-surface-2"
        role="progressbar"
        aria-valuenow={calculation ? Math.round(calculation.progress) : undefined}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Emergency fund progress"
      >
        <div
          className="h-full gradient-accent"
          style={{ width: `${calculation?.progress ?? 0}%` }}
        />
      </div>
      <Disclaimer>
        A general educational rule of thumb, not personalised advice. Your right buffer depends on
        job stability, dependants, and health cover.
      </Disclaimer>
    </CalculatorShell>
  );
}

export function GrowthChart({
  data,
}: {
  data: { year: string; invested: number; value: number }[];
}) {
  return (
    <figure className="rounded-2xl border border-border bg-surface/60 p-4">
      <figcaption className="mono-label mb-4 text-muted-foreground">
        Illustrative example — not actual or projected performance
      </figcaption>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
            <defs>
              <linearGradient id="valueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.6} />
                <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="year"
              stroke="var(--color-muted-foreground)"
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />
            <YAxis
              stroke="var(--color-muted-foreground)"
              tickLine={false}
              axisLine={false}
              fontSize={12}
              width={64}
              tickFormatter={(v: number) => compactInr(v)}
            />
            <Tooltip
              contentStyle={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                color: "var(--color-foreground)",
                fontSize: 12,
              }}
              formatter={(v: number, name) => [inr(v), name === "value" ? "Estimated value" : "Invested"]}
            />
            <Area
              type="monotone"
              dataKey="invested"
              stroke="var(--color-muted-foreground)"
              fill="none"
              strokeDasharray="4 4"
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-chart-1)"
              strokeWidth={2}
              fill="url(#valueFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
}
