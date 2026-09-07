import { useSiteData } from "@/lib/site-data";
import { useLang } from "@/lib/i18n";
import { t } from "@/lib/dict";
import type { ProcessStep } from "@/data/process";
import { Check } from "lucide-react";

function StepVisual({ kind, fa }: { kind: ProcessStep["visual"]; fa: boolean }) {
  if (kind === "prompt") {
    return (
      <div className="rounded-xl bg-gray-950 p-4 font-mono text-xs text-slate-300" dir="ltr">
        <div className="text-accent">$</div>
        <p className="mt-2 text-left leading-relaxed">
          {fa
            ? "ساخت یک لجر پرداخت برای کیف پول چندارزی. آرام، دقیق، با CTA رزرو برای کیک‌آف فنی."
            : "Build a payments ledger for a multi-currency wallet. Calm, precise, with a booking CTA for a technical kickoff."}
        </p>
      </div>
    );
  }
  if (kind === "reason") {
    const rows: [string, string][] = fa
      ? [
          ["محصول", "وب‌اپ"],
          ["استایل", "آرام، عملیاتی"],
          ["صفحه", "پلتفرم + داشبورد"],
          ["CTA", "کیک‌آف"],
        ]
      : [
          ["Product", "web app"],
          ["Style", "quiet, operational"],
          ["Page", "platform + dashboard"],
          ["CTA", "kickoff"],
        ];
    return (
      <div className="grid gap-2 text-start text-xs">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 rounded-lg bg-white/5 px-3 py-2">
            <span className="text-light-muted dark:text-dark-muted">{k}</span>
            <span className="font-medium text-light-text dark:text-dark-text">{v}</span>
          </div>
        ))}
      </div>
    );
  }
  if (kind === "search") {
    return (
      <div className="grid grid-cols-2 gap-2 text-start text-[11px]">
        {[
          [fa ? "استک" : "STACK", "Python + MySQL"],
          [fa ? "رابط" : "UI", fa ? "شیشه‌ای، تیره" : "Glass, dark"],
          [fa ? "فونت" : "TYPE", fa ? "وزیرمتن / گروتسک" : "Vazirmatn / Grotesk"],
          [fa ? "رنگ" : "COLOR", "#2563EB / #F97316"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-white/10 bg-white/5 p-2">
            <div className="text-[10px] tracking-wide text-primary">{k}</div>
            <div className="mt-1 font-medium text-light-text dark:text-dark-text" dir="ltr">
              {v}
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (kind === "code") {
    return (
      <pre
        dir="ltr"
        className="overflow-x-auto rounded-xl bg-gray-950 p-4 text-left font-mono text-[11px] leading-relaxed text-slate-300"
      >
        <code>{`<section className="bg-dark-bg">
  <h1 className="font-heading">
    ${fa ? "پول آرام، حساب روشن" : "Quiet money, clear books"}
  </h1>
  <button className="btn-primary">
    ${fa ? "شروع کیک‌آف" : "Start kickoff"}
  </button>
</section>`}</code>
      </pre>
    );
  }
  if (kind === "check") {
    const items = fa
      ? ["آیکون‌های SVG، بدون ایموجی", "فیدبک هاور", "کنتراست حالت تیره", "چیدمان ریسپانسیو"]
      : ["SVG icons, no emoji", "Hover feedback", "Dark-mode contrast", "Responsive layout"];
    return (
      <ul className="space-y-2 text-start text-sm">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-light-text dark:text-dark-text">
            <Check
              className="h-4 w-4 shrink-0 text-emerald-400"
              strokeWidth={2}
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-primary/20 to-accent/10 p-6 text-center">
      <div className="font-heading text-lg font-bold text-light-text dark:text-dark-text">
        {fa ? "لایو در پروداکشن" : "Live in production"}
      </div>
      <p className="mt-2 text-sm text-light-muted dark:text-dark-muted">
        {fa
          ? "اینسترومنت‌شده، مستند و تحویل‌داده‌شده."
          : "Instrumented, documented, and handed over."}
      </p>
    </div>
  );
}

export function Process() {
  const { data } = useSiteData();
  const { lang } = useLang();
  const d = t(lang).process;
  const processSteps = data.processSteps;
  return (
    <section id="how-it-works" className="section-padding bg-light-bg dark:bg-dark-bg">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="font-heading mb-4 text-3xl font-bold text-light-text sm:text-4xl md:text-5xl dark:text-dark-text">
            {d.titleA} <span className="gradient-text">{d.titleB}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-light-muted dark:text-dark-muted">
            {d.subtitle}
          </p>
        </div>

        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step) => (
            <li key={step.n} className="glass-card flex flex-col p-6 md:p-8">
              <div className="font-heading mb-3 text-sm font-bold text-primary">{step.n}</div>
              <h3 className="font-heading mb-2 text-xl font-bold text-light-text dark:text-dark-text">
                {step.title}
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-light-muted dark:text-dark-muted">
                {step.description}
              </p>
              <div className="mt-auto">
                <StepVisual kind={step.visual} fa={lang === "fa"} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
