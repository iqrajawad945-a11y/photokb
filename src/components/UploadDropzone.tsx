import React, { useRef, useState } from 'react';
import { translations } from '../i18n/translations';
import { Language } from '../types/compressor';
import { UploadCloud, Image as ImageIcon, PenTool, AlertCircle } from 'lucide-react';
import { validateImageFile } from '../lib/validateImageFile';

interface UploadDropzoneProps {
  lang: Language;
  onFileSelected: (file: File) => void;
  onLoadSamplePhoto: () => void;
  onLoadSampleSignature: () => void;
  disabled?: boolean;
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  lang,
  onFileSelected,
  onLoadSamplePhoto,
  onLoadSampleSignature,
  disabled = false,
}) => {
  const t = translations[lang];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [dropError, setDropError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setDropError(validation.error || 'Invalid file');
        return;
      }
      setDropError(null);
      onFileSelected(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setDropError(validation.error || 'Invalid file');
        return;
      }
      setDropError(null);
      onFileSelected(file);
      // Reset input value so re-selecting same file fires onChange
      e.target.value = '';
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleInputChange}
        className="hidden"
        id="photokb-file-input"
        disabled={disabled}
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`relative w-full rounded-2xl border-2 border-dashed p-8 sm:p-10 text-center transition-all cursor-pointer select-none ${
          isDragOver
            ? 'border-[#53D9FF] bg-[#2563FF]/15 scale-[1.01]'
            : 'border-[rgba(148,171,218,0.25)] bg-[#0A1024]/70 hover:border-[#4D8DFF]/60 hover:bg-[#0D1730]'
        } ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        aria-label="Upload photo or signature file dropzone"
      >
        <div className="flex flex-col items-center justify-center pointer-events-none">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#111F3D] to-[#0D1730] border border-[rgba(148,171,218,0.2)] flex items-center justify-center mb-4 text-[#53D9FF] shadow-inner">
            <UploadCloud className="w-7 h-7" />
          </div>

          <p className="text-base sm:text-lg font-semibold text-white mb-1">
            {t.tool.dropPrompt}
          </p>

          <div className="mt-2 mb-3">
            <span className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-[#2563FF] hover:bg-[#3B82F6] rounded-lg shadow-md shadow-[#2563FF]/30 transition-all pointer-events-auto">
              {t.tool.browseButton}
            </span>
          </div>

          <p className="text-xs text-[#A7B3CC]">
            {t.tool.formatsNotice}
          </p>
        </div>

        {/* Quick Demo Sample Loaders right inside dropzone */}
        <div
          className="mt-6 pt-5 border-t border-[rgba(148,171,218,0.12)] flex flex-wrap items-center justify-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-xs text-[#A7B3CC] mr-1">Quick Test:</span>
          <button
            type="button"
            onClick={onLoadSamplePhoto}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#F5F7FF] bg-[#111F3D] hover:bg-[#1A2E5A] border border-[rgba(148,171,218,0.2)] rounded-lg transition-colors cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#53D9FF]" />
            <span>Sample Photo</span>
          </button>
          <button
            type="button"
            onClick={onLoadSampleSignature}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#F5F7FF] bg-[#111F3D] hover:bg-[#1A2E5A] border border-[rgba(148,171,218,0.2)] rounded-lg transition-colors cursor-pointer"
          >
            <PenTool className="w-3.5 h-3.5 text-[#4D8DFF]" />
            <span>Sample Signature</span>
          </button>
        </div>
      </div>

      {dropError && (
        <div className="mt-3 p-3 rounded-xl bg-red-950/40 border border-red-800/50 flex items-start gap-2.5 text-red-300 text-xs text-left">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{dropError}</span>
        </div>
      )}
    </div>
  );
};
