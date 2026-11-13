import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const BUN_LOCKFILES = ['bun.lock', 'bun.lockb'];

/**
 * Removes Bun lockfiles (`bun.lock`, `bun.lockb`) from the given root directory
 * so deployments (e.g. Cloudflare Pages) use npm/package.json cleanly without lockfile errors.
 */
export function removeBunLockfiles(rootDir = process.cwd()) {
  const removed = [];

  for (const filename of BUN_LOCKFILES) {
    const filePath = path.join(rootDir, filename);
    try {
      if (fs.existsSync(filePath)) {
        fs.rmSync(filePath, { force: true });
        removed.push(filename);
      }
    } catch {
      // Ignore transient filesystem errors during cleanup
    }
  }

  return removed;
}

const isDirectRun =
  typeof process !== 'undefined' &&
  Array.isArray(process.argv) &&
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  removeBunLockfiles();
}
