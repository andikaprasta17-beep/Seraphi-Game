import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { downloadFile, getWikiImageUrl } from './build-authentic-visual-assets.mjs';

const outDir = path.join('public', 'images', 'games');
fs.mkdirSync(outDir, { recursive: true });

async function processImage(srcPath, destPath, width, height) {
  await sharp(srcPath)
    .resize(width, height, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(destPath);
}

async function run() {
  console.log('--- Processing 22 Game Covers & Banners ---');

  // LoL
  await processImage('temp_check/lol_cover.jpg', path.join(outDir, 'lol-cover.jpg'), 600, 900);
  await processImage('temp_check/lol_banner.jpg', path.join(outDir, 'lol-banner.jpg'), 1200, 600);
  console.log('✓ LoL');

  // Valorant
  await processImage('temp_check/val_pj_cover.png', path.join(outDir, 'valorant-cover.jpg'), 600, 900);
  await processImage('temp_check/val_pj_banner.png', path.join(outDir, 'valorant-banner.jpg'), 1200, 600);
  console.log('✓ Valorant');

  // HSR
  await processImage('temp_check/hsr_cover.png', path.join(outDir, 'hsr-cover.jpg'), 600, 900);
  // Download HSR astral express banner
  try {
    const hsrBannerUrl = 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_portrait/1005.png'; // Kafka / Astral
    await downloadFile(hsrBannerUrl, 'temp_check/hsr_banner_src.png');
    await sharp('temp_check/hsr_banner_src.png')
      .resize(1200, 600, { fit: 'cover', position: 'top' })
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(path.join(outDir, 'hsr-banner.jpg'));
  } catch (e) {
    await processImage('temp_check/hsr_cover.png', path.join(outDir, 'hsr-banner.jpg'), 1200, 600);
  }
  console.log('✓ HSR');

  // Arknights
  await processImage('temp_check/arknights_bg.png', path.join(outDir, 'arknights-banner.jpg'), 1200, 600);
  await processImage('temp_check/amiya_test.png', path.join(outDir, 'arknights-cover.jpg'), 600, 900);
  console.log('✓ Arknights');

  // Blue Archive
  await processImage('temp_check/mika_portrait.webp', path.join(outDir, 'ba-cover.jpg'), 600, 900);
  await processImage('temp_check/mika_portrait.webp', path.join(outDir, 'ba-banner.jpg'), 1200, 600);
  console.log('✓ Blue Archive');

  // FGO
  await processImage('temp_check/artoria_graph.png', path.join(outDir, 'fgo-cover.jpg'), 600, 900);
  await processImage('temp_check/gilg_graph.png', path.join(outDir, 'fgo-banner.jpg'), 1200, 600);
  console.log('✓ FGO');

  // ZZZ
  await processImage('temp_check/ellen_real.png', path.join(outDir, 'zzz-cover.jpg'), 600, 900);
  await processImage('temp_check/ellen_real.png', path.join(outDir, 'zzz-banner.jpg'), 1200, 600);
  console.log('✓ ZZZ');

  // WuWa
  const jiyanCardUrl = 'https://static.wikia.nocookie.net/wutheringwaves/images/0/0d/Jiyan_Card.png/revision/latest?cb=20240509102627';
  await downloadFile(jiyanCardUrl, 'temp_check/wuwa_jiyan_card.png');
  await processImage('temp_check/wuwa_jiyan_card.png', path.join(outDir, 'wuwa-cover.jpg'), 600, 900);
  const changliCardUrl = 'https://static.wikia.nocookie.net/wutheringwaves/images/e/e9/Changli_Card.png/revision/latest?cb=20240719033449';
  await downloadFile(changliCardUrl, 'temp_check/wuwa_changli_card.png');
  await processImage('temp_check/wuwa_changli_card.png', path.join(outDir, 'wuwa-banner.jpg'), 1200, 600);
  console.log('✓ WuWa');

  // MLBB
  const lingUrl = 'https://static.wikia.nocookie.net/mobile-legends/images/e/e0/Hero841-portrait.png/revision/latest?cb=20241021142700';
  await downloadFile(lingUrl, 'temp_check/mlbb_ling_card.png');
  await processImage('temp_check/mlbb_ling_card.png', path.join(outDir, 'mlbb-cover.jpg'), 600, 900);
  const chouUrl = 'https://static.wikia.nocookie.net/mobile-legends/images/e/ed/Hero261-portrait.png/revision/latest?cb=20241021141231';
  await downloadFile(chouUrl, 'temp_check/mlbb_chou_card.png');
  await processImage('temp_check/mlbb_chou_card.png', path.join(outDir, 'mlbb-banner.jpg'), 1200, 600);
  console.log('✓ MLBB');

  // Free Fire
  const alokUrl = 'https://static.wikia.nocookie.net/freefire/images/7/71/Alok.png/revision/latest?cb=20230130021017';
  await downloadFile(alokUrl, 'temp_check/ff_alok_card.png');
  await processImage('temp_check/ff_alok_card.png', path.join(outDir, 'ff-cover.jpg'), 600, 900);
  await processImage('temp_check/ff_alok_card.png', path.join(outDir, 'ff-banner.jpg'), 1200, 600);
  console.log('✓ Free Fire');

  // Roblox
  const bloxUrl = 'https://static.wikia.nocookie.net/roblox-blox-piece/images/7/74/Cursed_Dual_Katana.png/revision/latest?cb=20241223032242';
  await downloadFile(bloxUrl, 'temp_check/roblox_blox.png');
  await processImage('temp_check/roblox_blox.png', path.join(outDir, 'roblox-cover.jpg'), 600, 900);
  await processImage('temp_check/roblox_blox.png', path.join(outDir, 'roblox-banner.jpg'), 1200, 600);
  console.log('✓ Roblox');

  console.log('\n--- ALL 22 GAMES COVERS & BANNERS COMPLETE! ---');
}

run().catch(console.error);
