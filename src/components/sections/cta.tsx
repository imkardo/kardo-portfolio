import { useSiteData } from "@/lib/site-data";
import { useLang } from "@/lib/i18n";
import { t } from "@/lib/dict";

export function Cta() {
  const { data } = useSiteData();
  const { lang } = useLang();
  const d = t(lang).cta;
  const profile = data.profile;
  return (
    <section className="section-padding relative overflow-hidden bg-light-bg dark:bg-dark-bg">
      <div className="aurora-bg absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-4xl text-center">
        <h2 className="font-heading mb-6 text-3xl font-bold text-light-text sm:text-4xl md:text-5xl dark:text-dark-text">
          {d.titleA} <span className="gradient-text">{d.titleB}</span>
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-light-muted dark:text-dark-muted">
          {d.subtitle}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#contact" className="btn-primary px-8 py-4 text-lg">
            {d.hire(profile.shortName)}
          </a>
          <a href={`mailto:${profile.email}`} className="btn-secondary px-8 py-4 text-lg">
            {d.emailInstead}
          </a>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-light-muted dark:text-dark-muted">
          {d.badges.map((badge) => (
            <div key={badge} className="flex items-center gap-2">
              <span className="text-emerald-400" aria-hidden="true">
                ✓
              </span>
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
