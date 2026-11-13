import React, { useState } from 'react';
import { translations } from '../i18n/translations';
import { Language, CompressionResult, ImageMeta } from '../types/compressor';
import {
  Download,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Maximize2,
  Copy,
  Check,
} from 'lucide-react';
import { formatBytes, formatBytesWithExact, calculateSavingsPercent } from '../lib/formatBytes';

interface ResultPanelProps {
  lang: Language;
  original: ImageMeta;
  result: CompressionResult;
  onDownload: () => void;
  onReset: () => void;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({
  lang,
  original,
  result,
  onDownload,
  onReset,
}) => {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<'after' | 'before' | 'split'>('after');
  const [copied, setCopied] = useState(false);

  const savings = calculateSavingsPercent(original.bytes, result.bytes);

  const copyDetails = () => {
    const text = `PhotoKB Result:
Original: ${formatBytes(original.bytes)} (${original.width}x${original.height}px)
Compressed: ${formatBytes(result.bytes)} (${result.width}x${result.height}px)
Target: ${formatBytes(result.targetBytes)} (${result.targetReached ? 'PASSED' : 'MISSED'})
Reduction: ${savings}%`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl glass-card p-6 sm:p-7 space-y-6">
      {/* Target Status Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[rgba(148,171,218,0.14)]">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>{t.result.heading}</span>
          </h3>
          <p className="text-xs text-[#A7B3CC] mt-0.5">
            Target: <strong className="text-white">{formatBytes(result.targetBytes)} max</strong>
          </p>
        </div>

        <div>
          {result.targetReached ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs font-semibold shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{t.result.targetReachedBadge}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/50 text-amber-300 text-xs font-semibold shadow-sm">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>{t.result.targetNotReachedBadge}</span>
            </div>
          )}
        </div>
      </div>

      {/* Target Explanation Banner */}
      {!result.targetReached && (
        <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/40 text-amber-200 text-xs leading-relaxed flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
          <div>
            <p className="font-semibold mb-0.5">{t.result.targetNotReachedNotice}</p>
            {result.warnings.map((w, idx) => (
              <p key={idx} className="text-amber-300/80 text-[11px] mt-1">
                {w}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Before / After Preview Box */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          {/* Toggle buttons */}
          <div className="flex items-center gap-1 p-1 bg-[#0A1024] rounded-lg border border-[rgba(148,171,218,0.16)] text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('after')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'after'
                  ? 'bg-[#2563FF] text-white shadow-sm'
                  : 'text-[#A7B3CC] hover:text-white'
              }`}
            >
              {t.result.after}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('before')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'before'
                  ? 'bg-[#2563FF] text-white shadow-sm'
                  : 'text-[#A7B3CC] hover:text-white'
              }`}
            >
              {t.result.before}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('split')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer hidden sm:block ${
                activeTab === 'split'
                  ? 'bg-[#2563FF] text-white shadow-sm'
                  : 'text-[#A7B3CC] hover:text-white'
              }`}
            >
              Side-by-Side
            </button>
          </div>

          <button
            type="button"
            onClick={copyDetails}
            className="flex items-center gap-1 text-[11px] text-[#A7B3CC] hover:text-white transition-colors cursor-pointer"
            title="Copy specs to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Specs</span>
              </>
            )}
          </button>
        </div>

        {/* Visual Preview Display */}
        <div className="rounded-xl overflow-hidden bg-[#070D22] border border-[rgba(148,171,218,0.18)] p-3">
          {activeTab === 'split' ? (
            <div className="grid grid-cols-2 gap-3 items-center">
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-medium text-[#A7B3CC] mb-1.5">Original</span>
                <div className="relative max-h-64 flex items-center justify-center overflow-hidden rounded-lg bg-[#0A1024]">
                  <img
                    src={original.previewUrl}
                    alt="Original Upload"
                    className="max-h-64 max-w-full object-contain"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[11px] font-medium text-[#53D9FF] mb-1.5">Compressed</span>
                <div className="relative max-h-64 flex items-center justify-center overflow-hidden rounded-lg bg-[#0A1024]">
                  <img
                    src={result.previewUrl}
                    alt="Compressed Output"
                    className="max-h-64 max-w-full object-contain"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative min-h-[220px] max-h-80 flex items-center justify-center overflow-hidden rounded-lg bg-[#0A1024]">
              <img
                src={activeTab === 'after' ? result.previewUrl : original.previewUrl}
                alt={activeTab === 'after' ? 'Compressed Preview' : 'Original Preview'}
                className="max-h-80 max-w-full object-contain"
              />
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] text-white">
                {activeTab === 'after' ? `${result.width}x${result.height}px` : `${original.width}x${original.height}px`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
        <div className="p-3 rounded-xl bg-[#0A1024]/80 border border-[rgba(148,171,218,0.12)]">
          <span className="text-[10px] uppercase font-bold text-[#A7B3CC] block mb-1">
            {t.result.originalSize}
          </span>
          <span className="text-sm sm:text-base font-bold text-white font-mono block">
            {formatBytes(original.bytes)}
          </span>
          <span className="text-[10px] text-[#A7B3CC] block">
            {new Intl.NumberFormat('en-US').format(original.bytes)} B
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#0A1024]/80 border border-[rgba(148,171,218,0.12)]">
          <span className="text-[10px] uppercase font-bold text-[#53D9FF] block mb-1">
            {t.result.compressedSize}
          </span>
          <span className="text-sm sm:text-base font-bold text-[#53D9FF] font-mono block">
            {formatBytes(result.bytes)}
          </span>
          <span className="text-[10px] text-[#A7B3CC] block">
            {new Intl.NumberFormat('en-US').format(result.bytes)} B
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#0A1024]/80 border border-[rgba(148,171,218,0.12)]">
          <span className="text-[10px] uppercase font-bold text-[#A7B3CC] block mb-1">
            {t.result.reduction}
          </span>
          <span className="text-sm sm:text-base font-bold text-emerald-400 font-mono block">
            {savings > 0 ? `-${savings}%` : '0%'}
          </span>
          <span className="text-[10px] text-[#A7B3CC] block">
            {result.targetReached ? 'Fit in limit' : 'Over limit'}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#0A1024]/80 border border-[rgba(148,171,218,0.12)]">
          <span className="text-[10px] uppercase font-bold text-[#A7B3CC] block mb-1">
            {t.result.dimensions}
          </span>
          <span className="text-xs sm:text-sm font-bold text-white font-mono block truncate">
            {result.width} × {result.height}
          </span>
          <span className="text-[10px] text-[#A7B3CC] block">
            {result.mimeType.replace('image/', '').toUpperCase()}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <button
          type="button"
          onClick={onDownload}
          className="w-full sm:flex-1 py-3.5 px-6 rounded-full font-bold text-sm lanx-btn-primary transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <Download className="w-4 h-4 text-white" />
          <span>{t.result.downloadBtn}</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto py-3.5 px-6 rounded-full font-medium text-xs lanx-btn-secondary transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#53D9FF]" />
          <span>{t.result.compressAnotherBtn}</span>
        </button>
      </div>
    </div>
  );
};
