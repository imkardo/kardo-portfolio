import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Briefcase,
  Code2,
  Cpu,
  FolderGit2,
  Globe2,
  Layers,
  Palette,
  Scaling,
  ShieldCheck,
  Star,
  Timer,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { profile as enProfile, navItems as enNavItems, toolChips as enToolChips, terminalCommands as enTerminalCommands } from "@/data/profile";
import { stats as enStats } from "@/data/stats";
import { services as enServices } from "@/data/services";
import { projects as enProjects, projectFilters as enProjectFilters, type Project } from "@/data/projects";
import { experience as enExperience, type Experience } from "@/data/experience";
import { skillGroups as enSkillGroups, sampleCode as enSampleCode, type SkillGroup } from "@/data/skills";
import { processSteps as enProcessSteps, type ProcessStep } from "@/data/process";
import { testimonials as enTestimonials, type Testimonial } from "@/data/testimonials";
import { gallery as enGallery, type GalleryItem } from "@/data/gallery";
import { stacks as enStacks, type Stack } from "@/data/stacks";
import { profile as faProfile, navItems as faNavItems, toolChips as faToolChips, terminalCommands as faTerminalCommands } from "@/data-fa/profile";
import { stats as faStats } from "@/data-fa/stats";
import { services as faServices } from "@/data-fa/services";
import { projects as faProjects, projectFilters as faProjectFilters } from "@/data-fa/projects";
import { experience as faExperience } from "@/data-fa/experience";
import { skillGroups as faSkillGroups, sampleCode as faSampleCode } from "@/data-fa/skills";
import { processSteps as faProcessSteps } from "@/data-fa/process";
import { testimonials as faTestimonials } from "@/data-fa/testimonials";
import { gallery as faGallery } from "@/data-fa/gallery";
import { stacks as faStacks } from "@/data-fa/stacks";
import { loadSupabase, isSupabaseConfigured } from "./supabase";
import { useLang, type Lang } from "./i18n";

export const SERVICE_ICONS = { Layers, Palette, Scaling, ShieldCheck, Workflow, Cpu } as const;
export type ServiceIconName = keyof typeof SERVICE_ICONS;

export const STAT_ICONS = { Timer, FolderGit2, Code2, Star, Briefcase, Globe2 } as const;
export type StatIconName = keyof typeof STAT_ICONS;

const SERVICE_ICON_NAMES = Object.keys(SERVICE_ICONS) as ServiceIconName[];
const STAT_ICON_NAMES = Object.keys(STAT_ICONS) as StatIconName[];

function serviceIconName(icon: LucideIcon): ServiceIconName {
  const found = SERVICE_ICON_NAMES.find((n) => SERVICE_ICONS[n] === icon);
  return found ?? "Layers";
}

function statIconName(icon: LucideIcon): StatIconName {
  const found = STAT_ICON_NAMES.find((n) => STAT_ICONS[n] === icon);
  return found ?? "Timer";
}

export type EditableService = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  iconName: ServiceIconName;
};

export type EditableStat = {
  value: string;
  label: string;
  iconName: StatIconName;
};

export type SiteData = {
  profile: Record<string, string>;
  navItems: { href: string; label: string }[];
  toolChips: string[];
  terminalCommands: string[];
  stats: EditableStat[];
  services: EditableService[];
  projects: Project[];
  projectFilters: string[];
  experience: Experience[];
  skillGroups: SkillGroup[];
  sampleCode: string;
  processSteps: ProcessStep[];
  testimonials: Testimonial[];
  gallery: GalleryItem[];
  stacks: Stack[];
};

export type SiteContent = Record<Lang, SiteData>;

function buildDefaults(lang: Lang): SiteData {
  if (lang === "fa") {
    return {
      profile: { ...(faProfile as unknown as Record<string, string>) },
      navItems: faNavItems.map((n) => ({ ...n })),
      toolChips: [...faToolChips],
      terminalCommands: [...faTerminalCommands],
      stats: faStats.map((s) => ({ ...(s as unknown as EditableStat) })),
      services: faServices.map((s) => ({
        ...(s as unknown as EditableService),
        tags: [...s.tags],
      })),
      projects: faProjects.map((p) => ({ ...(p as unknown as Project), stack: [...p.stack] })),
      projectFilters: [...faProjectFilters],
      experience: faExperience.map((e) => ({ ...(e as unknown as Experience), highlights: [...e.highlights] })),
      skillGroups: faSkillGroups.map((g) => ({
        ...(g as unknown as SkillGroup),
        items: g.items.map((i) => ({ ...i })),
      })),
      sampleCode: faSampleCode,
      processSteps: faProcessSteps.map((s) => ({ ...(s as unknown as ProcessStep) })),
      testimonials: faTestimonials.map((t) => ({ ...(t as unknown as Testimonial) })),
      gallery: faGallery.map((g) => ({ ...(g as unknown as GalleryItem) })),
      stacks: faStacks.map((s) => ({ ...(s as unknown as Stack) })),
    };
  }
  return {
    profile: { ...(enProfile as unknown as Record<string, string>) },
    navItems: enNavItems.map((n) => ({ ...n })),
    toolChips: [...enToolChips],
    terminalCommands: [...enTerminalCommands],
    stats: enStats.map((s) => ({ value: s.value, label: s.label, iconName: statIconName(s.icon) })),
    services: enServices.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      tags: [...s.tags],
      iconName: serviceIconName(s.icon),
    })),
    projects: enProjects.map((p) => ({ ...p, stack: [...p.stack] })),
    projectFilters: [...enProjectFilters],
    experience: enExperience.map((e) => ({ ...e, highlights: [...e.highlights] })),
    skillGroups: enSkillGroups.map((g) => ({
      ...g,
      items: g.items.map((i) => ({ ...i })),
    })),
    sampleCode: enSampleCode,
    processSteps: enProcessSteps.map((s) => ({ ...s })),
    testimonials: enTestimonials.map((t) => ({ ...t })),
    gallery: enGallery.map((g) => ({ ...g })),
    stacks: enStacks.map((s) => ({ ...s })),
  };
}

