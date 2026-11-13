import React, { useState } from 'react';
import { translations } from '../i18n/translations';
import { Language } from '../types/compressor';
import { ChevronDown } from 'lucide-react';

interface FAQAccordionProps {
  lang: Language;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ lang }) => {
  const t = translations[lang];
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[rgba(148,171,218,0.12)]">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[11px] font-bold tracking-wider uppercase text-[#53D9FF] bg-[#0D1730]/80 px-3 py-1 rounded-full border border-[rgba(148,171,218,0.2)]">
          {t.faq.eyebrow}
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-3 tracking-tight">
          {t.faq.title}
        </h2>
      </div>

      <div className="space-y-3">
        {t.faq.items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl glass-card overflow-hidden border border-[rgba(148,171,218,0.16)] transition-all"
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#111F3D]/40 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#53D9FF] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-white' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-[#A7B3CC] leading-relaxed border-t border-[rgba(148,171,218,0.1)]">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
