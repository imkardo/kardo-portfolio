import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadSupabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  SERVICE_ICONS,
  STAT_ICONS,
  useSiteData,
  type EditableService,
  type EditableStat,
  type SiteData,
} from "@/lib/site-data";
import type { Experience } from "@/data/experience";
import type { GalleryItem } from "@/data/gallery";
import type { ProcessStep } from "@/data/process";
import type { Project } from "@/data/projects";
import type { SkillGroup } from "@/data/skills";
import type { Stack } from "@/data/stacks";
import type { Testimonial } from "@/data/testimonials";

const ADMIN_EMAIL = "kardoheydari.1387@gmail.com";
const LOCAL_PASSWORD = (import.meta.env.VITE_ADMIN_PASSWORD as string | undefined) || "heidari1387";
const SESSION_KEY = "kardo-admin-session";

type Inquiry = {
  name: string;
  email: string;
  project: string;
  budget: string;
  message: string;
  at: string;
};

const TABS = [
  "Profile",
  "Projects",
  "Services",
  "Testimonials",
  "Stacks",
  "Gallery",
  "Experience",
  "Skills",
  "Process",
  "Stats",
  "Content",
  "Inquiries",
  "Settings",
] as const;
type Tab = (typeof TABS)[number];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-light-muted dark:text-dark-muted">{label}</span>
      {children}
    </label>
  );
}

/**
 * Local draft state bound to the admin's active edit language.
 * Re-syncs whenever the admin switches EN/FA or content reloads.
 */
function useEditSection<K extends keyof SiteData>(key: K) {
  const { content, editLang } = useSiteData();
  const [value, setValue] = useState<SiteData[K]>(() => content[editLang][key]);
  useEffect(() => {
    setValue(content[editLang][key]);
  }, [content, editLang, key]);
  return [value, setValue] as const;
}

