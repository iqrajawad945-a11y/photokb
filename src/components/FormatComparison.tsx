import React from 'react';
import { translations } from '../i18n/translations';
import { Language } from '../types/compressor';
import { FileCode2, Layers, Sparkles } from 'lucide-react';

interface FormatComparisonProps {
  lang: Language;
}

export const FormatComparison: React.FC<FormatComparisonProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[rgba(148,171,218,0.12)]">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[11px] font-bold tracking-wider uppercase text-[#53D9FF] bg-[#0D1730]/80 px-3 py-1 rounded-full border border-[rgba(148,171,218,0.2)]">
          {t.formatGuide.eyebrow}
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-3 tracking-tight">
          {t.formatGuide.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* JPEG Card */}
        <div className="rounded-2xl glass-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-[#53D9FF] bg-[#070D22] px-2.5 py-1 rounded-md border border-[rgba(148,171,218,0.18)]">
                .JPG / .JPEG
              </span>
              <span className="text-[11px] text-emerald-400 font-medium">Smallest Size</span>
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              {t.formatGuide.jpgTitle}
            </h3>
            <p className="text-xs text-[#A7B3CC] leading-relaxed">
              {t.formatGuide.jpgDesc}
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-[rgba(148,171,218,0.12)] text-[11px] text-[#A7B3CC]">
            • Universally accepted by 99.9% of application portals
          </div>
        </div>

        {/* PNG Card */}
        <div className="rounded-2xl glass-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-[#4D8DFF] bg-[#070D22] px-2.5 py-1 rounded-md border border-[rgba(148,171,218,0.18)]">
                .PNG
              </span>
              <span className="text-[11px] text-[#53D9FF] font-medium">Transparent</span>
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              {t.formatGuide.pngTitle}
            </h3>
            <p className="text-xs text-[#A7B3CC] leading-relaxed">
              {t.formatGuide.pngDesc}
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-[rgba(148,171,218,0.12)] text-[11px] text-[#A7B3CC]">
            • Recommended for crisp signature scans and transparent stamps
          </div>
        </div>

        {/* WebP Card */}
        <div className="rounded-2xl glass-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-[#070D22] px-2.5 py-1 rounded-md border border-[rgba(148,171,218,0.18)]">
                .WEBP
              </span>
              <span className="text-[11px] text-white font-medium">Modern Web</span>
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              {t.formatGuide.webpTitle}
            </h3>
            <p className="text-xs text-[#A7B3CC] leading-relaxed">
              {t.formatGuide.webpDesc}
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-[rgba(148,171,218,0.12)] text-[11px] text-[#A7B3CC]">
            • High quality with 30% smaller bytes than equivalent JPEG
          </div>
        </div>
      </div>
    </section>
  );
};
