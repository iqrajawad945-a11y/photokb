import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { BUN_LOCKFILES, removeBunLockfiles } from './clean-bun-lock.mjs';

test('removeBunLockfiles deletes bun.lock and bun.lockb while preserving other files', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'photokb-lock-clean-'));
  try {
    const bunLock = path.join(tempDir, 'bun.lock');
    const bunLockb = path.join(tempDir, 'bun.lockb');
    const pkgJson = path.join(tempDir, 'package.json');

    fs.writeFileSync(bunLock, 'lockfile-content');
    fs.writeFileSync(bunLockb, 'binary-lockfile-content');
    fs.writeFileSync(pkgJson, '{"name":"test"}');

    const removed = removeBunLockfiles(tempDir);

    assert.deepEqual(removed, BUN_LOCKFILES);
    assert.equal(fs.existsSync(bunLock), false);
    assert.equal(fs.existsSync(bunLockb), false);
    assert.equal(fs.existsSync(pkgJson), true);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test('removeBunLockfiles is safe and returns empty array when no bun lockfiles exist', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'photokb-lock-empty-'));
  try {
    const removed = removeBunLockfiles(tempDir);
    assert.deepEqual(removed, []);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});
