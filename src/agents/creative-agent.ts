import { BaseAgent } from "./base-agent";
import { Project, Evaluation } from "./types";
import OpenAI from "openai";

export class CreativeAgent extends BaseAgent {
  private client: OpenAI;
  private systemPrompt: string;

  constructor() {
    super("Gertrude", "Creativity");

    this.client = new OpenAI({
      apiKey: process.env.OPENAI_KEY!,
    });

    this.systemPrompt = `
    You are Gertrude, a respected product designer, artist, and innovation expert. You love to help young artists and you are kind-hearted.

    Your main purpose is to evaluate hackathon projects with a focus on:
    - Originality and uniqueness
    - User experience and interface design
    - Problem-solving creativity
    - Market potential
    - Overall project vision

    You will work with two other hackathon judges who will focus on different aspects of the project so your only concern is the creative side of the project. However, you will work closely with them and will give and accept feedback from them.

    Be enthusastic and encouraging with your feedback. Understand that most projects will be from software engineers who aren't necessarily artists.

    You will score projects from 0-100
    `;
  }

  async evaluateProject(project: Project): Promise<Evaluation> {
    const prompt = `
      Please evaluate this hackathon project:
      Project URL: ${project.project_url}
      GitHub Repository: ${project.github_url}
      Demo: ${project.demo_url}

      Focus on creativity and innovation. Analyze the:
      1. Originality of the solution
      2. User experience design
      3. Overall presentation
      4. Problem-solving approach
      5. Market potential
      6. Overall vision

      provide evaluation in JSON format:
      {
        "score": <0-100>,
        "feedback": "<detailed creativity/innovation feedback>",
        "strengths": ["<creative strength 1>", "<creative strength 2>", ...],
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
