import React from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';

interface LanXFinalCTAProps {
  onScrollToTool: () => void;
  onLoadSamplePhoto: () => void;
}

export const LanXFinalCTA: React.FC<LanXFinalCTAProps> = ({
  onScrollToTool,
  onLoadSamplePhoto,
}) => {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="relative rounded-3xl lanx-hero-card p-8 sm:p-14 text-center overflow-hidden border border-[#2934FF]/40">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#2934FF]/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="text-[11px] font-bold tracking-wider uppercase text-[#53D9FF] bg-[#0A0D1D] px-3.5 py-1 rounded-full border border-white/10 shadow-sm inline-block">
            READY TO UPLOAD WITH CONFIDENCE?
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Compress Your Image to the Exact KB Limit Now
          </h2>

          <p className="text-xs sm:text-sm text-[#9EABCA] max-w-xl mx-auto leading-relaxed">
            Fast, free, and 100% private. No watermarks, no registration, and zero cloud uploads.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onScrollToTool}
              className="flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold rounded-full lanx-btn-primary cursor-pointer active:scale-98"
            >
              <span>Compress Image Now</span>
              <ArrowUp className="w-4 h-4 text-[#53D9FF]" />
            </button>

            <button
              onClick={onLoadSamplePhoto}
              className="px-5 py-3 text-xs sm:text-sm font-medium rounded-full lanx-btn-secondary cursor-pointer"
            >
              Try Instant Sample
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
