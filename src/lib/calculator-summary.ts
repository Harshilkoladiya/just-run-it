/**
 * Builds and downloads a self-contained, printable HTML summary for a
 * CapitalScale calculator result. No external dependency is required.
 */

export type SummaryField = { label: string; value: string };

export const SUMMARY_DISCLAIMER =
  "Disclaimer: These calculations are estimates provided for educational and informational purposes only. They are not financial, investment, tax, or legal advice. Actual investment returns may vary, and past or estimated performance does not guarantee future results.";

const INVALID_TOKENS = ["NaN", "Infinity", "-Infinity", "undefined", "null", "—"];

/** True when every field has a usable, finite, non-empty display value. */
export function summaryFieldsAreValid(fields: SummaryField[]) {
  return (
    fields.length > 0 &&
    fields.every(
      ({ label, value }) =>
        label.trim() !== "" &&
        value.trim() !== "" &&
        !INVALID_TOKENS.some((token) => value.includes(token)),
    )
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function loadLogoDataUrl(logoUrl: string): Promise<string | null> {
  try {
    const response = await fetch(logoUrl);
    if (!response.ok) return null;
    const blob = await response.blob();
    if (!blob.type.startsWith("image/")) return null;
    return await new Promise<string | null>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : null);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function renderRows(fields: SummaryField[]) {
  return fields
    .map(
      ({ label, value }) =>
        `<tr><th scope="row">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`,
    )
    .join("");
}

export function buildSummaryHtml({
  calculatorName,
  inputs,
  results,
  date,
  logoDataUrl,
}: {
  calculatorName: string;
  inputs: SummaryField[];
  results: SummaryField[];
  date: string;
  logoDataUrl: string | null;
}) {
  const brand = logoDataUrl
    ? `<img class="logo" src="${logoDataUrl}" alt="CapitalScale logo" width="44" height="44" /><span class="wordmark">CapitalScale</span>`
    : `<span class="wordmark">CapitalScale</span>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(calculatorName)} summary — CapitalScale</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    margin: 0; padding: 40px 20px; background: #f4f5f7; color: #0b0d12;
    font: 15px/1.55 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
  .sheet {
    max-width: 720px; margin: 0 auto; background: #fff; border: 1px solid #e3e6ec;
    border-radius: 20px; padding: 40px; box-shadow: 0 10px 40px rgba(11, 13, 18, 0.06);
  }
  header { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
  .brand { display: flex; align-items: center; gap: 12px; }
  .logo { width: 44px; height: 44px; border-radius: 10px; object-fit: contain; }
  .wordmark { font-size: 22px; font-weight: 700; letter-spacing: -0.02em; }
  .eyebrow {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; letter-spacing: 0.12em;
    text-transform: uppercase; color: #5b6472;
  }
  h1 { font-size: 26px; margin: 28px 0 4px; letter-spacing: -0.02em; }
  .meta { color: #5b6472; font-size: 13px; margin: 0 0 24px; }
  h2 { font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; color: #5b6472; margin: 28px 0 10px; font-weight: 600; }
  table { width: 100%; border-collapse: collapse; }
  th, td { text-align: left; padding: 11px 12px; border-top: 1px solid #e9ecf1; vertical-align: top; }
  tr:last-child th, tr:last-child td { border-bottom: 1px solid #e9ecf1; }
  th { width: 55%; font-weight: 500; color: #3c4451; }
  td { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 14px; font-weight: 600; }
  .results tr:last-child td { color: #1d5bff; }
  .disclaimer {
    margin-top: 32px; padding: 16px 18px; border-radius: 12px; background: #f4f5f7;
    border: 1px solid #e3e6ec; color: #3c4451; font-size: 12.5px; line-height: 1.6;
  }
  footer { margin-top: 20px; font-size: 12px; color: #8a92a0; text-align: center; }
  @media print {
    body { background: #fff; padding: 0; }
    .sheet { border: 0; box-shadow: none; border-radius: 0; padding: 24px; max-width: none; }
  }
  @media (max-width: 480px) {
    .sheet { padding: 24px 18px; }
    th { width: 50%; }
  }
</style>
</head>
<body>
  <main class="sheet">
    <header>
      <div class="brand">${brand}</div>
      <span class="eyebrow">Calculator summary</span>
    </header>
    <h1>${escapeHtml(calculatorName)}</h1>
    <p class="meta">Calculation date: ${escapeHtml(date)}</p>

    <section>
      <h2>Your inputs</h2>
      <table>${renderRows(inputs)}</table>
    </section>

    <section class="results">
      <h2>Estimated results</h2>
      <table>${renderRows(results)}</table>
    </section>

    <p class="disclaimer">${escapeHtml(SUMMARY_DISCLAIMER)}</p>
    <footer>Generated by CapitalScale — educational content, not investment advice.</footer>
  </main>
</body>
</html>
`;
}

/**
 * Downloads a printable HTML summary. Returns false (without downloading)
 * if any input or result value is missing or non-finite.
 */
export async function downloadCalculatorSummary({
  calculatorName,
  inputs,
  results,
  logoUrl,
}: {
  calculatorName: string;
  inputs: SummaryField[];
  results: SummaryField[];
  logoUrl?: string;
}): Promise<boolean> {
  if (!summaryFieldsAreValid(inputs) || !summaryFieldsAreValid(results)) return false;

  const now = new Date();
  const date = new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(now);
  const logoDataUrl = logoUrl ? await loadLogoDataUrl(logoUrl) : null;
  const html = buildSummaryHtml({ calculatorName, inputs, results, date, logoDataUrl });

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const downloadUrl = URL.createObjectURL(blob);
  const slug = calculatorName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const stamp = now.toISOString().slice(0, 10);
  const anchor = document.createElement("a");
  anchor.href = downloadUrl;
  anchor.download = `capitalscale-${slug}-summary-${stamp}.html`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
  return true;
}
