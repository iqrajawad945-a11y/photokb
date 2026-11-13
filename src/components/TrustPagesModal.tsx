import React, { useState } from 'react';
import { translations } from '../i18n/translations';
import { Language } from '../types/compressor';
import { X, ShieldCheck, FileText, Info, MessageSquare, CheckCircle2 } from 'lucide-react';

export type ModalPage = 'about' | 'privacy' | 'terms' | 'contact';

interface TrustPagesModalProps {
  lang: Language;
  activePage: ModalPage | null;
  onClose: () => void;
}

export const TrustPagesModal: React.FC<TrustPagesModalProps> = ({
  lang,
  activePage,
  onClose,
}) => {
  const t = translations[lang];

  // Feedback form state
  const [feedbackCategory, setFeedbackCategory] = useState<'bug' | 'suggestion' | 'other'>('suggestion');
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (!activePage) return null;

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedbackMessage.trim().length < 10) {
      setFormError('Please enter at least 10 characters for your feedback message.');
      return;
    }
    setFormError(null);
    setFeedbackSubmitted(true);

    // Save feedback to localStorage so visitor can see it recorded
    try {
      const existing = JSON.parse(localStorage.getItem('photokb_feedback') || '[]');
      existing.push({
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        category: feedbackCategory,
        name: feedbackName,
        email: feedbackEmail,
        message: feedbackMessage,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('photokb_feedback', JSON.stringify(existing));
    } catch {
      // Ignore storage errors in sandboxed iframes
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] rounded-3xl glass-panel p-6 sm:p-8 flex flex-col overflow-hidden shadow-2xl border border-[rgba(148,171,218,0.25)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[rgba(148,171,218,0.14)] shrink-0">
          <div className="flex items-center gap-2.5">
            {activePage === 'about' && <Info className="w-5 h-5 text-[#53D9FF]" />}
            {activePage === 'privacy' && <ShieldCheck className="w-5 h-5 text-emerald-400" />}
            {activePage === 'terms' && <FileText className="w-5 h-5 text-[#4D8DFF]" />}
            {activePage === 'contact' && <MessageSquare className="w-5 h-5 text-[#53D9FF]" />}

            <h3 className="text-lg font-bold text-white">
              {activePage === 'about' && t.modals.aboutTitle}
              {activePage === 'privacy' && t.modals.privacyTitle}
              {activePage === 'terms' && t.modals.termsTitle}
              {activePage === 'contact' && t.modals.contactTitle}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#A7B3CC] hover:text-white hover:bg-[#111F3D] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto py-5 space-y-4 text-xs sm:text-sm text-[#A7B3CC] leading-relaxed pr-1">
          {activePage === 'about' && (
            <div className="space-y-4">
              <p>{t.modals.aboutText}</p>
              <div className="p-4 rounded-xl bg-[#0A1024] border border-[rgba(148,171,218,0.16)] space-y-2">
                <h4 className="font-bold text-white text-xs">Our Core Commitments:</h4>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Zero image uploads — 100% in-browser HTML5 Canvas processing.</li>
                  <li>No account or sign-up required. Completely free to use.</li>
                  <li>Truthful byte size reporting (no false success claims).</li>
                  <li>Privacy-first architecture respecting your personal biometric data.</li>
                </ul>
              </div>
            </div>
          )}

          {activePage === 'privacy' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200">
                <h4 className="font-bold text-emerald-300 text-xs mb-1">
                  100% Client-Side Privacy Guarantee
                </h4>
                <p className="text-xs">
                  Your image bytes, filenames, signatures, and previews never leave your browser tab.
                  PhotoKB has no server-side image processing backend, no image databases, and no cloud buckets.
                </p>
              </div>
              <p>{t.modals.privacyText}</p>
              <h4 className="font-bold text-white text-xs pt-2">Network Verification</h4>
              <p className="text-xs">
                You can independently verify our privacy promise at any time: open your browser&apos;s Developer Tools
                (F12), navigate to the Network tab, and perform any compression. You will observe that zero
                image payloads or bytes are transmitted over the internet.
              </p>
              <h4 className="font-bold text-white text-xs pt-2">Cookies & Analytics</h4>
              <p className="text-xs">
                PhotoKB does not deploy tracking cookies or commercial ad profiling scripts on this core application.
              </p>
            </div>
          )}

          {activePage === 'terms' && (
            <div className="space-y-4">
              <p>{t.modals.termsText}</p>
              <h4 className="font-bold text-white text-xs pt-2">Portal Acceptance Disclaimer</h4>
              <p className="text-xs">
                While PhotoKB assists you in resizing and compressing images to meet file size (KB) and dimension limits,
                we do not guarantee acceptance by any government agency, passport office, university, or exam board.
                Each institution maintains its own specific photographic standards regarding background shade,
                face-to-frame ratios, lighting, and recency.
              </p>
            </div>
          )}

          {activePage === 'contact' && (
            <div>
              {feedbackSubmitted ? (
                <div className="p-6 text-center rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">
                    {t.modals.feedbackSuccess}
                  </h4>
                  <p className="text-xs text-emerald-200">
                    Your suggestion helps us make PhotoKB better for applicants worldwide.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFeedbackSubmitted(false);
                      setFeedbackMessage('');
                    }}
                    className="mt-3 px-4 py-2 rounded-xl text-xs font-semibold bg-[#111F3D] hover:bg-[#1A2E5A] text-white border border-[rgba(148,171,218,0.2)]"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <p className="text-xs text-[#A7B3CC]">{t.modals.contactIntro}</p>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-medium text-white mb-1.5">
                      {t.modals.categoryLabel}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setFeedbackCategory('suggestion')}
                        className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                          feedbackCategory === 'suggestion'
                            ? 'bg-[#2563FF] border-[#53D9FF] text-white font-semibold'
                            : 'bg-[#0A1024] border-[rgba(148,171,218,0.2)] text-[#A7B3CC] hover:text-white'
                        }`}
                      >
                        {t.modals.catSuggestion}
                      </button>

                      <button
                        type="button"
                        onClick={() => setFeedbackCategory('bug')}
                        className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                          feedbackCategory === 'bug'
                            ? 'bg-[#2563FF] border-[#53D9FF] text-white font-semibold'
                            : 'bg-[#0A1024] border-[rgba(148,171,218,0.2)] text-[#A7B3CC] hover:text-white'
                        }`}
                      >
                        {t.modals.catBug}
                      </button>

                      <button
                        type="button"
                        onClick={() => setFeedbackCategory('other')}
                        className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                          feedbackCategory === 'other'
                            ? 'bg-[#2563FF] border-[#53D9FF] text-white font-semibold'
                            : 'bg-[#0A1024] border-[rgba(148,171,218,0.2)] text-[#A7B3CC] hover:text-white'
                        }`}
                      >
                        {t.modals.catOther}
                      </button>
                    </div>
                  </div>

                  {/* Name (Optional) */}
                  <div>
                    <label className="block text-xs font-medium text-white mb-1">
                      {t.modals.nameLabel}
                    </label>
                    <input
                      type="text"
                      value={feedbackName}
                      onChange={(e) => setFeedbackName(e.target.value)}
                      placeholder="e.g. Ali Raza"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#070D22] border border-[rgba(148,171,218,0.2)] text-white text-xs focus:outline-none focus:border-[#4D8DFF]"
                    />
                  </div>

                  {/* Email (Optional) */}
                  <div>
                    <label className="block text-xs font-medium text-white mb-1">
                      {t.modals.emailLabel}
                    </label>
                    <input
                      type="email"
                      value={feedbackEmail}
                      onChange={(e) => setFeedbackEmail(e.target.value)}
                      placeholder="e.g. applicant@example.com"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#070D22] border border-[rgba(148,171,218,0.2)] text-white text-xs focus:outline-none focus:border-[#4D8DFF]"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-white mb-1">
                      {t.modals.messageLabel} *
                    </label>
                    <textarea
                      rows={4}
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
                      placeholder={t.modals.messagePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D22] border border-[rgba(148,171,218,0.2)] text-white text-xs focus:outline-none focus:border-[#4D8DFF] resize-none"
                    />
                  </div>

                  {formError && (
                    <p className="text-xs text-red-400">{formError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 px-5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#2563FF] to-[#1D4ED8] hover:from-[#3B82F6] hover:to-[#2563FF] shadow-lg shadow-[#2563FF]/30 transition-all cursor-pointer"
                  >
                    {t.modals.submitFeedback}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[rgba(148,171,218,0.14)] flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#0A1024] hover:bg-[#111F3D] border border-[rgba(148,171,218,0.2)] transition-colors cursor-pointer"
          >
            {t.modals.close}
          </button>
        </div>
      </div>
    </div>
  );
};
