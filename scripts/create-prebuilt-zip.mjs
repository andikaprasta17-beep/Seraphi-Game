import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const rootDir = process.cwd();
const zipName = 'seraphi-game-hypercloud-prebuilt.zip';
const zipPath = path.join(rootDir, zipName);

console.log('Building Prebuilt ZIP for HyperCloudHost deployment...');

// Temporary staging directory without cache
const stageDir = path.join(rootDir, '.prebuilt-stage');
if (fs.existsSync(stageDir)) {
  fs.rmSync(stageDir, { recursive: true, force: true });
}
fs.mkdirSync(stageDir, { recursive: true });

// Copy files & folders
console.log('1. Copying server files...');
fs.copyFileSync(path.join(rootDir, 'server.js'), path.join(stageDir, 'server.js'));
fs.copyFileSync(path.join(rootDir, 'package.json'), path.join(stageDir, 'package.json'));
fs.copyFileSync(path.join(rootDir, 'package-lock.json'), path.join(stageDir, 'package-lock.json'));
fs.copyFileSync(path.join(rootDir, 'next.config.mjs'), path.join(stageDir, 'next.config.mjs'));

console.log('2. Copying public directory...');
fs.cpSync(path.join(rootDir, 'public'), path.join(stageDir, 'public'), { recursive: true });

console.log('3. Copying src directory...');
fs.cpSync(path.join(rootDir, 'src'), path.join(stageDir, 'src'), { recursive: true });

console.log('4. Copying .next build artifacts (excluding cache)...');
const nextStage = path.join(stageDir, '.next');
fs.mkdirSync(nextStage, { recursive: true });
const nextItems = fs.readdirSync(path.join(rootDir, '.next'));
for (const item of nextItems) {
  if (item === 'cache') continue;
  fs.cpSync(path.join(rootDir, '.next', item), path.join(nextStage, item), { recursive: true });
}

// Remove old zip if exists
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

// Create ZIP using tar
console.log('5. Compressing into ' + zipName + '...');
execSync(`tar -a -cf "${zipPath}" -C "${stageDir}" .`, { stdio: 'inherit' });

// Clean staging directory
fs.rmSync(stageDir, { recursive: true, force: true });

const stats = fs.statSync(zipPath);
const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
console.log(`\n✓ SUCCESS: Prebuilt ZIP generated at ${zipPath} (${sizeMB} MB)`);
