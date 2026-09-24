import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FORMSPREE_ENDPOINT } from "@/lib/formspree";
import { z } from "zod";
import { Check, Mail } from "lucide-react";
import {
  Disclaimer,
  PageHero,
  Panel,
  Section,
  SectionHeading,
} from "@/components/site/primitives";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact CapitalScale — Questions and feedback" },
      {
        name: "description",
        content:
          "Send the CapitalScale team a question about our educational content, suggest a topic, or report an error. We do not provide personalised investment advice.",
      },
      { property: "og:title", content: "Contact CapitalScale" },
      {
        property: "og:description",
        content: "Questions, topic suggestions and content feedback.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(160),
  topic: z.string().min(1, "Choose a topic"),
  message: z
    .string()
    .trim()
    .min(20, "Please add a little more detail (20+ characters)")
    .max(1000, "Message must be under 1000 characters"),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const topics = [
  "General question",
  "Content suggestion",
  "Report an error",
  "Partnership / media",
];

function Contact() {
  const [values, setValues] = useState({ name: "", email: "", topic: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sentName, setSentName] = useState("");

  const set = (key: keyof typeof values, value: string) =>
    setValues((v) => ({ ...v, [key]: value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    const result = schema.safeParse(values);
    if (!result.success) {
      const next: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitError(null);
    setStatus("sending");
    try {
      if (!FORMSPREE_ENDPOINT) {
        throw new Error("Formspree endpoint is not configured");
      }
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: result.data.name,
          email: result.data.email,
          topic: result.data.topic,
          message: result.data.message,
          _subject: `CapitalScale contact — ${result.data.topic}`,
        }),
      });
      if (!response.ok) throw new Error("Submission failed");
      setSentName(result.data.name);
      setValues({ name: "", email: "", topic: "", message: "" });
      setStatus("sent");
    } catch {
      setSubmitError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Ask a question, suggest a topic."
        description="We read everything. We can help with how our lessons work and what to learn next — but we cannot review your portfolio or recommend investments."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-border bg-surface/50 p-6 sm:p-10">
            {status === "sent" ? (
              <div className="py-12 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/60 bg-primary/10">
                  <Check className="h-6 w-6 text-primary" aria-hidden="true" />
                </span>
                <h2 className="mt-6 text-3xl">Message received</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Thanks {sentName.split(" ")[0] || "there"} — your message has been sent
                  successfully. We usually reply within two working days.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setValues({ name: "", email: "", topic: "", message: "" });
                    setSubmitError(null);
                    setStatus("idle");
                  }}
                  className="mono-label mt-8 rounded-full border border-border px-6 py-3 transition-colors hover:border-primary"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <TextField
                    id="name"
                    label="Your name"
                    value={values.name}
                    error={errors.name}
                    onChange={(v) => set("name", v)}
                  />
                  <TextField
                    id="email"
                    label="Email address"
                    type="email"
                    value={values.email}
                    error={errors.email}
                    onChange={(v) => set("email", v)}
                  />
                </div>

                <div>
                  <label htmlFor="topic" className="text-sm text-muted-foreground">
                    Topic
                  </label>
                  <select
                    id="topic"
                    value={values.topic}
                    onChange={(e) => set("topic", e.target.value)}
                    aria-invalid={Boolean(errors.topic)}
                    aria-describedby={errors.topic ? "topic-error" : undefined}
                    className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                  >
                    <option value="">Select a topic…</option>
                    {topics.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.topic ? (
                    <p id="topic-error" className="mt-2 text-xs text-destructive">
                      {errors.topic}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="message" className="text-sm text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    maxLength={1000}
                    value={values.message}
                    onChange={(e) => set("message", e.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : "message-hint"}
                    className="mt-2 w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                  />
                  {errors.message ? (
                    <p id="message-error" className="mt-2 text-xs text-destructive">
                      {errors.message}
                    </p>
                  ) : (
                    <p id="message-hint" className="mt-2 text-xs text-muted-foreground">
                      {values.message.length}/1000 characters. Please don't share account numbers or
                      personal financial details.
                    </p>
                  )}
                </div>

                {submitError ? (
                  <p role="alert" className="text-sm text-destructive">
                    {submitError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mono-label w-full rounded-full bg-foreground px-6 py-3.5 text-background transition-opacity hover:opacity-85 disabled:opacity-60 sm:w-auto"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-4">
            <Panel interactive={false}>
              <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 className="mt-4 text-xl">Support email</h2>
              <a
                href="mailto:capitalscalehelp@gmail.com"
                className="mt-2 block font-mono text-sm text-muted-foreground hover:text-foreground"
              >
                capitalscalehelp@gmail.com
              </a>
            </Panel>
            <Panel interactive={false}>
              <h2 className="text-xl">Common questions</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link to="/learn" className="text-muted-foreground hover:text-foreground">
                    Where should a complete beginner start?
                  </Link>
                </li>
                <li>
                  <Link to="/calculators" className="text-muted-foreground hover:text-foreground">
                    Are your calculator results guaranteed?
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer" className="text-muted-foreground hover:text-foreground">
                    How do you handle my data?
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-foreground">
                    Who writes the content?
                  </Link>
                </li>
              </ul>
            </Panel>
          </div>
        </div>
      </Section>

      <Section muted>
        <SectionHeading
          eyebrow="Please note"
          title="We cannot give personalised advice"
          description="Questions asking which fund to buy, whether to sell, or how to allocate a specific portfolio will be answered with educational material only."
        />
        <Disclaimer className="mt-8" />
      </Section>
    </>
  );
}

function TextField({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  error?: string | undefined;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
