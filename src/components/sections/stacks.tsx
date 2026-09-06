import { useSiteData } from "@/lib/site-data";
import { useLang } from "@/lib/i18n";
import { t } from "@/lib/dict";

export function Stacks() {
  const { data } = useSiteData();
  const { lang } = useLang();
  const d = t(lang).stacks;
  const stacks = data.stacks;
  return (
    <section id="stacks" className="section-padding bg-light-bg dark:bg-dark-bg">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="font-heading mb-4 text-3xl font-bold text-light-text sm:text-4xl md:text-5xl dark:text-dark-text">
            {d.title(stacks.length)}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-light-muted dark:text-dark-muted">
            {d.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stacks.map((stack) => (
            <div key={stack.id} className="glass-card-hover p-5 text-center md:p-6">
              <h3 className="font-heading text-base font-bold text-light-text dark:text-dark-text">
                {stack.name}
              </h3>
              <p className="mt-2 text-sm text-light-muted dark:text-dark-muted">{stack.blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
