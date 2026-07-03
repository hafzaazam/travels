import { supabaseApp as supabase } from "@/integrations/external-supabase/client";

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export async function callAiChat(messages: ChatMessage[], model?: string) {
  const { data, error } = await supabase.functions.invoke("ai-chat", {
    body: { messages, model },
  });
  if (error) throw error;
  const content: string = data?.choices?.[0]?.message?.content ?? "";
  return { content, raw: data };
}
