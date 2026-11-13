import React from 'react';
import { translations } from '../i18n/translations';
import { Language } from '../types/compressor';
import { ModalPage } from './TrustPagesModal';
import { ShieldCheck, Heart } from 'lucide-react';

interface SiteFooterProps {
  lang: Language;
  onOpenModal: (page: ModalPage) => void;
  onScrollToTool: () => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({
  lang,
  onOpenModal,
  onScrollToTool,
}) => {
  const t = translations[lang];

  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#03050C] text-[#9EABCA] py-14 px-4 sm:px-6 mt-16">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-white/[0.06]">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2934FF] via-[#4D8DFF] to-[#53D9FF] p-[1.5px] flex items-center justify-center shadow-md">
              <div className="w-full h-full bg-[#03050C] rounded-full flex items-center justify-center">
                <span className="font-extrabold text-[9px] text-[#53D9FF]">KB</span>
              </div>
            </div>
            <span className="text-base font-bold text-white tracking-tight">
              Photo<span className="text-[#4D8DFF]">KB</span>
            </span>
            <span className="text-xs text-[#9EABCA] ml-2 hidden sm:inline">
              — {t.footer.tagline}
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
            <button
              onClick={() => onOpenModal('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.footer.links.about}
            </button>
            <button
              onClick={() => onOpenModal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.footer.links.privacy}
            </button>
            <button
              onClick={() => onOpenModal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.footer.links.terms}
            </button>
            <button
              onClick={() => onOpenModal('contact')}
              className="hover:text-white transition-colors cursor-pointer text-[#53D9FF]"
            >
              {t.footer.links.feedback}
            </button>
          </div>
        </div>

        {/* Independence Disclaimer */}
        <div className="p-4 rounded-2xl bg-[#070A18] border border-white/[0.06] text-[11px] leading-relaxed text-[#9EABCA]/80 text-center sm:text-left">
          {t.footer.disclaimer}
        </div>

        {/* Copyright and credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9EABCA]/60 pt-2">
          <p>© 2026 PhotoKB. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>LanX-Inspired Architecture</span>
            <span>·</span>
            <span className="text-emerald-400">100% In-Browser Privacy</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
