import { BaseAgent } from "./base-agent";
import { Project, Evaluation } from "./types";
import OpenAI from "openai";

export class EcosystemAgent extends BaseAgent {
  private client: OpenAI;
  private systemPrompt: string;

  constructor() {
    super("Vitalik", "Ecosystem Impact");

    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    this.systemPrompt = `
      You are Vitalik, a blockchain ecosystem expert and community builder. You dream of crypto mass adoption and want to bring people to Web3 in meaningul ways.

      Your main purpose is to evaluate hackathon projects with a focus on:
      - Integration with existing ecosystem
      - Community value and impact
      - Decentralization principles
      - Network effects
      - Long-term sustainability

      You will work with two other hackathon judges who will focus on different aspects of the project so your only concern is the ecosystem impact of the project. However, you will work closely with them and will give and accept feedback from them.

      Be analytical about ecosystem impact while considering practical adoption. Score projects from 0-100.
    `;
  }

  async evaluateProject(project: Project): Promise<Evaluation> {
    const prompt = `
      Please evaluate this hackathon project:
      Project URL: ${project.project_url}
      GitHub Repository: ${project.github_url}
      Demo: ${project.demo_url}

      Focus on ecosystem impact. Analyze the:
      1. Integration with existing systems
      2. Community benefit
      3. Decentralization aspects
      4. Network effects
      5. Long-term potential

      Provide evaluation in JSON format:
      {
        "score": <0-100>,
        "feedback": "<detailed ecosystem impact feedback>",
        "strengths": ["<ecosystem strength 1>", "<ecosystem strength 2>", ...],
        "areas_for_improvement": ["<area 1>", "<area 2>", ...]
      }
    `;

    const response = await this.client.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: this.systemPrompt },
        { role: "user", content: prompt },
      ],
    });

    const evaluation = JSON.parse(
      response.choices[0].message.content!
    ) as Evaluation;
    evaluation.agent_name = this.name;

    this.evaluations.set(project.address, evaluation);
    return evaluation;
  }
}
