import React from 'react';
import { Sparkles, ShieldCheck, Zap, PenTool, CheckCircle, FileCheck } from 'lucide-react';

export const LanXMarquee: React.FC = () => {
  const items = [
    { icon: <Zap className="w-3.5 h-3.5 text-[#53D9FF]" />, text: '20 KB Govt & FPSC Portal Limit' },
    { icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />, text: '100% Client-Side In-Browser Privacy' },
    { icon: <FileCheck className="w-3.5 h-3.5 text-[#4D8DFF]" />, text: '50 KB Job & Exam Registrations' },
    { icon: <PenTool className="w-3.5 h-3.5 text-[#53D9FF]" />, text: 'Crisp Signature Ink Line Preservation' },
    { icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />, text: 'Truthful Blob Byte Measurement' },
    { icon: <Sparkles className="w-3.5 h-3.5 text-[#53D9FF]" />, text: 'Instant Download With No Sign-up' },
    { icon: <Zap className="w-3.5 h-3.5 text-[#4D8DFF]" />, text: '100 KB University Admission Standards' },
  ];

  return (
    <div className="w-full py-4 overflow-hidden border-y border-white/[0.06] bg-[#070A18]/60 backdrop-blur-sm select-none my-6">
      <div className="flex animate-marquee gap-8 items-center text-xs font-medium text-[#9EABCA]">
        {/* Render twice for continuous loop */}
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center gap-2 whitespace-nowrap">
            {item.icon}
            <span className="text-white/80">{item.text}</span>
            <span className="text-white/20 ml-6">·</span>
          </div>
        ))}
      </div>
    </div>
  );
};
