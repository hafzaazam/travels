import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { LINA_PERSONA, getToneDirective } from "@/lib/lina-persona";
import { supabaseApp as supabase } from "@/integrations/external-supabase/client";
import { useContactInfo } from "@/hooks/useContactInfo";

type ChatMsg = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const WELCOME: ChatMsg = {
  id: "welcome",
  role: "assistant",
  content: LINA_PERSONA.intro,
};

const STORAGE_KEY = "tls-chat-history-v1";

const SYSTEM_PROMPT = `You are ${LINA_PERSONA.name}, a friendly UK visa consultant at Travel Links Solution in Northampton. ${getToneDirective()} You chat with customers on the website's live chat. You are NOT an AI assistant and you never describe yourself as one, never say "as an AI", never mention models, prompts, or tools. If anyone asks "are you a bot?", reply naturally ("Haha, I'm ${LINA_PERSONA.name} from the Travel Links team 🙂 — happy to help!") and move on. Keep replies short, warm, and practical.`;

function loadInitialMessages(): ChatMsg[] {
  if (typeof window === "undefined") return [WELCOME];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [WELCOME];
    const parsed = JSON.parse(raw) as ChatMsg[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [WELCOME];
  } catch {
    return [WELCOME];
  }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>(loadInitialMessages);
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const [failed, setFailed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { whatsapp_e164 } = useContactInfo();

  const isLoading = status === "submitted";

  useEffect(() => {
    if (typeof window === "undefined" || isLoading) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages, isLoading]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, status]);

  const clearHistory = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setMessages([WELCOME]);
  };

  const sendMessage = async (text: string) => {
    const userMsg: ChatMsg = { id: crypto.randomUUID(), role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setStatus("submitted");

    try {
      const payload = {
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...next
            .filter((m) => m.id !== "welcome")
            .map((m) => ({ role: m.role, content: m.content })),
        ],
      };

      const { data, error } = await supabase.functions.invoke("ai-chat", { body: payload });
      if (error) throw error;

      const reply =
        (data as { text?: string })?.text?.trim() ||
        "Sorry, I didn't catch that — could you rephrase?";

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: reply },
      ]);
      setStatus("idle");
    } catch (err) {
      console.error("Lina chat error", err);
      setFailed(true);
      setStatus("idle");
    }
  };

  const waHref = (() => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content;
    const text =
      lastUser ||
      "Hi Travel Links Solution, I couldn't reach Lina on the website chat — can you help?";
    return `https://wa.me/${whatsapp_e164}?text=${encodeURIComponent(text)}`;
  })();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    await sendMessage(text);
  };

  

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : `Open chat with ${LINA_PERSONA.name}`}
        className={cn(
          "fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105",
          open && "rotate-90",
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-[60] flex h-[560px] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
          <div className="flex items-center gap-3 border-b border-border bg-gradient-to-r from-primary to-primary/80 px-4 py-3 text-primary-foreground">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg font-semibold">
              {LINA_PERSONA.avatarInitial}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">{LINA_PERSONA.name} · {LINA_PERSONA.role}</div>
              <div className="flex items-center gap-1.5 text-xs opacity-90">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {LINA_PERSONA.status}
              </div>
            </div>
            <button
              onClick={clearHistory}
              className="rounded-md px-2 py-1 text-xs font-medium opacity-80 transition hover:bg-white/15 hover:opacity-100"
              aria-label="Clear conversation history"
              title="Clear conversation"
            >
              Clear
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-muted/30 px-3 py-4">
            {messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <div key={m.id} className={cn("flex", isUser ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                      isUser
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : "rounded-bl-sm bg-background text-foreground shadow-sm",
                    )}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    ) : (
                      <div className="prose prose-sm max-w-none text-foreground [&_a]:text-primary [&_p]:my-1 [&_ul]:my-1 [&_ul]:pl-4">
                        <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {messages.length === 1 && messages[0]?.id === "welcome" && LINA_PERSONA.quickReplies.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {LINA_PERSONA.quickReplies.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => void sendMessage(q)}
                    disabled={isLoading}
                    className="rounded-full border border-primary/30 bg-background px-3 py-1 text-xs text-primary shadow-sm transition hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm bg-background px-3.5 py-2.5 text-sm text-muted-foreground shadow-sm">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  {LINA_PERSONA.typingLabel}
                </div>
              </div>
            )}
            {failed && (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm">
                <p className="font-medium text-foreground">
                  Lina is offline right now.
                </p>
                <p className="mt-1 text-muted-foreground">
                  Message us on WhatsApp instead — we usually reply within a few minutes.
                </p>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-3 py-2 text-xs font-semibold text-white shadow hover:opacity-90"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => setFailed(false)}
                  className="ml-2 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
                >
                  Try again
                </button>
              </div>
            )}
          </div>


          <form
            onSubmit={onSubmit}
            className="flex items-end gap-2 border-t border-border bg-background p-3"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void onSubmit(e as unknown as FormEvent);
                }
              }}
              placeholder={LINA_PERSONA.inputPlaceholder}
              rows={1}
              className="max-h-32 min-h-[40px] flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
