import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto w-full max-w-7xl px-6", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  id,
  muted,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  muted?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("py-20 sm:py-28", muted && "bg-surface/40 border-y border-border", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mono-label text-primary">
      <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

export function Panel({
  children,
  className,
  interactive = true,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur-sm",
        interactive && "transition-colors hover:border-primary/50",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Disclaimer({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "rounded-xl border border-border bg-surface/50 p-4 text-xs leading-relaxed text-muted-foreground",
        className,
      )}
    >
      <span className="mono-label mr-2 text-foreground">Disclaimer</span>
      {children ??
        "For educational purposes only. CapitalScale is not a financial advisory service and does not provide investment recommendations. All figures shown are illustrative examples, not guaranteed returns. Investments carry risk, including possible loss of capital. Please consult a SEBI-registered adviser before investing."}
    </p>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  image?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-border">
      {image ? (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </>
      ) : (
        <div className="grid-lines absolute inset-0 opacity-40" aria-hidden="true" />
      )}
      <Container className="relative py-20 sm:py-28">
        <div className="reveal max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </header>
  );
}

export function ArrowLink({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "mono-label inline-flex items-center gap-2 text-foreground underline-offset-4 transition-colors hover:text-primary",
        className,
      )}
    >
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface/40 p-5">
      <p className="text-3xl">{value}</p>
      <p className="mono-label mt-2 text-muted-foreground">{label}</p>
    </div>
  );
}
