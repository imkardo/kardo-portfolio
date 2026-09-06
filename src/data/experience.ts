export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    id: "python-ai",
    role: "Python & AI Foundations",
    company: "Self-directed study",
    period: "2024 — Present",
    location: "Tehran, Iran",
    highlights: [
      "Learning Python for software development, OOP, and data analysis.",
      "Studying mathematics for AI: linear algebra, probability, and statistics.",
      "Working through algorithms, data structures, and machine learning fundamentals.",
    ],
  },
  {
    id: "web-dev",
    role: "Web Developer",
    company: "Freelance & practical work",
    period: "2021 — 2024",
    location: "Remote",
    highlights: [
      "Built responsive interfaces with JavaScript, React, HTML, CSS, and Tailwind CSS.",
      "Worked on backend logic with PHP and Laravel, plus WordPress and CMS sites.",
      "Used MySQL and MariaDB, REST APIs, Git/GitHub, Node.js, npm, and Composer on Linux.",
    ],
  },
  {
    id: "diploma",
    role: "Technical Diploma — Network & Software",
    company: "National University of Skills — Saqqez",
    period: "Completed",
    location: "Saqqez, Iran",
    highlights: [
      "Studied programming, computer networks, and software fundamentals.",
      "Worked with databases and web technologies.",
    ],
  },
];
