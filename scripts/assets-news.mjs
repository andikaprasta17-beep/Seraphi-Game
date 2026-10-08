import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { downloadFile, getWikiImageUrl } from './build-authentic-visual-assets.mjs';

const outDir = path.join('public', 'images', 'news');
fs.mkdirSync(outDir, { recursive: true });

async function makeNewsThumbnail(srcBuf, destPath) {
  await sharp(srcBuf)
    .resize(800, 450, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(destPath);
}

async function run() {
  console.log('=== Processing All 35 News Thumbnails ===');

  const newsList = [
    // Wukong DLC
    { slug: 'news-wukong-dlc-expansion', steamApp: 2358720, ssIdx: 2 },
    // Elden Ring Shadow records
    { slug: 'news-elden-ring-shadow-records', steamApp: 1245620, ssIdx: 1 },
    // WuWa auto recycle & banner
    { slug: 'news-wuwa-auto-recycle', wiki: 'wutheringwaves', title: 'Echo' },
    { slug: 'news-wuwa-banner', local: 'temp_check/wuwa_changli_card.png' },
    // ZZZ update & 50m
    { slug: 'news-zzz-1-5', local: 'temp_check/ellen_real.png' },
    { slug: 'news-zzz-50m-downloads', local: 'public/images/characters/zhu-yuan-portrait.webp' },
    // Valorant Agent & VCT
    { slug: 'news-valorant-new-agent', local: 'temp_check/reyna_full.png' },
    { slug: 'news-val-vct', local: 'temp_check/val_banner.png' },
    // Steam Sale & Dates
    { slug: 'news-steam-sale', steamApp: 1091500, ssIdx: 1 },
    { slug: 'news-steam-sale-dates', steamApp: 1091500, ssIdx: 2 },
    // PUBG PMGC & Anime collab
    { slug: 'news-pubg-pmgc', steamApp: 578080, ssIdx: 1 },
    { slug: 'news-pubgm-anime-collab', steamApp: 578080, ssIdx: 2 },
    // PlayStation State of Play
    { slug: 'news-playstation-state-of-play', steamApp: 2246340, ssIdx: 1 }, // MH Wilds on PS5
    // Nintendo Switch 2
    { slug: 'news-nintendo-switch-2-rumor', local: 'public/images/games/genshin-banner.jpg' },
    // Gaming Industry Mobile & AI Gaming
    { slug: 'news-gaming-industry', local: 'temp_check/mlbb_chou_card.png' },
    { slug: 'news-ai-gaming', steamApp: 1091500, ssIdx: 3 }, // Cyberpunk AI
    // Esports SEA & Esports World Cup
    { slug: 'news-esports-sea', local: 'temp_check/mlbb_ling_card.png' },
    { slug: 'news-esports-world-cup', local: 'temp_check/dota2_banner.jpg' },
    // Minecraft drop
    { slug: 'news-mc-drop', wiki: 'minecraft', title: 'Copper' },
    // FGO anniversary
    { slug: 'news-fgo-anniversary', local: 'temp_check/artoria_graph.png' },
    // Apex season new
    { slug: 'news-apex-season-new', steamApp: 1172470, ssIdx: 2 },
    // Arknights anime
    { slug: 'news-arknights-anime', local: 'temp_check/arknights_bg.png' },
    // Blue Archive Fes
    { slug: 'news-ba-fes', local: 'temp_check/mika_portrait.webp' },
    // Dota patch
    { slug: 'news-dota-patch', steamApp: 570, ssIdx: 1 },
    // Free Fire collab & OB update
    { slug: 'news-ff-collab-anime', local: 'temp_check/ff_alok_card.png' },
    { slug: 'news-ff-ob-update', local: 'temp_check/ff_alok_card.png' },
    // Genshin 5.4 & Natlan
    { slug: 'news-genshin-5-4', local: 'public/images/characters/furina-full.webp' },
    { slug: 'news-genshin-natlan-event', local: 'public/images/characters/zhongli-full.webp' },
    // HSR collab & new planet
    { slug: 'news-hsr-collab', local: 'temp_check/hsr_cover.png' },
    { slug: 'news-hsr-new-planet', local: 'temp_check/aeon_001.png' },
    // LoL MSI
    { slug: 'news-lol-msi', local: 'temp_check/lol_banner.jpg' },
    // MLBB M-Series, patch, MPL
    { slug: 'news-mlbb-m-series', local: 'temp_check/mlbb_ling_card.png' },
    { slug: 'news-mlbb-patch-buff-nerf', local: 'public/images/items/blade-of-despair.webp' },
    { slug: 'news-mpl-season-new', local: 'temp_check/mlbb_chou_card.png' },
    // Roblox update
    { slug: 'news-roblox-update', local: 'temp_check/roblox_blox.png' },
  ];

  for (const n of newsList) {
    const dest = path.join(outDir, `${n.slug}.jpg`);
    try {
      let buf;
      if (n.local) {
        buf = fs.readFileSync(n.local);
      } else if (n.steamApp) {
        const apiUrl = `https://store.steampowered.com/api/appdetails?appids=${n.steamApp}`;
        const res = await fetch(apiUrl);
        const data = await res.json();
        const ss = data[n.steamApp]?.data?.screenshots || [];
        const ssUrl = (ss[n.ssIdx] || ss[0])?.path_full;
        if (!ssUrl) throw new Error('No steam screenshot');
        const tmp = path.join('temp_check', `steam_news_${n.slug}.jpg`);
        await downloadFile(ssUrl, tmp);
        buf = fs.readFileSync(tmp);
      } else if (n.wiki) {
        let imgUrl = await getWikiImageUrl(n.wiki, n.title);
        if (!imgUrl) throw new Error('No wiki image');
        const tmp = path.join('temp_check', `wiki_news_${n.slug}.jpg`);
        await downloadFile(imgUrl, tmp);
        buf = fs.readFileSync(tmp);
      }
      await makeNewsThumbnail(buf, dest);
      console.log(`✓ [${n.slug}]`);
    } catch (e) {
      console.log(`  Fallback for ${n.slug}: ${e.message}`);
      const fallback = fs.readFileSync('public/images/games/genshin-banner.jpg');
      await makeNewsThumbnail(fallback, dest);
      console.log(`✓ [${n.slug}] (fallback)`);
    }
  }

  console.log('=== ALL 35 NEWS THUMBNAILS COMPLETE! ===');
}

run().catch(console.error);
