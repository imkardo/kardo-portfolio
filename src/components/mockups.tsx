import { cn } from "@/lib/utils";

type Kind = "dashboard" | "mobile" | "terminal" | "system" | "ledger" | "map";

function WindowChrome({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
      <span className="h-2 w-2 rounded-full bg-red-400/80" />
      <span className="h-2 w-2 rounded-full bg-amber-400/80" />
      <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
      <span className="ms-2 truncate font-mono text-[10px] text-slate-400">{title}</span>
    </div>
  );
}

export function ProjectMockup({
  kind,
  title,
  className,
}: {
  kind: Kind;
  title: string;
  className?: string;
}) {
  return (
    <div
      dir="ltr"
      className={cn(
        "relative h-full min-h-40 overflow-hidden rounded-2xl bg-[#0b1220] text-left shadow-inner",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_0%,#2563eb33,transparent),radial-gradient(50%_40%_at_100%_80%,#f9731626,transparent)]" />
      <div className="relative flex h-full flex-col">
        <WindowChrome title={title} />
        <div className="flex-1 p-3">
          {kind === "dashboard" ? <DashboardArt /> : null}
          {kind === "ledger" ? <LedgerArt /> : null}
          {kind === "system" ? <SystemArt /> : null}
          {kind === "terminal" ? <TerminalArt /> : null}
          {kind === "map" ? <MapArt /> : null}
          {kind === "mobile" ? <MobileArt /> : null}
        </div>
      </div>
    </div>
  );
}

function DashboardArt() {
  return (
    <div className="grid h-full grid-cols-3 gap-2">
      <div className="col-span-2 space-y-2">
        {[72, 48, 90, 36, 64].map((w, i) => (
          <div key={i} className="flex items-end gap-1">
            <div className="h-2 rounded bg-primary/70" style={{ width: `${w}%` }} />
            <div className="h-2 flex-1 rounded bg-white/10" />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-16 rounded-lg bg-white/5 ring-1 ring-white/10" />
        <div className="h-16 rounded-lg bg-accent/20 ring-1 ring-white/10" />
      </div>
    </div>
  );
}

function LedgerArt() {
  return (
    <div className="space-y-2">
      {["EUR 12,400", "USD 8,210", "GBP 3,040"].map((row, i) => (
        <div
          key={row}
          className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 ring-1 ring-white/10"
        >
          <span className="font-mono text-[11px] text-slate-300">{row}</span>
          <span
            className={cn(
              "h-1.5 w-12 rounded-full",
              i === 0 ? "bg-primary" : i === 1 ? "bg-accent" : "bg-white/20",
            )}
          />
        </div>
      ))}
    </div>
  );
}

function SystemArt() {
  return (
    <div className="grid h-full grid-cols-2 gap-2">
      <div className="rounded-lg bg-white/5 p-2 ring-1 ring-white/10">
        <div className="mb-2 h-2 w-16 rounded bg-primary/60" />
        <div className="space-y-1.5">
          <div className="h-2 w-full rounded bg-white/10" />
          <div className="h-2 w-4/5 rounded bg-white/10" />
          <div className="h-2 w-3/5 rounded bg-white/10" />
        </div>
      </div>
      <div className="rounded-lg bg-linear-to-br from-primary/20 to-transparent p-2 ring-1 ring-white/10">
        <div className="mb-2 h-2 w-12 rounded bg-accent/70" />
        <div className="h-16 rounded bg-white/5" />
      </div>
    </div>
  );
}

function TerminalArt() {
  return (
    <div className="font-mono text-[11px] leading-5 text-emerald-300/90">
      <div>
        <span className="text-accent">$</span> harbor status
      </div>
      <div>prod ● healthy · 12 pods</div>
      <div>canary ● 8% traffic</div>
      <div className="text-slate-400">rollout 04:12 remaining</div>
    </div>
  );
}

function MapArt() {
  return (
    <div className="grid h-full grid-cols-6 grid-rows-4 gap-1">
      {Array.from({ length: 24 }, (_, i) => (
        <div
          key={i}
          className="rounded-sm"
          style={{
            backgroundColor:
              i % 7 === 0 ? "#f97316aa" : i % 3 === 0 ? "#2563eb99" : "rgba(255,255,255,0.08)",
          }}
        />
      ))}
    </div>
  );
}

function MobileArt() {
  return (
    <div className="mx-auto h-full max-w-[140px] rounded-[1.4rem] bg-black/40 p-2 ring-1 ring-white/15">
      <div className="mb-2 h-1.5 w-10 mx-auto rounded-full bg-white/20" />
      <div className="space-y-2">
        <div className="h-8 rounded-lg bg-linear-to-r from-primary to-primary-light" />
        <div className="h-10 rounded-lg bg-white/10 ring-1 ring-white/10" />
        <div className="h-10 rounded-lg bg-white/10 ring-1 ring-white/10" />
      </div>
    </div>
  );
}
