export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "lena",
    quote:
      "Kardo Heidari is the rare engineer who can hold the product, the architecture, and the calendar at the same time. We shipped in a quarter what had been stuck for a year.",
    name: "Lena Voss",
    role: "VP Engineering",
    company: "Helios Pay",
  },
  {
    id: "omar",
    quote:
      "The observability work paid for itself in the first incident. We stopped guessing and started reading the system.",
    name: "Omar Haddad",
    role: "CTO",
    company: "Northwind Labs",
  },
  {
    id: "mira",
    quote:
      "Our design system finally feels like a product. Designers and engineers share a language, and the UI stopped drifting.",
    name: "Mira Chen",
    role: "Head of Design",
    company: "Cascade",
  },
];
