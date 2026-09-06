export type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  projectId: string;
  kind: "dashboard" | "mobile" | "terminal" | "system" | "ledger" | "map";
};

export const gallery: GalleryItem[] = [
  {
    id: "g1",
    title: "React interface",
    caption: "Component-based marketing layout",
    projectId: "react-ui",
    kind: "dashboard",
  },
  {
    id: "g2",
    title: "API console",
    caption: "Laravel endpoints and responses",
    projectId: "laravel-api",
    kind: "ledger",
  },
  {
    id: "g3",
    title: "CMS editor",
    caption: "WordPress content setup",
    projectId: "wordpress-site",
    kind: "system",
  },
  {
    id: "g4",
    title: "Server terminal",
    caption: "PHP app running on Linux",
    projectId: "php-mysql",
    kind: "terminal",
  },
  {
    id: "g5",
    title: "Data view",
    caption: "API-driven frontend states",
    projectId: "api-integration",
    kind: "map",
  },
  {
    id: "g6",
    title: "Python sketch",
    caption: "Learning projects in progress",
    projectId: "python-start",
    kind: "mobile",
  },
];
