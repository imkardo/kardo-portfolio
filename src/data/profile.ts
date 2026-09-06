export const profile = {
  name: "Kardo Heidari",
  shortName: "Kardo",
  initials: "KH",
  title: "Python Developer",
  headline: "Software Engineering & AI Foundations",
  tagline: "Python Developer | Software Engineering & AI",
  summary:
    "Software engineering student focused on Python and the foundations of Artificial Intelligence. Previously worked in web development with JavaScript, React, HTML, CSS, PHP, Laravel, and WordPress — now building toward Python-based software development and AI, on top of mathematics, algorithms, data structures, and statistics.",
  about:
    "I started in web development — responsive interfaces, component-based frontends, backend logic with PHP and Laravel, CMS work with WordPress, and databases like MySQL and MariaDB. Now my focus is Python and AI: linear algebra, probability and statistics, algorithms and data structures, OOP, data analysis, and machine learning fundamentals.",
  email: "kardoheydari.1387@gmail.com",
  phone: "",
  location: "Tehran, Iran",
  availability: "Open to internships & junior roles",
  github: "https://github.com/imkardo",
  linkedin: "https://github.com/imkardo",
  resumeUrl: "#resume",
} as const;

export const navItems = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#gallery", label: "Gallery" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
] as const;

export const toolChips = [
  "Python",
  "Mathematics for AI",
  "Linear Algebra",
  "Statistics",
  "Algorithms",
  "Data Structures",
  "Git",
  "Linux",
] as const;

export const terminalCommands = [
  "view portfolio",
  "cat skills.json",
  "git log --oneline -n 5",
  "hire --engineer kardo",
] as const;
