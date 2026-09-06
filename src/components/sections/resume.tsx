import { useSiteData } from "@/lib/site-data";
import { useLang } from "@/lib/i18n";
import { t } from "@/lib/dict";

export function Resume() {
  const { data } = useSiteData();
  const { lang } = useLang();
  const d = t(lang).resume;
  const experience = data.experience;
  const skillGroups = data.skillGroups;
  const sampleCode = data.sampleCode;
  return (
    <section id="resume" className="section-padding bg-light-bg dark:bg-dark-bg">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="font-heading mb-4 text-3xl font-bold text-light-text sm:text-4xl md:text-5xl dark:text-dark-text">
            {d.titleA} <span className="gradient-text">{d.titleB}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-light-muted dark:text-dark-muted">
            {d.subtitle}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative space-y-6">
            <div className="absolute top-3 bottom-3 start-[11px] w-px bg-white/10 max-sm:hidden" />
            {experience.map((job) => (
              <article key={job.id} className="glass-card relative p-6 sm:ml-8">
                <span className="absolute top-8 -start-8 hidden h-3 w-3 rounded-full bg-primary ring-4 ring-dark-bg sm:block" />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-heading text-lg font-bold text-light-text dark:text-dark-text">
                    {job.role}
                  </h3>
                  <span className="text-sm text-light-muted dark:text-dark-muted">{job.period}</span>
                </div>
                <div className="mt-1 text-sm text-primary">
                  {job.company} · {job.location}
                </div>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-light-muted dark:text-dark-muted">
                  {job.highlights.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="space-y-6">
            {skillGroups.map((group) => (
              <div key={group.id} className="glass-card p-6">
                <h3 className="font-heading mb-4 text-base font-bold text-light-text dark:text-dark-text">
                  {group.title}
                </h3>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="text-light-text dark:text-dark-text">{item.name}</span>
                        <span className="tabular-nums text-light-muted dark:text-dark-muted">
                          {item.level}%
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent rtl:bg-gradient-to-l"
                          style={{ width: `${item.level}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="overflow-hidden rounded-2xl bg-gray-950 ring-1 ring-white/10">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-red-400/80" />
                <span className="h-2 w-2 rounded-full bg-amber-400/80" />
                <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                <span className="ms-2 font-mono text-[11px] text-slate-400" dir="ltr">code.py</span>
              </div>
              <pre dir="ltr" className="overflow-x-auto p-4 text-left font-mono text-[11px] leading-relaxed text-slate-300 sm:text-xs">
                <code>{sampleCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
