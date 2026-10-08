/**
 * Master Authentic Visual Asset Builder & Auditor
 * Sourced directly from official game CDNs and APIs:
 * - Steam Store Official CDNs (shared.fastly.steamstatic.com / shared.akamai.steamstatic.com)
 * - Riot Data Dragon & Valorant API (media.valorant-api.com)
 * - HoYoverse Official Repositories (Mar-7th/StarRailRes, theBowja/genshin-db, Enka)
 * - Official Game Fandom MediaWiki APIs (Kuro, ZZZ, MLBB, Free Fire, Roblox, FromSoft, Blizzard, CDPR)
 * - ArknightsResource & SchaleDB & AtlasAcademy
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import sharp from 'sharp';

// Ensure directories exist in public/images
const dirs = ['games', 'characters', 'items', 'events', 'news', 'guides'];
for (const d of dirs) {
  fs.mkdirSync(path.join('public', 'images', d), { recursive: true });
}

// Download helper with timeout & redirect support
export function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const makeReq = (curUrl, redirects = 0) => {
      if (redirects > 5) return reject(new Error('Too many redirects: ' + curUrl));
      const parsed = new URL(curUrl);
      const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      };
      if (curUrl.includes('wikia.nocookie.net')) {
        headers['Referer'] = 'https://www.fandom.com/';
      }
      const req = https.get({
        protocol: parsed.protocol,
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        headers
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const nextUrl = res.headers.location.startsWith('http') ? res.headers.location : new URL(res.headers.location, curUrl).toString();
          return makeReq(nextUrl, redirects + 1);
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} for ${curUrl}`));
        }
        const fileStream = fs.createWriteStream(dest);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(dest);
        });
        fileStream.on('error', reject);
      });
      req.on('error', reject);
      req.setTimeout(25000, () => {
        req.destroy();
        reject(new Error('Timeout downloading ' + curUrl));
      });
    };
    makeReq(url);
  });
}

// MediaWiki API image lookup helper
export async function getWikiImageUrl(wiki, filenameOrTitle, isFile = false) {
  const title = isFile ? `File:${filenameOrTitle}` : filenameOrTitle;
  const apiUrl = `https://${wiki}.fandom.com/api.php?action=query&titles=${encodeURIComponent(title)}&prop=${isFile ? 'imageinfo' : 'pageimages'}&iiprop=url&piprop=original|thumbnail&format=json`;
  return new Promise((resolve) => {
    https.get(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const page = Object.values(json.query.pages)[0];
          if (isFile) {
            resolve(page.imageinfo?.[0]?.url || null);
          } else {
            resolve(page.original?.source || page.thumbnail?.source || null);
          }
        } catch { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

console.log('✓ Helpers initialized.');
