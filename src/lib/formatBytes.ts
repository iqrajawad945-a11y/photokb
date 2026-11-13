/**
 * Utility functions for byte and file size formatting.
 * Per TRD: 1 KB = 1,000 bytes is recommended for portal limits,
 * ensuring files don't fail strict decimal or binary checks.
 */

export function kbToBytes(kb: number): number {
  if (kb <= 0 || !Number.isFinite(kb)) {
    return 0;
  }
  return Math.round(kb * 1000);
}

export function bytesToKb(bytes: number): number {
  if (bytes <= 0 || !Number.isFinite(bytes)) {
    return 0;
  }
  return Number((bytes / 1000).toFixed(2));
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  if (bytes < 0 || !Number.isFinite(bytes)) return '0 B';

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const safeI = Math.min(i, sizes.length - 1);
  const value = parseFloat((bytes / Math.pow(k, safeI)).toFixed(dm));

  return `${value} ${sizes[safeI]}`;
}

export function formatBytesWithExact(bytes: number): string {
  const formatted = formatBytes(bytes);
  const formattedExact = new Intl.NumberFormat('en-US').format(bytes);
  return `${formatted} (${formattedExact} bytes)`;
}

export function calculateSavingsPercent(originalBytes: number, newBytes: number): number {
  if (originalBytes <= 0 || newBytes <= 0 || newBytes >= originalBytes) {
    return 0;
  }
  const diff = originalBytes - newBytes;
  return Math.round((diff / originalBytes) * 100);
}
