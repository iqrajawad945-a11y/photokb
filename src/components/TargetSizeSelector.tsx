import React, { useState } from 'react';
import { translations } from '../i18n/translations';
import { Language, ToolMode } from '../types/compressor';
import { Check } from 'lucide-react';

interface TargetSizeSelectorProps {
  lang: Language;
  mode: ToolMode;
  targetKb: number;
  onSelectTargetKb: (kb: number) => void;
  disabled?: boolean;
}

export const TargetSizeSelector: React.FC<TargetSizeSelectorProps> = ({
  lang,
  mode,
  targetKb,
  onSelectTargetKb,
  disabled = false,
}) => {
  const t = translations[lang];
  const [isCustom, setIsCustom] = useState<boolean>(![20, 50, 100, 200, 500].includes(targetKb));
  const [customValue, setCustomValue] = useState<string>(
    ![20, 50, 100, 200, 500].includes(targetKb) ? targetKb.toString() : ''
  );
  const [customError, setCustomError] = useState<string | null>(null);

  // Different presets prioritization based on mode
  const photoPresets = [
    { kb: 20, label: '20 KB', tip: 'Govt / FPSC' },
    { kb: 50, label: '50 KB', tip: 'Job Portals' },
    { kb: 100, label: '100 KB', tip: 'University' },
    { kb: 200, label: '200 KB', tip: 'Online Forms' },
    { kb: 500, label: '500 KB', tip: 'High Quality' },
  ];

  const signaturePresets = [
    { kb: 10, label: '10 KB', tip: 'Strict Limit' },
    { kb: 20, label: '20 KB', tip: 'Standard Sign' },
    { kb: 30, label: '30 KB', tip: 'Banking Forms' },
    { kb: 50, label: '50 KB', tip: 'Admissions' },
    { kb: 100, label: '100 KB', tip: 'High Contrast' },
  ];

  const presets = mode === 'signature' ? signaturePresets : photoPresets;

  const handlePresetClick = (kb: number) => {
    setIsCustom(false);
    setCustomError(null);
    onSelectTargetKb(kb);
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomValue(val);

    const num = parseFloat(val);
    if (isNaN(num) || num <= 0) {
      setCustomError('Enter a positive number (e.g. 35)');
      return;
    }
    if (num > 10000) {
      setCustomError('Maximum target is 10,000 KB (10 MB)');
      return;
    }

    setCustomError(null);
    setIsCustom(true);
    onSelectTargetKb(Math.round(num));
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-white">
          {t.tool.targetSizeHeading}
        </label>
        <span className="text-xs text-[#A7B3CC]">
          Current: <strong className="text-[#53D9FF] font-mono">{targetKb} KB</strong> max
        </span>
      </div>

      {/* Preset Chips Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {presets.map((preset) => {
          const isSelected = !isCustom && targetKb === preset.kb;
          return (
            <button
              key={preset.kb}
              type="button"
              disabled={disabled}
              onClick={() => handlePresetClick(preset.kb)}
              className={`relative flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-center transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-gradient-to-b from-[#2563FF] to-[#1D4ED8] border-[#53D9FF] text-white shadow-md shadow-[#2563FF]/30 scale-[1.02]'
                  : 'bg-[#0A1024] border-[rgba(148,171,218,0.18)] text-[#A7B3CC] hover:text-white hover:border-[#4D8DFF]/40 hover:bg-[#111F3D]'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center gap-1 font-bold text-sm tracking-tight text-white">
                {preset.label}
                {isSelected && <Check className="w-3.5 h-3.5 text-[#53D9FF]" />}
              </div>
              <span className={`text-[10px] ${isSelected ? 'text-blue-100' : 'text-[#A7B3CC]/70'}`}>
                {preset.tip}
              </span>
            </button>
          );
        })}
      </div>

      {/* Custom KB Input */}
      <div className="pt-1">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="number"
              min="1"
              max="10000"
              step="1"
              value={customValue}
              onChange={handleCustomInputChange}
              onFocus={() => setIsCustom(true)}
              placeholder={t.tool.customKbPlaceholder}
              disabled={disabled}
              className={`w-full px-3.5 py-2 rounded-xl text-sm bg-[#0A1024] text-white placeholder-[#A7B3CC]/50 border transition-all focus:outline-none ${
                isCustom
                  ? 'border-[#53D9FF] ring-1 ring-[#53D9FF]/40'
                  : 'border-[rgba(148,171,218,0.2)] focus:border-[#4D8DFF]'
              }`}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#A7B3CC]">
              KB
            </span>
          </div>
          {isCustom && (
            <span className="text-xs px-2.5 py-1.5 rounded-lg bg-[#2563FF]/20 text-[#53D9FF] border border-[#2563FF]/40 font-medium">
              Custom Active
            </span>
          )}
        </div>

        {customError && (
          <p className="mt-1 text-xs text-red-400">{customError}</p>
        )}
      </div>

      <p className="text-[11px] text-[#A7B3CC]/80 leading-normal">
        {t.tool.targetNote}
      </p>
    </div>
  );
};
