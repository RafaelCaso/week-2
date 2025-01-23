import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { address, network } = await req.json();

  return new Response(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>Project Submitted</title>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_HOST}/api/og?address=${address}&network=${network}" />
        <meta property="fc:frame:button:1" content="View Submissions" />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content="${process.env.NEXT_PUBLIC_HOST}" />
      </head>
    </html>`,
    {
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
}
