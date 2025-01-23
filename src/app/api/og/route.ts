import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "Hackathon Judges";
    const subtitle =
      searchParams.get("subtitle") || "Submit your project for evaluation";

    return new NextResponse(
      `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="white"/>
        <text x="50%" y="40%" text-anchor="middle" font-size="48" font-family="Arial">
          ${title}
        </text>
        <text x="50%" y="60%" text-anchor="middle" font-size="32" font-family="Arial" fill="#666">
          ${subtitle}
        </text>
      </svg>`,
      {
        headers: {
          "Content-Type": "image/svg+xml",
        },
      }
    );
  } catch (error) {
    console.error("OG image generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate OG image" },
      { status: 500 }
    );
  }
}
