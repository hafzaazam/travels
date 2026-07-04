// Supabase Edge Function: ai-chat
// Proxies chat requests to Lovable AI Gateway using LOVABLE_API_KEY.
// Auto-deployed by Lovable Cloud. Callable from the static Hostinger site
// and from the Lovable preview alike.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return json({ error: "LOVABLE_API_KEY not configured" }, 500);
    }

    const {
      messages,
      model = "google/gemini-3-flash-preview",
    }: { messages: ChatMessage[]; model?: string } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return json({ error: "messages[] required" }, 400);
    }

    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": LOVABLE_API_KEY,
      },
      body: JSON.stringify({ model, messages, stream: false }),
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      if (upstream.status === 429) {
        return json({ error: "Rate limit — please try again in a moment." }, 429);
      }
      if (upstream.status === 402) {
        return json({ error: "AI credits exhausted. Please top up your Lovable workspace." }, 402);
      }
      return json({ error: `AI gateway error: ${text}` }, upstream.status);
    }

    const data = await upstream.json();
    const text = data?.choices?.[0]?.message?.content ?? "";
    return json({ text });
  } catch (err) {
    console.error("ai-chat error", err);
    return json({ error: (err as Error).message ?? "Internal error" }, 500);
  }
});
