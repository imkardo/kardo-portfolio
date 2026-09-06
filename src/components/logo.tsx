import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  const uid = "k";
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn("h-8 w-8", className)}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}-g`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
        <linearGradient id={`${uid}-i`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" stroke={`url(#${uid}-g)`} strokeWidth="3" fill="none" />
      <rect x="14" y="14" width="12" height="12" rx="2" fill={`url(#${uid}-g)`} opacity="0.9" />
      <rect x="18" y="18" width="12" height="12" rx="2" fill={`url(#${uid}-i)`} opacity="0.8" />
      <rect x="22" y="22" width="12" height="12" rx="2" fill={`url(#${uid}-g)`} opacity="0.9" />
      <circle cx="36" cy="12" r="2" fill="#F97316" />
      <circle cx="12" cy="36" r="1.5" fill="#3B82F6" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#top" className={cn("group flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="font-heading hidden text-base font-bold text-light-text transition-colors group-hover:text-primary sm:inline sm:text-lg dark:text-dark-text">
        Kardo
      </span>
    </a>
  );
}
