import { LogoMark } from "@/components/logo";
import { useLang } from "@/lib/i18n";
import { t } from "@/lib/dict";
import { useSiteData } from "@/lib/site-data";

export function Footer() {
  const { data } = useSiteData();
  const { lang } = useLang();
  const d = t(lang).footer;
  const profile = data.profile;
  const navItems = data.navItems;
  const stats = data.stats;
  return (
    <footer className="border-t border-light-border bg-light-bg dark:border-dark-border dark:bg-dark-bg">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-5 sm:gap-8">
          <div className="col-span-2 sm:col-span-1">
            <div className="mb-3 flex items-center gap-2 sm:mb-4">
              <LogoMark className="h-6 w-6 sm:h-8 sm:w-8" />
              <span className="font-heading text-sm font-bold text-light-text sm:text-lg dark:text-dark-text">
                {profile.name}
              </span>
            </div>
            <p className="hidden text-sm text-light-muted sm:block dark:text-dark-muted">
              {d.tagline}
            </p>
          </div>

          <div>
            <h4 className="font-heading mb-2 text-xs font-bold text-light-text sm:mb-4 sm:text-base dark:text-dark-text">
              {d.navigate}
            </h4>
            <ul className="space-y-1 text-xs sm:space-y-2 sm:text-sm">
              {navItems.slice(0, 4).map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-light-muted transition-colors hover:text-light-text dark:text-dark-muted dark:hover:text-dark-text"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading mb-2 text-xs font-bold text-light-text sm:mb-4 sm:text-base dark:text-dark-text">
              {d.practice}
            </h4>
            <ul className="space-y-1 text-xs text-light-muted sm:space-y-2 sm:text-sm dark:text-dark-muted">
              {stats.slice(0, 5).map((s) => (
                <li key={s.label}>
                  {s.value} {s.label}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading mb-2 text-xs font-bold text-light-text sm:mb-4 sm:text-base dark:text-dark-text">
              {d.connect}
            </h4>
            <ul className="space-y-1 text-xs sm:space-y-2 sm:text-sm">
              <li>
                <a
                  href={profile.github}
                  className="text-light-muted transition-colors hover:text-light-text dark:text-dark-muted dark:hover:text-dark-text"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  className="text-light-muted transition-colors hover:text-light-text dark:text-dark-muted dark:hover:text-dark-text"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-light-muted transition-colors hover:text-light-text dark:text-dark-muted dark:hover:text-dark-text"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-light-muted transition-colors hover:text-light-text dark:text-dark-muted dark:hover:text-dark-text"
                >
                  {d.hireMe}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading mb-2 text-xs font-bold text-light-text sm:mb-4 sm:text-base dark:text-dark-text">
              {d.status}
            </h4>
            <ul className="space-y-1 text-xs sm:space-y-2 sm:text-sm">
              <li className="text-light-muted dark:text-dark-muted">{profile.location}</li>
              <li className="text-light-muted dark:text-dark-muted">{profile.availability}</li>
              <li>
                <a
                  href="#resume"
                  className="text-light-muted transition-colors hover:text-light-text dark:text-dark-muted dark:hover:text-dark-text"
                >
                  {d.resume}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-light-border pt-6 sm:mt-8 sm:flex-row sm:pt-8 dark:border-dark-border">
          <p className="text-[10px] text-light-muted sm:text-sm dark:text-dark-muted">
            {d.builtWith} <span className="gradient-text">{profile.name}</span>)
          </p>
          <p className="text-[10px] text-light-muted sm:text-sm dark:text-dark-muted">
            © {new Date().getFullYear()} · {d.practiceLine}
          </p>
        </div>
      </div>
    </footer>
  );
}
