import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { downloadFile, getWikiImageUrl } from './build-authentic-visual-assets.mjs';

const outDir = path.join('public', 'images', 'guides');
fs.mkdirSync(outDir, { recursive: true });

async function makeGuideThumbnail(srcBuf, destPath) {
  await sharp(srcBuf)
    .resize(800, 450, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(destPath);
}

async function run() {
  console.log('=== Processing All 56 Guide Thumbnails ===');

  const guideConfigs = [
    // Wukong Erlang Shen
    { slug: 'tips-melawan-erlang-shen-black-myth-wukong', steamApp: 2358720, ssIdx: 0 },
    // Elden Ring Malenia
    { slug: 'cara-mengalahkan-boss-malenia-elden-ring-waterfowl-dance', local: 'public/images/characters/malenia-full.webp' },
    // Minecraft Ender Dragon & Redstone
    { slug: 'cara-mengalahkan-ender-dragon-pertama-kali-pemula', wiki: 'minecraft', title: 'Ender Dragon' },
    { slug: 'panduan-redstone-dasar-komponen-sirkuit-pintu-otomatis', wiki: 'minecraft', title: 'Redstone' },
    // Genshin Builds & Farming
    { slug: 'build-hu-tao-terbaik-senjata-artefak-tim', local: 'public/images/characters/hu-tao-full.webp' },
    { slug: 'build-furina-sub-dps-buffer-fanfare', local: 'public/images/characters/furina-full.webp' },
    { slug: 'build-neuvillette-terbaik-senjata-artefak-tim', local: 'public/images/characters/neuvillette-full.webp' },
    { slug: 'build-zhongli-support-shielder-senjata-f2p', local: 'public/images/characters/zhongli-full.webp' },
    { slug: 'rute-farming-168-lumitoile-fontaine-neuvillette', local: 'public/images/items/lumitoile.webp' },
    { slug: 'panduan-pemula-genshin-impact-ar-primogem', local: 'public/images/games/genshin-banner.jpg' },
    { slug: 'panduan-efisiensi-resin-teyvat-prioritas-farming', local: 'public/images/characters/nahida-full.webp' },
    { slug: 'panduan-eksplorasi-natlan-lokasi-saurian-puzzle', local: 'public/images/characters/kaedehara-kazuha-full.webp' },
    { slug: 'farming-guide-primogem-stellar-jade-gacha-hemat', local: 'public/images/characters/raiden-shogun-full.webp' },
    // HSR Builds & End Game
    { slug: 'build-acheron-honkai-star-rail-relic-light-cone', local: 'public/images/characters/acheron-full.webp' },
    { slug: 'build-acheron-e0s1-terkuat-tim-nihility-debuff', local: 'temp_check/lc_passing_shore.png' },
    { slug: 'build-firefly-super-break-sinergi-ruan-mei-trailblazer', local: 'public/images/characters/firefly-full.webp' },
    { slug: 'guide-firefly-super-break-ruan-mei-harmony-mc', local: 'temp_check/lc_acheron.png' },
    { slug: 'panduan-menaklukkan-memory-of-chaos-lantai-12', local: 'public/images/characters/jingliu-full.webp' },
    { slug: 'panduan-apocalyptic-shadow-strategi-toughness-meter', local: 'public/images/characters/blade-full.webp' },
    { slug: 'panduan-relic-farming-honkai-star-rail-stat-optimal', local: 'public/images/characters/aventurine-full.webp' },
    { slug: 'panduan-memilih-relic-artefak-prioritas-stat', local: 'public/images/characters/dan-heng-imbibitor-lunae-full.webp' },
    // ZZZ Builds & Mechanics
    { slug: 'build-ellen-joe-terbaik-drive-disc-tim-shark-maid', local: 'public/images/characters/ellen-joe-full.webp' },
    { slug: 'panduan-ellen-joe-zenless-zone-zero-flash-freeze', local: 'public/images/characters/ellen-joe-alt-full.webp' },
    { slug: 'panduan-pemula-zenless-zone-zero-mekanik-daze-chain-attack', local: 'public/images/characters/nicole-demara-full.webp' },
    { slug: 'rekomendasi-tim-f2p-terbaik-zenless-zone-zero-chapter-awal', local: 'public/images/characters/hoshimi-miyabi-full.webp' },
    // WuWa Builds & Mechanics
    { slug: 'build-jiyan-dragon-burst-echo-sierra-gale', local: 'public/images/characters/jiyan-full.webp' },
    { slug: 'build-changli-fusion-dps-timing-forte-circuit', local: 'public/images/characters/changli-full.webp' },
    { slug: 'guide-jinhsi-wuthering-waves-rotasi-skill-tim', local: 'public/images/characters/jinhsi-full.webp' },
    { slug: 'cara-mendapatkan-echo-bintang-5-gold-data-bank', local: 'public/images/characters/yinlin-full.webp' },
    { slug: 'mekanik-parry-dodge-counter-wuthering-waves-no-damage', local: 'public/images/characters/jinshi-full.webp' },
    // MLBB
    { slug: 'cara-menguasai-fanny-mlbb-rumus-kabel-hemat-energi', local: 'public/images/characters/fanny-full.webp' },
    { slug: 'tips-menguasai-mekanik-kabel-fanny-pemula', local: 'public/images/characters/fanny-portrait.webp' },
    { slug: 'tips-rotasi-jungler-mobile-legends-turtle-lord', local: 'public/images/characters/ling-full.webp' },
    { slug: 'panduan-rotasi-jungler-mobile-legends-season-terbaru', local: 'public/images/characters/hayabusa-full.webp' },
    { slug: 'daftar-item-defense-mobile-legends-kapan-membeli', local: 'public/images/items/immortality.webp' },
    // Valorant
    { slug: 'lineup-recon-dart-sova-terbaik-map-ascent', local: 'public/images/characters/sova-full.webp' },
    { slug: 'lineups-sova-ascent-paling-efektif-info-post-plant', local: 'public/images/characters/sova-portrait.webp' },
    { slug: 'panduan-crosshair-placement-peeking-technique-valorant', local: 'public/images/characters/jett-full.webp' },
    { slug: 'panduan-aim-crosshair-placement-valorant-pemula', local: 'public/images/characters/reyna-full.webp' },
    { slug: 'panduan-komunikasi-tim-callout-efektif-valorant', local: 'public/images/characters/omen-full.webp' },
    // Apex Legends
    { slug: 'panduan-senjata-terbaik-playstyle-apex-legends', local: 'public/images/characters/bloodhound-full.webp' },
    { slug: 'tips-gerakan-lanjutan-apex-legends-tap-strafe-wall-bounce', local: 'public/images/characters/octane-full.webp' },
    // Free Fire
    { slug: 'kombinasi-skill-karakter-free-fire-clash-squad', local: 'public/images/characters/dj-alok-full.webp' },
    { slug: 'panduan-headshot-free-fire-setting-dpi-aim', local: 'public/images/characters/dj-alok-portrait.webp' },
    { slug: 'tips-gloo-wall-cepat-trik-duduk-pasang-free-fire', local: 'public/images/characters/dj-alok-full.webp' },
    // PUBG Mobile
    { slug: 'pengaturan-sensitivitas-giroskop-pubg-mobile-no-recoil', steamApp: 578080, ssIdx: 6 },
    { slug: 'rute-looting-terbaik-erangel-pubg-mobile', steamApp: 578080, ssIdx: 7 },
    { slug: 'sensitivitas-setting-kontrol-pubg-mobile-terbaik', steamApp: 578080, ssIdx: 8 },
    // Dota 2
    { slug: 'panduan-memahami-peran-posisi-1-hingga-5-dota-2', steamApp: 570, ssIdx: 3 },
    // LoL
    { slug: 'panduan-manajemen-wave-minion-lol-freeze-push', local: 'temp_check/lol_cover.jpg' },
    // Arknights
    { slug: 'panduan-kelas-operator-arknights-vanguard-specialist', local: 'public/images/characters/silverash-full.webp' },
    // Blue Archive
    { slug: 'daftar-siswi-bintang-2-1-blue-archive-wajib-dinaikkan', local: 'public/images/characters/sorasaki-hina-full.webp' },
    { slug: 'panduan-total-assault-blue-archive-rank-platinum', local: 'public/images/characters/sunao-shiroko-full.webp' },
    // FGO
    { slug: 'sistem-farming-3-turn-fgo-double-koyanskaya-oberon', local: 'public/images/characters/gilgamesh-full.webp' },
    // Roblox Blox Fruits
    { slug: 'panduan-pemula-blox-fruits-cara-cepat-naik-level-max', local: 'public/images/items/cursed-dual-katana.webp' },
    { slug: 'tips-memilih-buah-iblis-bounty-hunting-blox-fruits', local: 'temp_check/roblox_blox.png' },
  ];

  for (const g of guideConfigs) {
    const dest = path.join(outDir, `${g.slug}.jpg`);
    try {
      let buf;
      if (g.local) {
        buf = fs.readFileSync(g.local);
      } else if (g.steamApp) {
        const apiUrl = `https://store.steampowered.com/api/appdetails?appids=${g.steamApp}`;
        const res = await fetch(apiUrl);
        const data = await res.json();
        const ss = data[g.steamApp]?.data?.screenshots || [];
        const ssUrl = (ss[g.ssIdx] || ss[0])?.path_full;
        if (!ssUrl) throw new Error('No steam screenshot');
        const tmp = path.join('temp_check', `steam_gd_${g.slug}.jpg`);
        await downloadFile(ssUrl, tmp);
        buf = fs.readFileSync(tmp);
      } else if (g.wiki) {
        let imgUrl = await getWikiImageUrl(g.wiki, g.title);
        if (!imgUrl) throw new Error('No wiki image');
        const tmp = path.join('temp_check', `wiki_gd_${g.slug}.jpg`);
        await downloadFile(imgUrl, tmp);
        buf = fs.readFileSync(tmp);
      }
      await makeGuideThumbnail(buf, dest);
      console.log(`✓ [${g.slug}]`);
    } catch (e) {
      console.log(`  Fallback for ${g.slug}: ${e.message}`);
      const fallback = fs.readFileSync('public/images/games/genshin-banner.jpg');
      await makeGuideThumbnail(fallback, dest);
      console.log(`✓ [${g.slug}] (fallback)`);
    }
  }

  console.log('=== ALL 56 GUIDE THUMBNAILS COMPLETE! ===');
}

run().catch(console.error);
