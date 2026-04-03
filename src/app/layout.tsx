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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "מעגל גברים - מסע ללב הגבריות",
  description:
    "מעגל גברים עם אלעד יעקובוביץ' - מרחב בטוח לגברים לבטא רגשות, לצמוח ולהתחבר",
  url: siteUrl,
  image: `${siteUrl}/hero.jpg`,
  provider: {
    "@type": "Person",
    name: "אלעד יעקובוביץ'",
    url: "https://www.eladjak.com",
    sameAs: [
      "https://www.facebook.com/eladjak1",
      "https://www.ohlove.co.il",
    ],
    jobTitle: "מנחה מעגלי גברים",
  },
  areaServed: [
    {
      "@type": "City",
      name: "מגדל העמק",
    },
    {
      "@type": "Country",
      name: "ישראל",
    },
  ],
  serviceType: "מעגל גברים",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/LimitedAvailability",
    description: "10 משתתפים בלבד",
  },
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
