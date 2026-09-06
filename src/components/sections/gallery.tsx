import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { ProjectMockup } from "@/components/mockups";
import { useSiteData } from "@/lib/site-data";
import { useLang } from "@/lib/i18n";
import { t } from "@/lib/dict";

export function Gallery() {
  const { data } = useSiteData();
  const { lang } = useLang();
  const d = t(lang).gallery;
  const gallery = data.gallery;
  const projects = data.projects;
  const [active, setActive] = useState<string | null>(null);
  const item = gallery.find((g) => g.id === active);
  const project = item ? projects.find((p) => p.id === item.projectId) : undefined;

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <section id="gallery" className="section-padding bg-light-bg dark:bg-dark-bg">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="font-heading mb-4 text-3xl font-bold text-light-text sm:text-4xl md:text-5xl dark:text-dark-text">
            {d.titleA} <span className="gradient-text">{d.titleB}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-light-muted dark:text-dark-muted">
            {d.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((entry, i) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => setActive(entry.id)}
              className={`glass-card-hover overflow-hidden p-3 text-start ${i === 0 ? "sm:col-span-2" : ""}`}
            >
              <ProjectMockup
                kind={entry.kind}
                title={entry.title}
                className={i === 0 ? "h-56 sm:h-64" : "h-44"}
              />
              <div className="px-1 pt-3">
                <div className="font-heading font-semibold text-light-text dark:text-dark-text">
                  {entry.title}
                </div>
                <div className="text-sm text-light-muted dark:text-dark-muted">{entry.caption}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {item ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-dialog-title"
          onClick={() => setActive(null)}
        >
          <div
            className="glass-card relative w-full max-w-3xl overflow-hidden p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-3 end-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10"
              onClick={() => setActive(null)}
              aria-label={d.close}
            >
              <X className="h-5 w-5" />
            </button>
            <ProjectMockup kind={item.kind} title={item.title} className="h-64 sm:h-80" />
            <h3
              id="gallery-dialog-title"
              className="font-heading mt-4 text-2xl font-bold text-light-text dark:text-dark-text"
            >
              {item.title}
            </h3>
            <p className="mt-1 text-light-muted dark:text-dark-muted">
              {item.caption}
              {project ? ` · ${project.title}` : ""}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
