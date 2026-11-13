import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

export const LanXQuoteCard: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="rounded-3xl lanx-card p-8 sm:p-12 text-center relative overflow-hidden border border-white/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2934FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#53D9FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#031457] text-[#53D9FF] text-[11px] font-bold tracking-wider uppercase mb-6 border border-[#2934FF]/30">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>OUR PROMISE</span>
        </div>

        <blockquote className="text-lg sm:text-2xl font-medium text-white max-w-2xl mx-auto leading-relaxed mb-6 tracking-tight">
          &ldquo;Preparing your photo or signature for an online portal shouldn&apos;t require subscriptions, software downloads, or surrendering your private documents to third-party clouds.&rdquo;
        </blockquote>

        <div className="flex items-center justify-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2934FF] to-[#53D9FF] p-[1.5px] flex items-center justify-center shadow-md">
            <div className="w-full h-full bg-[#03050C] rounded-full flex items-center justify-center font-bold text-xs text-[#53D9FF]">
              PKB
            </div>
          </div>
          <div className="text-left">
            <h4 className="text-xs font-bold text-white">PhotoKB Engineering</h4>
            <p className="text-[11px] text-[#9EABCA]">Free & Private Client-Side Utility</p>
          </div>
        </div>
      </div>
    </section>
  );
};
