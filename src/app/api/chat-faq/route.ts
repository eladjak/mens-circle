import { NextResponse } from "next/server"

const SYSTEM_PROMPT = `אתה צ'אטבוט באתר מעגל הגברים של אלעד יעקובוביץ' (circle.eladjak.com), מבית אומנות הקשר.

מעגל הגברים הוא מרחב בטוח, אינטימי ומרפא לגברים שרוצים להרגיש, לחבר ולצמוח. שני מסלולים: מקוון ומגדל העמק.

נקודות חשובות:
- מפגשים שבועיים, שעתיים כל אחד
- 10 משתתפים מקסימום במעגל
- לא טיפול קליני, אבל בעל תועלת טיפולית
- דיסקרטיות מלאה — מה שקורה במעגל נשאר במעגל
- מחויבות לטווח של חודשים, לא מפגש חד-פעמי
- לפני ההצטרפות יש פגישת היכרות עם המנחה, ללא תשלום

תשובות בעברית, חמות, אישיות וקצרות (3-5 משפטים). למחירים ופרטי הצטרפות — הפנה לטופס בעמוד.`

// ─── Deterministic fallback so the chat is useful even without an API key ───
const FALLBACK_RULES: { keys: string[]; answer: string }[] = [
  {
    keys: ["מחיר", "עולה", "כמה", "תשלום", "עלות", "כסף"],
    answer:
      "לגבי עלות והצטרפות — הכי נכון שנדבר על זה אישית, כי זה תלוי במסלול (אונליין/מגדל העמק) ובהיכרות בינינו. השאר/י פרטים בטופס למטה ואחזור אליך בהקדם. הפגישה הראשונה להיכרות היא תמיד ללא תשלום.",
  },
  {
    keys: ["מתי", "מתחיל", "הבא", "תאריך", "מועד"],
    answer:
      "נפתחים מעגלים חדשים מעת לעת — גם אונליין וגם במגדל העמק. כדי שלא תפספס/י את הקבוצה הקרובה, השאר/י פרטים בטופס למטה ואעדכן אותך ברגע שנפתח מעגל שמתאים לך.",
  },
  {
    keys: ["מתאים", "בשבילי", "מתלבט", "להצטרף", "פוחד", "חושש"],
    answer:
      "השאלה הזו בדיוק היא הסיבה שיש פגישת היכרות ראשונית ללא תשלום — כדי שנבדוק ביחד אם זה המקום בשבילך. רוב הגברים מגיעים עם בדיוק ההתלבטות הזו. השאר/י פרטים בטופס ונשוחח.",
  },
  {
    keys: ["מקוון", "אונליין", "זום", "פנים", "מגדל", "פיזי", "היכן", "איפה"],
    answer:
      "יש שני מסלולים: מעגל מקוון (אונליין, מכל מקום בארץ) ומעגל פנים-אל-פנים במגדל העמק. אפשר לבחור מה שמתאים לך — סמן/י את המסלול בטופס למטה.",
  },
  {
    keys: ["מפגש", "קורה", "נפגש", "פגישה", "שעות", "כמה זמן"],
    answer:
      "מתכנסים ביום ובשעה קבועים למפגש של כשעתיים. מתחילים בנשימה ובסבב 'בדיקת דופק', ואז מי שרוצה משתף משהו שמעסיק אותו ושאר הגברים מהדהדים ומשתפים מה זה מעורר בהם. מרחב בטוח, מכבד ודיסקרטי לחלוטין.",
  },
  {
    keys: ["טיפול", "פסיכולוג", "תרפיה"],
    answer:
      "המעגל אינו טיפול קליני, אבל יש לו תועלת טיפולית אמיתית. אני מטפל ומנטור עם הכשרה של שנים כמנחה קבוצות, והמרחב הזה בהחלט יכול לשנות דרכי חשיבה והתנהגות.",
  },
  {
    keys: ["דיסקרט", "פרטי", "סוד", "צנעת"],
    answer:
      "דיסקרטיות מלאה היא תנאי יסוד. מה שנאמר ומתרחש במעגל — נשאר במעגל. זה מה שמאפשר לגברים להיפתח באמת.",
  },
]

function localFallback(messages: { role: string; content: string }[]): string {
  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content || ""
  for (const rule of FALLBACK_RULES) {
    if (rule.keys.some((k) => lastUser.includes(k))) return rule.answer
  }
  return "שאלה טובה. הכי נכון שנדבר על זה אישית — השאר/י פרטים בטופס למטה ואחזור אליך בהקדם, או שלח/י לי הודעה בוואטסאפ. אשמח להכיר ולענות על כל מה שעל ליבך."
}

export async function POST(req: Request) {
  let messages: { role: string; content: string }[] = []
  try {
    const body = await req.json()
    messages = body?.messages || []
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "messages array required" }, { status: 400 })
    }
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 })
  }

  const apiKey = process.env.GEMINI_API_KEY
  // No key → useful deterministic answer (never a dead chat)
  if (!apiKey) return NextResponse.json({ content: localFallback(messages) })

  try {
    const recent = messages.slice(-10)
    const conversationText = recent
      .map((m) => `${m.role === "user" ? "משתמש" : "אסיסטנט"}: ${m.content}`)
      .join("\n")
    const fullPrompt = `${SYSTEM_PROMPT}\n\nשיחה עד כה:\n${conversationText}\n\nאסיסטנט:`
    const r = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
          generationConfig: { temperature: 0.6, maxOutputTokens: 400 },
        }),
      }
    )
    if (!r.ok) return NextResponse.json({ content: localFallback(messages) })
    const data = await r.json()
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
    return NextResponse.json({ content: content || localFallback(messages) })
  } catch {
    return NextResponse.json({ content: localFallback(messages) })
  }
}
