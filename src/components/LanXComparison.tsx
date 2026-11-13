import React from 'react';
import { translations } from '../i18n/translations';
import { Language } from '../types/compressor';
import { Check, X, Shield, Sparkles } from 'lucide-react';

interface LanXComparisonProps {
  lang: Language;
}

export const LanXComparison: React.FC<LanXComparisonProps> = ({ lang }) => {
  const comparisons = [
    {
      feature: 'Privacy & Processing',
      photokb: '100% Local in your browser. Zero bytes uploaded to any server.',
      others: 'Uploads your personal photos and signatures to cloud servers.',
      highlight: true,
    },
    {
      feature: 'Target File Size Accuracy',
      photokb: 'Exact byte measurement (<=20KB, <=50KB, <=100KB). Never lies on result.',
      others: 'Approximates quality slider; often fails strict portal upload gates.',
      highlight: true,
    },
    {
      feature: 'Scanned Signatures',
      photokb: 'Specialized mode preserving high-contrast ink lines without blurring.',
      others: 'Treats signatures like photos, causing severe ink compression artifacts.',
      highlight: false,
    },
    {
      feature: 'Transparency Handling',
      photokb: 'Flattens transparent PNGs to crisp JPEG with white or custom background.',
      others: 'Turns transparent backgrounds into unsightly black boxes.',
      highlight: false,
    },
    {
      feature: 'Cost & Accessibility',
      photokb: '100% Free forever. No accounts, no email required, zero watermarks.',
      others: 'Daily limits, forced registrations, or paywalls for small KB downloads.',
      highlight: true,
    },
  ];

  return (
    <section id="comparison" className="max-w-5xl mx-auto px-4 sm:px-6 py-16 border-t border-white/[0.08]">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[11px] font-bold tracking-wider uppercase text-[#53D9FF] bg-[#0A0D1D] px-3.5 py-1 rounded-full border border-white/10 shadow-sm">
          COMPARISON
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-3 tracking-tight">
          Why PhotoKB Stands Out
        </h2>
        <p className="text-xs sm:text-sm text-[#9EABCA]">
          See how our client-side utility compares against generic online compression tools
        </p>
      </div>

      <div className="rounded-2xl lanx-card overflow-hidden border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/10 bg-[#070A18]/90">
          <div className="md:col-span-4 p-4 text-xs font-bold text-[#9EABCA] uppercase tracking-wider">
            Capability
          </div>
          <div className="md:col-span-4 p-4 text-xs font-bold text-[#53D9FF] uppercase tracking-wider bg-[#2934FF]/10 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#53D9FF]" />
            <span>PhotoKB Engine</span>
          </div>
          <div className="md:col-span-4 p-4 text-xs font-bold text-[#9EABCA]/70 uppercase tracking-wider">
            Generic Cloud Tools
          </div>
        </div>

        <div className="divide-y divide-white/[0.06] text-xs">
          {comparisons.map((row, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-12 items-center hover:bg-white/[0.02] transition-colors">
              <div className="md:col-span-4 p-4 font-semibold text-white">
                {row.feature}
              </div>

              <div className="md:col-span-4 p-4 bg-[#2934FF]/[0.06] text-white flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span className="leading-relaxed font-medium">{row.photokb}</span>
              </div>

              <div className="md:col-span-4 p-4 text-[#9EABCA]/80 flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3 h-3" />
                </div>
                <span className="leading-relaxed">{row.others}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
