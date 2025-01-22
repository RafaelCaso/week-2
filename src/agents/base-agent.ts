import { Project, Evaluation } from "./types";

export abstract class BaseAgent {
  protected name: string;
  protected speciality: string;
  protected evaluations: Map<string, Evaluation>;

  constructor(name: string, speciality: string) {
    this.name = name;
    this.speciality = speciality;
    this.evaluations = new Map();
  }

  abstract evaluateProject(project: Project): Promise<Evaluation>;

  getTopPicks(n: number = 8): [string, Evaluation][] {
    return Array.from(this.evaluations.entries())
      .sort((a, b) => b[1].score - a[1].score)
      .slice(0, n);
  }
}
