import { DatabaseSync } from 'node:sqlite';
import fs from 'fs';

const db = new DatabaseSync('./data/seraphi.db');

const games = db.prepare('SELECT id, cover_image, banner_image FROM games').all();
const chars = db.prepare('SELECT id, portrait, full_image FROM characters').all();
const items = db.prepare('SELECT id, icon FROM items').all();
const events = db.prepare('SELECT id, banner_image FROM events').all();
const news = db.prepare('SELECT id, thumbnail FROM news').all();
const guides = db.prepare('SELECT id, thumbnail FROM guides').all();

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let count = 0;

  // Update games
  for (const g of games) {
    const idRegex = new RegExp(`(["']id["']\\s*:\\s*["']${g.id}["'][\\s\\S]*?)(["']cover_image["']\\s*:\\s*["'])[^"']+(["'])`, 'g');
    content = content.replace(idRegex, (match, p1, p2, p3) => {
      count++;
      return `${p1}${p2}${g.cover_image}${p3}`;
    });
    const bannerRegex = new RegExp(`(["']id["']\\s*:\\s*["']${g.id}["'][\\s\\S]*?)(["']banner_image["']\\s*:\\s*["'])[^"']+(["'])`, 'g');
    content = content.replace(bannerRegex, (match, p1, p2, p3) => {
      count++;
      return `${p1}${p2}${g.banner_image}${p3}`;
    });
  }

  // Update characters
  for (const c of chars) {
    const portRegex = new RegExp(`(["']id["']\\s*:\\s*["']${c.id}["'][\\s\\S]*?)(["']portrait["']\\s*:\\s*["'])[^"']+(["'])`, 'g');
    content = content.replace(portRegex, (match, p1, p2, p3) => {
      count++;
      return `${p1}${p2}${c.portrait}${p3}`;
    });
    const fullRegex = new RegExp(`(["']id["']\\s*:\\s*["']${c.id}["'][\\s\\S]*?)(["']full_image["']\\s*:\\s*["'])[^"']+(["'])`, 'g');
    content = content.replace(fullRegex, (match, p1, p2, p3) => {
      count++;
      return `${p1}${p2}${c.full_image}${p3}`;
    });
  }

  // Update items
  for (const it of items) {
    const iconRegex = new RegExp(`(["']id["']\\s*:\\s*["']${it.id}["'][\\s\\S]*?)(["']icon["']\\s*:\\s*["'])[^"']+(["'])`, 'g');
    content = content.replace(iconRegex, (match, p1, p2, p3) => {
      count++;
      return `${p1}${p2}${it.icon}${p3}`;
    });
  }

  // Update events
  for (const ev of events) {
    const bannerRegex = new RegExp(`(["']id["']\\s*:\\s*["']${ev.id}["'][\\s\\S]*?)(["']banner_image["']\\s*:\\s*["'])[^"']+(["'])`, 'g');
    content = content.replace(bannerRegex, (match, p1, p2, p3) => {
      count++;
      return `${p1}${p2}${ev.banner_image}${p3}`;
    });
    const imgRegex = new RegExp(`(["']id["']\\s*:\\s*["']${ev.id}["'][\\s\\S]*?)(["']image["']\\s*:\\s*["'])[^"']+(["'])`, 'g');
    content = content.replace(imgRegex, (match, p1, p2, p3) => {
      count++;
      return `${p1}${p2}${ev.banner_image}${p3}`;
    });
  }

  // Update news
  for (const n of news) {
    const thumbRegex = new RegExp(`(["']id["']\\s*:\\s*["']${n.id}["'][\\s\\S]*?)(["']thumbnail["']\\s*:\\s*["'])[^"']+(["'])`, 'g');
    content = content.replace(thumbRegex, (match, p1, p2, p3) => {
      count++;
      return `${p1}${p2}${n.thumbnail}${p3}`;
    });
    const featRegex = new RegExp(`(["']id["']\\s*:\\s*["']${n.id}["'][\\s\\S]*?)(["']featured_image["']\\s*:\\s*["'])[^"']+(["'])`, 'g');
    content = content.replace(featRegex, (match, p1, p2, p3) => {
      count++;
      return `${p1}${p2}${n.thumbnail}${p3}`;
    });
  }

  // Update guides
  for (const gd of guides) {
    const thumbRegex = new RegExp(`(["']id["']\\s*:\\s*["']${gd.id}["'][\\s\\S]*?)(["']thumbnail["']\\s*:\\s*["'])[^"']+(["'])`, 'g');
    content = content.replace(thumbRegex, (match, p1, p2, p3) => {
      count++;
      return `${p1}${p2}${gd.thumbnail}${p3}`;
    });
    const featRegex = new RegExp(`(["']id["']\\s*:\\s*["']${gd.id}["'][\\s\\S]*?)(["']featured_image["']\\s*:\\s*["'])[^"']+(["'])`, 'g');
    content = content.replace(featRegex, (match, p1, p2, p3) => {
      count++;
      return `${p1}${p2}${gd.thumbnail}${p3}`;
    });
  }

  fs.writeFileSync(filePath, content);
  console.log(`✓ Updated ${filePath}: made ${count} image replacements`);
}

updateFile('src/lib/data-seed.ts');
updateFile('src/lib/data-seed-expansion.ts');
updateFile('scripts/generate-phase3-seed.mjs');
