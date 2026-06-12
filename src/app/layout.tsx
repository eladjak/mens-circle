import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

const siteUrl = "https://circle.eladjak.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "מעגל גברים - מסע ללב הגבריות | אלעד יעקובוביץ'",
  description:
    "מעגל גברים עם אלעד יעקובוביץ' - מרחב בטוח לגברים לבטא רגשות, לצמוח ולהתחבר. אונליין ובמגדל העמק. 10 משתתפים בלבד. מבית אומנות הקשר.",
  keywords: [
    "מעגל גברים",
    "גבריות",
    "אלעד יעקובוביץ",
    "אומנות הקשר",
    "מעגל שיח",
    "גברים",
    "רגשות",
    "צמיחה אישית",
    "מגדל העמק",
  ],
  authors: [{ name: "אלעד יעקובוביץ'" }],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "מעגל גברים - מסע ללב הגבריות",
    description:
      "מרחב בטוח לגברים לבטא רגשות, לצמוח ולהתחבר. 10 משתתפים בלבד. מבית אומנות הקשר.",
    locale: "he_IL",
    type: "website",
    url: siteUrl,
    siteName: "מעגל גברים - אלעד יעקובוביץ'",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "מעגל גברים - מסע ללב הגבריות",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "מעגל גברים - מסע ללב הגבריות",
    description:
      "מרחב בטוח לגברים לבטא רגשות, לצמוח ולהתחבר. 10 משתתפים בלבד.",
    images: ["/hero.jpg"],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// 5-schema bundle (GEO/AEO) — WebSite + Person + ProfessionalService + WebPage + FAQPage
const personSchema = {
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: "אלעד יעקובוביץ'",
  url: "https://www.eladjak.com",
  sameAs: [
    "https://www.facebook.com/eladjak1",
    "https://www.ohlove.co.il",
  ],
  jobTitle: "מנחה מעגלי גברים",
  worksFor: {
    "@type": "Organization",
    name: "אומנות הקשר",
    url: "https://www.ohlove.co.il",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "מעגל גברים - אלעד יעקובוביץ'",
      inLanguage: "he-IL",
      publisher: { "@id": `${siteUrl}/#person` },
    },
    personSchema,
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "מעגל גברים - מסע ללב הגבריות",
      description:
        "מעגל גברים עם אלעד יעקובוביץ' - מרחב בטוח לגברים לבטא רגשות, לצמוח ולהתחבר. אונליין ובמגדל העמק.",
      url: siteUrl,
      image: `${siteUrl}/hero.jpg`,
      provider: { "@id": `${siteUrl}/#person` },
      areaServed: [
        { "@type": "City", name: "מגדל העמק" },
        { "@type": "Country", name: "ישראל" },
      ],
      serviceType: "מעגל גברים",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/LimitedAvailability",
        description: "10 משתתפים בלבד",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "מעגל גברים - מסע ללב הגבריות | אלעד יעקובוביץ'",
      inLanguage: "he-IL",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#service` },
      datePublished: "2026-02-26",
      dateModified: new Date().toISOString().slice(0, 10),
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "מה בדיוק קורה בפגישה של מעגל גברים?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "מתכנסים ביום קבוע ובשעה קבועה למפגש של שעתיים. בהתחלה עוצמים עיניים ונושמים לכמה רגעים ובכך יוצרים הפרדה בין היום שהיה למה שיהיה במפגש. לעיתים יש סבב של 'בדיקת דופק' והמשתתפים מספרים על מצבם, ואז מי שרוצה משתף משהו חשוב ושאר הגברים מהדהדים ומשתפים אילו רגשות מתעוררים בהם.",
          },
        },
        {
          "@type": "Question",
          name: "האם המעגל הוא טיפול?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "כן ולא. אני מטפל ומנטור עם הכשרה של שנים כמנחה קבוצות ומעגלי גברים, והמענה שהמעגל נותן בהחלט יכול לשנות דרכי חשיבה והתנהגות — אך זה אינו טיפול קליני.",
          },
        },
        {
          "@type": "Question",
          name: "על מה מדברים במעגל?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "על כל דבר שרוצים: זוגיות, הורות, פרנסה, מיניות, יחסים עם עצמי ועם האחר, פרידות וגירושין, חרדות, התקפי זעם, משפחה גרעינית, תחושת ערך, ביטחון עצמי וראויות בעולם ועוד.",
          },
        },
        {
          "@type": "Question",
          name: "כמה משתתפים יש במעגל?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "10 משתתפים בלבד בכל מעגל, כדי לשמור על אינטימיות ועומק. לפני ההצטרפות מגיעים לפגישת היכרות עם המנחה ללא תשלום.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${heebo.variable} font-heebo antialiased`}>
        {children}
        <WhatsAppFloat />
        <Analytics />
      </body>
    </html>
  );
}
