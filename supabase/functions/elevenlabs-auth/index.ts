import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const agentId = url.searchParams.get("agent_id");

    if (!agentId) {
      throw new Error("agent_id parameter is required");
    }

    const elevenLabsApiKey = Deno.env.get("ELEVENLABS_API_KEY");

    if (!elevenLabsApiKey) {
      throw new Error("ELEVENLABS_API_KEY not configured");
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
      {
        method: "GET",
        headers: {
          "xi-api-key": elevenLabsApiKey,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs API error:", errorText);
      throw new Error(`ElevenLabs API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    return new Response(
      JSON.stringify({ signedUrl: data.signed_url }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to generate signed URL"
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
