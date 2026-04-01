"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// ─── Animation variants ─────────────────────────────────────────────────────
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

function fadeInUpDelayed(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay: delay / 1000 },
  };
}

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "מה בדיוק קורה בפגישה של מעגל גברים?",
    a: `מתכנסים ביום קבוע ובשעה קבועה למפגש של שעתיים. בהתחלה עוצמים עיניים ונושמים לכמה רגעים ובכך יוצרים הפרדה בין היום שהיה עד כה למה שיהיה במפגש ולכוונה והרצון שהגבר שם לעצמו. לעיתים יש סבב של 'בדיקת דופק' והמשתתפים מספרים על מצבם כרגע, היום, השבוע ומה שמעסיק אותם בקצרה.\n\nלעיתים למישהו יש משהו חשוב שהוא רוצה לקבל לגביו התייחסות. אחרי שיתוף כזה שאר הגברים במעגל מוזמנים להדהד (לומר מה זה מזכיר להם מחייהם) ובייחוד לומר ולשתף אילו רגשות מתעוררים אצלם בעקבות הדברים.`,
  },
  {
    q: "האם המעגל הוא טיפול?",
    a: `כן ולא. כן, כי אני מטפל ומנטור בעל הכשרה של שנים כמנחה קבוצות ומנחה מעגלי גברים ויש לי הרבה שנים של ניסיון בליווי, טיפול, הדרכה והנחייה. כמו כן, המענה שהמעגל נותן בהחלט יכול לשנות דרכי חשיבה והתנהגות.`,
  },
  {
    q: "על מה מדברים במעגל?",
    a: `על כל דבר שרק רוצים. זוגיות, הורות, פרנסה, מיניות, יחסים עם עצמי ועם האחר, פרידות וגירושין, חרדות, התקפי זעם ואיך לכעוס נכון, משפחה גרעינית, תחושת ערך, ביטחון עצמי וראויות בעולם ועוד הרבה...`,
  },
  {
    q: "מה מצופה ממני כמשתתף?",
    a: `כמו בכל תהליך, מחוייבות ומיקוד שליטה עצמית כלומר, להגיע בזמן, וכמו בכל תהליך - חשוב להגיע לכל מפגש ולהתחייב לתקופת זמן שתהיה משמעותית עבורך מאחר ומדובר בתהליך.\n\nבזמן המעגל, כל אחד מדבר ומשתף כאשר מתאים לו. אין חובה לחשוף דברים שאינך מוכן לשתף בהם. יחד עם זאת, רק מי שיכול ומצליח לדבר את עצמו, לחלוק ולשתף גם חלקים כואבים, יקבל מהמעגל התייחסות טובה ומרפאת.\n\nכל עוד לא תרים ידיים - אנחנו לא נרים ידיים ממך! כמו כן, שמירה על דיסקרטיות וצנעת הפרט של כלל המשתתפים. מה שקורה ונאמר במעגל, נשאר במעגל.`,
  },
  {
    q: "מה תפקיד המנחה במעגל?",
    a: `המנחה הוא כמו האבא של המעגל. מלבד הארגון, ההקמה והתחזוקה השוטפת, המנחה מווסת את השיחה, מאפשר לאנשים שפחות מדברים לומר את עצמם, שואל את המשתתפים שאלות עומק ונותן שיקוף לדברים בעת התרחשותם.`,
  },
  {
    q: "ואם הגעתי ולא מתאים לי יותר לבוא?",
    a: `לפני שמצטרפים למעגל מגיעים לפגישה עם המנחה, ללא תשלום. בפגישה זו מתאמים ציפיות ומבררים כוונות וצרכים של המשתתף. מומלץ מאוד לבוא לחודש מלא (4-5 מפגשים).`,
  },
];

