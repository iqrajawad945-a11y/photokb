/**
 * Filename sanitization and extension helper per TRD.
 * Ensures the downloaded file extension matches the actual output MIME type.
 */

export function getExtensionForMimeType(mimeType: string): string {
  const normalized = (mimeType || '').toLowerCase();
  if (normalized.includes('png')) return 'png';
  if (normalized.includes('webp')) return 'webp';
  return 'jpg';
}

export function sanitizeDownloadFilename(
  originalName: string,
  targetKb: number,
  outputMimeType: string
): string {
  const extension = getExtensionForMimeType(outputMimeType);
  
  // Strip previous extension and unsafe characters
  const base = (originalName || 'image')
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .substring(0, 40);

  const cleanBase = base.length > 0 ? base : 'photo';
  const targetLabel = targetKb > 0 ? `${Math.round(targetKb)}kb` : 'compressed';

  return `${cleanBase}_photokb_${targetLabel}.${extension}`;
}
