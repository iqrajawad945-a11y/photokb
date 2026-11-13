import test from 'node:test';
import assert from 'node:assert/strict';

import {
  formatBytes,
  formatBytesWithExact,
  kbToBytes,
  bytesToKb,
  calculateSavingsPercent,
} from './formatBytes';
import {
  calculateDimensions,
  scaleDimensions,
} from './calculateDimensions';
import {
  getExtensionForMimeType,
  sanitizeDownloadFilename,
} from './sanitizeFilename';
import {
  validateImageFile,
  validateImageDimensions,
} from './validateImageFile';

test('formatBytes formats byte counts correctly', () => {
  assert.equal(formatBytes(0), '0 B');
  assert.equal(formatBytes(500), '500 B');
  assert.equal(formatBytes(20_000), '20 KB');
  assert.equal(formatBytes(50_500, 1), '50.5 KB');
  assert.equal(formatBytes(1_500_000, 1), '1.5 MB');
});

test('kbToBytes and bytesToKb convert accurately', () => {
  assert.equal(kbToBytes(20), 20000);
  assert.equal(kbToBytes(50), 50000);
  assert.equal(bytesToKb(20000), 20);
  assert.equal(bytesToKb(50500), 50.5);
});

test('formatBytesWithExact formats with comma-separated byte string', () => {
  const result = formatBytesWithExact(20480);
  assert.match(result, /20\.5 KB/);
  assert.match(result, /20,480 bytes/);
});

test('calculateSavingsPercent computes percentage savings truthfully', () => {
  assert.equal(calculateSavingsPercent(100_000, 20_000), 80);
  assert.equal(calculateSavingsPercent(200_000, 50_000), 75);
  assert.equal(calculateSavingsPercent(10_000, 15_000), 0);
});

test('calculateDimensions preserves aspect ratio when locked', () => {
  // Original 1200 x 800 (aspect ratio 1.5)
  // Request 600 width with aspect ratio locked
  const res1 = calculateDimensions(1200, 800, 600, undefined, true);
  assert.equal(res1.width, 600);
  assert.equal(res1.height, 400);

  // Request 400 height with aspect ratio locked
  const res2 = calculateDimensions(1200, 800, undefined, 400, true);
  assert.equal(res2.width, 600);
  assert.equal(res2.height, 400);

  // Request box 600x600 with aspect ratio locked -> fits to 600x400
  const res3 = calculateDimensions(1200, 800, 600, 600, true);
  assert.equal(res3.width, 600);
  assert.equal(res3.height, 400);

  // Request 300x300 unlocked
  const res4 = calculateDimensions(1200, 800, 300, 300, false);
  assert.equal(res4.width, 300);
  assert.equal(res4.height, 300);
});

test('scaleDimensions scales down safely', () => {
  const scaled = scaleDimensions(1000, 800, 0.5);
  assert.equal(scaled.width, 500);
  assert.equal(scaled.height, 400);
});

test('getExtensionForMimeType matches MIME to correct extension', () => {
  assert.equal(getExtensionForMimeType('image/jpeg'), 'jpg');
  assert.equal(getExtensionForMimeType('image/png'), 'png');
  assert.equal(getExtensionForMimeType('image/webp'), 'webp');
});

test('sanitizeDownloadFilename generates safe name with target and extension', () => {
  const name1 = sanitizeDownloadFilename('my photo 2026.png', 50, 'image/jpeg');
  assert.equal(name1, 'my_photo_2026_photokb_50kb.jpg');

  const name2 = sanitizeDownloadFilename('signature-scan.jpg', 20, 'image/webp');
  assert.equal(name2, 'signature-scan_photokb_20kb.webp');
});

test('validateImageFile rejects invalid formats and accepts supported formats', () => {
  // Empty
  assert.equal(validateImageFile(null).valid, false);

  // Mock File-like object
  const validJpg = {
    name: 'photo.jpg',
    type: 'image/jpeg',
    size: 500_000,
  } as unknown as File;
  assert.equal(validateImageFile(validJpg).valid, true);

  const pdfFile = {
    name: 'document.pdf',
    type: 'application/pdf',
    size: 200_000,
  } as unknown as File;
  const pdfRes = validateImageFile(pdfFile);
  assert.equal(pdfRes.valid, false);
  assert.match(pdfRes.error || '', /PDF/);

  const gifFile = {
    name: 'animated.gif',
    type: 'image/gif',
    size: 400_000,
  } as unknown as File;
  const gifRes = validateImageFile(gifFile);
  assert.equal(gifRes.valid, false);
  assert.match(gifRes.error || '', /GIF/);

  const oversizeFile = {
    name: 'huge.jpg',
    type: 'image/jpeg',
    size: 25 * 1024 * 1024,
  } as unknown as File;
  const overRes = validateImageFile(oversizeFile);
  assert.equal(overRes.valid, false);
  assert.match(overRes.error || '', /too large/);
});

test('validateImageDimensions flags extreme dimensions', () => {
  assert.equal(validateImageDimensions(1920, 1080).valid, true);
  assert.equal(validateImageDimensions(10000, 5000).valid, false);
  assert.equal(validateImageDimensions(0, 500).valid, false);
});
