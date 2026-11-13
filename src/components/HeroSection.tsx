import React from 'react';
import { translations } from '../i18n/translations';
import { Language } from '../types/compressor';
import { ArrowDown, Sparkles, Shield, Image as ImageIcon, PenTool, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  lang: Language;
  onScrollToTool: () => void;
  onLoadSamplePhoto: () => void;
  onLoadSampleSignature: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onScrollToTool,
  onLoadSamplePhoto,
  onLoadSampleSignature,
}) => {
  const t = translations[lang];

  return (
    <section className="relative pt-10 pb-6 sm:pt-16 sm:pb-10 overflow-hidden">
      {/* LanX ambient top radial aura */}
      <div className="lanx-aura" aria-hidden="true" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* LanX Trust Pill with Avatars */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#0A0D1D]/90 border border-white/10 shadow-lg mb-6">
          <div className="flex -space-x-1.5">
            <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 border border-[#03050C] flex items-center justify-center text-[9px] font-bold text-white">
              A
            </span>
            <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-400 border border-[#03050C] flex items-center justify-center text-[9px] font-bold text-white">
              H
            </span>
            <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 border border-[#03050C] flex items-center justify-center text-[9px] font-bold text-white">
              Z
            </span>
          </div>
          <span className="text-xs font-medium text-[#9EABCA]">
            Trusted by <strong className="text-white font-semibold">10,000+</strong> applicants for online forms
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#53D9FF] animate-pulse" />
        </div>

        {/* LanX H1 Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 leading-[1.12] text-balance">
          Compress Photos to the{' '}
          <span className="bg-gradient-to-r from-[#53D9FF] via-[#4D8DFF] to-[#2934FF] bg-clip-text text-transparent">
            Exact KB Size
          </span>{' '}
          You Need
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#9EABCA] mb-8 leading-relaxed">
          {t.hero.subtitle}
        </p>

        {/* LanX CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
          <button
            onClick={onScrollToTool}
            className="flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold rounded-full lanx-btn-primary cursor-pointer active:scale-98"
          >
            <span>{t.hero.startCta}</span>
            <ArrowDown className="w-4 h-4 text-[#53D9FF] animate-bounce" />
          </button>

          <button
            onClick={onLoadSamplePhoto}
            className="flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium rounded-full lanx-btn-secondary cursor-pointer"
          >
            <ImageIcon className="w-4 h-4 text-[#53D9FF]" />
            <span>{t.hero.trySample}</span>
          </button>

          <button
            onClick={onLoadSampleSignature}
            className="flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium rounded-full lanx-btn-secondary cursor-pointer"
          >
            <PenTool className="w-4 h-4 text-[#4D8DFF]" />
            <span>{t.hero.trySignature}</span>
          </button>
        </div>

        {/* Clean LanX Metadata Badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-[#9EABCA]">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#53D9FF]" />
            <span>20 KB · 50 KB · 100 KB Limits</span>
          </span>
          <span aria-hidden="true" className="text-white/20">·</span>
          <span>JPG · PNG · WebP Supported</span>
          <span aria-hidden="true" className="text-white/20">·</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Shield className="w-3.5 h-3.5" />
            <span>100% Client-Side Privacy</span>
          </span>
        </div>
      </div>
    </section>
  );
};
