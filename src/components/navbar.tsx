import { useEffect, useState } from "react";
import { Languages, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { useLang } from "@/lib/i18n";
import { t } from "@/lib/dict";
import { useSiteData } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { data } = useSiteData();
  const { lang, setLang } = useLang();
  const d = t(lang).nav;
  const navItems = data.navItems;
  const profile = data.profile;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <nav
        className={cn(
          "pointer-events-auto fixed top-4 right-4 left-4 z-50 mx-auto max-w-6xl rounded-2xl border border-gray-200/80 bg-white/85 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/85 dark:shadow-2xl",
          scrolled && "shadow-xl dark:shadow-2xl",
        )}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between sm:h-16">
            <Logo />

            <div className="hidden items-center gap-6 md:flex lg:gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-light-muted transition-colors duration-200 hover:text-light-text dark:text-dark-muted dark:hover:text-dark-text"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div
                className="flex h-11 items-center gap-1 rounded-full border border-gray-200/80 bg-white/60 px-1.5 dark:border-white/10 dark:bg-white/5"
                role="group"
                aria-label="Language / زبان"
              >
                <Languages className="ms-1 h-4 w-4 shrink-0 text-light-muted dark:text-dark-muted" />
                {(
                  [
                    { code: "en", label: "EN" },
                    { code: "fa", label: "فارسی" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => setLang(opt.code)}
                    aria-pressed={lang === opt.code}
                    className={cn(
                      "flex h-8 items-center rounded-full px-2.5 text-xs font-semibold transition-all",
                      lang === opt.code
                        ? "bg-primary text-white shadow"
                        : "text-light-muted hover:text-light-text dark:text-dark-muted dark:hover:text-dark-text",
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <a href="#contact" className="btn-primary hidden px-4 py-2 text-sm sm:inline-flex">
                {d.hireMe}
              </a>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-lg text-light-text md:hidden dark:text-dark-text"
                aria-label={open ? d.closeMenu : d.openMenu}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {open ? (
          <div className="border-t border-gray-200/80 px-4 py-3 md:hidden dark:border-white/10">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-xl px-3 text-sm text-light-text dark:text-dark-text"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-2 justify-center text-sm"
              >
                {d.hireMe} — {profile.availability}
              </a>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
