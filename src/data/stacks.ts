export type Stack = {
  id: string;
  name: string;
  blurb: string;
};

export const stacks: Stack[] = [
  { id: "py", name: "Python", blurb: "My main language going forward" },
  { id: "ai", name: "ML Fundamentals", blurb: "Math, stats, and core concepts" },
  { id: "da", name: "Data Analysis", blurb: "Working with data in Python" },
  { id: "react", name: "React", blurb: "Component-based interfaces" },
  { id: "laravel", name: "Laravel / PHP", blurb: "Backend logic and APIs" },
  { id: "wp", name: "WordPress", blurb: "CMS sites that ship fast" },
  { id: "db", name: "MySQL / MariaDB", blurb: "Practical database experience" },
  { id: "tools", name: "Git & Linux", blurb: "Ubuntu, CLI, and version control" },
];
