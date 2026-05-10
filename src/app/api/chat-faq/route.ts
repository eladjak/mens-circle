import { NextResponse } from "next/server"

const SYSTEM_PROMPT = `אתה צ'אטבוט באתר מעגל הגברים של אלעד יעקובוביץ' (community.eladjak.com / circle.eladjak.com), מבית אומנות הקשר.

מעגל הגברים הוא מרחב בטוח, אינטימי ומרפא לגברים שרוצים להרגיש, לחבר ולצמוח. שני מסלולים: מקוון ומגדל העמק.

נקודות חשובות:
- מפגשים שבועיים, שעתיים כל אחד
- 10 משתתפים מקסימום במעגל
- לא טיפול קליני, אבל בעל תועלת טיפולית
- דיסקרטיות מלאה — מה שקורה במעגל נשאר במעגל
- מחויבות לטווח של חודשים, לא מפגש חד-פעמי

תשובות בעברית, חמות, אישיות וקצרות (3-5 משפטים). למחירים ופרטי הצטרפות — שלח לטופס בעמוד.`

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return NextResponse.json({ content: "הצ'אט עדיין בהרצה — שלח/י פרטים בטופס למטה ונחזור אישית." })
  try {
    const body = await req.json()
    const messages = body?.messages || []
    if (!Array.isArray(messages) || messages.length === 0) return NextResponse.json({ error: "messages array required" }, { status: 400 })
    const recent = messages.slice(-10)
    const conversationText = recent.map((m: { role: string; content: string }) => `${m.role === "user" ? "משתמש" : "אסיסטנט"}: ${m.content}`).join("\n")
    const fullPrompt = `${SYSTEM_PROMPT}\n\nשיחה עד כה:\n${conversationText}\n\nאסיסטנט:`
    const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({ contents: [{ parts: [{ text: fullPrompt }] }], generationConfig: { temperature: 0.6, maxOutputTokens: 400 } }),
    })
    if (!r.ok) return NextResponse.json({ content: "סליחה, יש בעיה זמנית. נסה שוב או שלח דרך הטופס." })
    const data = await r.json()
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "סליחה, לא הבנתי. נסה לנסח אחרת."
    return NextResponse.json({ content })
  } catch {
    return NextResponse.json({ error: "Internal error", content: "סליחה, נסה שוב בעוד רגע." }, { status: 500 })
  }
}
