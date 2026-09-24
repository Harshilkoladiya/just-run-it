import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import logoAsset from "@/assets/logo.png.asset.json";

const columns = [
  {
    title: "Learn",
    links: [
      { to: "/learn", label: "Content Hub" },
      { to: "/mutual-funds", label: "SIP & Mutual Funds" },
      { to: "/real-estate", label: "Real Estate" },
      { to: "/personal-finance", label: "Personal Finance" },
    ],
  },
  {
    title: "Tools",
    links: [
      { to: "/calculators", label: "Calculators" },
      { to: "/resources", label: "Articles" },
      { to: "/contact", label: "Support" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/contact", label: "Contact" },
      { to: "/disclaimer", label: "Disclaimer & Privacy" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setError(null);
    setDone(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src={logoAsset.url}
                alt="CapitalScale logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span className="text-lg font-medium tracking-tight">CapitalScale</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Practical, jargon-free financial education for beginners and young professionals in
              India.
            </p>

            <form onSubmit={onSubmit} className="mt-6 max-w-sm" noValidate>
              <label htmlFor="footer-email" className="mono-label text-muted-foreground">
                Newsletter
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "footer-email-error" : undefined}
                  className="w-full rounded-full border border-border bg-surface px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
                <button
                  type="submit"
                  className="mono-label shrink-0 rounded-full bg-foreground px-4 py-2.5 text-background transition-opacity hover:opacity-85"
                >
                  Join
                </button>
              </div>
              {error ? (
                <p id="footer-email-error" className="mt-2 text-xs text-destructive">
                  {error}
                </p>
              ) : null}
              {done ? (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-primary">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" /> Thanks — you're on the list
                  (demo only).
                </p>
              ) : null}
            </form>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="mono-label text-muted-foreground">{col.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-border bg-surface/50 p-4 text-xs leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Risk disclaimer:</strong> CapitalScale publishes
          educational content only. Nothing on this site is investment, tax, or legal advice. All
          numbers, charts, and calculator outputs are illustrative examples and do not represent
          guaranteed or expected returns. Market-linked investments are subject to market risks;
          read all scheme-related documents carefully.
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono-label text-muted-foreground">
            © {new Date().getFullYear()} CapitalScale
          </p>
          <Link
            to="/disclaimer"
            className="mono-label text-muted-foreground transition-colors hover:text-foreground"
          >
            Disclaimer & Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
