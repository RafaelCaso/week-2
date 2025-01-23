import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return new Response(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>Hackathon Judges</title>
        <meta property="og:title" content="Hackathon Judges" />
        <meta property="og:description" content="Submit and evaluate hackathon projects" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:button:1" content="Submit Project" />
        <meta property="fc:frame:button:1:action" content="post" />
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_HOST}/api/frame" />
      </head>
    </html>`,
    {
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
}
