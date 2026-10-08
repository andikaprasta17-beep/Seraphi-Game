import { spawnSync } from 'node:child_process';
import path from 'node:path';

async function testPersistence() {
  console.log('\n=============================================================');
  console.log('   SERAPHI GAME — SQLITE DATABASE PERSISTENCE VERIFICATION    ');
  console.log('=============================================================\n');

  const testKey = `persist_key_${Date.now()}`;
  const testVal = `payload_val_${Math.random().toString(36).substring(2, 9)}`;

  // Step 1: Process A writes a record
  console.log('[Step 1] Process A: Writing test record to data/seraphi.db...');
  const procA = spawnSync(
    process.execPath,
    [
      '-e',
      `
      import { DatabaseSync } from 'node:sqlite';
      import path from 'node:path';
      const db = new DatabaseSync(path.join(process.cwd(), 'data', 'seraphi.db'));
      db.exec('CREATE TABLE IF NOT EXISTS _persistence_check (key TEXT PRIMARY KEY, val TEXT, created_at TEXT);');
      db.prepare('INSERT INTO _persistence_check (key, val, created_at) VALUES (?, ?, ?);').run('${testKey}', '${testVal}', new Date().toISOString());
      console.log('Process A written successfully');
      `
    ],
    { encoding: 'utf-8' }
  );

  if (procA.status !== 0) {
    throw new Error(`Process A failed: ${procA.stderr || procA.stdout}`);
  }
  console.log('         ', procA.stdout.trim());

  // Step 2: Process A completely terminated. Process B starts up.
  console.log('[Step 2] Process A terminated. Spawning isolated Process B to read...');
  const procB = spawnSync(
    process.execPath,
    [
      '-e',
      `
      import { DatabaseSync } from 'node:sqlite';
      import path from 'node:path';
      const db = new DatabaseSync(path.join(process.cwd(), 'data', 'seraphi.db'));
      const row = db.prepare('SELECT val FROM _persistence_check WHERE key = ?;').get('${testKey}');
      if (!row || row.val !== '${testVal}') {
        console.error('Mismatch or row missing');
        process.exit(1);
      }
      console.log('Process B read verified: ' + row.val);
      `
    ],
    { encoding: 'utf-8' }
  );

  if (procB.status !== 0) {
    throw new Error(`Process B failed: ${procB.stderr || procB.stdout}`);
  }
  console.log('         ', procB.stdout.trim());

  // Step 3: Cleanup in isolated Process C
  console.log('[Step 3] Process B terminated. Spawning Process C for cleanup...');
  const procC = spawnSync(
    process.execPath,
    [
      '-e',
      `
      import { DatabaseSync } from 'node:sqlite';
      import path from 'node:path';
      const db = new DatabaseSync(path.join(process.cwd(), 'data', 'seraphi.db'));
      db.prepare('DELETE FROM _persistence_check WHERE key = ?;').run('${testKey}');
      const check = db.prepare('SELECT count(*) as c FROM _persistence_check WHERE key = ?;').get('${testKey}');
      if (check.c !== 0) {
        console.error('Cleanup failed');
        process.exit(1);
      }
      console.log('Process C cleanup verified');
      `
    ],
    { encoding: 'utf-8' }
  );

  if (procC.status !== 0) {
    throw new Error(`Process C failed: ${procC.stderr || procC.stdout}`);
  }
  console.log('         ', procC.stdout.trim());

  console.log('\n✓ [PASS] SQLite filesystem storage is 100% PERSISTENT across isolated processes.');
  console.log('STATUS: DATABASE PERSISTENCE: PASS\n');
}

testPersistence().catch((err) => {
  console.error('Persistence test failed:', err);
  process.exit(1);
});
