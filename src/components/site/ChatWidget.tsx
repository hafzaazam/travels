import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { LINA_PERSONA, getToneDirective, renderSiteLinksForPrompt } from "@/lib/lina-persona";
import { supabaseApp as supabase } from "@/integrations/external-supabase/client";
import { useContactInfo } from "@/hooks/useContactInfo";
import linaAvatar from "@/assets/lina-avatar.png";

type ChatMsg = {
  id: string;
  role: "user" | "assistant";
  content: string;
  ts?: number;
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

function formatTime(ts?: number) {
  if (!ts) return "";
  try {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>(loadInitialMessages);
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const [failed, setFailed] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
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
    if (open) {
      inputRef.current?.focus();
      setHasUnread(false);
    }
  }, [open, status]);

  // First-time attention pulse
  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = window.localStorage.getItem("tls-chat-seen-v1");
    if (!seen) {
      setHasUnread(true);
      window.localStorage.setItem("tls-chat-seen-v1", "1");
    }
  }, []);

  const clearHistory = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setMessages([WELCOME]);
  };

  const sendMessage = async (text: string) => {
    const userMsg: ChatMsg = { id: crypto.randomUUID(), role: "user", content: text, ts: Date.now() };
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
        { id: crypto.randomUUID(), role: "assistant", content: reply, ts: Date.now() },
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

  const showQuickReplies =
    messages.length === 1 && messages[0]?.id === "welcome" && LINA_PERSONA.quickReplies.length > 0;

  return (
    <>
      {/* Floating action button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : `Open chat with ${LINA_PERSONA.name}`}
        className={cn(
          "group fixed bottom-5 right-5 z-[60] flex h-16 w-16 items-center justify-center rounded-full",
          "bg-gradient-to-br from-primary via-primary to-primary/70 text-primary-foreground",
          "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)] ring-1 ring-white/20",
          "transition-all duration-300 hover:scale-110 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.45)]",
        )}
      >
        {/* Pulse rings when idle */}
        {!open && (
          <>
            <span className="pointer-events-none absolute inset-0 rounded-full bg-primary/40 animate-ping opacity-60" />
            <span className="pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-md" />
          </>
        )}
        <span className="relative flex items-center justify-center">
          {open ? (
            <X className="h-6 w-6 transition-transform duration-300 rotate-0 group-hover:rotate-90" />
          ) : (
            <MessageCircle className="h-7 w-7 drop-shadow-sm" />
          )}
        </span>
        {/* Unread dot */}
        {!open && hasUnread && (
          <span className="absolute top-1 right-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
          </span>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className={cn(
            "fixed bottom-24 right-5 z-[60] flex h-[600px] w-[min(400px,calc(100vw-2.5rem))] flex-col overflow-hidden",
            "rounded-3xl border border-white/40 bg-background/95 backdrop-blur-xl",
            "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]",
            "animate-in slide-in-from-bottom-4 fade-in duration-300",
          )}
        >
          {/* Header */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/70" />
            <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />

            <div className="relative flex items-center gap-3 px-4 py-4 text-primary-foreground">
              <div className="relative">
                <img
                  src={linaAvatar}
                  alt={LINA_PERSONA.name}
                  width={48}
                  height={48}
                  loading="lazy"
                  className="h-12 w-12 rounded-full bg-white/90 object-cover ring-2 ring-white/60 shadow-lg"
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-400 ring-2 ring-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-sm font-semibold">
                  {LINA_PERSONA.name}
                  <Sparkles className="h-3 w-3 opacity-80" />
                </div>
                <div className="text-[11px] opacity-90 truncate">
                  {LINA_PERSONA.role} · {LINA_PERSONA.company}
                </div>
                <div className="mt-0.5 flex items-center gap-1 text-[10px] opacity-90">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  {LINA_PERSONA.status}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearHistory}
                  className="rounded-lg px-2 py-1 text-[11px] font-medium opacity-80 transition hover:bg-white/15 hover:opacity-100"
                  aria-label="Clear conversation history"
                  title="Clear conversation"
                >
                  Clear
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1.5 opacity-80 transition hover:bg-white/15 hover:opacity-100"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-muted/30 via-background to-muted/20 px-3.5 py-4"
          >
            {messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={cn(
                    "flex items-end gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300",
                    isUser ? "justify-end" : "justify-start",
                  )}
                >
                  {!isUser && (
                    <img
                      src={linaAvatar}
                      alt=""
                      width={28}
                      height={28}
                      loading="lazy"
                      className="h-7 w-7 shrink-0 rounded-full bg-white object-cover ring-1 ring-border shadow-sm"
                    />
                  )}
                  <div className="flex max-w-[80%] flex-col gap-0.5">
                    <div
                      className={cn(
                        "rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                        isUser
                          ? "rounded-br-md bg-gradient-to-br from-primary to-primary/85 text-primary-foreground shadow-md shadow-primary/20"
                          : "rounded-bl-md border border-border/60 bg-background text-foreground shadow-sm",
                      )}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap">{m.content}</p>
                      ) : (
                        <div className="prose prose-sm max-w-none text-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_p]:my-1 [&_ul]:my-1 [&_ul]:pl-4 [&_strong]:text-foreground">
                          <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                        </div>
                      )}
                    </div>
                    {m.ts && (
                      <span
                        className={cn(
                          "px-1 text-[10px] text-muted-foreground/70",
                          isUser ? "text-right" : "text-left",
                        )}
                      >
                        {formatTime(m.ts)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {showQuickReplies && (
              <div className="flex flex-wrap gap-2 pt-1 pl-9">
                {LINA_PERSONA.quickReplies.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => void sendMessage(q)}
                    disabled={isLoading}
                    className={cn(
                      "rounded-full border border-primary/30 bg-background px-3 py-1.5 text-xs font-medium text-primary shadow-sm",
                      "transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-md",
                      "disabled:opacity-50 disabled:pointer-events-none",
                    )}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex items-end gap-2 animate-in fade-in duration-200">
                <img
                  src={linaAvatar}
                  alt=""
                  width={28}
                  height={28}
                  loading="lazy"
                  className="h-7 w-7 shrink-0 rounded-full bg-white object-cover ring-1 ring-border shadow-sm"
                />
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-border/60 bg-background px-3.5 py-3 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-primary/70 animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 rounded-full bg-primary/70 animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 rounded-full bg-primary/70 animate-bounce" />
                </div>
              </div>
            )}

            {failed && (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm">
                <p className="font-medium text-foreground">Lina is offline right now.</p>
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

          {/* Composer */}
          <form
            onSubmit={onSubmit}
            className="border-t border-border/60 bg-background/80 backdrop-blur p-3"
          >
            <div className="flex items-end gap-2 rounded-2xl border border-input bg-background px-2 py-1.5 shadow-sm focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/20 transition">
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
                className="max-h-32 min-h-[36px] flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground/70"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send"
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                  "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md shadow-primary/20",
                  "transition-all hover:scale-105 hover:shadow-lg disabled:opacity-40 disabled:pointer-events-none disabled:scale-100 disabled:shadow-none",
                )}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
            <p className="mt-1.5 px-1 text-[10px] text-muted-foreground/70 text-center">
              Powered by Travel Links Solution · Press <kbd className="rounded bg-muted px-1 font-medium">Enter</kbd> to send
            </p>
          </form>
        </div>
      )}
    </>
  );
}
