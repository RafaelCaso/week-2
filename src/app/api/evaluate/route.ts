import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { AgentCoordinator } from "@/agents/coordinator";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI API key not configured" },
      { status: 500 }
    );
  }

  try {
    const submissions = await req.json();

    const coordinator = new AgentCoordinator();
    coordinator.setClient(openai);

    const results = await coordinator.evaluateSubmissions(submissions);
    const explanation = await coordinator.explainTopPicks(results);

    return NextResponse.json({ results, explanation });
  } catch (error) {
    console.error("Evaluation failed:", error);
    return NextResponse.json(
      { error: "Failed to evaluate project" },
      { status: 500 }
    );
  }
}
