/**
 * Image file validation module.
 * Checks MIME type, extension, and file size limits according to PhotoKB TRD.
 */

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const MAX_INPUT_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB
export const MAX_PIXEL_DIMENSION = 8000;
export const MAX_TOTAL_PIXELS = 36_000_000; // 36 Megapixels

export interface ValidationResult {
  valid: boolean;
  error?: string;
  detectedType?: string;
}

export function validateImageFile(
  file: File | null | undefined,
  maxSizeBytes = MAX_INPUT_FILE_SIZE_BYTES
): ValidationResult {
  if (!file) {
    return { valid: false, error: 'Please choose an image file to compress.' };
  }

  // 1. Check size limit
  if (file.size <= 0) {
    return { valid: false, error: 'The selected file is empty (0 bytes).' };
  }

  if (file.size > maxSizeBytes) {
    const maxMb = Math.round(maxSizeBytes / (1024 * 1024));
    return {
      valid: false,
      error: `File is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum allowed size is ${maxMb} MB.`,
    };
  }

  // 2. Check MIME type and extension
  const mimeType = (file.type || '').toLowerCase();
  const fileName = (file.name || '').toLowerCase();
  const extension = fileName.includes('.') ? fileName.split('.').pop() || '' : '';

  // Unsupported checks for clear error guidance
  if (mimeType.includes('gif') || extension === 'gif') {
    return {
      valid: false,
      error: 'GIF files (including animated GIFs) are not supported. Please select a JPG, PNG, or WebP image.',
    };
  }

  if (mimeType.includes('pdf') || extension === 'pdf') {
    return {
      valid: false,
      error: 'PDF documents cannot be compressed here. PhotoKB compresses JPG, PNG, and WebP images.',
    };
  }

  if (mimeType.includes('svg') || extension === 'svg') {
    return {
      valid: false,
      error: 'Vector SVG files are not supported. Please upload a raster image (JPG, PNG, or WebP).',
    };
  }

  if (mimeType.includes('heic') || extension === 'heic' || extension === 'heif') {
    return {
      valid: false,
      error: 'HEIC/HEIF images from iPhone need to be converted to JPG or PNG first before compression.',
    };
  }

  const isValidMime = ALLOWED_MIME_TYPES.includes(mimeType);
  const isValidExt = ['jpg', 'jpeg', 'png', 'webp'].includes(extension);

  if (!isValidMime && !isValidExt) {
    return {
      valid: false,
      error: 'Unsupported image format. Please select a valid JPG, PNG, or WebP photo or signature.',
    };
  }

  return {
    valid: true,
    detectedType: mimeType || (extension === 'png' ? 'image/png' : 'image/jpeg'),
  };
}

export function validateImageDimensions(
  width: number,
  height: number
): { valid: boolean; error?: string } {
  if (width <= 0 || height <= 0) {
    return { valid: false, error: 'Invalid image dimensions (0px).' };
  }

  if (width > MAX_PIXEL_DIMENSION || height > MAX_PIXEL_DIMENSION) {
    return {
      valid: false,
      error: `Image dimensions (${width}x${height}px) exceed the safe limit of ${MAX_PIXEL_DIMENSION}px to prevent browser memory issues.`,
    };
  }

  if (width * height > MAX_TOTAL_PIXELS) {
    return {
      valid: false,
      error: `Total image resolution (${((width * height) / 1_000_000).toFixed(1)} MP) exceeds device memory threshold (36 MP).`,
    };
  }

  return { valid: true };
}
