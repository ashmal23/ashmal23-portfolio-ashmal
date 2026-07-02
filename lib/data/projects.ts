export interface Project {
  title: string;
  desc: string;
  tags: string[];
  gradient: string;
  image: string;
  liveLink: string;
  githubLink: string;
  features?: string[];
  innovation?: string[];
}

export const projects: Project[] = [
  {
    title: "STUDENT RECORD MANAGEMENT SYSTEM (CONSOLE-BASED)",
    desc: "Designed and implemented a menu-driven CLI application in C and Python to manage student data (add, update, delete, search). Features a modular architecture, inputs validation, edge cases handling, and robust program reliability.",
    tags: ["C", "Python", "Data Structures", "CLI", "File I/O"],
    gradient: "from-teal-950 via-emerald-900 to-emerald-950",
    image: "/student-record-system.png",
    liveLink: "",
    githubLink: "https://github.com/ashmal23",
    features: [
      "Add, update, search, and delete student data profiles dynamically",
      "Applied modular programming using functions to improve code readability and maintainability",
      "Focused on input validation and edge case handling, improving program reliability"
    ],
    innovation: [
      "Robust CLI interface with visual menus and automated input checks",
      "Clean code structure designed for academic performance and extensibility"
    ]
  }
];