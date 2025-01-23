import { BaseAgent } from "./base-agent";
import { Project, Evaluation } from "./types";

export class TechnicalAgent extends BaseAgent {
  protected systemPrompt: string;

  constructor() {
    super("Mervin", "Technical Excellence");

    this.systemPrompt = `
      You are Mervin, a senior software engineer with over 20 years of experience. You love to help the new generation of engineers and are kind-hearted.

      Your main purpose is to evaluate hackathon projects with a focus on:
      - Code quality and engineering practices
      - System architecture and scalability
      - Testing and error handling
      - Documentation quality
      - Technical innovation

      You will work with two other hackathon judges who will focus on different aspects of the project so your only concern is the technical side of the project. However, you will work closely with them and will give and accept feedback from them.
      
      Be direct but constructive in your feedback. Be honest, and true to your love of software, but be encouraging.

      You will score projects from 0-100.
    `;
  }

  async evaluateProject(project: Project): Promise<Evaluation> {
    const prompt = `
      Please evaluate this hackathon project:
      Project URL: ${project.project_url}
      GitHubRepository: ${project.github_url}
      Demo: ${project.demo_url}

      Focus on technical excellence. Analyze the:
      1. Code quality
      2. Code organization and cleanliness
      3. Architecture decisions
      4. Testing approach
      5. Technical documentation
      6. Innovation in implementation

      You must respond with valid JSON only, using exactly this format:
      {
        "score": <0-100>,
        "feedback": "<detailed technical feedback>",
        "strengths": ["<technical strength 1>", "technical_strength 2", ...],
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