function useAdminSession() {
  const [authed, setAuthed] = useState(() => {
    try {
      return window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [supabaseUser, setSupabaseUser] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    let sub: { unsubscribe: () => void } | null = null;
    void loadSupabase().then((sb) => {
      if (!sb || cancelled) return;
      sb.auth.getSession().then(({ data }) => {
        if (cancelled) return;
        const email = data.session?.user?.email ?? null;
        if (email) {
          setSupabaseUser(email);
          setAuthed(true);
        }
      });
      const { data } = sb.auth.onAuthStateChange((_e, session) => {
        const email = session?.user?.email ?? null;
        setSupabaseUser(email);
        setAuthed(Boolean(email));
      });
      sub = { unsubscribe: () => data.subscription.unsubscribe() };
    });
    return () => {
      cancelled = true;
      sub?.unsubscribe();
    };
  }, []);

  return { authed, setAuthed, supabaseUser };
}

export default function Admin() {
  const { authed, setAuthed, supabaseUser } = useAdminSession();
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("Projects");
  const { editLang, setEditLang } = useSiteData();

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (isSupabaseConfigured) {
      const sb = await loadSupabase();
      if (!sb) {
        setError("Backend not reachable. Check Supabase env vars.");
        return;
      }
      const { error: signInError } = await sb.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message);
        return;
      }
      setAuthed(true);
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
    } else {
      if (password === LOCAL_PASSWORD) {
        setAuthed(true);
        try {
          window.sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          /* ignore */
        }
      } else {
        setError("Wrong password. Set VITE_ADMIN_PASSWORD or use heidari1387 locally.");
      }
    }
  }

  async function logout() {
    if (isSupabaseConfigured) {
      await (await loadSupabase())?.auth.signOut();
    }
    try {
      window.sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
    setAuthed(false);
    setPassword("");
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-light-bg px-4 dark:bg-dark-bg">
        <form onSubmit={login} className="glass-card w-full max-w-sm p-6 sm:p-8">
          <h1 className="font-heading mb-1 text-2xl font-bold">Admin</h1>
          <p className="mb-6 text-sm text-light-muted dark:text-dark-muted">
            {isSupabaseConfigured
              ? `Sign in as ${ADMIN_EMAIL} (Supabase Auth).`
              : "Local mode — no backend configured yet. Use your admin password."}
          </p>
          {isSupabaseConfigured ? (
            <div className="grid gap-4">
              <Field label="Email">
                <input className="field" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Field>
              <Field label="Password">
                <input
                  className="field"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>
            </div>
          ) : (
            <Field label="Password">
              <input
                className="field"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="heidari1387"
                required
              />
            </Field>
          )}
          {error ? (
            <p className="mt-3 text-sm text-red-400" role="alert">
              {error}
            </p>
          ) : null}
          <button type="submit" className="btn-primary mt-6 w-full justify-center">
            Sign in
          </button>
          <Link to="/" className="mt-4 block text-center text-sm text-light-muted dark:text-dark-muted">
            ← Back to site
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text">
      <header className="border-b border-light-border dark:border-dark-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <h1 className="font-heading text-xl font-bold">Site admin</h1>
            <p className="text-xs text-light-muted dark:text-dark-muted">
              {supabaseUser ? `Signed in as ${supabaseUser} · Supabase` : "Local session"} ·{" "}
              <Link to="/" className="underline">
                view site
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="flex items-center rounded-full bg-white/5 ring-1 ring-black/5 dark:ring-white/10"
              role="group"
              aria-label="Edit language"
            >
              {(["en", "fa"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setEditLang(l)}
                  className={
                    editLang === l
                      ? "rounded-full bg-primary px-4 py-2 text-sm text-white"
                      : "rounded-full px-4 py-2 text-sm text-light-muted dark:text-dark-muted"
                  }
                >
                  {l === "en" ? "English" : "فارسی"}
                </button>
              ))}
            </div>
            <button type="button" className="btn-secondary px-4 py-2 text-sm" onClick={logout}>
              Sign out
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-3">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={
                tab === t
                  ? "rounded-full bg-primary px-4 py-2 text-sm text-white"
                  : "rounded-full bg-white/5 px-4 py-2 text-sm ring-1 ring-black/5 dark:ring-white/10"
              }
            >
              {t}
            </button>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        {tab === "Profile" ? <ProfileEditor /> : null}
        {tab === "Projects" ? <ProjectsEditor /> : null}
        {tab === "Services" ? <ServicesEditor /> : null}
        {tab === "Testimonials" ? <TestimonialsEditor /> : null}
        {tab === "Stacks" ? <StacksEditor /> : null}
        {tab === "Gallery" ? <GalleryEditor /> : null}
        {tab === "Experience" ? <ExperienceEditor /> : null}
        {tab === "Skills" ? <SkillsEditor /> : null}
        {tab === "Process" ? <ProcessEditor /> : null}
        {tab === "Stats" ? <StatsEditor /> : null}
        {tab === "Content" ? <ContentEditor /> : null}
        {tab === "Inquiries" ? <InquiriesView /> : null}
        {tab === "Settings" ? <SettingsPanel /> : null}
      </main>
    </div>
  );
}

function ProfileEditor() {
  const { saveSection, editLang } = useSiteData();
  const [draft, setDraft] = useEditSection("profile");
  return (
    <div className="glass-card p-6">
      <h2 className="font-heading mb-4 text-lg font-bold">
        Profile ({editLang === "en" ? "English" : "فارسی"})
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {Object.entries(draft).map(([key, value]) => (
          <Field key={key} label={key}>
            <input
              className="field"
              value={value}
              onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
            />
          </Field>
        ))}
      </div>
      <button
        type="button"
        className="btn-primary mt-6"
        onClick={() => saveSection("profile", draft)}
      >
        Save profile
      </button>
    </div>
  );
}

