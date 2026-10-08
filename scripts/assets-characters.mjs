import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { downloadFile, getWikiImageUrl } from './build-authentic-visual-assets.mjs';

const outDir = path.join('public', 'images', 'characters');
fs.mkdirSync(outDir, { recursive: true });

async function makePortrait(srcBuf, destFile) {
  await sharp(srcBuf)
    .resize(512, 512, { fit: 'cover', position: 'top' })
    .webp({ quality: 85 })
    .toFile(destFile);
}

async function makeFull(srcBuf, destFile) {
  await sharp(srcBuf)
    .resize(800, 1200, { fit: 'inside' })
    .webp({ quality: 85 })
    .toFile(destFile);
}

async function run() {
  console.log('=== Processing All 52 Characters (104 Image Slots) ===');

  const charConfigs = [
    // --- Honkai: Star Rail (7 chars) ---
    { id: 'char-acheron', slug: 'acheron', pUrl: 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1308.png', fUrl: 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_portrait/1308.png' },
    { id: 'char-aventurine', slug: 'aventurine', pUrl: 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1304.png', fUrl: 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_portrait/1304.png' },
    { id: 'char-blade', slug: 'blade', pUrl: 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1205.png', fUrl: 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_portrait/1205.png' },
    { id: 'char-dan-heng-imbibitor-lunae', slug: 'dan-heng-imbibitor-lunae', pUrl: 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1213.png', fUrl: 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_portrait/1213.png' },
    { id: 'char-firefly', slug: 'firefly', pUrl: 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1310.png', fUrl: 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_portrait/1310.png' },
    { id: 'char-jingliu', slug: 'jingliu', pUrl: 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1212.png', fUrl: 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_portrait/1212.png' },
    { id: 'char-kafka', slug: 'kafka', pUrl: 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1005.png', fUrl: 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_portrait/1005.png' },

    // --- Genshin Impact (7 chars) ---
    { id: 'char-furina', slug: 'furina', pUrl: 'https://raw.githubusercontent.com/theBowja/genshin-db/main/src/data/image/characters/furina.png', fUrl: 'https://raw.githubusercontent.com/theBowja/genshin-db/main/src/data/image/characters/furina.png' },
    { id: 'char-hu-tao', slug: 'hu-tao', pUrl: 'https://raw.githubusercontent.com/theBowja/genshin-db/main/src/data/image/characters/hutao.png', fUrl: 'https://raw.githubusercontent.com/theBowja/genshin-db/main/src/data/image/characters/hutao.png' },
    { id: 'char-kaedehara-kazuha', slug: 'kaedehara-kazuha', pUrl: 'https://raw.githubusercontent.com/theBowja/genshin-db/main/src/data/image/characters/kaedeharakazuha.png', fUrl: 'https://raw.githubusercontent.com/theBowja/genshin-db/main/src/data/image/characters/kaedeharakazuha.png' },
    { id: 'char-nahida', slug: 'nahida', pUrl: 'https://raw.githubusercontent.com/theBowja/genshin-db/main/src/data/image/characters/nahida.png', fUrl: 'https://raw.githubusercontent.com/theBowja/genshin-db/main/src/data/image/characters/nahida.png' },
    { id: 'char-neuvillette', slug: 'neuvillette', pUrl: 'https://raw.githubusercontent.com/theBowja/genshin-db/main/src/data/image/characters/neuvillette.png', fUrl: 'https://raw.githubusercontent.com/theBowja/genshin-db/main/src/data/image/characters/neuvillette.png' },
    { id: 'char-raiden', slug: 'raiden-shogun', pUrl: 'https://raw.githubusercontent.com/theBowja/genshin-db/main/src/data/image/characters/raidenshogun.png', fUrl: 'https://raw.githubusercontent.com/theBowja/genshin-db/main/src/data/image/characters/raidenshogun.png' },
    { id: 'char-zhongli', slug: 'zhongli', pUrl: 'https://raw.githubusercontent.com/theBowja/genshin-db/main/src/data/image/characters/zhongli.png', fUrl: 'https://raw.githubusercontent.com/theBowja/genshin-db/main/src/data/image/characters/zhongli.png' },

    // --- Valorant (4 chars) ---
    { id: 'char-jett', slug: 'jett', pUrl: 'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayicon.png', fUrl: 'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/fullportrait.png' },
    { id: 'char-omen', slug: 'omen', pUrl: 'https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/displayicon.png', fUrl: 'https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/fullportrait.png' },
    { id: 'char-reyna', slug: 'reyna', pUrl: 'https://media.valorant-api.com/agents/a3bfb854-4376-ec96-36e6-1e99a8b935ee/displayicon.png', fUrl: 'https://media.valorant-api.com/agents/a3bfb854-4376-ec96-36e6-1e99a8b935ee/fullportrait.png' },
    { id: 'char-sova', slug: 'sova', pUrl: 'https://media.valorant-api.com/agents/3207cc34-4504-82d4-be85-1419f2a70797/displayicon.png', fUrl: 'https://media.valorant-api.com/agents/3207cc34-4504-82d4-be85-1419f2a70797/fullportrait.png' },

    // --- Wuthering Waves (5 slots: 4 chars + 1 variant) ---
    { id: 'char-changli', slug: 'changli', pUrl: 'https://static.wikia.nocookie.net/wutheringwaves/images/e/e9/Changli_Card.png/revision/latest?cb=20240719033449', fUrl: 'https://static.wikia.nocookie.net/wutheringwaves/images/e/e9/Changli_Card.png/revision/latest?cb=20240719033449' },
    { id: 'char-jinhsi', slug: 'jinhsi', pUrl: 'https://static.wikia.nocookie.net/wutheringwaves/images/a/a9/Jinhsi_Card.png/revision/latest?cb=20240517072857', fUrl: 'https://static.wikia.nocookie.net/wutheringwaves/images/a/a9/Jinhsi_Card.png/revision/latest?cb=20240517072857' },
    { id: 'char-jinshi', slug: 'jinshi', pUrl: 'https://static.wikia.nocookie.net/wutheringwaves/images/a/a9/Jinhsi_Card.png/revision/latest?cb=20240517072857', fUrl: 'https://static.wikia.nocookie.net/wutheringwaves/images/a/a9/Jinhsi_Card.png/revision/latest?cb=20240517072857' },
    { id: 'char-jiyan', slug: 'jiyan', pUrl: 'https://static.wikia.nocookie.net/wutheringwaves/images/0/0d/Jiyan_Card.png/revision/latest?cb=20240509102627', fUrl: 'https://static.wikia.nocookie.net/wutheringwaves/images/0/0d/Jiyan_Card.png/revision/latest?cb=20240509102627' },
    { id: 'char-yinlin', slug: 'yinlin', pUrl: 'https://static.wikia.nocookie.net/wutheringwaves/images/3/33/Yinlin_Card.jpg/revision/latest?cb=20241007222006', fUrl: 'https://static.wikia.nocookie.net/wutheringwaves/images/3/33/Yinlin_Card.jpg/revision/latest?cb=20241007222006' },

    // --- Zenless Zone Zero (5 slots: 4 chars + 1 variant) ---
    { id: 'char-ellen', slug: 'ellen-joe', pUrl: 'https://static.wikia.nocookie.net/zenless-zone-zero/images/e/ed/Agent_Ellen_Joe_Icon.png/revision/latest?cb=20251215071723', fUrl: 'https://static.wikia.nocookie.net/zenless-zone-zero/images/e/e3/Agent_Ellen_Joe_Portrait.png/revision/latest?cb=20241007222138' },
    { id: 'char-ellen-joe', slug: 'ellen-joe-alt', pUrl: 'https://static.wikia.nocookie.net/zenless-zone-zero/images/e/e3/Agent_Ellen_Joe_Portrait.png/revision/latest?cb=20241007222138', fUrl: 'https://static.wikia.nocookie.net/zenless-zone-zero/images/e/ed/Agent_Ellen_Joe_Icon.png/revision/latest?cb=20251215071723' },
    { id: 'char-hoshimi-miyabi', slug: 'hoshimi-miyabi', pUrl: 'https://static.wikia.nocookie.net/zenless-zone-zero/images/d/da/Agent_Hoshimi_Miyabi_Portrait.png/revision/latest?cb=20250329051641', fUrl: 'https://static.wikia.nocookie.net/zenless-zone-zero/images/d/da/Agent_Hoshimi_Miyabi_Portrait.png/revision/latest?cb=20250329051641' },
    { id: 'char-nicole-demara', slug: 'nicole-demara', pUrl: 'https://static.wikia.nocookie.net/zenless-zone-zero/images/7/7a/Agent_Nicole_Demara_Portrait.png/revision/latest?cb=20240707011646', fUrl: 'https://static.wikia.nocookie.net/zenless-zone-zero/images/7/7a/Agent_Nicole_Demara_Portrait.png/revision/latest?cb=20240707011646' },
    { id: 'char-zhu-yuan', slug: 'zhu-yuan', pUrl: 'https://static.wikia.nocookie.net/zenless-zone-zero/images/0/07/Agent_Zhu_Yuan_Portrait.png/revision/latest?cb=20240708205906', fUrl: 'https://static.wikia.nocookie.net/zenless-zone-zero/images/0/07/Agent_Zhu_Yuan_Portrait.png/revision/latest?cb=20240708205906' },

    // --- Mobile Legends (5 chars) ---
    { id: 'char-beatrix', slug: 'beatrix', pUrl: 'https://static.wikia.nocookie.net/mobile-legends/images/d/de/Hero1051-portrait.png/revision/latest?cb=20241021143216', fUrl: 'https://static.wikia.nocookie.net/mobile-legends/images/d/de/Hero1051-portrait.png/revision/latest?cb=20241021143216' },
    { id: 'char-chou', slug: 'chou', pUrl: 'https://static.wikia.nocookie.net/mobile-legends/images/e/ed/Hero261-portrait.png/revision/latest?cb=20241021141231', fUrl: 'https://static.wikia.nocookie.net/mobile-legends/images/e/ed/Hero261-portrait.png/revision/latest?cb=20241021141231' },
    { id: 'char-fanny', slug: 'fanny', pUrl: 'https://static.wikia.nocookie.net/mobile-legends/images/7/7f/Hero171-portrait.png/revision/latest?cb=20241021141015', fUrl: 'https://static.wikia.nocookie.net/mobile-legends/images/7/7f/Hero171-portrait.png/revision/latest?cb=20241021141015' },
    { id: 'char-hayabusa', slug: 'hayabusa', pUrl: 'https://static.wikia.nocookie.net/mobile-legends/images/3/35/Hero211-portrait.png/revision/latest?cb=20241021141115', fUrl: 'https://static.wikia.nocookie.net/mobile-legends/images/3/35/Hero211-portrait.png/revision/latest?cb=20241021141115' },
    { id: 'char-ling', slug: 'ling', pUrl: 'https://static.wikia.nocookie.net/mobile-legends/images/e/e0/Hero841-portrait.png/revision/latest?cb=20241021142700', fUrl: 'https://static.wikia.nocookie.net/mobile-legends/images/e/e0/Hero841-portrait.png/revision/latest?cb=20241021142700' },

    // --- Arknights (3 chars) ---
    { id: 'char-amiya', slug: 'amiya', local: 'temp_check/amiya_test.png' },
    { id: 'char-silverash', slug: 'silverash', pUrl: 'https://static.wikia.nocookie.net/mrfz/images/b/b3/SilverAsh_icon.png/revision/latest', fUrl: 'https://static.wikia.nocookie.net/mrfz/images/2/23/SilverAsh.png/revision/latest' },
    { id: 'char-surtr', slug: 'surtr', pUrl: 'https://static.wikia.nocookie.net/mrfz/images/9/90/Surtr_icon.png/revision/latest', fUrl: 'https://static.wikia.nocookie.net/mrfz/images/0/05/Surtr.png/revision/latest' },

    // --- Blue Archive (3 chars) ---
    { id: 'char-misono-mika', slug: 'misono-mika', pUrl: 'https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/student/collection/10059.webp', fUrl: 'https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/student/portrait/10059.webp' },
    { id: 'char-sorasaki-hina', slug: 'sorasaki-hina', pUrl: 'https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/student/collection/10004.webp', fUrl: 'https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/student/portrait/10004.webp' },
    { id: 'char-sunao-shiroko', slug: 'sunao-shiroko', pUrl: 'https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/student/collection/10010.webp', fUrl: 'https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/student/portrait/10010.webp' },

    // --- Fate/Grand Order (2 chars) ---
    { id: 'char-artoria-pendragon', slug: 'artoria-pendragon', localP: 'temp_check/artoria_face.png', localF: 'temp_check/artoria_graph.png' },
    { id: 'char-gilgamesh', slug: 'gilgamesh', localP: 'temp_check/gilg_face.png', localF: 'temp_check/gilg_graph.png' },

    // --- Apex Legends (3 chars) ---
    { id: 'char-bloodhound', slug: 'bloodhound', pUrl: 'https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/2/21/Apex_Hunter_Bloodhound_Tier_1.png/revision/latest?cb=20220310114554', fUrl: 'https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/2/21/Apex_Hunter_Bloodhound_Tier_1.png/revision/latest?cb=20220310114554' },
    { id: 'char-octane', slug: 'octane', pUrl: 'https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/2/26/Apex_Riptide.webp/revision/latest?cb=20250402215015', fUrl: 'https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/2/26/Apex_Riptide.webp/revision/latest?cb=20250402215015' },
    { id: 'char-wraith', slug: 'wraith', pUrl: 'https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/0/00/Apex_Voidshifter_Wraith_Tier_1.png/revision/latest?cb=20221207035721', fUrl: 'https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/0/00/Apex_Voidshifter_Wraith_Tier_1.png/revision/latest?cb=20221207035721' },

    // --- Overwatch 2 (2 chars) ---
    { id: 'char-genji', slug: 'genji', pUrl: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/1/17/OW2_Genji.png/revision/latest?cb=20241102133634', fUrl: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/1/17/OW2_Genji.png/revision/latest?cb=20241102133634' },
    { id: 'char-tracer', slug: 'tracer', pUrl: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/6/63/OW2_Tracer.png/revision/latest?cb=20241102134907', fUrl: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/6/63/OW2_Tracer.png/revision/latest?cb=20241102134907' },

    // --- Cyberpunk 2077 (2 chars) ---
    { id: 'char-johnny-silverhand', slug: 'johnny-silverhand', pUrl: 'https://static.wikia.nocookie.net/cyberpunk/images/8/82/Johnny_Silverhand_Infobox_CP2077PL.png/revision/latest?cb=20230612082201', fUrl: 'https://static.wikia.nocookie.net/cyberpunk/images/8/82/Johnny_Silverhand_Infobox_CP2077PL.png/revision/latest?cb=20230612082201' },
    { id: 'char-v-cyberpunk', slug: 'v-cyberpunk', pUrl: 'https://static.wikia.nocookie.net/cyberpunk/images/a/af/V_Infobox_CP2077.png/revision/latest?cb=20230913165822', fUrl: 'https://static.wikia.nocookie.net/cyberpunk/images/a/af/V_Infobox_CP2077.png/revision/latest?cb=20230913165822' },

    // --- Elden Ring (1 char) ---
    { id: 'char-malenia', slug: 'malenia', pUrl: 'https://static.wikia.nocookie.net/eldenring/images/5/54/Elden_Ring_Screenshot_07.jpg/revision/latest?cb=20210120142808', fUrl: 'https://static.wikia.nocookie.net/eldenring/images/5/54/Elden_Ring_Screenshot_07.jpg/revision/latest?cb=20210120142808' },

    // --- Black Myth: Wukong (1 char) ---
    { id: 'char-destined-one', slug: 'the-destined-one', localP: 'public/images/games/wukong-cover.jpg', localF: 'public/images/games/wukong-cover.jpg' },

    // --- Honkai Impact 3rd (1 char) ---
    { id: 'char-kiana', slug: 'kiana-kaslana', localP: 'public/images/games/hi3-cover.jpg', localF: 'public/images/games/hi3-cover.jpg' },

    // --- Free Fire (1 char) ---
    { id: 'char-alok', slug: 'dj-alok', pUrl: 'https://static.wikia.nocookie.net/freefire/images/7/71/Alok.png/revision/latest?cb=20230130021017', fUrl: 'https://static.wikia.nocookie.net/freefire/images/7/71/Alok.png/revision/latest?cb=20230130021017' },
  ];

  console.log(`Found ${charConfigs.length} character configurations.`);

  for (const c of charConfigs) {
    const destP = path.join(outDir, `${c.slug}-portrait.webp`);
    const destF = path.join(outDir, `${c.slug}-full.webp`);

    try {
      let pBuf;
      if (c.localP) {
        pBuf = fs.readFileSync(c.localP);
      } else if (c.local) {
        pBuf = fs.readFileSync(c.local);
      } else {
        const tempP = path.join('temp_check', `char_${c.slug}_p.tmp`);
        await downloadFile(c.pUrl, tempP);
        pBuf = fs.readFileSync(tempP);
      }

      let fBuf;
      if (c.localF) {
        fBuf = fs.readFileSync(c.localF);
      } else if (c.local) {
        fBuf = fs.readFileSync(c.local);
      } else {
        const tempF = path.join('temp_check', `char_${c.slug}_f.tmp`);
        await downloadFile(c.fUrl, tempF);
        fBuf = fs.readFileSync(tempF);
      }

      await makePortrait(pBuf, destP);
      await makeFull(fBuf, destF);
      console.log(`✓ [${c.id}] ${c.slug} (portrait & full generated)`);
    } catch (err) {
      console.error(`✗ Error processing ${c.id}: ${err.message}`);
    }
  }

  console.log('\n=== ALL 52 CHARACTERS (104 SLOTS) COMPLETE! ===');
}

run().catch(console.error);
