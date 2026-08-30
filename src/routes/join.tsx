import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
  ClipboardCheck,
  ArrowRight,
  BadgeCheck,
  TrendingUp,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BackButton } from "../components/BackButton";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { WA_URL_SELECTION, GEN_MEMBER_COUNTS } from "../lib/site-config";
import { useI18n } from "../lib/i18n";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join · Five Fail Family" },
      {
        name: "description",
        content:
          "Bergabung ke Five Fail Family lewat satu jalur seleksi untuk semua tipe creator - preset, L2D, anime, manhwa, dan manhua.",
      },
      { property: "og:title", content: "Join · Five Fail Family" },
      {
        property: "og:description",
        content: "Selalu open recruitment - ikuti jalur seleksi untuk bergabung kedalam grup",
      },
    ],
  }),
  component: JoinPage,
});

const reqIcons = [Users, Sparkles, ShieldCheck];
const totalMembers = GEN_MEMBER_COUNTS.reduce((sum, g) => sum + g.count, 0);

const genBadgeClasses = [
  "bg-amber-300",
  "bg-violet-300",
  "bg-emerald-300",
];

function JoinPage() {
  const { t } = useI18n();
  const j = t.join;

  const path = {
    ...j.path1,
    url: WA_URL_SELECTION,
    icon: ClipboardCheck,
    colorClass: "bg-amber-300",
  };

  return (
    <main className="relative min-h-[calc(100vh-64px)] overflow-hidden px-4 pb-20">
      <div className="mx-auto max-w-4xl pt-8">
        <BackButton />
      </div>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl pt-4 text-center">
        <span className="chip">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          {j.badge}
        </span>
        <h1 className="font-display mt-5 text-4xl font-bold tracking-tight md:text-5xl">
          {j.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{j.desc}</p>

        {/* Trust bar */}
        <div className="mx-auto mt-7 flex max-w-2xl flex-wrap items-center justify-center gap-3">
          <span className="chip">
            <TrendingUp className="h-3.5 w-3.5" />
            <AnimatedCounter value={totalMembers} suffix="+" /> {t.common.members}
          </span>
          <span className="chip">
            <BadgeCheck className="h-3.5 w-3.5" />
            100% Gratis
          </span>
          <span className="chip">
            <Zap className="h-3.5 w-3.5" />3 Generasi Aktif
          </span>
        </div>
      </section>

      {/* ── Single selection path ──────────────────────────────── */}
      <section className="mx-auto mt-14 max-w-4xl">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">{j.pathsTitle}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{j.pathsDesc}</p>
        </div>

        <article className="glass-card relative flex flex-col overflow-hidden ring-2 ring-accent ring-offset-0">
          {/* Coloured header strip */}
          <div
            className={`${path.colorClass} flex flex-col gap-3 border-b-[3px] border-foreground px-6 py-4 sm:flex-row sm:items-center sm:justify-between`}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border-2 border-foreground bg-white/60 text-foreground">
                <path.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-mono text-xs font-extrabold uppercase tracking-widest text-foreground/70">
                  {path.label}
                </p>
                <h3 className="font-display text-lg font-extrabold leading-tight">{path.title}</h3>
              </div>
            </div>
            <span className="chip w-fit shrink-0">{path.badge}</span>
          </div>

          {/* Body */}
          <div className="flex flex-col p-6">
            <p className="text-sm font-semibold text-foreground">{path.audience}</p>
            <p className="mt-2 text-sm text-muted-foreground">{path.desc}</p>

            {/* Mini gen summary */}
            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              {j.genRequirements.map((g, i) => (
                <div
                  key={g.gen}
                  className={`${genBadgeClasses[i]} flex items-center justify-between rounded-lg border-2 border-foreground px-3 py-2`}
                >
                  <span className="font-mono text-xs font-extrabold uppercase tracking-widest">
                    {g.gen}
                  </span>
                  <span className="font-mono text-xs font-extrabold">
                    {g.followers > 0 ? `${g.followers}+` : "Bebas"}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={path.url}
              target="_blank"
              rel="noopener"
              className="btn-primary mt-6 inline-flex items-center justify-center gap-2 self-start"
            >
              <MessageCircle className="h-4 w-4" />
              {path.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </article>
      </section>

      {/* ── Requirements ───────────────────────────────────────── */}
      <section className="mx-auto mt-14 max-w-4xl">
        <h2 className="mb-5 text-2xl font-bold">{j.reqTitle}</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {j.requirements.map((r, i) => {
            const Icon = reqIcons[i] ?? Sparkles;
            return (
              <div key={r.title} className="glass-card glass-card-hover p-5">
                <div className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-secondary/40 text-accent">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="mt-3 font-semibold">{r.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Selection flow ─────────────────────────────────────── */}
      <section className="glass-card mx-auto mt-14 max-w-4xl p-6 md:p-8">
        <h2 className="text-lg font-bold">{j.flowTitle}</h2>
        <ol className="mt-5 space-y-0">
          {j.flow.map((step, i) => (
            <li key={step} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-foreground bg-accent font-mono text-xs font-extrabold text-accent-foreground">
                  {i + 1}
                </span>
                {i < j.flow.length - 1 && (
                  <span className="mt-1 mb-1 w-0.5 flex-1 bg-foreground/20" style={{ minHeight: 20 }} />
                )}
              </div>
              <span className="pt-1 pb-4 text-sm text-muted-foreground">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="mx-auto mt-14 max-w-4xl">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl font-bold">{j.faqTitle}</h2>
          <span className="font-mono text-xs text-muted-foreground">
            {j.faqs.length} {j.faqCount}
          </span>
        </div>
        <div className="glass-card p-2 md:p-4">
          <Accordion type="single" collapsible className="w-full">
            {j.faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className={i === j.faqs.length - 1 ? "border-b-0" : "border-border"}
              >
                <AccordionTrigger className="rounded-lg px-3 hover:bg-secondary/40 hover:no-underline">
                  <span className="font-medium">{f.q}</span>
                </AccordionTrigger>
                <AccordionContent className="px-3 text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Bottom CTA ─────────────────────────────────────────── */}
      <section className="glass-card mx-auto mt-14 max-w-4xl p-6 text-center md:p-8">
        <h3 className="font-display text-xl font-bold">{j.ctaTitle}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{j.ctaDesc}</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <a
            href={WA_URL_SELECTION}
            target="_blank"
            rel="noopener"
            className="btn-primary inline-flex items-center gap-2"
          >
            <ClipboardCheck className="h-4 w-4" />
            {j.path1.cta}
          </a>
        </div>
        <div className="mt-4">
          <Link
            to="/readme"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            {j.readme}
          </Link>
        </div>
      </section>
    </main>
  );
}
