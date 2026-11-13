import React, { useEffect, useState } from 'react';
import { Language } from './types/compressor';
import { SiteHeader } from './components/SiteHeader';
import { HeroSection } from './components/HeroSection';
import { LanXMarquee } from './components/LanXMarquee';
import { CompressorTool } from './components/CompressorTool';
import { TrustStrip } from './components/TrustStrip';
import { FeatureGrid } from './components/FeatureGrid';
import { LanXBenefits } from './components/LanXBenefits';
import { LanXComparison } from './components/LanXComparison';
import { UseCasesSection } from './components/UseCasesSection';
import { FormatComparison } from './components/FormatComparison';
import { HowItWorks } from './components/HowItWorks';
import { LanXQuoteCard } from './components/LanXQuoteCard';
import { FAQAccordion } from './components/FAQAccordion';
import { LanXFinalCTA } from './components/LanXFinalCTA';
import { SiteFooter } from './components/SiteFooter';
import { TrustPagesModal, ModalPage } from './components/TrustPagesModal';
import { createSamplePhotoFile, createSampleSignatureFile } from './lib/sampleImages';
import { AuthPage, AuthPageMode } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { navigate } from './lib/navigation';

function getAuthMode(pathname: string): AuthPageMode | null {
  if (pathname === '/login') return 'login';
  if (pathname === '/signup') return 'signup';
  if (pathname === '/forgot-password') return 'forgot';
  if (pathname === '/reset-password') return 'reset';
  return null;
}

export default function App() {
  const [pathname, setPathname] = useState(window.location.pathname);
  const [lang, setLang] = useState<Language>('en');
  const [activeModal, setActiveModal] = useState<ModalPage | null>(null);
  const [preloadedFile, setPreloadedFile] = useState<File | null>(null);

  useEffect(() => {
    const syncPathname = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', syncPathname);
    return () => window.removeEventListener('popstate', syncPathname);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
  }, [lang]);

  const authMode = getAuthMode(pathname);
  if (authMode === 'reset') {
    return (
      <ProtectedRoute>
        <AuthPage mode="reset" />
      </ProtectedRoute>
    );
  }
  if (authMode) return <AuthPage mode={authMode} />;
  if (pathname === '/dashboard') {
    return (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    );
  }

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'ur' : 'en'));
  };

  const scrollToTool = () => {
    const el = document.getElementById('compressor-tool');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLoadSamplePhoto = async () => {
    try {
      const file = await createSamplePhotoFile();
      setPreloadedFile(file);
      scrollToTool();
    } catch (e) {
      console.error('Failed to create sample photo:', e);
    }
  };

  const handleLoadSampleSignature = async () => {
    try {
      const file = await createSampleSignatureFile();
      setPreloadedFile(file);
      scrollToTool();
    } catch (e) {
      console.error('Failed to create sample signature:', e);
    }
  };

  return (
    <div className="min-h-screen bg-[#03050C] text-white flex flex-col font-sans lanx-grid selection:bg-[#2934FF] selection:text-white">
      <SiteHeader
        lang={lang}
        onToggleLang={handleToggleLang}
        onScrollToTool={scrollToTool}
        onOpenModal={(page) => setActiveModal(page)}
        onSignIn={() => navigate('/login')}
      />

      <main className="flex-1 w-full relative">
        <HeroSection
          lang={lang}
          onScrollToTool={scrollToTool}
          onLoadSamplePhoto={handleLoadSamplePhoto}
          onLoadSampleSignature={handleLoadSampleSignature}
        />
        <LanXMarquee />
        <CompressorTool
          lang={lang}
          preloadedFile={preloadedFile}
          onClearPreloadedFile={() => setPreloadedFile(null)}
          onLoadSamplePhoto={handleLoadSamplePhoto}
          onLoadSampleSignature={handleLoadSampleSignature}
        />
        <TrustStrip lang={lang} />
        <FeatureGrid lang={lang} />
        <LanXBenefits />
        <LanXComparison lang={lang} />
        <UseCasesSection lang={lang} onScrollToTool={scrollToTool} />
        <FormatComparison lang={lang} />
        <HowItWorks lang={lang} />
        <LanXQuoteCard />
        <FAQAccordion lang={lang} />
        <LanXFinalCTA
          onScrollToTool={scrollToTool}
          onLoadSamplePhoto={handleLoadSamplePhoto}
        />
      </main>

      <SiteFooter
        lang={lang}
        onOpenModal={(page) => setActiveModal(page)}
        onScrollToTool={scrollToTool}
      />

      <TrustPagesModal
        lang={lang}
        activePage={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
