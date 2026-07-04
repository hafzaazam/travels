// Supabase Edge Function: ai-chat
// Standalone chat proxy. Works on ANY Supabase project.
// Priority: GEMINI_API_KEY (Google AI Studio) -> OPENAI_API_KEY -> LOVABLE_API_KEY.
// Deploy to your own project:
//   supabase functions deploy ai-chat --project-ref <your-ref> --no-verify-jwt
//   supabase secrets set GEMINI_API_KEY=... --project-ref <your-ref>

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

async function callGemini(messages: ChatMessage[], apiKey: string, model: string) {
  // Convert OpenAI-style messages to Gemini format
  const system = messages.filter((m) => m.role === "system").map((m) => m.content).join("\n\n");
  const contents = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini error ${res.status}: ${text}`);
  }
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ?? "";
  return text;
}

async function callOpenAI(messages: ChatMessage[], apiKey: string, model: string) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model, messages, stream: false }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${text}`);
  }
  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? "";
}

async function callLovable(messages: ChatMessage[], apiKey: string, model: string) {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey },
    body: JSON.stringify({ model, messages, stream: false }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Lovable gateway error ${res.status}: ${text}`);
  }
  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? "";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, model }: { messages: ChatMessage[]; model?: string } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return json({ error: "messages[] required" }, 400);
    }

    const GEMINI = Deno.env.get("GEMINI_API_KEY");
    const OPENAI = Deno.env.get("OPENAI_API_KEY");
    const LOVABLE = Deno.env.get("LOVABLE_API_KEY");

    let text = "";
    if (GEMINI) {
      const m = model || Deno.env.get("GEMINI_MODEL_ID") || "gemini-2.0-flash";
      text = await callGemini(messages, GEMINI, m);
    } else if (OPENAI) {
      const m = model || Deno.env.get("OPENAI_MODEL_ID") || "gpt-4o-mini";
      text = await callOpenAI(messages, OPENAI, m);
    } else if (LOVABLE) {
      const m = model || "google/gemini-2.5-flash";
      text = await callLovable(messages, LOVABLE, m);
    } else {
      return json({ error: "No AI key configured (GEMINI_API_KEY / OPENAI_API_KEY / LOVABLE_API_KEY)" }, 500);
    }

    return json({ text });
  } catch (err) {
    console.error("ai-chat error", err);
    return json({ error: (err as Error).message ?? "Internal error" }, 500);
  }
});
