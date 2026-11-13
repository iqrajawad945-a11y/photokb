import React, { useState } from 'react';
import { translations } from '../i18n/translations';
import { Language, OutputFormat } from '../types/compressor';
import { Sliders, Lock, Unlock, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';

interface ImageSettingsPanelProps {
  lang: Language;
  origWidth: number;
  origHeight: number;
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  outputFormat: OutputFormat;
  jpegBackground: string;
  onWidthChange: (w: number) => void;
  onHeightChange: (h: number) => void;
  onToggleAspectRatio: () => void;
  onFormatChange: (fmt: OutputFormat) => void;
  onJpegBackgroundChange: (bg: string) => void;
  onResetDimensions: () => void;
  disabled?: boolean;
}

export const ImageSettingsPanel: React.FC<ImageSettingsPanelProps> = ({
  lang,
  origWidth,
  origHeight,
  width,
  height,
  maintainAspectRatio,
  outputFormat,
  jpegBackground,
  onWidthChange,
  onHeightChange,
  onToggleAspectRatio,
  onFormatChange,
  onJpegBackgroundChange,
  onResetDimensions,
  disabled = false,
}) => {
  const t = translations[lang];
  const [isOpen, setIsOpen] = useState(false);

  const handleWidthInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val > 0) {
      onWidthChange(val);
      if (maintainAspectRatio && origWidth > 0 && origHeight > 0) {
        const ratio = origWidth / origHeight;
        onHeightChange(Math.round(val / ratio));
      }
    }
  };

  const handleHeightInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val > 0) {
      onHeightChange(val);
      if (maintainAspectRatio && origWidth > 0 && origHeight > 0) {
        const ratio = origWidth / origHeight;
        onWidthChange(Math.round(val * ratio));
      }
    }
  };

  const applyPreset = (w: number, h: number) => {
    onWidthChange(w);
    onHeightChange(h);
  };

  return (
    <div className="w-full rounded-xl bg-[#0A1024]/80 border border-[rgba(148,171,218,0.18)] overflow-hidden transition-all">
      {/* Header / Toggle button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-semibold text-[#F5F7FF] hover:bg-[#111F3D]/50 transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#53D9FF]" />
          <span>{isOpen ? t.tool.hideOptions : t.tool.advancedOptions}</span>
          <span className="text-[11px] font-normal text-[#A7B3CC] hidden sm:inline">
            ({width}x{height}px · {outputFormat.replace('image/', '').toUpperCase()})
          </span>
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-[#A7B3CC]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#A7B3CC]" />
        )}
      </button>

      {/* Expanded Content */}
      {isOpen && (
        <div className="px-4 pb-5 pt-2 border-t border-[rgba(148,171,218,0.12)] space-y-4 text-xs">
          {/* Dimensions Row */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-white">Pixel Dimensions</span>
              <button
                type="button"
                onClick={onToggleAspectRatio}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] transition-colors cursor-pointer border ${
                  maintainAspectRatio
                    ? 'bg-[#2563FF]/20 border-[#2563FF]/40 text-[#53D9FF]'
                    : 'bg-[#111F3D] border-[rgba(148,171,218,0.2)] text-[#A7B3CC]'
                }`}
              >
                {maintainAspectRatio ? (
                  <>
                    <Lock className="w-3 h-3" />
                    <span>{t.tool.aspectRatioLock}</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-3 h-3" />
                    <span>{t.tool.aspectRatioUnlocked}</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#A7B3CC] mb-1">{t.tool.width}</label>
                <input
                  type="number"
                  min="20"
                  max="8000"
                  value={width || ''}
                  onChange={handleWidthInput}
                  disabled={disabled}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#070D22] border border-[rgba(148,171,218,0.2)] text-white focus:outline-none focus:border-[#4D8DFF] font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-[#A7B3CC] mb-1">{t.tool.height}</label>
                <input
                  type="number"
                  min="20"
                  max="8000"
                  value={height || ''}
                  onChange={handleHeightInput}
                  disabled={disabled}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#070D22] border border-[rgba(148,171,218,0.2)] text-white focus:outline-none focus:border-[#4D8DFF] font-mono text-xs"
                />
              </div>
            </div>

            {/* Quick dimension presets */}
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] text-[#A7B3CC] mr-1">{t.tool.dimensionPresets}</span>
              <button
                type="button"
                onClick={() => applyPreset(600, 600)}
                className="px-2 py-0.5 rounded bg-[#111F3D] hover:bg-[#1A2E5A] text-[#F5F7FF] border border-[rgba(148,171,218,0.18)] transition-colors cursor-pointer text-[10px]"
              >
                {t.tool.dimPassport}
              </button>
              <button
                type="button"
                onClick={() => applyPreset(300, 400)}
                className="px-2 py-0.5 rounded bg-[#111F3D] hover:bg-[#1A2E5A] text-[#F5F7FF] border border-[rgba(148,171,218,0.18)] transition-colors cursor-pointer text-[10px]"
              >
                {t.tool.dimApplication}
              </button>
              <button
                type="button"
                onClick={() => applyPreset(300, 150)}
                className="px-2 py-0.5 rounded bg-[#111F3D] hover:bg-[#1A2E5A] text-[#F5F7FF] border border-[rgba(148,171,218,0.18)] transition-colors cursor-pointer text-[10px]"
              >
                {t.tool.dimSignature}
              </button>
              <button
                type="button"
                onClick={onResetDimensions}
                className="px-2 py-0.5 rounded bg-[#070D22] hover:bg-[#111F3D] text-[#53D9FF] border border-[rgba(148,171,218,0.2)] transition-colors cursor-pointer text-[10px] flex items-center gap-1"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                <span>{t.tool.dimOriginal}</span>
              </button>
            </div>
          </div>

          {/* Output Format Selector */}
          <div className="pt-2 border-t border-[rgba(148,171,218,0.12)]">
            <label className="block font-medium text-white mb-2">{t.tool.outputFormat}</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onFormatChange('image/jpeg')}
                className={`py-1.5 px-3 rounded-lg border text-center transition-all cursor-pointer ${
                  outputFormat === 'image/jpeg'
                    ? 'bg-[#2563FF] border-[#53D9FF] text-white font-semibold'
                    : 'bg-[#070D22] border-[rgba(148,171,218,0.18)] text-[#A7B3CC] hover:text-white'
                }`}
              >
                JPEG (.jpg)
              </button>

              <button
                type="button"
                onClick={() => onFormatChange('image/webp')}
                className={`py-1.5 px-3 rounded-lg border text-center transition-all cursor-pointer ${
                  outputFormat === 'image/webp'
                    ? 'bg-[#2563FF] border-[#53D9FF] text-white font-semibold'
                    : 'bg-[#070D22] border-[rgba(148,171,218,0.18)] text-[#A7B3CC] hover:text-white'
                }`}
              >
                WebP (.webp)
              </button>

              <button
                type="button"
                onClick={() => onFormatChange('image/png')}
                className={`py-1.5 px-3 rounded-lg border text-center transition-all cursor-pointer ${
                  outputFormat === 'image/png'
                    ? 'bg-[#2563FF] border-[#53D9FF] text-white font-semibold'
                    : 'bg-[#070D22] border-[rgba(148,171,218,0.18)] text-[#A7B3CC] hover:text-white'
                }`}
              >
                PNG (.png)
              </button>
            </div>
          </div>

          {/* JPEG Background Flattening (for transparent images) */}
          {outputFormat === 'image/jpeg' && (
            <div className="pt-2 border-t border-[rgba(148,171,218,0.12)]">
              <label className="block font-medium text-white mb-1.5">
                {t.tool.jpegBackgroundLabel}
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onJpegBackgroundChange('#FFFFFF')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] cursor-pointer ${
                    jpegBackground === '#FFFFFF'
                      ? 'border-[#53D9FF] bg-[#2563FF]/20 text-white'
                      : 'border-[rgba(148,171,218,0.2)] bg-[#070D22] text-[#A7B3CC]'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-white border border-slate-300" />
                  <span>{t.tool.bgWhite}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onJpegBackgroundChange('#F8FAFC')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] cursor-pointer ${
                    jpegBackground === '#F8FAFC'
                      ? 'border-[#53D9FF] bg-[#2563FF]/20 text-white'
                      : 'border-[rgba(148,171,218,0.2)] bg-[#070D22] text-[#A7B3CC]'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-slate-100 border border-slate-300" />
                  <span>{t.tool.bgLight}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onJpegBackgroundChange('#050816')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] cursor-pointer ${
                    jpegBackground === '#050816'
                      ? 'border-[#53D9FF] bg-[#2563FF]/20 text-white'
                      : 'border-[rgba(148,171,218,0.2)] bg-[#070D22] text-[#A7B3CC]'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-[#050816] border border-blue-400" />
                  <span>{t.tool.bgDark}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
