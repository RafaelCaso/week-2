import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Get the frame data from the request
    const data = await req.json();

    // Use the data to generate frame response
    return NextResponse.json({
      frame: {
        version: "0.1.0",
        image: "https://your-domain.com/api/og",
        buttons: [
          {
            label: "Submit Project",
            action: "post",
          },
        ],
      },
    });
  } catch (error) {
    console.error("Frame generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate frame" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    return NextResponse.json({
      frame: {
        version: "0.1.0",
        image: "https://your-domain.com/api/og",
        buttons: [
          {
            label: "View Results",
            action: "post",
          },
        ],
      },
    });
  } catch (error) {
    console.error("Submission failed:", error);
    return NextResponse.json(
      { error: "Failed to handle submission" },
      { status: 500 }
    );
  }
}
