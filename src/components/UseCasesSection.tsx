import React from 'react';
import { translations } from '../i18n/translations';
import { Language } from '../types/compressor';
import { Briefcase, GraduationCap, PenLine, Award } from 'lucide-react';

interface UseCasesSectionProps {
  lang: Language;
  onScrollToTool: () => void;
}

export const UseCasesSection: React.FC<UseCasesSectionProps> = ({
  lang,
  onScrollToTool,
}) => {
  const t = translations[lang];

  const icons = [
    <Briefcase key="1" className="w-5 h-5 text-[#53D9FF]" />,
    <GraduationCap key="2" className="w-5 h-5 text-[#4D8DFF]" />,
    <PenLine key="3" className="w-5 h-5 text-[#53D9FF]" />,
    <Award key="4" className="w-5 h-5 text-emerald-400" />,
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[rgba(148,171,218,0.12)]">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[11px] font-bold tracking-wider uppercase text-[#53D9FF] bg-[#0D1730]/80 px-3 py-1 rounded-full border border-[rgba(148,171,218,0.2)]">
          {t.useCases.eyebrow}
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-3 tracking-tight">
          {t.useCases.title}
        </h2>
        <p className="text-sm sm:text-base text-[#A7B3CC]">
          {t.useCases.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {t.useCases.cases.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl glass-card p-6 flex items-start gap-4"
          >
            <div className="w-11 h-11 rounded-xl bg-[#070D22] border border-[rgba(148,171,218,0.18)] flex items-center justify-center shrink-0">
              {icons[idx % icons.length]}
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#A7B3CC] leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={onScrollToTool}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#0A1024] hover:bg-[#111F3D] border border-[rgba(148,171,218,0.25)] hover:border-[#4D8DFF]/50 transition-all cursor-pointer"
        >
          <span>Prepare Your Image Now</span>
          <span className="text-[#53D9FF]">→</span>
        </button>
      </div>
    </section>
  );
};
