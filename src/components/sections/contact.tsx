import { useState, type FormEvent } from "react";
import { useSiteData } from "@/lib/site-data";
import { useLang } from "@/lib/i18n";
import { t } from "@/lib/dict";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

const STORAGE_KEY = "kardo-inquiries";

type Inquiry = {
  name: string;
  email: string;
  project: string;
  budget: string;
  message: string;
  at: string;
};

export function Contact() {
  const { data } = useSiteData();
  const { lang } = useLang();
  const d = t(lang).contact;
  const profile = data.profile;
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const inquiry: Inquiry = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      project: String(data.get("project") ?? "").trim(),
      budget: String(data.get("budget") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      at: new Date().toISOString(),
    };

    if (!inquiry.name || !inquiry.email || !inquiry.message) {
      setError(d.requiredError);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
      setError(d.invalidEmailError);
      return;
    }

    try {
      const existing = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as Inquiry[];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([inquiry, ...existing].slice(0, 50)));
      if (isSupabaseConfigured) {
        void getSupabase()
          ?.from("inquiries")
          .insert({
            name: inquiry.name,
            email: inquiry.email,
            project: inquiry.project,
            budget: inquiry.budget,
            message: inquiry.message,
          });
      }
      setSent(true);
      form.reset();
    } catch {
      setError(d.saveError);
    }
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-light-card dark:bg-dark-card">
      <div className="aurora-bg absolute inset-0 opacity-30" />
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="font-heading mb-4 text-3xl font-bold text-light-text sm:text-4xl md:text-5xl dark:text-dark-text">
            {d.titleA} <span className="gradient-text">{d.titleB}</span>
          </h2>
          <p className="mb-8 max-w-md text-lg text-light-muted dark:text-dark-muted">
            {d.subtitle}
          </p>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-light-muted dark:text-dark-muted">{d.email}</dt>
              <dd>
                <a href={`mailto:${profile.email}`} className="font-medium text-primary">
                  {profile.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-light-muted dark:text-dark-muted">{d.location}</dt>
              <dd className="text-light-text dark:text-dark-text">{profile.location}</dd>
            </div>
            <div>
              <dt className="text-light-muted dark:text-dark-muted">{d.availability}</dt>
              <dd className="text-light-text dark:text-dark-text">{profile.availability}</dd>
            </div>
          </dl>
        </div>

        <form onSubmit={onSubmit} className="glass-card p-6 sm:p-8" noValidate>
          {sent ? (
            <div className="flex min-h-64 flex-col items-center justify-center text-center">
              <p className="font-heading text-2xl font-bold text-light-text dark:text-dark-text">
                {d.received}
              </p>
              <p className="mt-2 max-w-sm text-light-muted dark:text-dark-muted">
                {d.receivedBody(profile.email)}
              </p>
              <button type="button" className="btn-secondary mt-6" onClick={() => setSent(false)}>
                {d.sendAnother}
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1.5 block text-light-muted dark:text-dark-muted">{d.name}</span>
                  <input name="name" className="field" autoComplete="name" required />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block text-light-muted dark:text-dark-muted">{d.emailField}</span>
                  <input
                    name="email"
                    type="email"
                    className="field"
                    autoComplete="email"
                    required
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1.5 block text-light-muted dark:text-dark-muted">
                    {d.projectType}
                  </span>
                  <select name="project" className="field">
                    {d.projectOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block text-light-muted dark:text-dark-muted">{d.budget}</span>
                  <select name="budget" className="field">
                    {d.budgetOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="block text-sm">
                <span className="mb-1.5 block text-light-muted dark:text-dark-muted">{d.message}</span>
                <textarea name="message" className="field min-h-32" required />
              </label>
              {error ? (
                <p className="text-sm text-red-400" role="alert">
                  {error}
                </p>
              ) : null}
              <button type="submit" className="btn-primary justify-center text-base">
                {d.send}
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
