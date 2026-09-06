export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  outcome: string;
  stack: string[];
  href: string;
  accent: "blue" | "amber" | "slate";
};

export const projects: Project[] = [
  {
    id: "react-ui",
    title: "React Marketing Site",
    category: "Interface",
    year: "2023",
    summary:
      "Responsive marketing site built with React and Tailwind CSS — component-based layout with API-driven content sections.",
    outcome: "Shipped · responsive · component-based",
    stack: ["React", "Tailwind CSS", "JavaScript"],
    href: "#gallery",
    accent: "blue",
  },
  {
    id: "laravel-api",
    title: "Laravel REST Backend",
    category: "Platform",
    year: "2023",
    summary:
      "Backend logic and REST endpoints in PHP with Laravel, backed by MySQL — auth, validation, and clean JSON responses.",
    outcome: "Shipped · REST · validated",
    stack: ["PHP", "Laravel", "MySQL"],
    href: "#gallery",
    accent: "amber",
  },
  {
    id: "wordpress-site",
    title: "WordPress Business Site",
    category: "Product",
    year: "2022",
    summary:
      "CMS-driven business site on WordPress — theme setup, content structure, and practical customizations.",
    outcome: "Shipped · CMS · maintainable",
    stack: ["WordPress", "PHP", "MySQL"],
    href: "#gallery",
    accent: "slate",
  },
  {
    id: "php-mysql",
    title: "PHP + MySQL App",
    category: "Platform",
    year: "2022",
    summary:
      "Server-side web app with PHP and MariaDB — forms, sessions, database CRUD, and deployment on Linux.",
    outcome: "Shipped · CRUD · Linux-hosted",
    stack: ["PHP", "MariaDB", "Linux"],
    href: "#gallery",
    accent: "blue",
  },
  {
    id: "api-integration",
    title: "API Integration Frontend",
    category: "Product",
    year: "2023",
    summary:
      "React frontend wired to REST APIs with state management — loading states, error handling, and Git-based workflow.",
    outcome: "Shipped · API-driven · tested flows",
    stack: ["React", "REST APIs", "Git"],
    href: "#gallery",
    accent: "amber",
  },
  {
    id: "python-start",
    title: "Python Learning Projects",
    category: "Infra",
    year: "2024",
    summary:
      "Current work: Python scripts and small programs covering OOP, data analysis basics, and algorithm practice.",
    outcome: "In progress · OOP · data basics",
    stack: ["Python", "Git", "Linux"],
    href: "#gallery",
    accent: "slate",
  },
];

export const projectFilters = ["All", "Platform", "Product", "Infra", "Interface"] as const;
