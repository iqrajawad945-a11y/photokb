/**
 * Dimension calculation and aspect ratio preservation logic.
 */

export interface Dimensions {
  width: number;
  height: number;
}

export function calculateDimensions(
  origWidth: number,
  origHeight: number,
  reqWidth?: number,
  reqHeight?: number,
  maintainAspectRatio = true
): Dimensions {
  if (origWidth <= 0 || origHeight <= 0) {
    return { width: Math.max(1, reqWidth || 100), height: Math.max(1, reqHeight || 100) };
  }

  const aspectRatio = origWidth / origHeight;

  // Case 1: Both width and height requested
  if (reqWidth && reqWidth > 0 && reqHeight && reqHeight > 0) {
    if (!maintainAspectRatio) {
      return {
        width: Math.round(reqWidth),
        height: Math.round(reqHeight),
      };
    }
    // If aspect ratio must be preserved, fit inside the target box
    const fitByWidth = reqWidth;
    const fitByWidthHeight = Math.round(reqWidth / aspectRatio);

    if (fitByWidthHeight <= reqHeight) {
      return { width: fitByWidth, height: Math.max(1, fitByWidthHeight) };
    } else {
      const fitByHeight = reqHeight;
      const fitByHeightWidth = Math.round(reqHeight * aspectRatio);
      return { width: Math.max(1, fitByHeightWidth), height: fitByHeight };
    }
  }

  // Case 2: Only width requested
  if (reqWidth && reqWidth > 0) {
    const targetWidth = Math.round(reqWidth);
    const targetHeight = maintainAspectRatio ? Math.round(reqWidth / aspectRatio) : origHeight;
    return { width: targetWidth, height: Math.max(1, targetHeight) };
  }

  // Case 3: Only height requested
  if (reqHeight && reqHeight > 0) {
    const targetHeight = Math.round(reqHeight);
    const targetWidth = maintainAspectRatio ? Math.round(reqHeight * aspectRatio) : origWidth;
    return { width: Math.max(1, targetWidth), height: targetHeight };
  }

  // Default: original dimensions
  return { width: origWidth, height: origHeight };
}

export function scaleDimensions(
  width: number,
  height: number,
  scaleFactor: number
): Dimensions {
  const factor = Math.max(0.05, Math.min(1.0, scaleFactor));
  return {
    width: Math.max(10, Math.round(width * factor)),
    height: Math.max(10, Math.round(height * factor)),
  };
}
