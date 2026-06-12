"use client";

import { useState, useEffect } from "react";

const LINKS = [
  { id: "about", label: "אודות" },
  { id: "what-is", label: "מה זה מעגל" },
  { id: "testimonials", label: "המלצות" },
  { id: "faq", label: "שאלות" },
  { id: "lead-form", label: "הצטרפות" },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-200 ${
        scrolled
          ? "bg-[#1a0d06]/95 backdrop-blur shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="ניווט ראשי"
        className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between"
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-[#c9a84c] font-black text-lg tracking-tight cursor-pointer"
        >
          מעגל גברים
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className="text-[#e8ddd0]/80 hover:text-[#c9a84c] text-sm font-semibold transition-colors cursor-pointer"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "סגור תפריט" : "פתח תפריט"}
          aria-expanded={open}
          className="md:hidden text-[#c9a84c] p-2 cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden bg-[#1a0d06]/98 backdrop-blur border-t border-[#c9a84c]/15 px-5 py-3 space-y-1">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className="block w-full text-right py-2.5 text-[#e8ddd0]/90 hover:text-[#c9a84c] font-semibold transition-colors cursor-pointer"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
