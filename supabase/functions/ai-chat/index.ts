// Supabase Edge Function: ai-chat
// Proxies chat requests to Google's Generative Language API (Gemini).
//
// Deploy:
//   supabase functions deploy ai-chat --no-verify-jwt
//   supabase secrets set GOOGLE_API_KEY=your-google-ai-studio-key

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GOOGLE_API_KEY = Deno.env.get("GOOGLE_API_KEY");
    if (!GOOGLE_API_KEY) {
      return json({ error: "GOOGLE_API_KEY not configured" }, 500);
    }

    const {
      messages,
      model = "gemini-2.5-flash",
      stream = false,
    }: { messages: ChatMessage[]; model?: string; stream?: boolean } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return json({ error: "messages[] required" }, 400);
    }

    // Convert OpenAI-style messages to Gemini format.
    const systemText = messages
      .filter((m) => m.role === "system")
      .map((m) => m.content)
      .join("\n\n");

    const contents = messages
      .filter((m) => m.role !== "system")
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    const endpoint = stream ? "streamGenerateContent" : "generateContent";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
      model,
    )}:${endpoint}?key=${GOOGLE_API_KEY}${stream ? "&alt=sse" : ""}`;

    const upstream = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        ...(systemText ? { systemInstruction: { parts: [{ text: systemText }] } } : {}),
      }),
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      if (upstream.status === 429) {
        return json({ error: "Rate limit exceeded. Please try again shortly." }, 429);
      }
      return json({ error: `Google AI error: ${text}` }, upstream.status);
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
    const text =
      data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ?? "";

    return json({ text, raw: data }, 200);
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