// ─── CTA Button ───────────────────────────────────────────────────────────────
function CTAButton({ className = "" }: { className?: string }) {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <button
      onClick={scrollToForm}
      className={`inline-block bg-[#c9a84c] hover:bg-[#b8943c] active:scale-95 text-white font-black text-lg md:text-xl px-8 py-4 rounded-lg shadow-lg transition-all duration-150 cursor-pointer select-none ${className}`}
    >
      כן אלעד! אני מעוניין לשמוע עוד!
    </button>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#c9a84c]/30 rounded-lg overflow-hidden mb-3">
      <button
        className="w-full text-right p-5 flex justify-between items-center bg-[#faf7f2] hover:bg-[#f0e8d8] transition-colors duration-150 cursor-pointer"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="font-bold text-[#3d1f0d] text-base md:text-lg">{q}</span>
        <span
          className="text-[#c9a84c] text-2xl font-light flex-shrink-0 mr-3 transition-transform duration-200"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {open && (
        <div className="p-5 pt-0 bg-[#faf7f2] border-t border-[#c9a84c]/20">
          <p className="text-[#5a3a2a] leading-relaxed whitespace-pre-line pt-4">{a}</p>
        </div>
      )}
    </div>
  );
}

// ─── Lead Form ────────────────────────────────────────────────────────────────
function LeadForm() {
  const [track, setTrack] = useState<"online" | "migdal">("online");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const response = await fetch("https://formsubmit.co/ajax/eladjak@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          track: track === "online" ? "אונליין" : "מגדל העמק",
          _subject: `מעגל גברים - ליד חדש: ${formData.name} (${track === "online" ? "אונליין" : "מגדל העמק"})`,
          _template: "table",
        }),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-black text-[#c9a84c] mb-3">
          תודה, {formData.name}!
        </h3>
        <p className="text-[#5a3a2a] text-lg">
          קיבלתי את פרטיך ואצור איתך קשר בהקדם.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Track toggle */}
      <div className="flex gap-2 bg-[#e8ddd0] rounded-lg p-1 mb-6">
        <button
          type="button"
          onClick={() => setTrack("online")}
          className={`flex-1 py-3 px-4 rounded-md font-bold text-sm transition-all duration-150 ${
            track === "online"
              ? "bg-[#3d1f0d] text-[#c9a84c] shadow"
              : "text-[#6b3a1f] hover:bg-[#d5c5b0]"
          }`}
        >
          אונליין
        </button>
        <button
          type="button"
          onClick={() => setTrack("migdal")}
          className={`flex-1 py-3 px-4 rounded-md font-bold text-sm transition-all duration-150 ${
            track === "migdal"
              ? "bg-[#3d1f0d] text-[#c9a84c] shadow"
              : "text-[#6b3a1f] hover:bg-[#d5c5b0]"
          }`}
        >
          מגדל העמק
        </button>
      </div>

      {track === "online" && (
        <p className="text-sm text-[#6b3a1f] bg-[#e8ddd0] rounded-lg p-3 text-center">
          מעגל חדש מתחיל בקרוב אונליין – השאר פרטים ונשוחח ביחד
        </p>
      )}
      {track === "migdal" && (
        <p className="text-sm text-[#6b3a1f] bg-[#e8ddd0] rounded-lg p-3 text-center">
          מגדל העמק – מתחילים באביב! השאר פרטים ונתאם פגישה
        </p>
      )}

      <div>
        <label htmlFor="name" className="block font-bold text-[#3d1f0d] mb-1">
          שם מלא *
        </label>
        <input
          id="name"
          type="text"
          required
          placeholder="הכנס שם מלא"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border-2 border-[#c9a84c]/40 rounded-lg px-4 py-3 text-[#3d1f0d] bg-white focus:border-[#c9a84c] focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-bold text-[#3d1f0d] mb-1">
          המייל הכי טוב שלך *
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border-2 border-[#c9a84c]/40 rounded-lg px-4 py-3 text-[#3d1f0d] bg-white focus:border-[#c9a84c] focus:outline-none transition-colors"
          dir="ltr"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block font-bold text-[#3d1f0d] mb-1">
          הנייד שלך *
        </label>
        <input
          id="phone"
          type="tel"
          required
          placeholder="050-0000000"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full border-2 border-[#c9a84c]/40 rounded-lg px-4 py-3 text-[#3d1f0d] bg-white focus:border-[#c9a84c] focus:outline-none transition-colors"
          dir="ltr"
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm text-center bg-red-50 rounded-lg p-3">
          אירעה שגיאה בשליחה. אפשר לנסות שוב או לשלוח הודעה בוואטסאפ.
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#c9a84c] hover:bg-[#b8943c] disabled:opacity-60 active:scale-95 text-white font-black text-xl py-4 rounded-lg shadow-lg transition-all duration-150 cursor-pointer mt-2"
      >
        {loading ? "שולח..." : "כן אלעד! אני מעוניין לשמוע עוד!"}
      </button>
    </form>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="min-h-dvh bg-[#faf7f2] text-[#2c1810]">
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90dvh] flex flex-col items-center justify-center overflow-hidden bg-[#2c1810]">
        {/* Hero background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('/hero.jpg')" }}
          role="img"
          aria-label="גברים יושבים במעגל, אור חם ועמוק"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0d06]/60 via-transparent to-[#1a0d06]/80" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#c9a84c] font-semibold text-base md:text-lg tracking-widest uppercase mb-4"
          >
            מבית אומנות הקשר
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white font-black text-5xl md:text-7xl leading-tight mb-4"
          >
            מעגל גברים
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#c9a84c] font-bold text-2xl md:text-4xl mb-8"
          >
            מסע ללב הגבריות
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-[#e8ddd0] text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto"
          >
            מרחב בטוח, אינטימי ומרפא – לגברים שרוצים להרגיש, לחבר ולצמוח.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <CTAButton />
          </motion.div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#c9a84c]/60 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 16l-6-6h12z" />
          </svg>
        </div>
      </section>

      {/* ── EMOTIONAL HOOK ────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#faf7f2]">
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeInUp}>
            <div className="text-center mb-10">
              <div className="w-16 h-1 bg-[#c9a84c] mx-auto mb-8" />
            </div>
            <div className="space-y-6 text-[#3d1f0d] text-lg md:text-xl leading-loose">
              <p>
                מרגיש לעיתים קרובות מדי שאתה{" "}
                <strong>לבד במערכה?</strong> שהאחריות ונטל החיים יושבים על כתפיך ואין לך לגיטימיציה
                לשתף? להביע? לבקש עזרה? להרגיש?
              </p>
              <p>
                שפעמים רבות, רבות מדי,{" "}
                <strong>לא רואים אותך?</strong> שאין לך מקום, מרחב בטוח משלך פשוט להיות אתה
                באופן הכי פשוט שיש?
              </p>
              <p className="text-[#6b3a1f] border-r-4 border-[#c9a84c] pr-5 py-2">
                אני מזמין אותך להצטרף אלי למעגל גברים ולצאת למסע אל לב הגבריות שלך, ולהרגיש שייך
                ובטוח במרחב שמאפשר צמיחה – בזוגיות, פרנסה, אבהות ויחסים עם עצמך ועם העולם.
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeInUpDelayed(150)} className="text-center mt-12">
            <CTAButton />
          </motion.div>
        </div>
      </section>

      {/* ── WHAT IS A MEN'S CIRCLE ────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#3d1f0d]">
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeInUp}>
            <h2 className="text-[#c9a84c] font-black text-3xl md:text-4xl text-center mb-12">
              אז... מה זה בעצם מעגל גברים?
            </h2>
          </motion.div>

          <motion.div {...fadeInUpDelayed(100)} className="space-y-6 text-[#e8ddd0] text-lg leading-loose">
            <p className="text-[#c9a84c] font-semibold text-xl italic">
              מתי לאחרונה כעסתי? מתי לאחרונה הרגשתי כאב גדול? עצבות? חרדה?
            </p>
            <p>מתי הרשיתי לעצמי לאחרונה מקום להראות בו חולשה – ואפילו פגיעות?</p>
            <p>
              עד לא מזמן בכלל – הייתי נמנע בכל כוחי מלתת ביטוי לרגשות האלו שעלו בתוכי או
              אפילו להכיר בהם. הרגשתי שבתור גבר – הגבר גבר! אין לי זכות (!) להציג החוצה
              חולשה! יש לי תפקיד! אחריות! אני צריך (!) להיות חיובי, שמח, בטוח בעצמי! רק כך
              אפשר להישען עלי!
            </p>
            <p>
              חשבתי שאני חכם, שאני חזק, שאני מתנהל כמו גבר &apos;אמיתי&apos;! אבל האמת היא שפשוט{" "}
              <strong className="text-[#e8c97e]">חנקתי את עצמי מבפנים</strong>, והרגשתי בודד,
              ומנותק, תלוש, מובס, חסר בטחון ולא שייך.
            </p>
            <p>
              סיפרתי לעצמי שאסור (!) לי שיראו מי אני באמת, שאני צריך (!) לשמור על הפאסון, שאני
              מוכרח (!) להצליח להחזיק הכל בכוחות עצמי. שאין לי שום ברירה או בחירה בעניין. כי
              ככה לימדו אותי. אותנו. לשתוק ולומר ש&apos;הכל בסדר&apos; גם כשהכל ממש אבל ממש לא בסדר.
            </p>
          </motion.div>

          {/* The turning point */}
          <motion.div {...fadeInUpDelayed(150)} className="my-10">
            <div className="border-t border-[#c9a84c]/30 my-10" />
            <h3 className="text-[#c9a84c] font-black text-2xl mb-6 text-center">המפנה</h3>
            <div className="space-y-5 text-[#e8ddd0] text-lg leading-loose">
              <p>
                והיום? אני מבין כמה טעיתי וכמה הטעות הזאת יקרה וכואבת – לא רק עבורי אלא גם עבור
                הקרובים והסובבים אותי.
              </p>
              <p>
                והדרך לריפוי הכאב הזה עוברת דרך להכיר ברגשות שלי. לדבר ולבטא אותם. לתת מקום
                לכך שאני יכול גם לכעוס, להיות עצוב, מכווץ, מפוחד וכאוב.{" "}
                <strong className="text-[#e8c97e]">
                  שמותר לי להיות פגיע. שמותר לי להתרגש, אפילו לדמוע. שמותר לי – פשוט להיות.
                </strong>
              </p>
            </div>
          </motion.div>

          {/* Community */}
          <motion.div {...fadeInUpDelayed(200)}>
            <div className="border-t border-[#c9a84c]/30 my-10" />
            <h3 className="text-[#c9a84c] font-black text-2xl mb-6 text-center">הקהילה</h3>
            <p className="text-[#e8ddd0] text-lg leading-loose">
              אני לא לבד בסיפור הזה. גיליתי בשנים האחרונות שהרבה מאוד גברים מדהימים – שהם
              חברים ומנהלים, אחים ובנים, בעלים ואבות וסבים, אוהבים ויקרים – חיים בתוך הפלונטר
              הזה, ואין. פשוט{" "}
              <strong className="text-[#e8c97e]">אין להם מקום – להיות הם</strong>. וזה קשוח...
              קשוח מאוד.
            </p>
          </motion.div>

          {/* What is the circle */}
          <motion.div {...fadeInUpDelayed(250)}>
            <div className="border-t border-[#c9a84c]/30 my-10" />
            <h3 className="text-[#c9a84c] font-black text-2xl mb-6 text-center">מה זה המעגל</h3>
            <p className="text-[#e8ddd0] text-lg leading-loose">
              מעגל גברים הוא בדיוק מקום ומרחב של ריפוי כזה – שבו גברים מתכנסים למען עצמם,
              מדברים ומבטאים את מה שהם מרגישים, את הצרכים והרצונות שלהם. מקום לבטא בו סוף
              סוף... למה אני זקוק? חיבור לעצמי? שייכות חברתית? קושי בביטוי עצמי? אתגר בזוגיות
              שלי? זו הזדמנות לפגוש את עצמי ולבדוק את חיי בהיבטים שונים.
            </p>
          </motion.div>

          <motion.div {...fadeInUpDelayed(300)} className="text-center mt-12">
            <CTAButton />
          </motion.div>
        </div>
      </section>

      {/* ── WHO AM I ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#faf7f2]">
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeInUp}>
            <h2 className="text-[#3d1f0d] font-black text-3xl md:text-4xl text-center mb-10">
              מי אני?
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Profile photo */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-xl ring-4 ring-[#c9a84c]/30">
                  <Image
                    src="/elad-profile.jpg"
                    alt="אלעד יעקובוביץ' - מנחה מעגלי גברים"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 text-[#5a3a2a] text-lg leading-loose">
                <p>
                  שמי{" "}
                  <strong className="text-[#3d1f0d]">אלעד יעקובוביץ&apos;</strong> – מנחה מעגלי
                  גברים. בכובעי השני אני מנהל ובעלים של{" "}
                  <a
                    href="https://www.ohlove.co.il/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#c9a84c] hover:text-[#b8943c] font-bold underline underline-offset-2 transition-colors"
                  >
                    &apos;אומנות הקשר&apos;
                  </a>
                  .
                </p>
                <p>
                  משנת 2010 זכיתי לחתן יותר מ-{" "}
                  <strong className="text-[#c9a84c] text-xl">440 (!!!)</strong> זוגות ועזרתי להם
                  לבנות זוגיות מאושרת ויציבה!
                </p>
                <div className="flex gap-4 flex-wrap pt-2">
                  <a
                    href="https://www.ohlove.co.il/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#3d1f0d] text-[#c9a84c] font-bold px-5 py-2.5 rounded-lg hover:bg-[#5a2e10] transition-colors text-sm"
                  >
                    🌐 אתר אומנות הקשר
                  </a>
                  <a
                    href="https://www.facebook.com/eladjak1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#1877f2] text-white font-bold px-5 py-2.5 rounded-lg hover:bg-[#1565d8] transition-colors text-sm"
                  >
                    👤 פייסבוק
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── URGENCY / SPOTS ───────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#c9a84c]">
        <div className="max-w-xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <div className="text-white">
              <div className="text-7xl font-black mb-2 drop-shadow">10</div>
              <h2 className="font-black text-3xl md:text-4xl mb-4">משתתפים בלבד!</h2>
              <p className="text-white/90 text-lg leading-relaxed mb-8 max-w-md mx-auto">
                לצערי אין לנו מקום ללא הגבלה למעגל ולכן אני לא נוכל לקבל יותר מ-10
                משתתפים. אם תצליח להכנס לעשירייה הזאת – מעולה, נעבוד ביחד!
              </p>
              <button
                onClick={() =>
                  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-block bg-[#3d1f0d] hover:bg-[#2c1810] active:scale-95 text-[#c9a84c] font-black text-lg md:text-xl px-8 py-4 rounded-lg shadow-lg transition-all duration-150 cursor-pointer"
              >
                כן אלעד! אני מעוניין לשמוע עוד!
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#faf7f2]">
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeInUp}>
            <h2 className="text-[#3d1f0d] font-black text-3xl md:text-4xl text-center mb-12">
              שאלות ותשובות
            </h2>
          </motion.div>
          <div>
            {FAQ_ITEMS.map((item, i) => (
              <motion.div key={i} {...fadeInUpDelayed(i * 60)}>
                <FAQItem q={item.q} a={item.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEAD FORM ─────────────────────────────────────────────────────── */}
      <section id="lead-form" className="py-20 px-6 bg-[#3d1f0d]">
        <div className="max-w-lg mx-auto">
          <motion.div {...fadeInUp}>
            <div className="text-center mb-8">
              <h2 className="text-[#c9a84c] font-black text-3xl md:text-4xl mb-3">
                אשמח לדבר איתך גבר 😊
              </h2>
              <p className="text-[#e8ddd0] text-lg">
                תשאיר פרטים כאן ואצור איתך קשר בהקדם 😊
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeInUpDelayed(100)}>
            <div className="bg-[#faf7f2] rounded-2xl p-8 shadow-2xl">
              <LeadForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="py-8 px-6 bg-[#1a0d06] text-center">
        <p className="text-[#c9a84c]/70 text-sm">
          © {new Date().getFullYear()} אלעד יעקובוביץ&apos; –{" "}
          <a
            href="https://www.ohlove.co.il/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#c9a84c] transition-colors underline"
          >
            אומנות הקשר
          </a>
        </p>
        <div className="flex gap-4 justify-center mt-3">
          <a
            href="https://www.eladjak.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c9a84c]/50 hover:text-[#c9a84c] text-xs transition-colors"
          >
            eladjak.com
          </a>
          <a
            href="https://www.facebook.com/eladjak1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c9a84c]/50 hover:text-[#c9a84c] text-xs transition-colors"
          >
            Facebook
          </a>
        </div>
        <p className="text-[#c9a84c]/40 text-xs mt-2">מעגל גברים – מסע ללב הגבריות</p>
      </footer>
    </main>
  );
}
