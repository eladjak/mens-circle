# מעגל הגברים - מסע ללב הגבריות

## סקירה
דף נחיתה מקצועי למעגל הגברים של אלעד יעקובוביץ'.
מחליף את דפי הנחיתה ברב מסר (ohalove.ravpage.co.il).

## Tech Stack
- Next.js 15 + TypeScript
- Tailwind CSS 4 + Heebo font
- Framer Motion (אנימציות עדינות)
- RTL מלא

## סגנון עיצובי
- גברי, אדמתי, חם
- צבעים: חומים כהים, בז', זהב עדין, לבן
- טיפוגרפיה: Heebo (כותרות 900, טקסט 400)
- אנימציות: fade-in on scroll, max 200ms

## מבנה הדף
1. **Hero** - "מעגל גברים - מסע ללב הגבריות" + "מבית אומנות הקשר"
2. **Hook רגשי** - שאלות על בדידות ונטל (הקופי מוכן! ראה content/ folder)
3. **CTA** - "כן אלעד! אני מעוניין לשמוע עוד!"
4. **מה זה מעגל גברים?** - סיפור אישי
5. **מי אני?** - ביו + קישורים
6. **הגבלת משתתפים** - 10 בלבד
7. **FAQ** - 6 שאלות ותשובות
8. **טופס לידים** - שם, מייל, טלפון
9. **שני מסלולים** - אונליין / מגדל העמק

## תמונות
- **חובה:** ייצר hero image + section dividers עם Gemini (nano-banana-poster)
- **פקודה:** `cd ~/.claude/skills/nano-banana-poster/scripts && node --loader ts-node/esm generate_poster.ts "prompt"`
- **אסור:** placeholder images, via.placeholder.com, TODO comments

## קשרים
- ohlove.co.il - אתר אומנות הקשר
- facebook.com/eladjak1 - פייסבוק

## פקודות
```bash
bun install
bun run dev    # http://localhost:3000
bun run build  # verify before commit
bunx tsc --noEmit  # type check
```
