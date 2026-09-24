export const inr = (value: number, fractionDigits = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

export const compactInr = (value: number) => {
  if (!Number.isFinite(value)) return "₹0";
  if (value >= 1_00_00_000) return `₹${(value / 1_00_00_000).toFixed(2)} Cr`;
  if (value >= 1_00_000) return `₹${(value / 1_00_000).toFixed(2)} L`;
  return inr(value);
};

/** Future value of a monthly SIP (contribution at the start of each month). */
export function sipFutureValue(monthly: number, annualRatePct: number, years: number) {
  const months = Math.round(years * 12);
  const r = annualRatePct / 100 / 12;
  const invested = monthly * months;
  const futureValue =
    r === 0 ? invested : monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
  return { invested, futureValue, gain: futureValue - invested, months };
}

/** Future value of a one-time lumpsum investment, compounded annually. */
export function lumpsumFutureValue(amount: number, annualRatePct: number, years: number) {
  const futureValue = amount * Math.pow(1 + annualRatePct / 100, years);
  return { invested: amount, futureValue, gain: futureValue - amount };
}

/** Compound interest with a configurable compounding frequency per year. */
export function compoundInterest(
  principal: number,
  annualRatePct: number,
  years: number,
  perYear: number,
) {
  const n = Math.max(1, perYear);
  const futureValue = principal * Math.pow(1 + annualRatePct / 100 / n, n * years);
  return { invested: principal, futureValue, gain: futureValue - principal };
}

/** Emergency fund target based on essential monthly expenses. */
export function emergencyFund(monthlyExpenses: number, months: number, saved: number) {
  const target = monthlyExpenses * months;
  const shortfall = Math.max(0, target - saved);
  const progress = target > 0 ? Math.min(100, (saved / target) * 100) : 0;
  return { target, shortfall, progress };
}

/** Year-by-year illustrative growth series for a SIP. */
export function sipSeries(monthly: number, annualRatePct: number, years: number) {
  return Array.from({ length: Math.max(1, Math.round(years)) }, (_, i) => {
    const y = i + 1;
    const { invested, futureValue } = sipFutureValue(monthly, annualRatePct, y);
    return { year: `Y${y}`, invested: Math.round(invested), value: Math.round(futureValue) };
  });
}
