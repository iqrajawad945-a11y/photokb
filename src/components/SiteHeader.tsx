import React from 'react';
import { translations } from '../i18n/translations';
import { Language } from '../types/compressor';
import { Globe, Sparkles } from 'lucide-react';

interface SiteHeaderProps {
  lang: Language;
  onToggleLang: () => void;
  onScrollToTool: () => void;
  onOpenModal: (page: 'about' | 'privacy' | 'terms' | 'contact') => void;
  onSignIn: () => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  lang,
  onToggleLang,
  onScrollToTool,
  onOpenModal,
  onSignIn,
}) => {
  const t = translations[lang];

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6">
      <div className="max-w-5xl mx-auto rounded-full lanx-floating-nav px-4 sm:px-6 py-2.5 flex items-center justify-between gap-6 transition-all">
        <a
          href="#"
          className="flex items-center gap-2.5 text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0 group"
          aria-label="PhotoKB Home"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2934FF] via-[#4D8DFF] to-[#53D9FF] p-[1.5px] flex items-center justify-center shadow-lg shadow-[#2934FF]/40 group-hover:shadow-[#2934FF]/70 transition-all">
            <div className="w-full h-full bg-[#03050C] rounded-full flex items-center justify-center">
              <span className="font-extrabold text-[11px] text-[#53D9FF] tracking-tighter">KB</span>
            </div>
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Photo<span className="text-[#4D8DFF]">KB</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-[#9EABCA]">
          <button onClick={onScrollToTool} className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0">
            {t.nav.tool}
          </button>
          <a href="#features" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            {t.nav.features}
          </a>
          <a href="#comparison" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Why PhotoKB
          </a>
          <a href="#how-it-works" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            {t.nav.howItWorks}
          </a>
          <a href="#faq" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            {t.nav.faq}
          </a>
          <button onClick={() => onOpenModal('contact')} className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0">
            {t.nav.contact}
          </button>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onSignIn}
            className="hidden sm:inline-flex items-center rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-[#DDE5FF] hover:border-[#53D9FF]/50 hover:text-white transition-colors"
          >
            Sign in
          </button>
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium lanx-btn-secondary rounded-full cursor-pointer whitespace-nowrap"
            title="Switch Language"
            aria-label={'Switch to ' + (lang === 'en' ? 'Urdu' : 'English')}
          >
            <Globe className="w-3.5 h-3.5 text-[#53D9FF]" />
            <span>{t.nav.langToggle}</span>
          </button>
          <button
            onClick={onScrollToTool}
            className="px-4 py-1.5 text-xs font-semibold rounded-full lanx-btn-primary cursor-pointer whitespace-nowrap shrink-0 active:scale-95 flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-[#53D9FF]" />
            <span>{t.nav.compressCta}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
