import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/logo.png.asset.json";

const investments = [
  { to: "/real-estate", label: "Real Estate" },
  { to: "/mutual-funds", label: "SIP & Mutual Funds" },
  { to: "/personal-finance", label: "Personal Finance" },
];

const primaryNav = [
  { to: "/", label: "Home" },
  { to: "/learn", label: "Learn" },
  { to: "/calculators", label: "Calculators" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <nav aria-label="Main" className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img
            src={logoAsset.url}
            alt="CapitalScale logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="text-lg font-medium tracking-tight">CapitalScale</span>
        </Link>

        <ul className="ml-auto hidden items-center gap-1 lg:flex">
          {primaryNav.slice(0, 3).map((item) => (
            <NavItem key={item.to} {...item} active={pathname === item.to} />
          ))}
          <li className="group relative">
            <button
              type="button"
              className="mono-label flex items-center gap-1 rounded-full px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
              aria-haspopup="true"
            >
              Investments
              <ChevronDown className="h-3 w-3" aria-hidden="true" />
            </button>
            <div className="invisible absolute left-0 top-full w-56 pt-2 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <ul className="rounded-xl border border-border bg-surface p-2 shadow-lg">
                {investments.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          {primaryNav.slice(3).map((item) => (
            <NavItem key={item.to} {...item} active={pathname === item.to} />
          ))}
        </ul>

        <Link
          to="/learn"
          className="mono-label ml-auto hidden rounded-full bg-foreground px-5 py-2.5 text-background transition-opacity hover:opacity-85 lg:ml-0 lg:inline-flex"
        >
          Start Learning
        </Link>

        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div id="mobile-menu" className="border-t border-border bg-background lg:hidden">
          <ul className="mx-auto max-w-7xl space-y-1 px-6 py-4">
            {[...primaryNav, ...investments].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-base transition-colors",
                    pathname === item.to
                      ? "bg-surface text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                to="/learn"
                onClick={() => setOpen(false)}
                className="mono-label block rounded-full bg-foreground px-5 py-3 text-center text-background"
              >
                Start Learning
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}

function NavItem({ to, label, active }: { to: string; label: string; active: boolean }) {
  return (
    <li>
      <Link
        to={to}
        className={cn(
          "mono-label rounded-full px-3 py-2 transition-colors",
          active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        )}
      >
        {label}
      </Link>
    </li>
  );
}
