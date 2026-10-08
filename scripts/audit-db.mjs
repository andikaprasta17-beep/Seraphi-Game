import fs from 'node:fs';
import path from 'node:path';

function scan(dir) {
  let files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...scan(full));
    else if (full.endsWith('.tsx') || full.endsWith('.ts')) files.push(full);
  }
  return files;
}

const allFiles = scan('src');
const fileCalls = {};

for (const file of allFiles) {
  if (file.includes('db.ts')) continue;
  const content = fs.readFileSync(file, 'utf-8');
  if (!content.includes('@/lib/db')) continue;

  const importMatch = content.match(/import\s*\{([^}]+)\}\s*from\s*['"]@\/lib\/db['"]/);
  if (importMatch) {
    const importedFuncs = importMatch[1].split(',').map((s) => s.trim()).filter(Boolean);
    fileCalls[file] = importedFuncs;
  }
}

console.log('=== DATABASE IMPORT AUDIT ===');
console.log('Total files importing from db.ts:', Object.keys(fileCalls).length);
for (const [f, funcs] of Object.entries(fileCalls)) {
  console.log(`\n${f}:`);
  console.log(`  Functions: ${funcs.join(', ')}`);
}
