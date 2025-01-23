import { type NextRequest } from "next/server";

export async function GET(_req: NextRequest) {
  return new Response(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>Hackathon Judges</title>
        <meta property="og:title" content="Hackathon Judges" />
        <meta property="og:description" content="Submit and evaluate hackathon projects" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_HOST}/api/og" />
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

export async function POST(req: NextRequest) {
  const data = await req.json();
  // Handle frame button clicks and form submissions
  // This is where we'd handle project submissions from Farcaster

  return new Response(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>Submit Project</title>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_HOST}/api/og" />
        <meta property="fc:frame:input:text" content="Project URL" />
        <meta property="fc:frame:button:1" content="Submit" />
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_HOST}/api/frame/submit" />
      </head>
    </html>`,
    {
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
}
