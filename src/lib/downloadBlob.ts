import { sanitizeDownloadFilename } from './sanitizeFilename';

export function downloadBlob(
  blob: Blob,
  originalFilename: string,
  targetKb: number,
  outputMimeType: string
): void {
  const filename = sanitizeDownloadFilename(originalFilename, targetKb, outputMimeType);
  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = filename;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();

  // Cleanup after browser has triggered download
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  }, 1500);
}
