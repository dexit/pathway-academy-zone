import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Loader2, Bot, User, ChevronDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ai, type ChatMessage, type AIProvider } from "@/lib/ai"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  loading?: boolean
}

const QUICK_PROMPTS = [
  "What is Alternative Provision?",
  "How do I refer a young person?",
  "What programmes do you offer?",
  "What year groups do you support?",
]

const PROVIDER_LABELS: Record<AIProvider, string> = {
  openrouter: "OpenRouter",
  "local-ai": "Local AI",
  "wp-proxy": "AI Assistant",
}

function uid(): string {
  return Math.random().toString(36).slice(2, 9)
}

export default function AiAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [provider] = useState<AIProvider>(ai.defaultProvider)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  // Don't render at all if no AI is configured
  if (!ai.available) return null

  const scrollBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => { if (open) scrollBottom() }, [messages, open])
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 100) }, [open])

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return
    setInput("")

    const userMsg: Message = { id: uid(), role: "user", content: trimmed }
    const assistantMsg: Message = { id: uid(), role: "assistant", content: "", loading: true }

    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setLoading(true)

    const history: ChatMessage[] = [
      ...messages.map((m) => ({ role: m.role, content: m.content } as ChatMessage)),
      { role: "user", content: trimmed },
    ]

    abortRef.current = new AbortController()
    let accumulated = ""

    try {
      await ai.stream(
        history,
        (token) => {
          accumulated += token
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsg.id ? { ...m, content: accumulated, loading: false } : m
            )
          )
        },
        { context: "faqs", signal: abortRef.current.signal }
      )
    } catch (err) {
      if ((err as Error).name === "AbortError") return
      const errMsg = "Sorry, I couldn't get a response. Please try again or call us on 01782 365365."
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantMsg.id ? { ...m, content: errMsg, loading: false } : m))
      )
    } finally {
      setLoading(false)
    }
  }, [messages, loading])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const clearChat = () => {
    abortRef.current?.abort()
    setMessages([])
    setLoading(false)
  }

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <button
              onClick={() => setOpen(true)}
              aria-label="Open AI assistant"
              className="group flex items-center gap-2 rounded-full bg-primary text-primary-foreground shadow-lg px-4 py-3 font-medium text-sm hover:bg-primary/90 transition-all hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              <span>Ask AI</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col w-[min(92vw,400px)] h-[min(85vh,600px)] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
            role="dialog"
            aria-label="AI Assistant"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground flex-shrink-0">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" aria-hidden />
                <div>
                  <p className="font-semibold text-sm leading-none">PAZ Assistant</p>
                  <p className="text-[11px] text-primary-foreground/70 mt-0.5">
                    {PROVIDER_LABELS[provider]}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={clearChat}
                    className="p-1.5 rounded-lg hover:bg-primary-foreground/10 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-xs"
                    aria-label="Clear conversation"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-primary-foreground/10 transition-colors"
                  aria-label="Close assistant"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 scroll-smooth">
              {messages.length === 0 && (
                <div className="flex flex-col items-center text-center gap-4 pt-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" aria-hidden />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">How can I help?</p>
                    <p className="text-muted-foreground text-xs mt-1 max-w-[260px]">
                      Ask me anything about Alternative Provision, our programmes, or how to refer a young person.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {QUICK_PROMPTS.map((p) => (
                      <button
                        key={p}
                        onClick={() => sendMessage(p)}
                        className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-muted transition-colors text-left"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                      msg.role === "user" ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    {msg.role === "user"
                      ? <User className="h-3.5 w-3.5 text-primary-foreground" aria-hidden />
                      : <Bot className="h-3.5 w-3.5 text-foreground" aria-hidden />
                    }
                  </div>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-muted text-foreground rounded-tl-sm"
                    }`}
                  >
                    {msg.loading
                      ? <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" aria-label="Thinking…" />
                      : <span className="whitespace-pre-wrap">{msg.content}</span>
                    }
                  </div>
                </div>
              ))}

              <div ref={bottomRef} />
            </div>

            {/* Scroll-to-bottom hint (appears when scrolled up) */}

            {/* Input */}
            <div className="border-t border-border px-3 py-3 flex-shrink-0">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question…"
                  rows={1}
                  disabled={loading}
                  className="flex-1 resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:opacity-50 min-h-[38px] max-h-[120px] overflow-y-auto"
                  style={{ fieldSizing: "content" } as React.CSSProperties}
                  aria-label="Message input"
                />
                <Button
                  size="icon"
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || loading}
                  className="flex-shrink-0 rounded-xl h-9 w-9"
                  aria-label="Send message"
                >
                  {loading
                    ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    : <Send className="h-4 w-4" aria-hidden />
                  }
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5 text-center">
                AI can make mistakes. Call <a href="tel:01782365365" className="underline">01782 365365</a> for urgent queries.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
