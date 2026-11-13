import React from 'react';
import { translations } from '../i18n/translations';
import { Language } from '../types/compressor';
import {
  Sliders,
  PenTool,
  Lock,
  Maximize2,
  FileImage,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';

interface FeatureGridProps {
  lang: Language;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="features" className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[11px] font-bold tracking-wider uppercase text-[#53D9FF] bg-[#0A0D1D] px-3.5 py-1 rounded-full border border-white/10 shadow-sm">
          {t.features.eyebrow}
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-3 tracking-tight">
          {t.features.title}
        </h2>
        <p className="text-xs sm:text-sm text-[#9EABCA]">
          {t.features.subtitle}
        </p>
      </div>

      {/* LanX Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-12">
        {/* Bento 1: Large Col Span (8 cols) */}
        <div className="md:col-span-8 rounded-3xl lanx-card p-7 flex flex-col justify-between relative overflow-hidden group border border-white/10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2934FF]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#2934FF]/20 transition-all" />

          <div>
            <div className="w-10 h-10 rounded-2xl bg-[#031457] border border-[#2934FF]/40 flex items-center justify-center text-[#53D9FF] mb-5 shadow-lg shadow-[#2934FF]/20">
              <Sliders className="w-5 h-5" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
              {t.features.bento1Title}
            </h3>
            <p className="text-xs sm:text-sm text-[#9EABCA] leading-relaxed max-w-lg">
              {t.features.bento1Desc}
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#53D9FF] bg-[#070A18] px-3 py-1.5 rounded-lg border border-[#2934FF]/40 shadow-sm">
              20 KB FPSC Limit
            </span>
            <span className="text-xs font-mono font-medium text-white bg-[#070A18] px-3 py-1.5 rounded-lg border border-white/10">
              50 KB Job Portals
            </span>
            <span className="text-xs font-mono font-medium text-white bg-[#070A18] px-3 py-1.5 rounded-lg border border-white/10">
              100 KB Admissions
            </span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-500/30">
              ✓ Exact Byte Lock
            </span>
          </div>
        </div>

        {/* Bento 2: Signature Mode (4 cols) */}
        <div className="md:col-span-4 rounded-3xl lanx-card p-7 flex flex-col justify-between border border-white/10">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[#031457] border border-[#2934FF]/40 flex items-center justify-center text-[#4D8DFF] mb-5 shadow-lg shadow-[#2934FF]/20">
              <PenTool className="w-5 h-5" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
              {t.features.bento2Title}
            </h3>
            <p className="text-xs text-[#9EABCA] leading-relaxed">
              {t.features.bento2Desc}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center gap-2 text-xs font-medium text-[#53D9FF]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>High-contrast ink clarity</span>
          </div>
        </div>

        {/* Bento 3: Zero-Upload Privacy (4 cols) */}
        <div className="md:col-span-4 rounded-3xl lanx-card p-7 flex flex-col justify-between border border-white/10">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-5">
              <Lock className="w-5 h-5" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
              {t.features.bento3Title}
            </h3>
            <p className="text-xs text-[#9EABCA] leading-relaxed">
              {t.features.bento3Desc}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.08] text-xs font-mono text-emerald-300">
            100% In-Browser · 0 Remote Logs
          </div>
        </div>

        {/* Bento 4: Aspect Ratio Preserved Resizing (4 cols) */}
        <div className="md:col-span-4 rounded-3xl lanx-card p-7 flex flex-col justify-between border border-white/10">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[#031457] border border-[#2934FF]/40 flex items-center justify-center text-[#53D9FF] mb-5">
              <Maximize2 className="w-5 h-5" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
              {t.features.bento4Title}
            </h3>
            <p className="text-xs text-[#9EABCA] leading-relaxed">
              {t.features.bento4Desc}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center gap-1.5 text-xs text-[#9EABCA]">
            <span className="font-mono text-white">600×600</span>
            <span>·</span>
            <span className="font-mono text-white">300×400</span>
            <span>·</span>
            <span className="font-mono text-white">300×150</span>
          </div>
        </div>

        {/* Bento 5: Transparent PNG Flattening (4 cols) */}
        <div className="md:col-span-4 rounded-3xl lanx-card p-7 flex flex-col justify-between border border-white/10">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[#031457] border border-[#2934FF]/40 flex items-center justify-center text-[#53D9FF] mb-5">
              <FileImage className="w-5 h-5" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
              {t.features.bento5Title}
            </h3>
            <p className="text-xs text-[#9EABCA] leading-relaxed">
              {t.features.bento5Desc}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.08] text-xs text-[#53D9FF]">
            Clean white or custom background
          </div>
        </div>
      </div>
    </section>
  );
};
