import { TechnicalAgent } from "./technical-agent";
import { CreativeAgent } from "./creative-agent";
import { EcosystemAgent } from "./ecosystem-agent";
import { Project, Evaluation, ConsensusResult } from "./types";
import OpenAI from "openai";

export class AgentCoordinator {
  private agents: [TechnicalAgent, CreativeAgent, EcosystemAgent];
  private client: OpenAI;
  private systemPrompt: string;

  constructor() {
    this.agents = [
      new TechnicalAgent(),
      new CreativeAgent(),
      new EcosystemAgent(),
    ];

    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    this.systemPrompt = `
      You are the facilitator of a discussion between three expert judges:
      - Mervin (Technical Expert)
      - Gertrude (Innovation Expert)
      - Vitalik (Ecosystem Expert)

      Your role is to help them reach consensus on project rankings by:
      1. Identifying points of agreement and disagreement
      2. Weighing different perspectives
      3. Finding balance between technical excellence, innovation, and ecosystem impact
      4. Reaching final decisions on project rankings

      Provide clear reasoning for consensus decisions.
    `;
  }

  async evaluateSubmissions(projects: Project[]): Promise<ConsensusResult[]> {
    const allEvaluations = new Map<string, Evaluation[]>();

    for (const project of projects) {
      const projectEvalutions: Evaluation[] = [];

      for (const agent of this.agents) {
        const evaluation = await agent.evaluateProject(project);
        projectEvalutions.push(evaluation);
      }

      allEvaluations.set(project.address, projectEvalutions);
    }

    const consensusResults: ConsensusResult[] = [];

    for (const [address, evaluations] of allEvaluations) {
      const project = projects.find((p) => p.address === address)!;

      const discussionPrompt = `
      Please review these evaluations for project: ${project.project_url}

      Technical Evaluation (Mervin):
      Score: ${evaluations[0].score}
      Key Points: ${evaluations[0].feedback}

      Creativity Evaluation (Gertrude):
      Score: ${evaluations[1].score}
      Key Points: ${evaluations[1].feedback}

      Ecosystem Impact Evaluation (Vitalik):
      Score: ${evaluations[2].score}
      Key Points: ${evaluations[2].feedback}

      Please synthesize these perspectives and provide:
      1. A final consensus score (0-100)
      2. Key reasons for the score
      3. Main strengths across all dimensions
      4. Primary areas for improvement

      return response in JSON format:
      {
        "consensus_score": number,
        "reasoning": "string",
        "unified_strengths": ["string"],
        "unified_improvements": ["string"]
      }
      `;

      const response = await this.client.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: this.systemPrompt },
          { role: "user", content: discussionPrompt },
        ],
      });

      const consensus = JSON.parse(response.choices[0].message.content!);

      consensusResults.push({
        project,
        final_score: consensus.consensus_score,
        evaluations,
        reasoning: consensus.reasoning,
        unified_strengths: consensus.unified_strengths,
        unified_improvements: consensus.unified_improvements,
      });
    }

    const finalResults = consensusResults
      .sort((a, b) => b.final_score - a.final_score)
      .slice(0, 8)
      .map((result, index) => ({
        ...result,
        rank: index + 1,
      }));

    return finalResults;
  }

  async explainTopPicks(results: ConsensusResult[]): Promise<string> {
    const prompt = `
      Please explain why these 8 projects were selected as finalists:
      ${results
        .map(
          (r) => `
        #${r.rank}: ${r.project.project_url}
        Score: ${r.final_score}
        Key Strengths: ${r.unified_strengths.join(", ")}
      `
        )
        .join("\n")}

      Provide a clear narrative explaining:
      1. Why these projects stood out
      2. The balance of technical, creative, and ecosystem factors
      3. What made the top performers special
    `;

    const response = await this.client.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: this.systemPrompt },
        { role: "user", content: prompt },
      ],
    });

    return response.choices[0].message.content!;
  }
}
