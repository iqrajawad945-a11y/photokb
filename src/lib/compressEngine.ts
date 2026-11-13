import {
  CompressionRequest,
  CompressionResult,
  OutputFormat,
} from '../types/compressor';
import { calculateDimensions, scaleDimensions } from './calculateDimensions';

/**
 * Pure browser-based canvas compression engine.
 * Never transmits image bytes to any server or remote service.
 */

// Helper to convert canvas.toBlob to a Promise
function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: string,
  quality?: number
): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob);
      },
      format,
      quality
    );
  });
}

// Decode file to Image element
export function decodeImageFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(img);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to read image file. The file may be corrupt or formatted improperly.'));
    };

    img.src = objectUrl;
  });
}

export async function compressImage(
  request: CompressionRequest
): Promise<CompressionResult> {
  const {
    file,
    targetBytes,
    outputFormat = 'image/jpeg',
    width: reqWidth,
    height: reqHeight,
    maintainAspectRatio = true,
    jpegBackground = '#FFFFFF',
    preferredQuality,
  } = request;

  // 1. Decode original image
  const img = await decodeImageFile(file);
  const origWidth = img.naturalWidth || img.width;
  const origHeight = img.naturalHeight || img.height;

  if (origWidth <= 0 || origHeight <= 0) {
    throw new Error('Image has invalid dimensions (0x0).');
  }

  // 2. Initial dimensions calculation
  let targetDims = calculateDimensions(
    origWidth,
    origHeight,
    reqWidth,
    reqHeight,
    maintainAspectRatio
  );

  const isLossy = outputFormat === 'image/jpeg' || outputFormat === 'image/webp';
  const warnings: string[] = [];
  let attempts = 0;
  const MAX_ATTEMPTS = 16;

  let bestBlob: Blob | null = null;
  let bestDims = { ...targetDims };
  let bestQuality = preferredQuality || 0.85;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: false });

  if (!ctx) {
    throw new Error('Failed to create browser canvas context for image processing.');
  }
  const activeCtx = ctx;

  // Helper to draw and encode
  async function renderAndEncode(
    w: number,
    h: number,
    format: OutputFormat,
    quality: number
  ): Promise<Blob | null> {
    canvas.width = w;
    canvas.height = h;

    // Fill background for JPEG if transparency flattening is needed
    if (format === 'image/jpeg') {
      activeCtx.fillStyle = jpegBackground || '#FFFFFF';
      activeCtx.fillRect(0, 0, w, h);
    } else {
      activeCtx.clearRect(0, 0, w, h);
    }

    // High quality scaling
    activeCtx.imageSmoothingEnabled = true;
    activeCtx.imageSmoothingQuality = 'high';
    activeCtx.drawImage(img, 0, 0, w, h);

    return await canvasToBlob(canvas, format, quality);
  }

  // If output format is PNG (lossless)
  if (!isLossy) {
    warnings.push('PNG uses lossless compression. To reach small KB targets, dimensions may need to be scaled.');
    let currentDims = { ...targetDims };
    let scaleStep = 1.0;

    while (attempts < MAX_ATTEMPTS) {
      attempts++;
      const blob = await renderAndEncode(currentDims.width, currentDims.height, 'image/png', 1.0);
      if (!blob) break;

      if (!bestBlob || blob.size <= targetBytes || (bestBlob.size > targetBytes && blob.size < bestBlob.size)) {
        bestBlob = blob;
        bestDims = { ...currentDims };
      }

      if (blob.size <= targetBytes) {
        break;
      }

      // Proportional downscale
      scaleStep *= 0.82;
      currentDims = scaleDimensions(targetDims.width, targetDims.height, scaleStep);
      if (currentDims.width <= 60 || currentDims.height <= 60) {
        break; // Stop before extreme shrinking
      }
    }
  } else {
    // Lossy search (JPEG / WebP)
    // First pass: try with preferred quality or 0.88 at desired dimensions
    let currentDims = { ...targetDims };
    let minQ = 0.15;
    let maxQ = 0.95;
    let currentQ = preferredQuality ? Math.min(0.95, Math.max(0.2, preferredQuality)) : 0.85;

    // Binary search over quality
    for (let i = 0; i < 6; i++) {
      attempts++;
      const blob = await renderAndEncode(currentDims.width, currentDims.height, outputFormat, currentQ);
      if (!blob) break;

      if (!bestBlob) {
        bestBlob = blob;
        bestDims = { ...currentDims };
        bestQuality = currentQ;
      } else if (blob.size <= targetBytes) {
        // We are under target. Can we get higher quality?
        if (bestBlob.size > targetBytes || blob.size > bestBlob.size || currentQ > bestQuality) {
          bestBlob = blob;
          bestDims = { ...currentDims };
          bestQuality = currentQ;
        }
      } else if (bestBlob.size > targetBytes && blob.size < bestBlob.size) {
        bestBlob = blob;
        bestDims = { ...currentDims };
        bestQuality = currentQ;
      }

      if (blob.size > targetBytes) {
        // Need smaller file -> lower quality
        maxQ = currentQ;
        currentQ = (minQ + currentQ) / 2;
      } else {
        // Under target -> can try slightly higher quality
        minQ = currentQ;
        currentQ = (currentQ + maxQ) / 2;
      }

      if (Math.abs(maxQ - minQ) < 0.05) {
        break;
      }
    }

    // If still above target bytes, reduce dimensions and retry with balanced quality
    if (bestBlob && bestBlob.size > targetBytes) {
      let scaleStep = 0.85;
      while (attempts < MAX_ATTEMPTS) {
        attempts++;
        currentDims = scaleDimensions(targetDims.width, targetDims.height, scaleStep);
        
        if (currentDims.width < 80 || currentDims.height < 80) {
          break; // Don't make unreadable
        }

        // Test at quality 0.55 first, then 0.35 if needed
        const blobMid = await renderAndEncode(currentDims.width, currentDims.height, outputFormat, 0.55);
        if (blobMid) {
          if (blobMid.size <= targetBytes) {
            bestBlob = blobMid;
            bestDims = { ...currentDims };
            bestQuality = 0.55;
            break;
          }
          if (blobMid.size < bestBlob.size) {
            bestBlob = blobMid;
            bestDims = { ...currentDims };
            bestQuality = 0.55;
          }
        }

        const blobLow = await renderAndEncode(currentDims.width, currentDims.height, outputFormat, 0.35);
        if (blobLow) {
          if (blobLow.size <= targetBytes) {
            bestBlob = blobLow;
            bestDims = { ...currentDims };
            bestQuality = 0.35;
            break;
          }
          if (blobLow.size < bestBlob.size) {
            bestBlob = blobLow;
            bestDims = { ...currentDims };
            bestQuality = 0.35;
          }
        }

        scaleStep *= 0.78;
      }
    }
  }

  // Cleanup canvas
  canvas.width = 1;
  canvas.height = 1;

  if (!bestBlob) {
    throw new Error('Image compression could not produce a valid output file.');
  }

  const targetReached = bestBlob.size <= targetBytes;
  if (!targetReached) {
    warnings.push(
      `Could not reach the exact limit of ${(targetBytes / 1000).toFixed(0)} KB without severe quality or dimension degradation. Lowest achieved size is ${(bestBlob.size / 1000).toFixed(1)} KB.`
    );
  }

  const previewUrl = URL.createObjectURL(bestBlob);

  return {
    blob: bestBlob,
    mimeType: bestBlob.type || outputFormat,
    bytes: bestBlob.size,
    width: bestDims.width,
    height: bestDims.height,
    targetBytes,
    targetReached,
    quality: bestQuality,
    attempts,
    warnings,
    previewUrl,
  };
}
