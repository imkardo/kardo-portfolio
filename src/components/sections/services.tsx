import { resolveServiceIcon, useSiteData } from "@/lib/site-data";
import { useLang } from "@/lib/i18n";
import { t } from "@/lib/dict";

export function Services() {
  const { data } = useSiteData();
  const { lang } = useLang();
  const d = t(lang).services;
  const services = data.services;
  return (
    <section id="services" className="section-padding bg-light-bg dark:bg-dark-bg">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="font-heading mb-4 text-3xl font-bold text-light-text sm:text-4xl md:text-5xl dark:text-dark-text">
            {d.titleA} <span className="gradient-text">{d.titleB}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-light-muted dark:text-dark-muted">
            {d.subtitle}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = resolveServiceIcon(service.iconName);
            return (
              <article key={service.id} className="glass-card-hover group p-6 md:p-8">
                <div className="mb-4 text-primary transition-colors duration-200 group-hover:text-accent">
                  <Icon className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="font-heading mb-3 text-xl font-bold text-light-text dark:text-dark-text">
                  {service.title}
                </h3>
                <p className="mb-4 leading-relaxed text-light-muted dark:text-dark-muted">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
