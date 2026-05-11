"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

const SUGGESTED = [
  "מה קורה במפגש?",
  "מתי המעגל הבא?",
  "האם זה מתאים לי?",
  "כמה זה עולה?",
  "האם המעגל מקוון או פנים אל פנים?",
  "האם אני צריך להגיע לכל מפגש?",
]

type Message = { role: "user" | "assistant"; content: string }

export default function FAQChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { if (messages.length > 0) endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }) }, [messages, loading])

  const send = async (text?: string) => {
    const q = (text ?? input).trim()
    if (!q || loading) return
    const next: Message[] = [...messages, { role: "user", content: q }]
    setMessages(next)
    setInput("")
    setLoading(true)
    try {
      const r = await fetch("/api/chat-faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      })
      const data = await r.json()
      setMessages((m) => [...m, { role: "assistant", content: data?.content || "סליחה, נסה שוב." }])
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "בעיה בחיבור. נסה שוב." }])
    } finally { setLoading(false) }
  }

  return (
    <section id="faq-chat" className="py-20 px-6 bg-[#3d1f0d]" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-[#c9a84c] font-semibold text-sm tracking-widest uppercase mb-3">שאלות ותשובות</p>
          <h2 className="text-3xl md:text-4xl font-black text-[#c9a84c] mb-3">יש לך שאלה? תשאל אותי</h2>
          <p className="text-[#e8ddd0]/80">צ׳אט אישי — תשובה מהירה, או טופס פנייה אם רוצים שיחה</p>
        </motion.div>

        <div className="rounded-2xl shadow-2xl overflow-hidden bg-[#2c1810] border border-[#c9a84c]/20">
          <div className="px-5 py-4 overflow-y-auto space-y-3" style={{ minHeight: "300px", maxHeight: "400px" }}>
            {messages.length === 0 && !loading && (
              <div className="text-center py-6 text-[#e8ddd0]/40 text-sm">בחר שאלה למטה או כתוב את שלך</div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user" ? "bg-[#c9a84c] text-[#2c1810]" : "bg-[#1a0d06] text-[#e8ddd0]"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#1a0d06] px-4 py-2.5 rounded-2xl">
                  <div className="flex gap-1">
                    <span className="size-2 bg-[#c9a84c] rounded-full animate-bounce" />
                    <span className="size-2 bg-[#c9a84c] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <span className="size-2 bg-[#c9a84c] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {messages.length === 0 && (
            <div className="px-5 py-3 border-t border-[#c9a84c]/10 flex flex-wrap gap-2">
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  disabled={loading}
                  className="text-xs sm:text-sm px-3 py-1.5 rounded-full bg-[#c9a84c]/10 text-[#c9a84c] hover:bg-[#c9a84c]/20 transition-colors disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); send() }} className="px-5 py-3 border-t border-[#c9a84c]/10 flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="כתוב שאלה..."
              disabled={loading}
              className="flex-1 bg-transparent outline-none text-sm text-[#e8ddd0] placeholder:text-[#e8ddd0]/30"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="שלח"
              className="size-9 rounded-full bg-[#c9a84c] text-[#2c1810] grid place-items-center disabled:opacity-40 hover:bg-[#b8943c] transition-colors"
            >
              ➤
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
