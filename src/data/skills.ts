export type SkillGroup = {
  id: string;
  title: string;
  items: { name: string; level: number }[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    items: [
      { name: "Python", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "PHP", level: 75 },
      { name: "SQL", level: 78 },
      { name: "HTML / CSS", level: 85 },
    ],
  },
  {
    id: "platform",
    title: "Platform & Web",
    items: [
      { name: "React", level: 80 },
      { name: "Laravel", level: 72 },
      { name: "WordPress", level: 78 },
      { name: "MySQL / MariaDB", level: 76 },
      { name: "REST APIs", level: 78 },
    ],
  },
  {
    id: "foundations",
    title: "AI Foundations (learning)",
    items: [
      { name: "Linear Algebra", level: 65 },
      { name: "Probability & Statistics", level: 68 },
      { name: "Algorithms & Data Structures", level: 70 },
      { name: "OOP", level: 75 },
      { name: "Data Analysis", level: 62 },
    ],
  },
];

export const sampleCode = `def mean(values: list[float]) -> float:
    return sum(values) / len(values)


def variance(values: list[float]) -> float:
    m = mean(values)
    return sum((x - m) ** 2 for x in values) / len(values)


class Student:
    def __init__(self, name: str, focus: str) -> None:
        self.name = name
        self.focus = focus

    def studying(self) -> str:
        return f"{self.name} is learning {self.focus}"`;
