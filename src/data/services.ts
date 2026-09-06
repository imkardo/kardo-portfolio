import type { LucideIcon } from "lucide-react";
import {
  Layers,
  Palette,
  Scaling,
  ShieldCheck,
  Workflow,
  Cpu,
} from "lucide-react";

export type Service = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    id: "python",
    title: "Python Development",
    description:
      "Python-based software development with clean OOP structure — scripts, small tools, and data-oriented programs.",
    tags: ["Python", "OOP", "CLI tools"],
    icon: Layers,
  },
  {
    id: "frontend",
    title: "Frontend Development",
    description:
      "Responsive, component-based interfaces with React, HTML, CSS, and Tailwind — from previous web work.",
    tags: ["React", "Tailwind", "Responsive"],
    icon: Palette,
  },
  {
    id: "backend",
    title: "Backend & CMS",
    description:
      "Server-side logic with PHP and Laravel, CMS sites with WordPress, and REST API integration.",
    tags: ["Laravel", "WordPress", "REST APIs"],
    icon: Scaling,
  },
  {
    id: "data",
    title: "Databases",
    description:
      "Practical experience with MySQL and MariaDB — schema design, queries, and wiring data to applications.",
    tags: ["MySQL", "MariaDB", "SQL"],
    icon: ShieldCheck,
  },
  {
    id: "tooling",
    title: "Linux & Git Workflow",
    description:
      "Comfortable on Ubuntu/Debian/Fedora with the command line, Git/GitHub, Node.js, npm, and Composer.",
    tags: ["Linux", "Git", "CLI"],
    icon: Workflow,
  },
  {
    id: "ai-foundations",
    title: "Data & AI Foundations",
    description:
      "Currently building the base: linear algebra, statistics, algorithms and data structures, data analysis, and ML fundamentals.",
    tags: ["Statistics", "Algorithms", "ML basics"],
    icon: Cpu,
  },
];
