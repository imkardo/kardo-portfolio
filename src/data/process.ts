export type ProcessStep = {
  n: string;
  title: string;
  description: string;
  visual: "prompt" | "reason" | "search" | "code" | "check" | "result";
};

export const processSteps: ProcessStep[] = [
  {
    n: "01",
    title: "Discovery",
    description:
      "A short, sharp brief. Goals, constraints, users, and the one metric that would make the work worth doing.",
    visual: "prompt",
  },
  {
    n: "02",
    title: "Architecture",
    description:
      "Boundaries, data, and failure modes on one page. We agree on the shape before a line of production code lands.",
    visual: "reason",
  },
  {
    n: "03",
    title: "Design & Stack",
    description:
      "Interface, tokens, and the smallest stack that can carry the load. No fashion — just fit.",
    visual: "search",
  },
  {
    n: "04",
    title: "Build",
    description:
      "Vertical slices, preview deploys, and typed contracts. You see working software every week, not a big reveal.",
    visual: "code",
  },
  {
    n: "05",
    title: "Harden",
    description:
      "Tests, traces, a11y, and a quality bar that would survive a Friday deploy. Checklists, not vibes.",
    visual: "check",
  },
  {
    n: "06",
    title: "Ship & Steward",
    description:
      "Production, runbooks, and a clean handoff. I stay close through the first real traffic, then step back.",
    visual: "result",
  },
];
