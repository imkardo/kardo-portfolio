import { useEffect, useMemo, useState } from "react";
import { ProjectMockup } from "@/components/mockups";
import { useSiteData } from "@/lib/site-data";
import { useLang } from "@/lib/i18n";
import { t } from "@/lib/dict";
import type { Project } from "@/data/projects";
import type { GalleryItem } from "@/data/gallery";
import { cn } from "@/lib/utils";

function coverFor(project: Project, gallery: GalleryItem[]) {
  return gallery.find((g) => g.projectId === project.id)?.kind ?? "dashboard";
}

export function Projects() {
  const { data } = useSiteData();
  const { lang } = useLang();
  const d = t(lang).projects;
  const projects = data.projects;
  const gallery = data.gallery;
  const projectFilters = data.projectFilters;
  const allLabel = d.all;
  const [filter, setFilter] = useState<string>(allLabel);
  const visible = useMemo(
    () => (filter === allLabel ? projects : projects.filter((p) => p.category === filter)),
    [filter, allLabel, projects],
  );
  useEffect(() => setFilter(allLabel), [allLabel]);

  return (
    <section id="projects" className="section-padding bg-light-bg dark:bg-dark-bg">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="font-heading mb-4 text-3xl font-bold text-light-text sm:text-4xl md:text-5xl dark:text-dark-text">
            {d.titleA} <span className="gradient-text">{d.titleB}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-light-muted dark:text-dark-muted">
            {d.subtitle}
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {projectFilters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={cn(
                "min-h-11 rounded-full px-4 text-sm font-medium transition-colors",
                filter === item
                  ? "bg-primary text-white"
                  : "bg-white/5 text-light-muted ring-1 ring-black/5 dark:text-dark-muted dark:ring-white/10",
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <article key={project.id} className="glass-card-hover group overflow-hidden">
              <div className="p-3 pb-0">
                <ProjectMockup
                  kind={coverFor(project, gallery)}
                  title={project.id}
                  className="h-40 rounded-[0.85rem]"
                />
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between gap-3 text-xs text-light-muted dark:text-dark-muted">
                  <span className="chip">{project.category}</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="font-heading mb-2 text-xl font-bold text-light-text dark:text-dark-text">
                  {project.title}
                </h3>
                <p className="mb-3 text-sm leading-relaxed text-light-muted dark:text-dark-muted">
                  {project.summary}
                </p>
                <p className="mb-4 text-sm font-medium text-primary">{project.outcome}</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-light-muted dark:text-dark-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
