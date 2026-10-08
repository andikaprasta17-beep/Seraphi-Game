import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const sourceDb = path.join(rootDir, 'data', 'seraphi.db');
const backupDir = path.join(rootDir, 'backup');

function padZero(n) {
  return String(n).padStart(2, '0');
}

function getFormattedTimestamp() {
  const d = new Date();
  const year = d.getFullYear();
  const month = padZero(d.getMonth() + 1);
  const day = padZero(d.getDate());
  const hours = padZero(d.getHours());
  const minutes = padZero(d.getMinutes());
  return `${year}-${month}-${day}-${hours}-${minutes}`;
}

async function runBackup() {
  console.log('--- SERAPHI GAME DATABASE BACKUP ---');

  if (!fs.existsSync(sourceDb)) {
    console.error(`[ERROR] Sumber database tidak ditemukan di: ${sourceDb}`);
    process.exit(1);
  }

  // Ensure backup directory exists (strictly outside public directory)
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const timestamp = getFormattedTimestamp();
  const backupFileName = `seraphi-${timestamp}.db`;
  const destPath = path.join(backupDir, backupFileName);

  try {
    fs.copyFileSync(sourceDb, destPath);
    const stats = fs.statSync(destPath);
    const sizeKb = (stats.size / 1024).toFixed(1);

    console.log(`[SUCCESS] Backup database berhasil dibuat:`);
    console.log(`  File : backup/${backupFileName}`);
    console.log(`  Ukuran: ${sizeKb} KB`);
    console.log(`  Waktu : ${new Date().toISOString()}`);
  } catch (err) {
    console.error('[ERROR] Gagal membuat backup database:', err.message);
    process.exit(1);
  }
}

runBackup();
