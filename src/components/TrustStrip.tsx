import React from 'react';
import { translations } from '../i18n/translations';
import { Language } from '../types/compressor';
import { ShieldCheck, Target, CheckCircle2 } from 'lucide-react';

interface TrustStripProps {
  lang: Language;
}

export const TrustStrip: React.FC<TrustStripProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="rounded-2xl glass-card p-5 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#2563FF]/15 border border-[#2563FF]/30 flex items-center justify-center shrink-0 text-[#53D9FF]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-1">
              {t.trustStrip.localTitle}
            </h4>
            <p className="text-xs text-[#A7B3CC] leading-relaxed">
              {t.trustStrip.localDesc}
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl glass-card p-5 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#2563FF]/15 border border-[#2563FF]/30 flex items-center justify-center shrink-0 text-[#53D9FF]">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-1">
              {t.trustStrip.formsTitle}
            </h4>
            <p className="text-xs text-[#A7B3CC] leading-relaxed">
              {t.trustStrip.formsDesc}
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl glass-card p-5 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#2563FF]/15 border border-[#2563FF]/30 flex items-center justify-center shrink-0 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-1">
              {t.trustStrip.honestTitle}
            </h4>
            <p className="text-xs text-[#A7B3CC] leading-relaxed">
              {t.trustStrip.honestDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
