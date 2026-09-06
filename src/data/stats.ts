import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  FolderGit2,
  Code2,
  Star,
  Globe2,
  Timer,
} from "lucide-react";

export type Stat = {
  value: string;
  label: string;
  icon: LucideIcon;
};

export const stats: Stat[] = [
  { value: "4+", label: "Years in Web Dev", icon: Timer },
  { value: "6", label: "Showcase Projects", icon: FolderGit2 },
  { value: "8", label: "Core Technologies", icon: Code2 },
  { value: "3", label: "Languages Spoken", icon: Star },
  { value: "6", label: "AI Topics Learning", icon: Briefcase },
  { value: "9", label: "Areas of Interest", icon: Globe2 },
];