function ProjectsEditor() {
  const { saveSection } = useSiteData();
  const [items, setItems] = useEditSection("projects");
  const update = (id: string, patch: Partial<Project>) =>
    setItems(items.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold">Projects ({items.length})</h2>
        <div className="flex gap-2">
          <button
            type="button"
            className="btn-secondary px-4 py-2 text-sm"
            onClick={() =>
              setItems([
                ...items,
                {
                  id: `project-${Date.now()}`,
                  title: "New project",
                  category: "Product",
                  year: String(new Date().getFullYear()),
                  summary: "",
                  outcome: "",
                  stack: [] as string[],
                  href: "#gallery",
                  accent: "blue" as const,
                },
              ])
            }
          >
            + Add
          </button>
          <button
            type="button"
            className="btn-primary px-4 py-2 text-sm"
            onClick={() => saveSection("projects", items)}
          >
            Save
          </button>
        </div>
      </div>
      {items.map((p) => (
        <div key={p.id} className="glass-card grid gap-3 p-4 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Title">
              <input className="field" value={p.title} onChange={(e) => update(p.id, { title: e.target.value })} />
            </Field>
            <Field label="ID (unique)">
              <input className="field" value={p.id} onChange={(e) => update(p.id, { id: e.target.value })} />
            </Field>
            <Field label="Category">
              <select
                className="field"
                value={p.category}
                onChange={(e) => update(p.id, { category: e.target.value as Project["category"] })}
              >
                {["Platform", "Product", "Infra", "Interface"].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Year">
              <input className="field" value={p.year} onChange={(e) => update(p.id, { year: e.target.value })} />
            </Field>
          </div>
          <Field label="Summary">
            <textarea className="field" value={p.summary} onChange={(e) => update(p.id, { summary: e.target.value })} />
          </Field>
          <Field label="Outcome">
            <input className="field" value={p.outcome} onChange={(e) => update(p.id, { outcome: e.target.value })} />
          </Field>
          <Field label="Stack (comma separated)">
            <input
              className="field"
              value={p.stack.join(", ")}
              onChange={(e) =>
                update(p.id, { stack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })
              }
            />
          </Field>
          <button
            type="button"
            className="justify-self-start text-sm text-red-400"
            onClick={() => setItems(items.filter((x) => x.id !== p.id))}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

function ServicesEditor() {
  const { saveSection } = useSiteData();
  const [items, setItems] = useEditSection("services");
  const update = (id: string, patch: Partial<EditableService>) =>
    setItems(items.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold">Services ({items.length})</h2>
        <div className="flex gap-2">
          <button
            type="button"
            className="btn-secondary px-4 py-2 text-sm"
            onClick={() =>
              setItems([...items, { id: `service-${Date.now()}`, title: "New service", description: "", tags: [] as string[], iconName: "Layers" as const }])
            }
          >
            + Add
          </button>
          <button type="button" className="btn-primary px-4 py-2 text-sm" onClick={() => saveSection("services", items)}>
            Save
          </button>
        </div>
      </div>
      {items.map((s) => (
        <div key={s.id} className="glass-card grid gap-3 p-4 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Title">
              <input className="field" value={s.title} onChange={(e) => update(s.id, { title: e.target.value })} />
            </Field>
            <Field label="Icon">
              <select
                className="field"
                value={s.iconName}
                onChange={(e) => update(s.id, { iconName: e.target.value as EditableService["iconName"] })}
              >
                {Object.keys(SERVICE_ICONS).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Description">
            <textarea className="field" value={s.description} onChange={(e) => update(s.id, { description: e.target.value })} />
          </Field>
          <Field label="Tags (comma separated)">
            <input
              className="field"
              value={s.tags.join(", ")}
              onChange={(e) => update(s.id, { tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
            />
          </Field>
          <button type="button" className="justify-self-start text-sm text-red-400" onClick={() => setItems(items.filter((x) => x.id !== s.id))}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

function TestimonialsEditor() {
  const { saveSection } = useSiteData();
  const [items, setItems] = useEditSection("testimonials");
  const update = (id: string, patch: Partial<Testimonial>) =>
    setItems(items.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold">Testimonials ({items.length})</h2>
        <div className="flex gap-2">
          <button
            type="button"
            className="btn-secondary px-4 py-2 text-sm"
            onClick={() => setItems([...items, { id: `t-${Date.now()}`, quote: "", name: "", role: "", company: "" }])}
          >
            + Add
          </button>
          <button type="button" className="btn-primary px-4 py-2 text-sm" onClick={() => saveSection("testimonials", items)}>
            Save
          </button>
        </div>
      </div>
      {items.map((t) => (
        <div key={t.id} className="glass-card grid gap-3 p-4 sm:p-6">
          <Field label="Quote">
            <textarea className="field" value={t.quote} onChange={(e) => update(t.id, { quote: e.target.value })} />
          </Field>
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Name">
              <input className="field" value={t.name} onChange={(e) => update(t.id, { name: e.target.value })} />
            </Field>
            <Field label="Role">
              <input className="field" value={t.role} onChange={(e) => update(t.id, { role: e.target.value })} />
            </Field>
            <Field label="Company">
              <input className="field" value={t.company} onChange={(e) => update(t.id, { company: e.target.value })} />
            </Field>
          </div>
          <button type="button" className="justify-self-start text-sm text-red-400" onClick={() => setItems(items.filter((x) => x.id !== t.id))}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

function StacksEditor() {
  const { saveSection } = useSiteData();
  const [items, setItems] = useEditSection("stacks");
  const update = (id: string, patch: Partial<Stack>) =>
    setItems(items.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold">Stacks ({items.length})</h2>
        <div className="flex gap-2">
          <button type="button" className="btn-secondary px-4 py-2 text-sm" onClick={() => setItems([...items, { id: `s-${Date.now()}`, name: "", blurb: "" }])}>
            + Add
          </button>
          <button type="button" className="btn-primary px-4 py-2 text-sm" onClick={() => saveSection("stacks", items)}>
            Save
          </button>
        </div>
      </div>
      {items.map((s) => (
        <div key={s.id} className="glass-card grid gap-3 p-4 sm:grid-cols-2">
          <Field label="Name">
            <input className="field" value={s.name} onChange={(e) => update(s.id, { name: e.target.value })} />
          </Field>
          <Field label="Blurb">
            <input className="field" value={s.blurb} onChange={(e) => update(s.id, { blurb: e.target.value })} />
          </Field>
          <button type="button" className="justify-self-start text-sm text-red-400 sm:col-span-2" onClick={() => setItems(items.filter((x) => x.id !== s.id))}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

function GalleryEditor() {
  const { saveSection, content, editLang } = useSiteData();
  const [items, setItems] = useEditSection("gallery");
  const update = (id: string, patch: Partial<GalleryItem>) =>
    setItems(items.map((g) => (g.id === id ? { ...g, ...patch } : g)));
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold">Gallery ({items.length})</h2>
        <div className="flex gap-2">
          <button
            type="button"
            className="btn-secondary px-4 py-2 text-sm"
            onClick={() => setItems([...items, { id: `g-${Date.now()}`, title: "", caption: "", projectId: content[editLang].projects[0]?.id ?? "", kind: "dashboard" as const }])}
          >
            + Add
          </button>
          <button type="button" className="btn-primary px-4 py-2 text-sm" onClick={() => saveSection("gallery", items)}>
            Save
          </button>
        </div>
      </div>
      {items.map((g) => (
        <div key={g.id} className="glass-card grid gap-3 p-4 sm:grid-cols-2">
          <Field label="Title">
            <input className="field" value={g.title} onChange={(e) => update(g.id, { title: e.target.value })} />
          </Field>
          <Field label="Caption">
            <input className="field" value={g.caption} onChange={(e) => update(g.id, { caption: e.target.value })} />
          </Field>
          <Field label="Project ID">
            <input className="field" value={g.projectId} onChange={(e) => update(g.id, { projectId: e.target.value })} />
          </Field>
          <Field label="Kind">
            <select className="field" value={g.kind} onChange={(e) => update(g.id, { kind: e.target.value as GalleryItem["kind"] })}>
              {["dashboard", "mobile", "terminal", "system", "ledger", "map"].map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </Field>
          <button type="button" className="justify-self-start text-sm text-red-400 sm:col-span-2" onClick={() => setItems(items.filter((x) => x.id !== g.id))}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

function ExperienceEditor() {
  const { saveSection } = useSiteData();
  const [items, setItems] = useEditSection("experience");
  const update = (id: string, patch: Partial<Experience>) =>
    setItems(items.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold">Experience ({items.length})</h2>
        <div className="flex gap-2">
          <button type="button" className="btn-secondary px-4 py-2 text-sm" onClick={() => setItems([...items, { id: `job-${Date.now()}`, role: "", company: "", period: "", location: "", highlights: [] }])}>
            + Add
          </button>
          <button type="button" className="btn-primary px-4 py-2 text-sm" onClick={() => saveSection("experience", items)}>
            Save
          </button>
        </div>
      </div>
      {items.map((job) => (
        <div key={job.id} className="glass-card grid gap-3 p-4 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Role">
              <input className="field" value={job.role} onChange={(e) => update(job.id, { role: e.target.value })} />
            </Field>
            <Field label="Company">
              <input className="field" value={job.company} onChange={(e) => update(job.id, { company: e.target.value })} />
            </Field>
            <Field label="Period">
              <input className="field" value={job.period} onChange={(e) => update(job.id, { period: e.target.value })} />
            </Field>
            <Field label="Location">
              <input className="field" value={job.location} onChange={(e) => update(job.id, { location: e.target.value })} />
            </Field>
          </div>
          <Field label="Highlights (one per line)">
            <textarea
              className="field"
              value={job.highlights.join("\n")}
              onChange={(e) => update(job.id, { highlights: e.target.value.split("\n").map((l) => l.trim()).filter(Boolean) })}
            />
          </Field>
          <button type="button" className="justify-self-start text-sm text-red-400" onClick={() => setItems(items.filter((x) => x.id !== job.id))}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

function SkillsEditor() {
  const { saveSection } = useSiteData();
  const [groups, setGroups] = useEditSection("skillGroups");
  const [code, setCode] = useEditSection("sampleCode");
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold">Skill groups</h2>
        <button
          type="button"
          className="btn-primary px-4 py-2 text-sm"
          onClick={() => {
            saveSection("skillGroups", groups);
            saveSection("sampleCode", code);
          }}
        >
          Save
        </button>
      </div>
      {groups.map((g, gi) => (
        <div key={g.id} className="glass-card p-4 sm:p-6">
          <Field label="Group title">
            <input
              className="field"
              value={g.title}
              onChange={(e) => setGroups(groups.map((x, i) => (i === gi ? { ...x, title: e.target.value } : x)))}
            />
          </Field>
          <div className="mt-3 grid gap-2">
            {g.items.map((item, ii) => (
              <div key={item.name} className="grid grid-cols-[1fr_90px_auto] items-center gap-2">
                <input
                  className="field"
                  value={item.name}
                  onChange={(e) =>
                    setGroups(
                      groups.map((x, i) =>
                        i === gi ? { ...x, items: x.items.map((it, j) => (j === ii ? { ...it, name: e.target.value } : it)) } : x,
                      ),
                    )
                  }
                />
                <input
                  className="field"
                  type="number"
                  min={0}
                  max={100}
                  value={item.level}
                  onChange={(e) =>
                    setGroups(
                      groups.map((x, i) =>
                        i === gi ? { ...x, items: x.items.map((it, j) => (j === ii ? { ...it, level: Number(e.target.value) } : it)) } : x,
                      ),
                    )
                  }
                />
                <button
                  type="button"
                  className="text-sm text-red-400"
                  onClick={() => setGroups(groups.map((x, i) => (i === gi ? { ...x, items: x.items.filter((_, j) => j !== ii) } : x)))}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              className="justify-self-start text-sm text-primary"
              onClick={() => setGroups(groups.map((x, i) => (i === gi ? { ...x, items: [...x.items, { name: "New skill", level: 70 }] } : x)))}
            >
              + Add skill
            </button>
          </div>
        </div>
      ))}
      <div className="glass-card p-4 sm:p-6">
        <Field label="Sample code (slo.ts)">
          <textarea className="field font-mono" rows={10} value={code} onChange={(e) => setCode(e.target.value)} />
        </Field>
      </div>
    </div>
  );
}

function ProcessEditor() {
  const { saveSection } = useSiteData();
  const [items, setItems] = useEditSection("processSteps");
  const update = (n: string, patch: Partial<ProcessStep>) =>
    setItems(items.map((s) => (s.n === n ? { ...s, ...patch } : s)));
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold">Process steps</h2>
        <button type="button" className="btn-primary px-4 py-2 text-sm" onClick={() => saveSection("processSteps", items)}>
          Save
        </button>
      </div>
      {items.map((s) => (
        <div key={s.n} className="glass-card grid gap-3 p-4 sm:grid-cols-2">
          <Field label="Step number">
            <input className="field" value={s.n} onChange={(e) => update(s.n, { n: e.target.value })} />
          </Field>
          <Field label="Title">
            <input className="field" value={s.title} onChange={(e) => update(s.n, { title: e.target.value })} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Description">
              <textarea className="field" value={s.description} onChange={(e) => update(s.n, { description: e.target.value })} />
            </Field>
          </div>
        </div>
      ))}
    </div>
  );
}

function StatsEditor() {
  const { saveSection } = useSiteData();
  const [items, setItems] = useEditSection("stats");
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold">Stats</h2>
        <button type="button" className="btn-primary px-4 py-2 text-sm" onClick={() => saveSection("stats", items)}>
          Save
        </button>
      </div>
      {items.map((s, i) => (
        <div key={`${s.label}-${i}`} className="glass-card grid gap-3 p-4 sm:grid-cols-3">
          <Field label="Value">
            <input className="field" value={s.value} onChange={(e) => setItems(items.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))} />
          </Field>
          <Field label="Label">
            <input className="field" value={s.label} onChange={(e) => setItems(items.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))} />
          </Field>
          <Field label="Icon">
            <select className="field" value={s.iconName} onChange={(e) => setItems(items.map((x, j) => (j === i ? { ...x, iconName: e.target.value as EditableStat["iconName"] } : x)))}>
              {Object.keys(STAT_ICONS).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </Field>
        </div>
      ))}
    </div>
  );
}

function ContentEditor() {
  const { saveSection } = useSiteData();
  const [toolChipsValue, setToolChipsValue] = useEditSection("toolChips");
  const [terminalValue, setTerminalValue] = useEditSection("terminalCommands");
  const [navValue, setNavValue] = useEditSection("navItems");
  const [chips, setChips] = useState(toolChipsValue.join(", "));
  const [commands, setCommands] = useState(terminalValue.join("\n"));
  const [nav, setNav] = useState(navValue.map((n) => `${n.label}|${n.href}`).join("\n"));
  useEffect(() => {
    setChips(toolChipsValue.join(", "));
    setCommands(terminalValue.join("\n"));
    setNav(navValue.map((n) => `${n.label}|${n.href}`).join("\n"));
  }, [toolChipsValue, terminalValue, navValue]);
  return (
    <div className="glass-card grid gap-4 p-6">
      <h2 className="font-heading text-lg font-bold">Nav, chips, terminal</h2>
      <Field label="Tool chips (comma separated)">
        <input className="field" value={chips} onChange={(e) => setChips(e.target.value)} />
      </Field>
      <Field label="Terminal commands (one per line)">
        <textarea className="field" rows={5} value={commands} onChange={(e) => setCommands(e.target.value)} />
      </Field>
      <Field label="Nav items (Label|#href, one per line)">
        <textarea className="field" rows={7} value={nav} onChange={(e) => setNav(e.target.value)} />
      </Field>
      <button
        type="button"
        className="btn-primary justify-self-start"
        onClick={() => {
          saveSection("toolChips", chips.split(",").map((s) => s.trim()).filter(Boolean));
          saveSection("terminalCommands", commands.split("\n").map((s) => s.trim()).filter(Boolean));
          saveSection(
            "navItems",
            nav
              .split("\n")
              .map((l) => l.trim())
              .filter(Boolean)
              .map((l) => {
                const [label, href] = l.split("|").map((s) => s.trim());
                return { label: label ?? l, href: href ?? "#top" };
              }),
          );
        }}
      >
        Save content
      </button>
    </div>
  );
}

function InquiriesView() {
  const [items, setItems] = useState<Inquiry[]>([]);
  useEffect(() => {
    try {
      setItems(JSON.parse(window.localStorage.getItem("kardo-inquiries") ?? "[]") as Inquiry[]);
    } catch {
      setItems([]);
    }
    if (isSupabaseConfigured) {
      void loadSupabase().then((sb) =>
        sb
          ?.from("inquiries")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(50)
          .then(({ data }) => {
            if (data) {
              setItems((prev) => [
                ...(data as Inquiry[]),
                ...prev,
              ]);
            }
          }),
      );
    }
  }, []);
  if (items.length === 0) return <p className="text-sm text-light-muted dark:text-dark-muted">No inquiries yet.</p>;
  return (
    <div className="space-y-3">
      {items.map((q, i) => (
        <div key={`${q.at}-${i}`} className="glass-card p-4">
          <div className="flex flex-wrap justify-between gap-2 text-sm">
            <strong>
              {q.name} · {q.email}
            </strong>
            <span className="text-light-muted dark:text-dark-muted">{q.at}</span>
          </div>
          <p className="mt-2 text-sm">{q.message}</p>
          <p className="mt-1 text-xs text-light-muted dark:text-dark-muted">
            {q.project} · {q.budget}
          </p>
        </div>
      ))}
    </div>
  );
}

function SettingsPanel() {
  const { loadedFrom, supabaseReady, exportJson, importJson, resetAll } = useSiteData();
  const [text, setText] = useState("");
  return (
    <div className="grid gap-4">
      <div className="glass-card p-6">
        <h2 className="font-heading mb-2 text-lg font-bold">Backend status</h2>
        <p className="text-sm text-light-muted dark:text-dark-muted">
          Content source: <strong>{loadedFrom}</strong> · Supabase:{" "}
          <strong>{supabaseReady ? "configured" : "not configured (local mode)"}</strong>
        </p>
        {!supabaseReady ? (
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm">
            <li>Create a free project at supabase.com.</li>
            <li>Run supabase/schema.sql in the SQL editor, then create user {ADMIN_EMAIL} in Auth.</li>
            <li>Copy Project URL + anon key into .env as VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY and redeploy.</li>
          </ol>
        ) : null}
      </div>
      <div className="glass-card p-6">
        <h2 className="font-heading mb-2 text-lg font-bold">Export / import</h2>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-secondary px-4 py-2 text-sm" onClick={() => setText(exportJson())}>
            Export to text
          </button>
          <button
            type="button"
            className="btn-secondary px-4 py-2 text-sm"
            onClick={() => {
              try {
                importJson(text);
              } catch {
                /* invalid json */
              }
            }}
          >
            Import from text
          </button>
          <button
            type="button"
            className="btn-secondary px-4 py-2 text-sm"
            onClick={() => {
              void navigator.clipboard?.writeText(exportJson());
            }}
          >
            Copy JSON
          </button>
          <button type="button" className="px-4 py-2 text-sm text-red-400" onClick={resetAll}>
            Reset to defaults
          </button>
        </div>
        <textarea className="field mt-4 font-mono" rows={10} value={text} onChange={(e) => setText(e.target.value)} placeholder="Exported JSON appears here…" />
      </div>
    </div>
  );
}
