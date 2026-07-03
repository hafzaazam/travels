// Supabase Edge Function: ai-chat
// Deploy from your machine:
//   supabase functions deploy ai-chat --no-verify-jwt
//   supabase secrets set LOVABLE_API_KEY=your-key-here

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return json({ error: "LOVABLE_API_KEY not configured" }, 500);
    }

    const { messages, model = "google/gemini-3-flash-preview", stream = false } =
      await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return json({ error: "messages[] required" }, 400);
    }

    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({ model, messages, stream }),
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      if (upstream.status === 429) {
        return json({ error: "Rate limit exceeded. Please try again shortly." }, 429);
      }
      if (upstream.status === 402) {
        return json({ error: "AI credits exhausted. Please add credits to your workspace." }, 402);
      }
      return json({ error: `AI gateway error: ${text}` }, upstream.status);
    }

    if (stream) {
      return new Response(upstream.body, {
        headers: {
          ...corsHeaders,
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    const data = await upstream.json();
    return json(data, 200);
  } catch (err) {
    console.error("ai-chat error", err);
    return json({ error: (err as Error).message }, 500);
  }
});

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
