import React, { useState, useEffect } from 'react';
import { translations } from '../i18n/translations';
import {
  Language,
  ToolMode,
  OutputFormat,
  ImageMeta,
  CompressionResult,
} from '../types/compressor';
import { UploadDropzone } from './UploadDropzone';
import { TargetSizeSelector } from './TargetSizeSelector';
import { ImageSettingsPanel } from './ImageSettingsPanel';
import { ResultPanel } from './ResultPanel';
import { compressImage } from '../lib/compressEngine';
import { downloadBlob } from '../lib/downloadBlob';
import { formatBytes } from '../lib/formatBytes';
import { kbToBytes } from '../lib/formatBytes';
import {
  Image as ImageIcon,
  PenTool,
  RotateCcw,
  Sparkles,
  Loader2,
  FileText,
  AlertCircle,
} from 'lucide-react';

interface CompressorToolProps {
  lang: Language;
  preloadedFile?: File | null;
  onClearPreloadedFile?: () => void;
  onLoadSamplePhoto: () => void;
  onLoadSampleSignature: () => void;
}

export const CompressorTool: React.FC<CompressorToolProps> = ({
  lang,
  preloadedFile,
  onClearPreloadedFile,
  onLoadSamplePhoto,
  onLoadSampleSignature,
}) => {
  const t = translations[lang];

  // Mode: photo or signature
  const [mode, setMode] = useState<ToolMode>('photo');

  // File state
  const [file, setFile] = useState<File | null>(null);
  const [imageMeta, setImageMeta] = useState<ImageMeta | null>(null);

  // Settings
  const [targetKb, setTargetKb] = useState<number>(mode === 'signature' ? 20 : 50);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [origWidth, setOrigWidth] = useState<number>(0);
  const [origHeight, setOrigHeight] = useState<number>(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('image/jpeg');
  const [jpegBackground, setJpegBackground] = useState<string>('#FFFFFF');

  // Execution state
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // When preloaded file is passed from hero
  useEffect(() => {
    if (preloadedFile) {
      handleFileSelected(preloadedFile);
      if (onClearPreloadedFile) onClearPreloadedFile();
    }
  }, [preloadedFile]);

  // Adjust defaults when mode switches
  const handleModeChange = (newMode: ToolMode) => {
    setMode(newMode);
    if (newMode === 'signature') {
      if (targetKb > 50) setTargetKb(20);
    } else {
      if (targetKb < 20) setTargetKb(50);
    }
  };

  // Decode file and extract metadata
  const handleFileSelected = (selectedFile: File) => {
    // Clean old object URLs
    if (imageMeta?.previewUrl) {
      URL.revokeObjectURL(imageMeta.previewUrl);
    }
    if (result?.previewUrl) {
      URL.revokeObjectURL(result.previewUrl);
    }

    setResult(null);
    setError(null);
    setFile(selectedFile);

    const objectUrl = URL.createObjectURL(selectedFile);
    const img = new Image();

    img.onload = () => {
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      setOrigWidth(w);
      setOrigHeight(h);
      setWidth(w);
      setHeight(h);

      setImageMeta({
        name: selectedFile.name,
        bytes: selectedFile.size,
        width: w,
        height: h,
        mimeType: selectedFile.type,
        previewUrl: objectUrl,
      });

      // Default format heuristic: keep png if signature or transparent, else jpeg
      if (selectedFile.type === 'image/webp') {
        setOutputFormat('image/webp');
      } else if (mode === 'signature' && selectedFile.type === 'image/png') {
        setOutputFormat('image/png');
      } else {
        setOutputFormat('image/jpeg');
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      setError('Could not decode image. Please choose another file.');
    };

    img.src = objectUrl;
  };

  // Run local compression
  const handleCompress = async () => {
    if (!file || !imageMeta) return;

    setIsCompressing(true);
    setError(null);

    // Yield main thread slightly so UI shows loading state
    await new Promise((r) => setTimeout(r, 50));

    try {
      const targetBytes = kbToBytes(targetKb);
      const res = await compressImage({
        file,
        targetBytes,
        outputFormat,
        width: width > 0 ? width : undefined,
        height: height > 0 ? height : undefined,
        maintainAspectRatio,
        jpegBackground,
      });

      setResult(res);
    } catch (err: unknown) {
      console.error('Compression error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred during compression. Please check your image.'
      );
    } finally {
      setIsCompressing(false);
    }
  };

  // Reset tool
  const handleReset = () => {
    if (imageMeta?.previewUrl) {
      URL.revokeObjectURL(imageMeta.previewUrl);
    }
    if (result?.previewUrl) {
      URL.revokeObjectURL(result.previewUrl);
    }
    setFile(null);
    setImageMeta(null);
    setResult(null);
    setError(null);
    setWidth(0);
    setHeight(0);
  };

  const handleDownload = () => {
    if (!result || !file) return;
    downloadBlob(result.blob, file.name, targetKb, result.mimeType);
  };

  return (
    <section id="compressor-tool" className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="w-full rounded-3xl lanx-hero-card p-5 sm:p-8 relative">
        {/* Tool Header & Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-white/[0.08]">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>{t.tool.title}</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#9EABCA] mt-1">
              {mode === 'photo' ? t.tool.photoSubtitle : t.tool.signatureSubtitle}
            </p>
          </div>

          {/* Mode Switch (Photo Mode / Signature Mode) */}
          <div className="flex items-center gap-1 p-1 bg-[#070A18] rounded-full border border-white/10 self-start sm:self-auto shadow-inner">
            <button
              type="button"
              onClick={() => handleModeChange('photo')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                mode === 'photo'
                  ? 'lanx-btn-primary'
                  : 'text-[#9EABCA] hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{t.tool.modePhoto}</span>
            </button>

            <button
              type="button"
              onClick={() => handleModeChange('signature')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                mode === 'signature'
                  ? 'lanx-btn-primary'
                  : 'text-[#9EABCA] hover:text-white'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>{t.tool.modeSignature}</span>
            </button>
          </div>
        </div>

        {/* If no file uploaded yet: Show Dropzone */}
        {!imageMeta ? (
          <UploadDropzone
            lang={lang}
            onFileSelected={handleFileSelected}
            onLoadSamplePhoto={onLoadSamplePhoto}
            onLoadSampleSignature={onLoadSampleSignature}
          />
        ) : (
          /* File Loaded: Show 2-Column Responsive Workspace */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Image Card & Controls */}
            <div className="lg:col-span-6 space-y-5">
              {/* Loaded File Info Card */}
              <div className="p-4 rounded-2xl bg-[#0A1024]/80 border border-[rgba(148,171,218,0.18)] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-12 h-12 rounded-xl bg-[#070D22] border border-[rgba(148,171,218,0.2)] overflow-hidden shrink-0 flex items-center justify-center">
                    <img
                      src={imageMeta.previewUrl}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-white truncate max-w-[200px] sm:max-w-[280px]">
                      {imageMeta.name}
                    </h4>
                    <p className="text-[11px] text-[#A7B3CC] mt-0.5 font-mono">
                      {formatBytes(imageMeta.bytes)} · {imageMeta.width}x{imageMeta.height}px
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="p-2 rounded-lg text-[#A7B3CC] hover:text-white hover:bg-[#111F3D] transition-colors cursor-pointer shrink-0"
                  title={t.tool.reset}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Target Size Presets & Custom Input */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0A1024]/60 border border-[rgba(148,171,218,0.16)]">
                <TargetSizeSelector
                  lang={lang}
                  mode={mode}
                  targetKb={targetKb}
                  onSelectTargetKb={setTargetKb}
                  disabled={isCompressing}
                />
              </div>

              {/* Advanced Settings (Dimensions & Output Format) */}
              <ImageSettingsPanel
                lang={lang}
                origWidth={origWidth}
                origHeight={origHeight}
                width={width}
                height={height}
                maintainAspectRatio={maintainAspectRatio}
                outputFormat={outputFormat}
                jpegBackground={jpegBackground}
                onWidthChange={setWidth}
                onHeightChange={setHeight}
                onToggleAspectRatio={() => setMaintainAspectRatio(!maintainAspectRatio)}
                onFormatChange={setOutputFormat}
                onJpegBackgroundChange={setJpegBackground}
                onResetDimensions={() => {
                  setWidth(origWidth);
                  setHeight(origHeight);
                }}
                disabled={isCompressing}
              />

              {/* Primary Compress Action CTA */}
              <button
                type="button"
                disabled={isCompressing}
                onClick={handleCompress}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm rounded-full lanx-btn-primary transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${
                  isCompressing ? 'opacity-80 pointer-events-none' : ''
                }`}
              >
                {isCompressing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#53D9FF]" />
                    <span>{t.tool.compressing}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#53D9FF]" />
                    <span>{t.tool.compressButton} ({targetKb} KB)</span>
                  </>
                )}
              </button>

              {error && (
                <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/40 text-red-300 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Right Column: Result or Live Preview Card */}
            <div className="lg:col-span-6">
              {result ? (
                <ResultPanel
                  lang={lang}
                  original={imageMeta}
                  result={result}
                  onDownload={handleDownload}
                  onReset={handleReset}
                />
              ) : (
                /* Uncompressed Preview State */
                <div className="w-full rounded-2xl lanx-card p-6 flex flex-col items-center justify-center text-center min-h-[380px]">
                  <div className="relative max-h-72 w-full flex items-center justify-center overflow-hidden rounded-xl bg-[#03050C] border border-white/10 p-3 mb-4">
                    <img
                      src={imageMeta.previewUrl}
                      alt="Original Ready"
                      className="max-h-64 max-w-full object-contain rounded"
                    />
                  </div>

                  <p className="text-sm font-semibold text-white mb-1">
                    Image ready for compression
                  </p>
                  <p className="text-xs text-[#9EABCA] max-w-sm mb-4">
                    Target maximum size: <strong className="text-[#53D9FF]">{targetKb} KB</strong>. Click &quot;{t.tool.compressButton}&quot; to process locally in your browser.
                  </p>

                  <button
                    type="button"
                    onClick={handleCompress}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold lanx-btn-primary transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#53D9FF]" />
                    <span>{t.tool.compressButton}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
