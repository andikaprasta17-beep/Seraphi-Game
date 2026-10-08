import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { downloadFile, getWikiImageUrl } from './build-authentic-visual-assets.mjs';

const outDir = path.join('public', 'images', 'items');
fs.mkdirSync(outDir, { recursive: true });

async function createItemBadge(srcBuf, destPath) {
  // Composite item onto a sleek dark card badge (256x256)
  const itemResized = await sharp(srcBuf)
    .resize(220, 220, { fit: 'inside' })
    .toBuffer();

  const backgroundSvg = Buffer.from(`
    <svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cardBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#2a324b" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#0f1422" stop-opacity="1"/>
        </radialGradient>
      </defs>
      <rect width="256" height="256" rx="32" fill="url(#cardBg)"/>
      <rect x="2" y="2" width="252" height="252" rx="30" fill="none" stroke="#3b4261" stroke-width="2"/>
    </svg>
  `);

  await sharp(backgroundSvg)
    .composite([{ input: itemResized, gravity: 'center' }])
    .webp({ quality: 90 })
    .toFile(destPath);
}

async function run() {
  console.log('=== Processing All 16 Items ===');

  const items = [
    { id: 'item-along-passing-shore', slug: 'along-the-passing-shore', local: 'temp_check/lc_passing_shore.png' },
    { id: 'item-along-the-passing-shore', slug: 'along-the-passing-shore-alt', local: 'temp_check/lc_acheron.png' },
    { id: 'item-staff-of-homa', slug: 'staff-of-homa', local: 'temp_check/homa_enka.png' },
    { id: 'item-tome-eternal-flow', slug: 'tome-of-the-eternal-flow', local: 'temp_check/tome.png' },
    { id: 'item-tome-flowing-sands', slug: 'tome-of-the-eternal-flow-alt', local: 'temp_check/tome.png' },
    { id: 'item-sacrificial-jade', slug: 'sacrificial-jade', local: 'temp_check/sac_jade.png' },
    { id: 'item-cor-lapis', slug: 'cor-lapis', local: 'temp_check/cor_lapis.png' },
    { id: 'item-vandal', slug: 'vandal-rifle', local: 'temp_check/vandal_card_icon.png' },
    
    // Remote
    { id: 'item-blade-of-despair', slug: 'blade-of-despair', url: 'https://static.wikia.nocookie.net/mobile-legends/images/d/d5/Blade_of_Despair.png/revision/latest?cb=20210627031620' },
    { id: 'item-immortality', slug: 'immortality', url: 'https://static.wikia.nocookie.net/mobile-legends/images/2/21/Immortality_EquipEffectShow.png/revision/latest?cb=20240708170022' },
    { id: 'item-mace-heavy-core', slug: 'mace', url: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/6/63/Mace.png/revision/latest?cb=20260330015956' },
    { id: 'item-deep-sea-visitor', slug: 'deep-sea-visitor', url: 'https://static.wikia.nocookie.net/zenless-zone-zero/images/4/4d/W-Engine_Deep_Sea_Visitor.png/revision/latest?cb=20250426033435' },
    { id: 'item-verdant-summit', slug: 'verdant-summit', url: 'https://static.wikia.nocookie.net/wutheringwaves/images/e/e9/Weapon_Verdant_Summit.png/revision/latest?cb=20240515175352' },
    { id: 'item-phantom-curse-katana', slug: 'cursed-dual-katana', url: 'https://static.wikia.nocookie.net/roblox-blox-piece/images/7/74/Cursed_Dual_Katana.png/revision/latest?cb=20241223032242' },
    { id: 'item-whereabouts-should-dreams-rest', slug: 'whereabouts-should-dreams-rest', url: 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/light_cone_portrait/23025.png' },
  ];

  // Lumitoile lookup
  const lumitoileUrl = await getWikiImageUrl('genshin-impact', 'Lumitoile');
  items.push({ id: 'item-lumitoile', slug: 'lumitoile', url: lumitoileUrl || 'https://static.wikia.nocookie.net/gensin-impact/images/5/52/Item_Lumitoile.png' });

  for (const it of items) {
    const dest = path.join(outDir, `${it.slug}.webp`);
    try {
      let buf;
      if (it.local) {
        buf = fs.readFileSync(it.local);
      } else {
        const tmp = path.join('temp_check', `item_${it.slug}.tmp`);
        await downloadFile(it.url, tmp);
        buf = fs.readFileSync(tmp);
      }
      await createItemBadge(buf, dest);
      console.log(`✓ [${it.id}] ${it.slug}`);
    } catch (e) {
      console.error(`✗ Error processing ${it.id}: ${e.message}`);
    }
  }

  console.log('=== ALL 16 ITEMS COMPLETE! ===');
}

run().catch(console.error);