function defaultContent(): SiteContent {
  return { en: buildDefaults("en"), fa: buildDefaults("fa") };
}

export function resolveServiceIcon(name: string): LucideIcon {
  return (SERVICE_ICONS as Record<string, LucideIcon>)[name] ?? Layers;
}

export function resolveStatIcon(name: string): LucideIcon {
  return (STAT_ICONS as Record<string, LucideIcon>)[name] ?? Timer;
}

const STORAGE_KEY = "kardo-site-overrides-v3";

type SiteContextValue = {
  /** Active site-language content (what visitors see). */
  data: SiteData;
  /** Both languages (admin editing). */
  content: SiteContent;
  loadedFrom: "defaults" | "local" | "syncing" | "supabase" | "sync-failed";
  supabaseReady: boolean;
  editLang: Lang;
  setEditLang: (lang: Lang) => void;
  saveSection: <K extends keyof SiteData>(key: K, value: SiteData[K], lang?: Lang) => void;
  resetAll: () => void;
  exportJson: () => string;
  importJson: (json: string) => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

function mergeContent(base: SiteContent, overrides: Partial<SiteContent>): SiteContent {
  return {
    en: { ...base.en, ...(overrides.en ?? {}) },
    fa: { ...base.fa, ...(overrides.fa ?? {}) },
  };
}

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const { lang } = useLang();
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const overrides = JSON.parse(raw) as Partial<SiteContent>;
        return mergeContent(defaultContent(), overrides);
      }
    } catch {
      /* ignore */
    }
    return defaultContent();
  });
  const [loadedFrom, setLoadedFrom] = useState<SiteContextValue["loadedFrom"]>(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) ? "local" : "defaults";
    } catch {
      return "defaults";
    }
  });
  const [editLang, setEditLang] = useState<Lang>("en");

  // Refs so saveSection stays stable while always writing latest content/editLang.
  const contentRef = useRef(content);
  contentRef.current = content;
  const editLangRef = useRef(editLang);
  editLangRef.current = editLang;

  // Pull shared content from Supabase when configured (DB wins over local).
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    (async () => {
      try {
        const sb = await loadSupabase();
        if (!sb || cancelled) return;
        const { data: rows, error } = await sb.from("site_content").select("key,data");
        if (error || cancelled || !rows) return;
        const overrides: { en: Record<string, unknown>; fa: Record<string, unknown> } = { en: {}, fa: {} };
        let count = 0;
        for (const row of rows as { key: string; data: unknown }[]) {
          if (row.key === "en" || row.key === "fa") {
            // Whole-language rows (current scheme): merge all keys at once.
            Object.assign(overrides[row.key], (row.data ?? {}) as Record<string, unknown>);
            count++;
            continue;
          }
          const sep = row.key.indexOf(":");
          if (sep > 0) {
            const l = row.key.slice(0, sep) as Lang;
            const k = row.key.slice(sep + 1);
            if (l === "en" || l === "fa") {
              overrides[l][k] = row.data;
              count++;
            }
          } else {
            // Legacy v2 single-language rows → treat as English.
            overrides.en[row.key] = row.data;
            count++;
          }
        }
        if (count > 0 && !cancelled) {
          setContent(mergeContent(defaultContent(), overrides as unknown as Partial<SiteContent>));
          setLoadedFrom("supabase");
        }
      } catch {
        /* stay on local defaults */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback((next: SiteContent) => {
    setContent(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setLoadedFrom(isSupabaseConfigured ? "supabase" : "local");
    } catch {
      /* storage full / private mode */
    }
    if (isSupabaseConfigured) {
      // Two writes total (one per language) instead of one per key.
      void (async () => {
        const sb = await loadSupabase();
        if (!sb) {
          setLoadedFrom("local");
          return;
        }
        try {
          const now = new Date().toISOString();
          const results = await Promise.all([
            sb.from("site_content").upsert({ key: "en", data: next.en, updated_at: now }, { onConflict: "key" }),
            sb.from("site_content").upsert({ key: "fa", data: next.fa, updated_at: now }, { onConflict: "key" }),
          ]);
          setLoadedFrom(results.some((r) => r.error) ? "sync-failed" : "supabase");
        } catch {
          setLoadedFrom("sync-failed");
        }
      })();
    }
  }, []);

  const saveSection = useCallback(
    <K extends keyof SiteData>(key: K, value: SiteData[K], target?: Lang) => {
      const l = target ?? editLangRef.current;
      persist({ ...contentRef.current, [l]: { ...contentRef.current[l], [key]: value } });
    },
    [persist],
  );

  const resetAll = useCallback(() => {
    const fresh = defaultContent();
    setContent(fresh);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setLoadedFrom("defaults");
  }, []);

  const exportJson = useCallback(() => JSON.stringify(content, null, 2), [content]);

  const importJson = useCallback(
    (json: string) => {
      const parsed = JSON.parse(json) as Partial<SiteContent>;
      persist(mergeContent(defaultContent(), parsed));
    },
    [persist],
  );

  const value = useMemo<SiteContextValue>(
    () => ({
      data: content[lang],
      content,
      loadedFrom,
      supabaseReady: isSupabaseConfigured,
      editLang,
      setEditLang,
      saveSection,
      resetAll,
      exportJson,
      importJson,
    }),
    [content, lang, loadedFrom, editLang, saveSection, resetAll, exportJson, importJson],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSiteData(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSiteData must be used inside SiteDataProvider");
  return ctx;
}
