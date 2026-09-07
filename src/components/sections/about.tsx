import { useSiteData } from "@/lib/site-data";
import { useLang } from "@/lib/i18n";
import { t } from "@/lib/dict";

export function About() {
  const { data } = useSiteData();
  const { lang } = useLang();
  const d = t(lang).about;
  const profile = data.profile;
  return (
    <section id="about" className="section-padding overflow-hidden bg-light-bg dark:bg-dark-bg">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-3 text-sm font-medium tracking-wide text-primary">{d.eyebrow}</p>
          <h2 className="font-heading mb-4 text-3xl font-bold text-light-text sm:text-4xl md:text-5xl dark:text-dark-text">
            {d.titleA} <span className="gradient-text">{d.titleB}</span>
          </h2>
          <p className="mb-4 max-w-2xl text-lg leading-relaxed text-light-muted dark:text-dark-muted">
            {profile.about}
          </p>
          <p className="max-w-2xl leading-relaxed text-light-muted dark:text-dark-muted">
            {profile.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <div className="glass-card px-4 py-3 text-sm">
              <div className="text-xs text-light-muted dark:text-dark-muted">{d.based}</div>
              <div className="font-heading font-semibold text-light-text dark:text-dark-text">
                {profile.location}
              </div>
            </div>
            <div className="glass-card px-4 py-3 text-sm">
              <div className="text-xs text-light-muted dark:text-dark-muted">{d.status}</div>
              <div className="font-heading font-semibold text-light-text dark:text-dark-text">
                {profile.availability}
              </div>
            </div>
            <div className="glass-card px-4 py-3 text-sm">
              <div className="text-xs text-light-muted dark:text-dark-muted">{d.contact}</div>
              <a
                href={`mailto:${profile.email}`}
                className="font-heading font-semibold text-primary"
              >
                {profile.email}
              </a>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md overflow-hidden">
          <div className="absolute -top-8 -right-6 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-8 -left-6 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="glass-card relative overflow-hidden p-8">
            <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent p-[3px]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-dark-card">
                <span className="font-heading text-3xl font-bold text-dark-text">
                  {profile.initials}
                </span>
              </div>
            </div>
            <div className="text-center">
              <div className="font-heading text-xl font-bold text-light-text dark:text-dark-text">
                {profile.name}
              </div>
              <div className="mt-1 text-sm text-light-muted dark:text-dark-muted">
                {profile.title}
              </div>
            </div>
            <pre
              dir="ltr"
              className="mt-6 overflow-x-auto rounded-xl bg-gray-950 p-4 font-mono text-[11px] leading-relaxed text-slate-300 text-left"
            >
              <code>
                {`const engineer = {
  name: "${profile.name}",
  focus: ["systems", "product"],
  ships: true,
}`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
