import React, { useState, useEffect } from 'react';
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

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeModal, setActiveModal] = useState<ModalPage | null>(null);
  const [preloadedFile, setPreloadedFile] = useState<File | null>(null);

  // Sync RTL and lang attribute on documentElement
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
  }, [lang]);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'ur' : 'en'));
  };

  const scrollToTool = () => {
    const el = document.getElementById('compressor-tool');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
      {/* Floating LanX Header */}
      <SiteHeader
        lang={lang}
        onToggleLang={handleToggleLang}
        onScrollToTool={scrollToTool}
        onOpenModal={(page) => setActiveModal(page)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full relative">
        {/* LanX Hero */}
        <HeroSection
          lang={lang}
          onScrollToTool={scrollToTool}
          onLoadSamplePhoto={handleLoadSamplePhoto}
          onLoadSampleSignature={handleLoadSampleSignature}
        />

        {/* Continuous Marquee Ticker */}
        <LanXMarquee />

        {/* Core Compression Tool (Hero Focal Point) */}
        <CompressorTool
          lang={lang}
          preloadedFile={preloadedFile}
          onClearPreloadedFile={() => setPreloadedFile(null)}
          onLoadSamplePhoto={handleLoadSamplePhoto}
          onLoadSampleSignature={handleLoadSampleSignature}
        />

        {/* Trust Indicators */}
        <TrustStrip lang={lang} />

        {/* LanX Bento Grid */}
        <FeatureGrid lang={lang} />

        {/* LanX 6-Card Benefits */}
        <LanXBenefits />

        {/* LanX Comparison Section */}
        <LanXComparison lang={lang} />

        {/* Use Cases for Portals */}
        <UseCasesSection lang={lang} onScrollToTool={scrollToTool} />

        {/* Format Comparison */}
        <FormatComparison lang={lang} />

        {/* 3-Step Process */}
        <HowItWorks lang={lang} />

        {/* LanX Quote / Mission Statement */}
        <LanXQuoteCard />

        {/* FAQ Accordion */}
        <FAQAccordion lang={lang} />

        {/* Final CTA Banner */}
        <LanXFinalCTA
          onScrollToTool={scrollToTool}
          onLoadSamplePhoto={handleLoadSamplePhoto}
        />
      </main>

      {/* LanX Footer */}
      <SiteFooter
        lang={lang}
        onOpenModal={(page) => setActiveModal(page)}
        onScrollToTool={scrollToTool}
      />

      {/* Trust & Legal Pages Modal */}
      <TrustPagesModal
        lang={lang}
        activePage={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
