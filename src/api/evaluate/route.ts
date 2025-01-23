import { NextResponse } from "next/server";
import OpenAI from "openai";

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
  } catch (error) {
    console.error("Evaluation failed:", error);
    return NextResponse.json(
      { error: "Failed to evaluate project" },
      { status: 500 }
    );
  }
}
