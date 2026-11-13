import React from 'react';
import {
  TrendingDown,
  Gauge,
  SlidersHorizontal,
  ShieldCheck,
  Cpu,
  Layers,
} from 'lucide-react';

export const LanXBenefits: React.FC = () => {
  const benefits = [
    {
      icon: <TrendingDown className="w-5 h-5 text-[#53D9FF]" />,
      title: 'Instant Size Reduction',
      desc: 'Achieve dramatic 60% to 90% file size savings within milliseconds, perfectly tailored for strict upload limits.',
    },
    {
      icon: <Gauge className="w-5 h-5 text-[#4D8DFF]" />,
      title: 'Real-Time Byte Measurement',
      desc: 'We verify every output byte against the actual encoded Blob, ensuring your file will never get rejected at submission.',
    },
    {
      icon: <SlidersHorizontal className="w-5 h-5 text-[#53D9FF]" />,
      title: 'Flexible Size Targets',
      desc: 'Choose from official form presets (20KB, 50KB, 100KB) or specify any custom numerical KB limit with instant validation.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: 'Private & Secure',
      desc: 'Prioritize security with local HTML5 Canvas execution. Your private photo or signature never leaves your personal device.',
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#4D8DFF]" />,
      title: 'Adaptive Compression Engine',
      desc: 'Dual-phase binary search algorithm that optimizes JPEG quantization before safely scaling dimensions if needed.',
    },
    {
      icon: <Layers className="w-5 h-5 text-[#53D9FF]" />,
      title: 'Form Portal Compatibility',
      desc: 'Form-ready dimensions (600x600, 300x400, 300x150) and clean JPEG conversion for transparent PNG documents.',
    },
  ];

  return (
    <section id="benefits" className="max-w-5xl mx-auto px-4 sm:px-6 py-16 border-t border-white/[0.08]">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[11px] font-bold tracking-wider uppercase text-[#53D9FF] bg-[#0A0D1D] px-3.5 py-1 rounded-full border border-white/10 shadow-sm">
          BENEFITS
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-3 tracking-tight">
          Why Choose PhotoKB?
        </h2>
        <p className="text-xs sm:text-sm text-[#9EABCA]">
          A specialized in-browser utility built to ensure your photos pass upload verification
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {benefits.map((card, idx) => (
          <div
            key={idx}
            className="rounded-2xl lanx-card p-6 flex flex-col justify-between border border-white/10 group hover:border-[#2934FF]/50 transition-all"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#031457] border border-[#2934FF]/40 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                {card.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2 tracking-tight">
                {card.title}
              </h3>
              <p className="text-xs text-[#9EABCA] leading-relaxed">
                {card.desc}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center gap-1.5 text-[11px] text-[#53D9FF]">
              <span>Verified Feature</span>
              <span>·</span>
              <span className="text-white/60">Local Only</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
