import { useEffect, useState } from "react";
import { resolveStatIcon, useSiteData } from "@/lib/site-data";
import { useLang } from "@/lib/i18n";
import { t } from "@/lib/dict";

function TerminalPrompt({ commands }: { commands: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"type" | "hold" | "delete">("type");

  useEffect(() => {
    const command = commands[index] ?? "";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setText(command);
      return;
    }

    let timer: number;
    if (phase === "type") {
      if (text.length < command.length) {
        timer = window.setTimeout(() => setText(command.slice(0, text.length + 1)), 55);
      } else {
        timer = window.setTimeout(() => setPhase("hold"), 1400);
      }
    } else if (phase === "hold") {
      timer = window.setTimeout(() => setPhase("delete"), 400);
    } else if (text.length > 0) {
      timer = window.setTimeout(() => setText((t) => t.slice(0, -1)), 28);
    } else {
      setIndex((i) => (i + 1) % Math.max(commands.length, 1));
      setPhase("type");
    }
    return () => window.clearTimeout(timer);
  }, [index, phase, text, commands]);

  return (
    <div className="mb-8 flex justify-center px-4 sm:mb-10" dir="ltr" aria-hidden="true">
      <div className="w-full max-w-xs rounded-lg bg-gray-900 px-3 py-2.5 font-mono text-xs shadow-xl sm:max-w-sm sm:px-4 sm:py-3 sm:text-sm">
        <div className="text-gray-400">
          <span className="text-accent">$</span> <span className="text-white">{text}</span>
          <span className="cursor-blink text-white" aria-hidden="true">
            ▋
          </span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const { data } = useSiteData();
  const { lang } = useLang();
  const d = t(lang).hero;
  const profile = data.profile;
  const stats = data.stats;
  const toolChips = data.toolChips;
  const terminalCommands = data.terminalCommands;
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-light-bg dark:bg-dark-bg"
    >
      <div className="aurora-bg absolute inset-0 opacity-60 dark:opacity-100" />
      <div className="animate-float absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/30 blur-3xl sm:h-96 sm:w-96" />
      <div
        className="animate-float absolute right-1/4 bottom-1/4 h-52 w-52 rounded-full bg-accent/20 blur-3xl sm:h-80 sm:w-80"
        style={{ animationDelay: "-3s" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-20 pb-12 text-center sm:px-6 sm:pt-24 sm:pb-16 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-1.5 px-2 sm:mb-8 sm:gap-2">
          {toolChips.map((chip) => (
            <div
              key={chip}
              className="glass-card inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary-light" />
              <span className="text-light-text dark:text-dark-text">{chip}</span>
            </div>
          ))}
        </div>

        <div className="stagger-in">
          <h1 className="font-heading mb-4 text-3xl font-bold text-balance text-light-text sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl dark:text-dark-text">
            <span className="gradient-text">{profile.name}</span>
            <br />
            <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl">{profile.headline}</span>
          </h1>
          <p className="mx-auto mb-6 max-w-2xl px-4 text-sm text-balance text-light-muted sm:mb-8 sm:text-lg md:text-xl dark:text-dark-muted">
            {profile.tagline}. {d.taglineSuffix}
          </p>
        </div>

        <TerminalPrompt commands={terminalCommands} />

        <div className="mb-12 flex flex-col items-center justify-center gap-3 px-4 sm:mb-16 sm:flex-row sm:gap-4">
          <a
            href="#contact"
            className="btn-primary w-full max-w-xs justify-center px-5 py-3 text-sm sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
          >
            {d.hireMe}
          </a>
          <a
            href="#projects"
            className="btn-secondary w-full max-w-xs justify-center px-5 py-3 text-sm sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
          >
            {d.viewWork}
          </a>
        </div>

        <div className="grid grid-cols-2 gap-2 px-1 sm:grid-cols-3 sm:gap-3 sm:px-2 md:gap-4 lg:grid-cols-6">
          {stats.map((stat) => {
            const Icon = resolveStatIcon(stat.iconName);
            return (
              <div
                key={stat.label}
                className="glass-card-hover group p-3 text-center sm:p-4 md:p-5"
              >
                <div className="mb-1 flex justify-center text-primary transition-colors duration-200 group-hover:scale-110 group-hover:text-accent sm:mb-3">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div className="font-heading mb-0.5 text-xl font-bold gradient-text sm:mb-1 sm:text-2xl md:text-3xl">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-light-muted sm:text-xs md:text-sm dark:text-dark-muted">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
