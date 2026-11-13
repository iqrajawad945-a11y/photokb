export type OutputFormat = 'image/jpeg' | 'image/png' | 'image/webp';

export type ToolStatus =
  | 'idle'
  | 'validating'
  | 'loading'
  | 'ready'
  | 'compressing'
  | 'success'
  | 'target-not-reached'
  | 'error';

export type ToolMode = 'photo' | 'signature';

export type Language = 'en' | 'ur';

export interface ImageMeta {
  name: string;
  bytes: number;
  width: number;
  height: number;
  mimeType: string;
  previewUrl: string;
}

export interface CompressionRequest {
  file: File;
  targetBytes: number;
  outputFormat: OutputFormat;
  width?: number;
  height?: number;
  maintainAspectRatio: boolean;
  jpegBackground?: string; // Hex color (e.g. #FFFFFF) for transparency flattening
  preferredQuality?: number;
}

export interface CompressionResult {
  blob: Blob;
  mimeType: string;
  bytes: number;
  width: number;
  height: number;
  targetBytes: number;
  targetReached: boolean;
  quality?: number;
  attempts: number;
  warnings: string[];
  previewUrl: string;
}

export interface DimensionPreset {
  id: string;
  label: string;
  width: number;
  height: number;
  description: string;
}

export interface SizePreset {
  kb: number;
  label: string;
  recommendedFor: string;
}
