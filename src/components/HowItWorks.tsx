import React from 'react';
import { translations } from '../i18n/translations';
import { Language } from '../types/compressor';
import { UploadCloud, Sliders, Download } from 'lucide-react';

interface HowItWorksProps {
  lang: Language;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ lang }) => {
  const t = translations[lang];

  const steps = [
    {
      number: '01',
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
      icon: <UploadCloud className="w-5 h-5 text-[#53D9FF]" />,
    },
    {
      number: '02',
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
      icon: <Sliders className="w-5 h-5 text-[#4D8DFF]" />,
    },
    {
      number: '03',
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
      icon: <Download className="w-5 h-5 text-emerald-400" />,
    },
  ];

  return (
    <section id="how-it-works" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[rgba(148,171,218,0.12)]">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[11px] font-bold tracking-wider uppercase text-[#53D9FF] bg-[#0D1730]/80 px-3 py-1 rounded-full border border-[rgba(148,171,218,0.2)]">
          {t.howItWorks.eyebrow}
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-3 tracking-tight">
          {t.howItWorks.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="rounded-2xl glass-card p-6 flex flex-col justify-between relative"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#070D22] border border-[rgba(148,171,218,0.2)] flex items-center justify-center">
                  {step.icon}
                </div>
                <span className="font-mono text-2xl font-black text-[rgba(148,171,218,0.25)]">
                  {step.number}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#A7B3CC] leading-relaxed">
                {step.desc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[rgba(148,171,218,0.1)] text-[11px] text-[#53D9FF]">
              Local client-side execution
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
