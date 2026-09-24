export type TaxComparison = {
  oldTax: number;
  newTax: number;
  oldTaxableIncome: number;
  newTaxableIncome: number;
  recommended: "Old regime" | "New regime" | "Either regime";
  savings: number;
};

function slabTax(income: number, slabs: { upTo: number; rate: number }[]) {
  let tax = 0;
  let previous = 0;
  for (const slab of slabs) {
    const taxable = Math.max(0, Math.min(income, slab.upTo) - previous);
    tax += taxable * slab.rate;
    previous = slab.upTo;
    if (income <= slab.upTo) break;
  }
  return tax;
}

export function calculateEmi(principal: number, annualRate: number, months: number) {
  const monthlyRate = annualRate / 1200;
  const emi =
    monthlyRate === 0
      ? principal / months
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = emi * months;
  return { emi, totalInterest: totalPayment - principal, totalPayment };
}

export function calculateIncomeTax(grossIncome: number, deductions: number): TaxComparison {
  const oldTaxableIncome = Math.max(0, grossIncome - 50_000 - Math.min(deductions, 1_50_000));
  const newTaxableIncome = Math.max(0, grossIncome - 75_000);
  const oldSlabs = [
    { upTo: 2_50_000, rate: 0 },
    { upTo: 5_00_000, rate: 0.05 },
    { upTo: 10_00_000, rate: 0.2 },
    { upTo: Number.POSITIVE_INFINITY, rate: 0.3 },
  ];
  const newSlabs = [
    { upTo: 4_00_000, rate: 0 },
    { upTo: 8_00_000, rate: 0.05 },
    { upTo: 12_00_000, rate: 0.1 },
    { upTo: 16_00_000, rate: 0.15 },
    { upTo: 20_00_000, rate: 0.2 },
    { upTo: 24_00_000, rate: 0.25 },
    { upTo: Number.POSITIVE_INFINITY, rate: 0.3 },
  ];
  const oldBase = oldTaxableIncome <= 5_00_000 ? 0 : slabTax(oldTaxableIncome, oldSlabs);
  const newBase = newTaxableIncome <= 12_00_000 ? 0 : slabTax(newTaxableIncome, newSlabs);
  const oldTax = oldBase * 1.04;
  const newTax = newBase * 1.04;
  return {
    oldTax,
    newTax,
    oldTaxableIncome,
    newTaxableIncome,
    recommended:
      Math.abs(oldTax - newTax) < 0.01
        ? "Either regime"
        : oldTax < newTax
          ? "Old regime"
          : "New regime",
    savings: Math.abs(oldTax - newTax),
  };
}

export function calculateBrokerage(
  buyPrice: number,
  sellPrice: number,
  quantity: number,
  transactionType: "intraday" | "delivery",
) {
  const buyTurnover = buyPrice * quantity;
  const sellTurnover = sellPrice * quantity;
  const turnover = buyTurnover + sellTurnover;
  const brokerage =
    transactionType === "delivery"
      ? 0
      : Math.min(20, buyTurnover * 0.0003) + Math.min(20, sellTurnover * 0.0003);
  const stt =
    transactionType === "delivery" ? turnover * 0.001 : sellTurnover * 0.00025;
  const exchangeFees = turnover * 0.0000297;
  const sebiFees = turnover * 0.000001;
  const gst = (brokerage + exchangeFees + sebiFees) * 0.18;
  const stampDuty = buyTurnover * (transactionType === "delivery" ? 0.00015 : 0.00003);
  const totalCharges = brokerage + stt + exchangeFees + sebiFees + gst + stampDuty;
  const grossProfit = (sellPrice - buyPrice) * quantity;
  return {
    grossProfit,
    brokerage,
    stt,
    exchangeFees: exchangeFees + sebiFees,
    gst,
    stampDuty,
    totalCharges,
    netProfit: grossProfit - totalCharges,
  };
}

export function calculateMargin(balance: number, price: number, shares: number, leverage: number) {
  const positionValue = price * shares;
  const requiredMargin = positionValue / leverage;
  const borrowedFunds = Math.max(0, positionValue - requiredMargin);
  const adverseMovePercent = 100 / leverage;
  return {
    positionValue,
    requiredMargin,
    borrowedFunds,
    adverseMovePercent,
    exceedsBalance: requiredMargin > balance,
  };
}

export function calculateCagr(initial: number, finalValue: number, years: number) {
  const cagr = (Math.pow(finalValue / initial, 1 / years) - 1) * 100;
  const totalReturn = ((finalValue - initial) / initial) * 100;
  return { cagr, totalReturn, absoluteGain: finalValue - initial };
}

export function calculatePositionSize(
  capital: number,
  riskPercent: number,
  entry: number,
  stopLoss: number,
  target: number,
) {
  const maxRisk = capital * (riskPercent / 100);
  const riskPerShare = entry - stopLoss;
  const rewardPerShare = target - entry;
  const affordableShares = Math.floor(capital / entry);
  const shares = Math.max(0, Math.min(Math.floor(maxRisk / riskPerShare), affordableShares));
  return {
    maxRisk,
    shares,
    riskReward: rewardPerShare / riskPerShare,
    targetProfit: shares * rewardPerShare,
    actualRisk: shares * riskPerShare,
  };
}