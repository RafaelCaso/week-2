import { Project, Evaluation } from "./types";
import { OpenAI } from "openai";

export abstract class BaseAgent {
  protected client!: OpenAI;
  protected name: string;
  protected speciality: string;
  protected evaluations: Map<string, Evaluation>;

  constructor(name: string, speciality: string) {
    this.name = name;
    this.speciality = speciality;
    this.evaluations = new Map();
  }

  abstract evaluateProject(project: Project): Promise<Evaluation>;

  public setClient(client: OpenAI) {
    this.client = client;
  }

  getTopPicks(n: number = 8): [string, Evaluation][] {
    return Array.from(this.evaluations.entries())
      .sort((a, b) => b[1].score - a[1].score)
      .slice(0, n);
  }
}
