import {
  Game,
  Character,
  Guide,
  News,
  RedeemCode,
  EventItem,
  Item,
  Author,
} from './types';

export const SEED_AUTHORS: Author[] = [
  {
    "id": "author-seraphi-editorial",
    "name": "Tim Editorial Seraphi",
    "slug": "seraphi-editorial",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    "bio": "Tim riset dan redaksi utama Seraphi Game yang memvalidasi data mekanik game, kode redeem resmi, dan panduan komprehensif.",
    "role": "Lead Gaming Editorial",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "author-kael-strats",
    "name": "Kaelen Arisandi",
    "slug": "kael-strats",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    "bio": "Spesialis game strategi, MOBA, dan tier list kompetitif. Lebih dari 8 tahun pengalaman bermain game rank tinggi dan turnamen lokal.",
    "role": "Competitive Strategy Analyst",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "author-lyra-lore",
    "name": "Lyra Valery",
    "slug": "lyra-lore",
    "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
    "bio": "Penulis konten open-world, lore, dan eksplorasi Teyvat serta galaksi Star Rail. Berfokus pada panduan puzzle dan quest tersembunyi.",
    "role": "Open World & Lore Specialist",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "author-ryu-mechanics",
    "name": "Ryu Pratama",
    "slug": "ryu-mechanics",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    "bio": "Pakar optimalisasi min-maxing, artefak, sub-stat kalkulasi damage, dan frame data untuk action RPG dan shooter.",
    "role": "Mechanics & Min-Max Specialist",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  }
];

export const EXPANSION_GAMES: Game[] = [
  {
    "id": "game-ba",
    "name": "Blue Archive",
    "slug": "blue-archive",
    "cover_image": "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=600&auto=format&fit=crop&q=80",
    "banner_image": "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?w=1600&auto=format&fit=crop&q=80",
    "description": "Tactical RPG anime populer bertema akademi militer Kivotos, di mana pemain bertindak sebagai Sensei yang memandu para siswi berbakat.",
    "developer": "Nexon Games",
    "publisher": "Nexon",
    "release_date": "2021-11-08",
    "platforms": [
      "Android",
      "iOS"
    ],
    "genres": [
      "Tactical RPG",
      "Anime",
      "Gacha",
      "Strategy"
    ],
    "status": "Active",
    "rating": 4.6,
    "official_url": "https://bluearchive.nexon.com",
    "views": 28400,
    "is_demo": false,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "game-arknights",
    "name": "Arknights",
    "slug": "arknights",
    "cover_image": "https://images.unsplash.com/photo-1560972550-aba3456b5564?w=600&auto=format&fit=crop&q=80",
    "banner_image": "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1600&auto=format&fit=crop&q=80",
    "description": "Tactical tower defense RPG karya Hypergryph dengan narasi dystopian yang mendalam, musik orisinal spektakuler, dan ratusan operator.",
    "developer": "Hypergryph / Studio Montagne",
    "publisher": "Yostar",
    "release_date": "2020-01-16",
    "platforms": [
      "Android",
      "iOS"
    ],
    "genres": [
      "Tower Defense",
      "Strategy",
      "Sci-Fi",
      "Gacha"
    ],
    "status": "Active",
    "rating": 4.8,
    "official_url": "https://www.arknights.global",
    "views": 31200,
    "is_demo": false,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "game-fgo",
    "name": "Fate/Grand Order",
    "slug": "fate-grand-order",
    "cover_image": "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&auto=format&fit=crop&q=80",
    "banner_image": "https://images.unsplash.com/photo-1552871847-d81af14f486d?w=1600&auto=format&fit=crop&q=80",
    "description": "Game mobile legendaris dari Type-Moon dan Aniplex dengan jalan cerita epik jutaan kata yang mempertemukan pahlawan sejarah dunia.",
    "developer": "Lasengle / Delightworks",
    "publisher": "Aniplex",
    "release_date": "2017-06-25",
    "platforms": [
      "Android",
      "iOS"
    ],
    "genres": [
      "Turn-Based RPG",
      "Visual Novel",
      "Fantasy",
      "Gacha"
    ],
    "status": "Active",
    "rating": 4.7,
    "official_url": "https://fate-go.us",
    "views": 29500,
    "is_demo": false,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "game-apex",
    "name": "Apex Legends",
    "slug": "apex-legends",
    "cover_image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80",
    "banner_image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=80",
    "description": "Hero shooter battle royale legendaris dari Respawn Entertainment dengan mobilitas tinggi, sliding, zipline, dan kemampuan sinergis tim.",
    "developer": "Respawn Entertainment",
    "publisher": "Electronic Arts",
    "release_date": "2019-02-04",
    "platforms": [
      "PC",
      "PlayStation 5",
      "PlayStation 4",
      "Xbox Series X/S",
      "Nintendo Switch"
    ],
    "genres": [
      "Battle Royale",
      "First-Person Shooter",
      "Hero Shooter"
    ],
    "status": "Active",
    "rating": 4.7,
    "official_url": "https://www.ea.com/games/apex-legends",
    "views": 36400,
    "is_demo": false,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "game-dota2",
    "name": "Dota 2",
    "slug": "dota-2",
    "cover_image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    "banner_image": "https://images.unsplash.com/photo-1768697581060-52e2edbee7fa?w=1600&auto=format&fit=crop&q=80",
    "description": "Game MOBA paling mendalam dan kompetitif di dunia dari Valve dengan lebih dari 120 hero gratis, strategi tanpa batas, dan turnamen The International.",
    "developer": "Valve Corporation",
    "publisher": "Valve Corporation",
    "release_date": "2013-07-09",
    "platforms": [
      "PC"
    ],
    "genres": [
      "MOBA",
      "Strategy",
      "Competitive",
      "Esports"
    ],
    "status": "Active",
    "rating": 4.8,
    "official_url": "https://www.dota2.com",
    "views": 41000,
    "is_demo": false,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "game-lol",
    "name": "League of Legends",
    "slug": "league-of-legends",
    "cover_image": "https://images.unsplash.com/photo-1553481187-be93c21490a9?w=600&auto=format&fit=crop&q=80",
    "banner_image": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1600&auto=format&fit=crop&q=80",
    "description": "MOBA 5v5 global dari Riot Games yang menampilkan lebih dari 160 champion di arena Summoner’s Rift serta ekosistem esports terbesar dunia.",
    "developer": "Riot Games",
    "publisher": "Riot Games",
    "release_date": "2009-10-27",
    "platforms": [
      "PC"
    ],
    "genres": [
      "MOBA",
      "Strategy",
      "Competitive",
      "Fantasy"
    ],
    "status": "Active",
    "rating": 4.7,
    "official_url": "https://www.leagueoflegends.com",
    "views": 47500,
    "is_demo": false,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "game-roblox",
    "name": "Roblox",
    "slug": "roblox",
    "cover_image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80",
    "banner_image": "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?w=1600&auto=format&fit=crop&q=80",
    "description": "Platform metaverse dan kreasi game interaktif terbesar yang memuat jutaan game buatan komunitas seperti Blox Fruits, Brookhaven, dan Blade Ball.",
    "developer": "Roblox Corporation",
    "publisher": "Roblox Corporation",
    "release_date": "2006-09-01",
    "platforms": [
      "PC",
      "PlayStation 5",
      "PlayStation 4",
      "Xbox One",
      "Android",
      "iOS"
    ],
    "genres": [
      "Sandbox",
      "Metaverse",
      "Multiplayer",
      "Creative"
    ],
    "status": "Active",
    "rating": 4.6,
    "official_url": "https://www.roblox.com",
    "views": 59000,
    "is_demo": false,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "game-minecraft",
    "name": "Minecraft",
    "slug": "minecraft",
    "cover_image": "https://images.unsplash.com/photo-1763688496557-46d22a1fbe47?w=600&auto=format&fit=crop&q=80",
    "banner_image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=1600&auto=format&fit=crop&q=80",
    "description": "Game sandbox survival terlaris sepanjang masa karya Mojang Studios dengan dunia voxel tak terbatas, crafting, redstone, dan mode petualangan kreatif.",
    "developer": "Mojang Studios",
    "publisher": "Xbox Game Studios",
    "release_date": "2011-11-18",
    "platforms": [
      "PC",
      "PlayStation 5",
      "Xbox Series X/S",
      "Nintendo Switch",
      "Android",
      "iOS"
    ],
    "genres": [
      "Sandbox",
      "Survival",
      "Crafting",
      "Adventure"
    ],
    "status": "Active",
    "rating": 4.9,
    "official_url": "https://www.minecraft.net",
    "views": 64000,
    "is_demo": false,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "game-cyberpunk",
    "name": "Cyberpunk 2077",
    "slug": "cyberpunk-2077",
    "cover_image": "https://images.unsplash.com/photo-1543353071-873f17a7a088?w=600&auto=format&fit=crop&q=80",
    "banner_image": "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1600&auto=format&fit=crop&q=80",
    "description": "Open-world action-adventure RPG berlatar di megalopolis Night City dengan grafis futuristik dan kustomisasi cyberware mendalam.",
    "developer": "CD PROJEKT RED",
    "publisher": "CD PROJEKT RED",
    "release_date": "2020-12-10",
    "platforms": [
      "PC",
      "PlayStation 5",
      "Xbox Series X/S"
    ],
    "genres": [
      "Open World",
      "Action RPG",
      "Cyberpunk",
      "Sci-Fi"
    ],
    "status": "Active",
    "rating": 4.8,
    "official_url": "https://www.cyberpunk.net",
    "views": 52000,
    "is_demo": false,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "game-mh-wilds",
    "name": "Monster Hunter Wilds",
    "slug": "monster-hunter-wilds",
    "cover_image": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&auto=format&fit=crop&q=80",
    "banner_image": "https://images.unsplash.com/photo-1533702165324-66678e2069b2?w=1600&auto=format&fit=crop&q=80",
    "description": "Generasi terbaru dari seri perburuan monster legendaris Capcom dengan ekosistem dinamis dan transisi pertempuran mulus.",
    "developer": "Capcom",
    "publisher": "Capcom",
    "release_date": "2025-02-28",
    "platforms": [
      "PC",
      "PlayStation 5",
      "Xbox Series X/S"
    ],
    "genres": [
      "Action RPG",
      "Co-op",
      "Hunting",
      "Adventure"
    ],
    "status": "Active",
    "rating": 4.9,
    "official_url": "https://www.monsterhunter.com/wilds",
    "views": 48900,
    "is_demo": false,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "game-overwatch2",
    "name": "Overwatch 2",
    "slug": "overwatch-2",
    "cover_image": "https://images.unsplash.com/photo-1530133532239-eda6f53fcf0f?w=600&auto=format&fit=crop&q=80",
    "banner_image": "https://images.unsplash.com/photo-1541728472741-03e45a58cf88?w=1600&auto=format&fit=crop&q=80",
    "description": "Game hero shooter 5v5 berbasis tim dari Blizzard dengan puluhan hero unik berkarakteristik Tank, Damage, dan Support.",
    "developer": "Blizzard Entertainment",
    "publisher": "Blizzard Entertainment",
    "release_date": "2022-10-04",
    "platforms": [
      "PC",
      "PlayStation 5",
      "Xbox Series X/S",
      "Nintendo Switch"
    ],
    "genres": [
      "Hero Shooter",
      "FPS",
      "Competitive",
      "Action"
    ],
    "status": "Active",
    "rating": 4.6,
    "official_url": "https://overwatch.blizzard.com",
    "views": 41200,
    "is_demo": false,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "game-hi3",
    "name": "Honkai Impact 3rd",
    "slug": "honkai-impact-3rd",
    "cover_image": "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=600&auto=format&fit=crop&q=80",
    "banner_image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&auto=format&fit=crop&q=80",
    "description": "Fast-paced 3D anime action game dari HoYoverse yang memelopori pertempuran Valkyrie berkecepatan tinggi dan alur cerita dramatis Part 2.",
    "developer": "miHoYo / HoYoverse",
    "publisher": "HoYoverse",
    "release_date": "2016-10-14",
    "platforms": [
      "PC",
      "Android",
      "iOS"
    ],
    "genres": [
      "Action RPG",
      "Hack and Slash",
      "Anime",
      "Gacha"
    ],
    "status": "Active",
    "rating": 4.7,
    "official_url": "https://honkaiimpact3.hoyoverse.com",
    "views": 39500,
    "is_demo": false,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  }
];

export const EXPANSION_CHARACTERS: Character[] = [
  {
    "id": "char-hu-tao",
    "game_id": "game-genshin",
    "name": "Hu Tao",
    "slug": "hu-tao",
    "portrait": "https://images.unsplash.com/photo-1530319067432-f2a729c03db5?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=1000&auto=format&fit=crop&q=80",
    "description": "Direktur Wangsheng Funeral Parlor ke-77 yang menguasai seni api dan manipulasi HP.",
    "role": "Main DPS",
    "element": "Pyro",
    "weapon": "Polearm",
    "rarity": 5,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Main DPS",
      "best_artifacts": "Crimson Witch of Flames (4-Piece)",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Pyro secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "Staff of Homa",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "Dragon's Bane",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Deathmatch",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 18682,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-kaedehara-kazuha",
    "game_id": "game-genshin",
    "name": "Kaedehara Kazuha",
    "slug": "kaedehara-kazuha",
    "portrait": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1000&auto=format&fit=crop&q=80",
    "description": "Samurai pengembara dari Inazuma yang memicu Swirl dahsyat dan memberikan buff elemental DMG besar.",
    "role": "Buffer / Crowd Control",
    "element": "Anemo",
    "weapon": "Sword",
    "rarity": 5,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Buffer / Crowd Control",
      "best_artifacts": "Viridescent Venerer (4-Piece)",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Anemo secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "Freedom-Sworn",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "Iron Sting",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Favonius Sword",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 6901,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-kafka",
    "game_id": "game-hsr",
    "name": "Kafka",
    "slug": "kafka",
    "portrait": "https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1468070454955-c5b6932bd08d?w=1000&auto=format&fit=crop&q=80",
    "description": "Anggota Stellaron Hunters misterius yang meledakkan seluruh efek Damage over Time seketika.",
    "role": "DoT Enabler",
    "element": "Lightning",
    "weapon": "Nihility",
    "rarity": 5,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "DoT Enabler",
      "best_artifacts": "Prisoner in Deep Confinement (4-Piece)",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Lightning secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "Patience Is All You Need",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "Good Night and Sleep Well",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Fermata",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 5164,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-blade",
    "game_id": "game-hsr",
    "name": "Blade",
    "slug": "blade",
    "portrait": "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=1000&auto=format&fit=crop&q=80",
    "description": "Pendekar pedang abadi yang mengorbankan HP sendiri untuk melancarkan serangan area Wind masif.",
    "role": "Bruiser DPS",
    "element": "Wind",
    "weapon": "Destruction",
    "rarity": 5,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Bruiser DPS",
      "best_artifacts": "Longevous Disciple (4-Piece)",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Wind secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "The Unreachable Side",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "A Secret Vow",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Mutual Demise",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 17225,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-jingliu",
    "game_id": "game-hsr",
    "name": "Jingliu",
    "slug": "jingliu",
    "portrait": "https://images.unsplash.com/photo-1572435555646-7ad9a149ad91?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80",
    "description": "Mantan master pedang Luofu yang memasuki Spectral Transmigration untuk damage Ice tanpa SP.",
    "role": "Hypercarry DPS",
    "element": "Ice",
    "weapon": "Destruction",
    "rarity": 5,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Hypercarry DPS",
      "best_artifacts": "Hunter of Glacial Forest (4-Piece)",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Ice secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "I Shall Be My Own Sword",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "Fall of an Aeon",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Under the Blue Sky",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 9275,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-dan-heng-imbibitor-lunae",
    "game_id": "game-hsr",
    "name": "Dan Heng • Imbibitor Lunae",
    "slug": "dan-heng-imbibitor-lunae",
    "portrait": "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1535406208535-1429839cfd13?w=1000&auto=format&fit=crop&q=80",
    "description": "Wujud High Elder Vidyadhara yang mengonsumsi hingga 3 Skill Point untuk nuke Imaginary.",
    "role": "Burst DPS",
    "element": "Imaginary",
    "weapon": "Destruction",
    "rarity": 5,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Burst DPS",
      "best_artifacts": "Wasteland of Banditry (4-Piece)",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Imaginary secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "Brighter Than the Sun",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "On the Fall of an Aeon",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Under the Blue Sky",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 5351,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-chou",
    "game_id": "game-mlbb",
    "name": "Chou",
    "slug": "chou",
    "portrait": "https://images.unsplash.com/photo-1525540810550-5032f5d191b1?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1511497584788-876760111969?w=1000&auto=format&fit=crop&q=80",
    "description": "Fighter serbabisa berkemampuan crowd control knock-up dan kekebalan CC dengan tendangan The Way of Dragon.",
    "role": "Fighter / Roamer",
    "element": "Physical",
    "weapon": "Fist",
    "rarity": 4,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Fighter / Roamer",
      "best_artifacts": "Blade of Heptaseas & Athena Shield",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Physical secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "Thunder Belt",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "Antique Cuirass",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Immortality",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 6365,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-hayabusa",
    "game_id": "game-mlbb",
    "name": "Hayabusa",
    "slug": "hayabusa",
    "portrait": "https://images.unsplash.com/photo-1563580853176-38535245e8b6?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1000&auto=format&fit=crop&q=80",
    "description": "Ninja bayangan klan Iga yang membunuh musuh target tunggal tanpa celah lewat Ougi: Shadow Kill.",
    "role": "Assassin",
    "element": "Physical",
    "weapon": "Ninjato",
    "rarity": 5,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Assassin",
      "best_artifacts": "Hunter Strike & Blade of Despair",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Physical secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "Malefic Roar",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "Endless Battle",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Rose Gold Meteor",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 10959,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-reyna",
    "game_id": "game-valorant",
    "name": "Reyna",
    "slug": "reyna",
    "portrait": "https://images.unsplash.com/photo-1568378711015-d10ec11f5c0c?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1567444632885-966e7ba298bc?w=1000&auto=format&fit=crop&q=80",
    "description": "Duelist Meksiko yang mendominasi baku tembak 1v1 dengan kemampuan heal instan dan dismiss invulnerable.",
    "role": "Duelist",
    "element": "Empress",
    "weapon": "Firearms",
    "rarity": 5,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Duelist",
      "best_artifacts": "Vandal & Phantom Loadout",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Empress secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "Ghost",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "Operator",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Sheriff",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 22561,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-ellen-joe",
    "game_id": "game-zzz",
    "name": "Ellen Joe",
    "slug": "ellen-joe",
    "portrait": "https://images.unsplash.com/photo-1545987796-200677ee1011?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?w=1000&auto=format&fit=crop&q=80",
    "description": "Maid Victoria Housekeeping berwujud hiu yang meluncur cepat dengan Flash Freeze Dash.",
    "role": "Attack / DPS",
    "element": "Ice",
    "weapon": "Shears",
    "rarity": 5,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Attack / DPS",
      "best_artifacts": "Polar Metal (4-Piece)",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Ice secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "Deep Sea Visitor",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "Starlight Engine",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Cannon Rotor",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 9500,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-hoshimi-miyabi",
    "game_id": "game-zzz",
    "name": "Hoshimi Miyabi",
    "slug": "hoshimi-miyabi",
    "portrait": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1000&auto=format&fit=crop&q=80",
    "description": "Ketua Seksi 6 yang membelah dimensi Hollow menggunakan pedang es legendaris.",
    "role": "Anomaly / Slash",
    "element": "Ice",
    "weapon": "Katana",
    "rarity": 5,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Anomaly / Slash",
      "best_artifacts": "Polar Metal & Woodpecker Electro",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Ice secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "Taichi Sword",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "Gilded Blossom",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Steel Cushion",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 6213,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-nicole-demara",
    "game_id": "game-zzz",
    "name": "Nicole Demara",
    "slug": "nicole-demara",
    "portrait": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=1000&auto=format&fit=crop&q=80",
    "description": "Pemimpin Cunning Hares yang mengumpulkan musuh ke lubang hitam Ether dan mengurangi DEF musuh 40%.",
    "role": "Support",
    "element": "Ether",
    "weapon": "Briefcase Cannon",
    "rarity": 4,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Support",
      "best_artifacts": "Swing Jazz (4-Piece)",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Ether secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "The Vault",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "Weeping Cradle",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Kaboom the Cannon",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 21231,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-jiyan",
    "game_id": "game-wuwa",
    "name": "Jiyan",
    "slug": "jiyan",
    "portrait": "https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1541562232579-512a21360020?w=1000&auto=format&fit=crop&q=80",
    "description": "Jenderal Midnight Rangers yang memanggil naga Qingloong saat Resonance Liberation.",
    "role": "Main DPS",
    "element": "Aero",
    "weapon": "Broadblade",
    "rarity": 5,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Main DPS",
      "best_artifacts": "Sierra Gale (5-Piece)",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Aero secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "Verdant Summit",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "Autumntrace",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Helios Cleaver",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 12521,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-yinlin",
    "game_id": "game-wuwa",
    "name": "Yinlin",
    "slug": "yinlin",
    "portrait": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000&auto=format&fit=crop&q=80",
    "description": "Mantan investigator Jinzhou yang mengendalikan boneka Zapstring untuk serangan Electro terkoordinasi.",
    "role": "Sub-DPS / Buffer",
    "element": "Electro",
    "weapon": "Rectifier",
    "rarity": 5,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Sub-DPS / Buffer",
      "best_artifacts": "Void Thunder (5-Piece)",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Electro secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "Stringmaster",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "Augment",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Jinzhou Keeper",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 22034,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-jinhsi",
    "game_id": "game-wuwa",
    "name": "Jinhsi",
    "slug": "jinhsi",
    "portrait": "https://images.unsplash.com/photo-1559583109-3e7968136c99?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1000&auto=format&fit=crop&q=80",
    "description": "Magistrate Jinzhou yang mengakumulasi Incandescence untuk nuke Spectro raksasa.",
    "role": "Burst DPS",
    "element": "Spectro",
    "weapon": "Broadblade",
    "rarity": 5,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Burst DPS",
      "best_artifacts": "Celestial Light (5-Piece)",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Spectro secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "Ages of Harvest",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "Lustrous Razor",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Broadblade#41",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 28768,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-sorasaki-hina",
    "game_id": "game-ba",
    "name": "Sorasaki Hina",
    "slug": "sorasaki-hina",
    "portrait": "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=1000&auto=format&fit=crop&q=80",
    "description": "Ketua Prefect Team Gehenna yang meluluhlantakkan garis depan musuh dengan senapan mesin berat.",
    "role": "Striker / AoE DPS",
    "element": "Explosive",
    "weapon": "Machine Gun",
    "rarity": 5,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Striker / AoE DPS",
      "best_artifacts": "Attack & Crit Damage Hat/Gloves",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Explosive secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "MG Destroyer",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "Watch of Kivotos",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Hairpin of Gehenna",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 28447,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-sunao-shiroko",
    "game_id": "game-ba",
    "name": "Sunao Shiroko",
    "slug": "sunao-shiroko",
    "portrait": "https://images.unsplash.com/photo-1563089145-599997674d42?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1000&auto=format&fit=crop&q=80",
    "description": "Siswi Abydos penggemar olahraga yang memanggil drone serang pendukung dalam pertempuran.",
    "role": "Striker / Single DPS",
    "element": "Explosive",
    "weapon": "Assault Rifle",
    "rarity": 4,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Striker / Single DPS",
      "best_artifacts": "Gloves & Badge of Accuracy",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Explosive secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "WHITE FANG 465",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "Abydos Charm",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Thermal Scope",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 8818,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-misono-mika",
    "game_id": "game-ba",
    "name": "Misono Mika",
    "slug": "misono-mika",
    "portrait": "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=1000&auto=format&fit=crop&q=80",
    "description": "Putri Trinity yang selalu menghasilkan guaranteed critical hit pada musuh ber-armor berat.",
    "role": "Striker / Piercing DPS",
    "element": "Penetration",
    "weapon": "Submachine Gun",
    "rarity": 5,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Striker / Piercing DPS",
      "best_artifacts": "Watch & Crit Damage Trinket",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Penetration secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "Quis ut Deus",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "Trinity Ribbon",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Pendant of Light",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 17446,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-amiya",
    "game_id": "game-arknights",
    "name": "Amiya",
    "slug": "amiya",
    "portrait": "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1000&auto=format&fit=crop&q=80",
    "description": "Pemimpin muda Rhodes Island yang mampu melepaskan cincin segel kekuatannya demi True Damage.",
    "role": "Caster / Guard",
    "element": "Arts / True",
    "weapon": "Wand / Sword",
    "rarity": 5,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Caster / Guard",
      "best_artifacts": "Arts Amplification & SP Boost",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Arts / True secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "Ring of Originium",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "Insignia of Cautus",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Rhodes Staff",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 19424,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-silverash",
    "game_id": "game-arknights",
    "name": "SilverAsh",
    "slug": "silverash",
    "portrait": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1000&auto=format&fit=crop&q=80",
    "description": "Kepala klan Karlan dari Kjerag yang membuka True Silver Slash untuk membasmi lusinan musuh.",
    "role": "Guard / Ranged",
    "element": "Physical",
    "weapon": "Sword Cane",
    "rarity": 6,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Guard / Ranged",
      "best_artifacts": "Physical Burst & Truesight",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Physical secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "Ode to the Snow",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "Karlan Sigil",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Hunting Falcon",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 8172,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-surtr",
    "game_id": "game-arknights",
    "name": "Surtr",
    "slug": "surtr",
    "portrait": "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=1000&auto=format&fit=crop&q=80",
    "description": "Prajurit pengembara yang memanggil raksasa api Twilight, menahan kematian selama beberapa detik.",
    "role": "Guard / Arts DPS",
    "element": "Arts",
    "weapon": "Claymore",
    "rarity": 6,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Guard / Arts DPS",
      "best_artifacts": "Arts Penetration & Max HP",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Arts secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "Laevatain",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "Molten Flame Shard",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Ashen Core",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 14963,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-artoria-pendragon",
    "game_id": "game-fgo",
    "name": "Artoria Pendragon",
    "slug": "artoria-pendragon",
    "portrait": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000&auto=format&fit=crop&q=80",
    "description": "Raja Ksatria legendaris dari Britania yang meluncurkan gelombang suci Excalibur pada musuh.",
    "role": "Saber",
    "element": "Buster",
    "weapon": "Excalibur",
    "rarity": 5,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Saber",
      "best_artifacts": "Aerial Drive & Kaleidoscope",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Buster secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "Excalibur Holy Sword",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "Avalon Scabbard",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Dragon Core",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 14357,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-gilgamesh",
    "game_id": "game-fgo",
    "name": "Gilgamesh",
    "slug": "gilgamesh",
    "portrait": "https://images.unsplash.com/photo-1554474051-0256b98c36f8?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1519336367661-eba9c1dfa5e9?w=1000&auto=format&fit=crop&q=80",
    "description": "Raja Uruk kuno yang menghujani medan perang dengan harta tanpa batas dan Enuma Elish.",
    "role": "Archer",
    "element": "Buster",
    "weapon": "Gate of Babylon",
    "rarity": 5,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Archer",
      "best_artifacts": "Black Grail & Holy Night Supper",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Buster secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "Ea Sword of Rupture",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "Golden Goblet",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Chains of Enkidu",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 8188,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-wraith",
    "game_id": "game-apex",
    "name": "Wraith",
    "slug": "wraith",
    "portrait": "https://images.unsplash.com/photo-1523365237953-9f36b3c8cada?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1563209259-2819dbb22d93?w=1000&auto=format&fit=crop&q=80",
    "description": "Petarung antardimensi yang mendengarkan bisikan bahaya dan membuka Dimensional Rift untuk tim.",
    "role": "Skirmisher",
    "element": "Void",
    "weapon": "Kunai",
    "rarity": 5,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Skirmisher",
      "best_artifacts": "Shotgun & Wingman Precision",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Void secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "Kunai Heirloom",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "Void Walker Suit",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Phase Device",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 7335,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-bloodhound",
    "game_id": "game-apex",
    "name": "Bloodhound",
    "slug": "bloodhound",
    "portrait": "https://images.unsplash.com/photo-1529489971232-f998dbe562d0?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1560956497-877301cd884c?w=1000&auto=format&fit=crop&q=80",
    "description": "Pemburu terhebat Outlands yang memindai jejak kaki dan lokasi musuh melalui Eye of the Allfather.",
    "role": "Recon",
    "element": "Tracker",
    "weapon": "Crow",
    "rarity": 4,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Recon",
      "best_artifacts": "R-301 & Peacekeeper Scan",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Tracker secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "Raven Axe",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "Tracker Visor",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Beast Mask",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 5713,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-octane",
    "game_id": "game-apex",
    "name": "Octane",
    "slug": "octane",
    "portrait": "https://images.unsplash.com/photo-1576256932088-d61b5370530e?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1473682150760-51d4f94b09d4?w=1000&auto=format&fit=crop&q=80",
    "description": "Pencari sensasi adrenalin yang menyuntikkan stim untuk kecepatan lari kilat dan melompat via Jump Pad.",
    "role": "Skirmisher",
    "element": "Speed",
    "weapon": "Butterfly Knife",
    "rarity": 4,
    "release_date": "2023-01-01",
    "skills": [
      {
        "name": "Basic Attack",
        "type": "Normal",
        "description": "Serangan bertubi-tubi pada musuh terdekat."
      },
      {
        "name": "Special Skill",
        "type": "Skill",
        "description": "Menghasilkan damage elemental tinggi dan debuff."
      },
      {
        "name": "Ultimate Burst",
        "type": "Ultimate",
        "description": "Serangan pamungkas area dengan animasi spektakuler."
      }
    ],
    "talents": [
      {
        "name": "Combat Mastery",
        "description": "Meningkatkan critical rate 10% saat HP di atas 50%."
      },
      {
        "name": "Elemental Harmony",
        "description": "Meningkatkan elemental mastery seluruh tim sebesar 50 poin."
      }
    ],
    "recommended_build": {
      "main_role": "Skirmisher",
      "best_artifacts": "SMG & Jump Pad Mobility",
      "main_stats": "Sands: ATK% / HP% | Goblet: Elemental DMG | Circlet: CRIT Rate/DMG",
      "sub_stats": "CRIT Rate, CRIT DMG, ATK%, Energy Recharge",
      "summary": "Fokus pada peningkatan output damage Speed secara konsisten dengan rotasi tim yang cepat."
    },
    "recommended_weapons": [
      {
        "name": "Butterfly Heirloom",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik."
      },
      {
        "name": "Stim Injector",
        "rarity": 5,
        "rank": 2,
        "note": "Alternatif F2P solid."
      },
      {
        "name": "Speedometer",
        "rarity": 5,
        "rank": 3,
        "note": "Alternatif F2P solid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Support Sub-DPS",
        "role": "Sub-DPS",
        "description": "Pemicu reaksi elemental berkelanjutan."
      },
      {
        "character_name": "Buffer Specialist",
        "role": "Buffer",
        "description": "Meningkatkan attack dan damage bonus."
      },
      {
        "character_name": "Shielder/Healer",
        "role": "Sustain",
        "description": "Menjaga pertahanan dan ketahanan interupsi."
      }
    ],
    "materials": [
      {
        "name": "Boss Material",
        "type": "Ascension",
        "count": 46
      },
      {
        "name": "Local Specialty",
        "type": "Ascension",
        "count": 168
      },
      {
        "name": "Talent Books",
        "type": "Talent",
        "count": 114
      }
    ],
    "status": "PUBLISHED",
    "views": 20168,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-v-cyberpunk",
    "game_id": "game-cyberpunk",
    "name": "V",
    "slug": "v-cyberpunk",
    "portrait": "https://images.unsplash.com/photo-1549366021-9f761d450615?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1000&auto=format&fit=crop&q=80",
    "description": "Mercenary cyberware legendaris dari Night City dengan fleksibilitas build Netrunner, Solo, dan Sandevistan.",
    "role": "Solo / Netrunner",
    "element": "Cyberware",
    "weapon": "Mantis Blades / Smart Shotgun",
    "rarity": 5,
    "release_date": "2020-12-10",
    "skills": [
      {
        "name": "Sandevistan Reflex",
        "type": "Operating System",
        "description": "Memperlambat waktu dan meningkatkan critical damage drastis."
      },
      {
        "name": "Quickhack Upload",
        "type": "Cyberdeck",
        "description": "Mengunggah virus Short Circuit dan Synapse Burnout ke musuh."
      },
      {
        "name": "Berserk Overload",
        "type": "Combat",
        "description": "Meningkatkan armor dan melee attack tanpa batas stamina."
      }
    ],
    "talents": [
      {
        "name": "Edgerunner Overclock",
        "description": "Memungkinkan penggunaan cyberware melampaui batas kapasitas."
      },
      {
        "name": "Shinobi Agility",
        "description": "Meningkatkan kecepatan dash dan mitigasi damage saat bergerak."
      }
    ],
    "recommended_build": {
      "main_role": "Cyber Samurai",
      "best_artifacts": "Militech Apogee Sandevistan + Axolotl Cyberware",
      "main_stats": "Reflexes 20 | Body 20 | Tech 20 | Cool 15",
      "sub_stats": "CRIT Chance, CRIT Damage, Mitigation Strength, Cyberware Capacity",
      "summary": "Kombinasi kecepatan Sandevistan dengan Mantis Blades untuk membabat musuh sebelum mereka sempat bereaksi."
    },
    "recommended_weapons": [
      {
        "name": "Erata Thermal Katana",
        "rarity": 5,
        "rank": 1,
        "note": "Katana api dengan chance burn 100%."
      },
      {
        "name": "Ba Xing Chong Smart Shotgun",
        "rarity": 5,
        "rank": 2,
        "note": "Shotgun eksplosif peluru otomatis."
      },
      {
        "name": "Fenrir Power SMG",
        "rarity": 4,
        "rank": 3,
        "note": "SMG cyberware glitch terbaik."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Johnny Silverhand",
        "role": "Relic Mentor",
        "description": "Memberikan buff damage moral dan wawasan taktis."
      }
    ],
    "materials": [
      {
        "name": "Tier 5 Item Components",
        "type": "Upgrade",
        "count": 200
      },
      {
        "name": "Quickhack Components",
        "type": "Cyberware",
        "count": 150
      }
    ],
    "status": "PUBLISHED",
    "views": 25800,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-johnny-silverhand",
    "game_id": "game-cyberpunk",
    "name": "Johnny Silverhand",
    "slug": "johnny-silverhand",
    "portrait": "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1000&auto=format&fit=crop&q=80",
    "description": "Frontman band rock Samurai dan pejuang pemberontak legendaris bersenjata pistol Malorian Arms 3516.",
    "role": "Rockerboy / Gunner",
    "element": "Fire",
    "weapon": "Malorian Arms 3516",
    "rarity": 5,
    "release_date": "2020-12-10",
    "skills": [
      {
        "name": "Malorian Flamethrower Melee",
        "type": "Pistol",
        "description": "Menyemburkan semburan api jarak dekat dari laras pistol."
      },
      {
        "name": "Silverhand Rebuke",
        "type": "Tactical",
        "description": "Headshot menembus dinding dan merobek cover musuh."
      }
    ],
    "talents": [
      {
        "name": "Never Fade Away",
        "description": "Memulihkan 50% HP saat menerima serangan lethal."
      }
    ],
    "recommended_build": {
      "main_role": "Headshot Gunner",
      "best_artifacts": "Samurai Tour Leather Jacket + Ballistic Mesh",
      "main_stats": "Cool 20 | Reflexes 20 | Tech 15",
      "sub_stats": "Headshot Multiplier, Reload Speed, Fire Damage",
      "summary": "Build tembakan presisi mematikan dari jarak menengah dengan damage penetrasi dinding."
    },
    "recommended_weapons": [
      {
        "name": "Malorian Arms 3516",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata ikonik Johnny dengan animasi reload legendaris."
      }
    ],
    "recommended_team": [
      {
        "character_name": "V",
        "role": "Partner",
        "description": "Kombinasi dual combat Night City."
      }
    ],
    "materials": [
      {
        "name": "Legendary Upgrade Modules",
        "type": "Upgrade",
        "count": 120
      }
    ],
    "status": "PUBLISHED",
    "views": 29400,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-tracer",
    "game_id": "game-overwatch2",
    "name": "Tracer",
    "slug": "tracer",
    "portrait": "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1533537841959-705741f3d3a5?w=1000&auto=format&fit=crop&q=80",
    "description": "Mantan pilot uji coba asal London dengan kemampuan manipulasi waktu kronal Blink dan Recall.",
    "role": "Damage / Flanker",
    "element": "Time",
    "weapon": "Dual Pulse Pistols",
    "rarity": 5,
    "release_date": "2022-10-04",
    "skills": [
      {
        "name": "Blink",
        "type": "Movement",
        "description": "Melesat seketika ke arah gerakan hingga 3 kali berturut-turut."
      },
      {
        "name": "Recall",
        "type": "Utility",
        "description": "Memutar balik waktu 3 detik ke belakang, mengembalikan HP dan posisi."
      },
      {
        "name": "Pulse Bomb",
        "type": "Ultimate",
        "description": "Menempelkan bom berdaya ledak masif ke tubuh musuh."
      }
    ],
    "talents": [
      {
        "name": "Chronal Acceleration",
        "description": "Mengurangi cooldown Blink sebesar 15% setelah eliminasi."
      }
    ],
    "recommended_build": {
      "main_role": "Backline Harasser",
      "best_artifacts": "Overwatch 2 Competitive DPS Loadout",
      "main_stats": "Movement Speed | Tracking Accuracy",
      "sub_stats": "Crit Tracking, Blink Management",
      "summary": "Menyerang garis belakang musuh, membungkam support, dan keluar tanpa tersentuh."
    },
    "recommended_weapons": [
      {
        "name": "Dual Pulse Pistols",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata standar Tracer."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Winston",
        "role": "Dive Tank",
        "description": "Inisiasi dive bersamaan ke target support."
      }
    ],
    "materials": [
      {
        "name": "Chronal Accelerator Matrix",
        "type": "Core",
        "count": 50
      }
    ],
    "status": "PUBLISHED",
    "views": 21800,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-genji",
    "game_id": "game-overwatch2",
    "name": "Genji",
    "slug": "genji",
    "portrait": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1530119412657-4f6cd87aad79?w=1000&auto=format&fit=crop&q=80",
    "description": "Ninja cyborg dari klan Shimada yang menguasai shuriken, deflect proyektil, dan pedang naga Dragonblade.",
    "role": "Damage / Flanker",
    "element": "Cybernetics",
    "weapon": "Shuriken & Dragonblade",
    "rarity": 5,
    "release_date": "2022-10-04",
    "skills": [
      {
        "name": "Deflect",
        "type": "Defense",
        "description": "Memantulkan proyektil musuh kembali ke arah penembak."
      },
      {
        "name": "Swift Strike",
        "type": "Attack",
        "description": "Menebas maju ke depan, reset instan bila menghasilkan eliminasi."
      },
      {
        "name": "Dragonblade",
        "type": "Ultimate",
        "description": "Menghunus katana berenergi naga untuk serangan sapuan masif."
      }
    ],
    "talents": [
      {
        "name": "Shimada Agility",
        "description": "Memungkinkan double jump dan memanjat dinding vertikal."
      }
    ],
    "recommended_build": {
      "main_role": "Finisher Assassin",
      "best_artifacts": "Shimada Blade Master Loadout",
      "main_stats": "Slash Timing | Deflect Reflexes",
      "sub_stats": "Dragonblade Reset, Shuriken Headshot",
      "summary": "Kombinasi reset dash untuk membersihkan target HP rendah secara beruntun."
    },
    "recommended_weapons": [
      {
        "name": "Ryu-Ichimonji Katana",
        "rarity": 5,
        "rank": 1,
        "note": "Pedang naga kehormatan Shimada."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Ana",
        "role": "Nano Boost Support",
        "description": "Nano-Blade combo mematikan penghapus tim lawan."
      }
    ],
    "materials": [
      {
        "name": "Shimada Dragon Scales",
        "type": "Essence",
        "count": 60
      }
    ],
    "status": "PUBLISHED",
    "views": 27100,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-kiana",
    "game_id": "game-hi3",
    "name": "Kiana Kaslana",
    "slug": "kiana-kaslana",
    "portrait": "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1000&auto=format&fit=crop&q=80",
    "description": "Herrscher of Finality pelindung bumi yang mengendalikan ruang dan waktu melintasi takdir.",
    "role": "Fire / Herrscher DPS",
    "element": "Fire",
    "weapon": "Dual Pistols",
    "rarity": 5,
    "release_date": "2023-02-16",
    "skills": [
      {
        "name": "Absolute Time Fracture",
        "type": "Herrscher",
        "description": "Menghentikan aliran waktu semesta secara total."
      },
      {
        "name": "Flamescion Burst",
        "type": "Ultimate",
        "description": "Tebasan pedang api kolosal membakar seluruh medan tempur."
      }
    ],
    "talents": [
      {
        "name": "Kaslana Oath",
        "description": "Meningkatkan fire damage seluruh anggota tim Herrscher Trio."
      }
    ],
    "recommended_build": {
      "main_role": "Herrscher of Finality",
      "best_artifacts": "Kiana Kaslana Stigmata Set (T, M, B)",
      "main_stats": "ATK% | Fire DMG | Total DMG Multiplier",
      "sub_stats": "Crit DMG, SP Recovery",
      "summary": "Core DPS dalam sinergi Trio bersama Mei (Origin) dan Bronya (Truth)."
    },
    "recommended_weapons": [
      {
        "name": "Domain of Genesis",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata PRI-ARM terbaik Finality."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Raiden Mei",
        "role": "Herrscher of Origin",
        "description": "Sinergi rantai serangan Trio."
      }
    ],
    "materials": [
      {
        "name": "SC Metal-H2",
        "type": "PRI-ARM",
        "count": 100
      }
    ],
    "status": "PUBLISHED",
    "views": 31200,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  }
];

export const EXPANSION_GUIDES: Guide[] = [
  {
    "id": "guide-build-hu-tao-terbaik-senjata-artefak-tim",
    "game_id": "game-genshin",
    "title": "Build Hu Tao Terbaik: Senjata, Artefak & Komposisi Tim Vaporize",
    "slug": "build-hu-tao-terbaik-senjata-artefak-tim",
    "category": "CHARACTER BUILD",
    "thumbnail": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Panduan lengkap memaksimalkan damage pyro Hu Tao melalui reaksi Vaporize bersama Xingqiu dan Yelan.",
    "content": "# Build Hu Tao Terbaik: Senjata, Artefak & Komposisi Tim Vaporize\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Ryu Pratama",
    "author_slug": "ryu-mechanics",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "character build",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 23002,
    "faq": [
      {
        "question": "Berapa Elemental Mastery ideal untuk Hu Tao?",
        "answer": "Targetkan minimal 100–200 Elemental Mastery untuk pelipatgandaan reaksi Vaporize yang optimal."
      },
      {
        "question": "Apakah Staff of Homa wajib dimiliki?",
        "answer": "Tidak. Dragon’s Bane R5 atau Deathmatch adalah alternatif bintang 4 yang sangat kuat untuk F2P."
      }
    ],
    "related_characters": [
      "hu-tao"
    ],
    "featured_image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-build-zhongli-support-shielder-senjata-f2p",
    "game_id": "game-genshin",
    "title": "Build Zhongli Support Shielder: Artefak HP% & Senjata F2P",
    "slug": "build-zhongli-support-shielder-senjata-f2p",
    "category": "CHARACTER BUILD",
    "thumbnail": "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Cara build Zhongli dengan shield abadi 50.000+ HP menggunakan senjata F2P Black Tassel.",
    "content": "# Build Zhongli Support Shielder: Artefak HP% & Senjata F2P\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Ryu Pratama",
    "author_slug": "ryu-mechanics",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "character build",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 10053,
    "faq": [
      {
        "question": "Apakah perlu menaikkan talent normal attack Zhongli?",
        "answer": "Untuk build pure shielder, cukup fokus pada Elemental Skill (Dominance of Earth)."
      }
    ],
    "related_characters": [
      "zhongli"
    ],
    "featured_image": "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-panduan-eksplorasi-natlan-lokasi-saurian-puzzle",
    "game_id": "game-genshin",
    "title": "Panduan Eksplorasi Natlan: Lokasi Saurian & Puzzle Rahasia",
    "slug": "panduan-eksplorasi-natlan-lokasi-saurian-puzzle",
    "category": "WALKTHROUGH",
    "thumbnail": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Rute eksplorasi wilayah Natlan, cara menjinakkan Saurian, dan trik memecahkan puzzle Pyro.",
    "content": "# Panduan Eksplorasi Natlan: Lokasi Saurian & Puzzle Rahasia\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Lyra Valery",
    "author_slug": "lyra-lore",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "walkthrough",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 21098,
    "faq": [
      {
        "question": "Bagaimana cara membuka waypoint bawah tanah di Natlan?",
        "answer": "Gunakan Saurian tipe penggali untuk menembus retakan batu magma di tebing utara."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-build-acheron-e0s1-terkuat-tim-nihility-debuff",
    "game_id": "game-hsr",
    "title": "Build Acheron E0S1 Terkuat: Tim Nihility & Sinergi Debuff",
    "slug": "build-acheron-e0s1-terkuat-tim-nihility-debuff",
    "category": "CHARACTER BUILD",
    "thumbnail": "https://images.unsplash.com/photo-1522125670776-3c7abb882bc2?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Panduan build Acheron tanpa bar energy, rekomendasi dua karakter Nihility, dan rotasi Crimson Knot.",
    "content": "# Build Acheron E0S1 Terkuat: Tim Nihility & Sinergi Debuff\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Ryu Pratama",
    "author_slug": "ryu-mechanics",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "character build",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 27257,
    "faq": [
      {
        "question": "Apakah Acheron bisa dimainkan tanpa light cone signature?",
        "answer": "Bisa, gunakan Good Night and Sleep Well S5 atau Boundless Choreo sebagai pengganti."
      }
    ],
    "related_characters": [
      "acheron"
    ],
    "featured_image": "https://images.unsplash.com/photo-1522125670776-3c7abb882bc2?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-panduan-menaklukkan-memory-of-chaos-lantai-12",
    "game_id": "game-hsr",
    "title": "Panduan Menaklukkan Memory of Chaos Lantai 12",
    "slug": "panduan-menaklukkan-memory-of-chaos-lantai-12",
    "category": "BOSS",
    "thumbnail": "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Strategi menyelesaikan MoC 12 dengan 3 bintang, memilih target prioritas, dan memanfaatkan turbulence buff.",
    "content": "# Panduan Menaklukkan Memory of Chaos Lantai 12\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Kaelen Arisandi",
    "author_slug": "kael-strats",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "boss",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 26599,
    "faq": [
      {
        "question": "Berapa siklus batas aman untuk mendapatkan 3 bintang?",
        "answer": "Selesaikan kedua paruh sebelum siklus tersisa kurang dari 20 siklus."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-build-firefly-super-break-sinergi-ruan-mei-trailblazer",
    "game_id": "game-hsr",
    "title": "Build Firefly Super Break: Sinergi Ruan Mei & Harmony Trailblazer",
    "slug": "build-firefly-super-break-sinergi-ruan-mei-trailblazer",
    "category": "CHARACTER BUILD",
    "thumbnail": "https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Kupas tuntas mekanik Super Break damage Firefly dan pentingnya stat Break Effect di atas 360%.",
    "content": "# Build Firefly Super Break: Sinergi Ruan Mei & Harmony Trailblazer\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Ryu Pratama",
    "author_slug": "ryu-mechanics",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "character build",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 10021,
    "faq": [
      {
        "question": "Apakah Firefly membutuhkan CRIT Rate dan CRIT DMG?",
        "answer": "Tidak, seluruh damage utamanya bersumber dari Super Break yang berskala murni dari Break Effect dan ATK."
      }
    ],
    "related_characters": [
      "firefly"
    ],
    "featured_image": "https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-panduan-rotasi-jungler-mobile-legends-season-terbaru",
    "game_id": "game-mlbb",
    "title": "Panduan Rotasi Jungler Mobile Legends Season Terbaru",
    "slug": "panduan-rotasi-jungler-mobile-legends-season-terbaru",
    "category": "BEGINNER",
    "thumbnail": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Rute farming jungle 2 menit pertama, timing kontes Lithowanderer, dan objektif Turtle pertama.",
    "content": "# Panduan Rotasi Jungler Mobile Legends Season Terbaru\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Kaelen Arisandi",
    "author_slug": "kael-strats",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "beginner",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 28949,
    "faq": [
      {
        "question": "Kapan waktu terbaik untuk melakukan gank di gold lane?",
        "answer": "Tepat setelah menghabisi buff kedua sekitar menit ke 1:15 sebelum turtle spawn."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-tips-menguasai-mekanik-kabel-fanny-pemula",
    "game_id": "game-mlbb",
    "title": "Tips Menguasai Mekanik Kabel Fanny untuk Pemula",
    "slug": "tips-menguasai-mekanik-kabel-fanny-pemula",
    "category": "TIPS",
    "thumbnail": "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Latihan straight cable, sudut pantul tembok, dan manajemen energy agar tidak boros saat teamfight.",
    "content": "# Tips Menguasai Mekanik Kabel Fanny untuk Pemula\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Kaelen Arisandi",
    "author_slug": "kael-strats",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "tips",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 3093,
    "faq": [
      {
        "question": "Bagaimana cara menghemat energy Fanny saat war?",
        "answer": "Pastikan Tornado Strike mengenai minimal 2 hero musuh untuk memicu regenerasi energy dari pasif."
      }
    ],
    "related_characters": [
      "fanny"
    ],
    "featured_image": "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-panduan-crosshair-placement-peeking-technique-valorant",
    "game_id": "game-valorant",
    "title": "Panduan Crosshair Placement & Peeking Technique Valorant",
    "slug": "panduan-crosshair-placement-peeking-technique-valorant",
    "category": "SETTINGS",
    "thumbnail": "https://images.unsplash.com/photo-1768409427465-01320d46963e?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Trik menjaga crosshair selalu setinggi kepala musuh dan teknik jiggle peek serta slice the pie.",
    "content": "# Panduan Crosshair Placement & Peeking Technique Valorant\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Kaelen Arisandi",
    "author_slug": "kael-strats",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "settings",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 12703,
    "faq": [
      {
        "question": "Berapa sensitivity mouse ideal untuk Valorant?",
        "answer": "eDPI yang direkomendasikan adalah antara 200 hingga 400 (DPI x In-game Sens)."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1768409427465-01320d46963e?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-lineup-recon-dart-sova-terbaik-map-ascent",
    "game_id": "game-valorant",
    "title": "Lineup Recon Dart Sova Terbaik di Map Ascent",
    "slug": "lineup-recon-dart-sova-terbaik-map-ascent",
    "category": "TIPS",
    "thumbnail": "https://images.unsplash.com/photo-1483706571191-85c0c76b1947?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Titik pantul panah Sova untuk mengungkap seluruh area A-Site dan B-Main di map Ascent.",
    "content": "# Lineup Recon Dart Sova Terbaik di Map Ascent\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Kaelen Arisandi",
    "author_slug": "kael-strats",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "tips",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 29815,
    "faq": [
      {
        "question": "Apakah panah Sova bisa dihancurkan musuh sebelum memindai?",
        "answer": "Bisa, oleh karena itu gunakan lineup double-bounce agar panah mendarat tak terduga."
      }
    ],
    "related_characters": [
      "sova"
    ],
    "featured_image": "https://images.unsplash.com/photo-1483706571191-85c0c76b1947?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-panduan-pemula-zenless-zone-zero-mekanik-daze-chain-attack",
    "game_id": "game-zzz",
    "title": "Panduan Pemula Zenless Zone Zero: Mekanik Daze & Chain Attack",
    "slug": "panduan-pemula-zenless-zone-zero-mekanik-daze-chain-attack",
    "category": "BEGINNER",
    "thumbnail": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Penjelasan detail bar Daze musuh, pemicu Chain Attack beruntun, dan pemilihan Bangboo optimal.",
    "content": "# Panduan Pemula Zenless Zone Zero: Mekanik Daze & Chain Attack\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Tim Editorial Seraphi",
    "author_slug": "seraphi-editorial",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "beginner",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 27175,
    "faq": [
      {
        "question": "Bagaimana cara mengisi Daze meter musuh lebih cepat?",
        "answer": "Gunakan karakter tipe Stun seperti Anby atau Lycaon untuk serangan heavy impact."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-build-ellen-joe-terbaik-drive-disc-tim-shark-maid",
    "game_id": "game-zzz",
    "title": "Build Ellen Joe Terbaik: Drive Disc & Kombinasi Tim Shark Maid",
    "slug": "build-ellen-joe-terbaik-drive-disc-tim-shark-maid",
    "category": "CHARACTER BUILD",
    "thumbnail": "https://images.unsplash.com/photo-1556157382-4e063bb26661?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Optimalisasi Ice anomaly damage Ellen Joe dengan Polar Metal 4-piece dan sinergi Soukaku.",
    "content": "# Build Ellen Joe Terbaik: Drive Disc & Kombinasi Tim Shark Maid\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Ryu Pratama",
    "author_slug": "ryu-mechanics",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "character build",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 8379,
    "faq": [
      {
        "question": "Berapa tumpukan Flash Freeze yang bisa disimpan?",
        "answer": "Ellen dapat menyimpan hingga 6 tumpukan Flash Freeze Charge."
      }
    ],
    "related_characters": [
      "ellen-joe"
    ],
    "featured_image": "https://images.unsplash.com/photo-1556157382-4e063bb26661?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-mekanik-parry-dodge-counter-wuthering-waves-no-damage",
    "game_id": "game-wuwa",
    "title": "Mekanik Parry & Dodge Counter Wuthering Waves: Rahasia No Damage Run",
    "slug": "mekanik-parry-dodge-counter-wuthering-waves-no-damage",
    "category": "TIPS",
    "thumbnail": "https://images.unsplash.com/photo-1511376777868-611b54f68947?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Waktu timing lingkaran kuning untuk menangkis bos hologram dan memanfaatkan invulnerability frame.",
    "content": "# Mekanik Parry & Dodge Counter Wuthering Waves: Rahasia No Damage Run\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Ryu Pratama",
    "author_slug": "ryu-mechanics",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "tips",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 10843,
    "faq": [
      {
        "question": "Apakah semua serangan bos bisa di-parry?",
        "answer": "Hanya serangan yang menampilkan lingkaran aura kuning (parry window) yang dapat ditangkis."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1511376777868-611b54f68947?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-build-jiyan-dragon-burst-echo-sierra-gale",
    "game_id": "game-wuwa",
    "title": "Build Jiyan Dragon Burst: Echo Set Sierra Gale & Rotasi Qingloong",
    "slug": "build-jiyan-dragon-burst-echo-sierra-gale",
    "category": "CHARACTER BUILD",
    "thumbnail": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Panduan memaksimalkan Aero DMG Jiyan, pemilihan Main Echo Feilian Beringal, dan rotasi Mortefi.",
    "content": "# Build Jiyan Dragon Burst: Echo Set Sierra Gale & Rotasi Qingloong\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Ryu Pratama",
    "author_slug": "ryu-mechanics",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "character build",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 23488,
    "faq": [
      {
        "question": "Mengapa Mortefi sangat cocok dipasangkan dengan Jiyan?",
        "answer": "Outro Skill Mortefi memberikan 38% Heavy Attack DMG Deepen yang langsung memperkuat burst Jiyan."
      }
    ],
    "related_characters": [
      "jiyan"
    ],
    "featured_image": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-panduan-total-assault-blue-archive-rank-platinum",
    "game_id": "game-ba",
    "title": "Panduan Total Assault Blue Archive: Strategi Menembus Rank Platinum",
    "slug": "panduan-total-assault-blue-archive-rank-platinum",
    "category": "BOSS",
    "thumbnail": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Taktik menghadapi boss raid Binah, Chesed, dan ShiroKuro dengan formasi tim armor matching.",
    "content": "# Panduan Total Assault Blue Archive: Strategi Menembus Rank Platinum\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Tim Editorial Seraphi",
    "author_slug": "seraphi-editorial",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "boss",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 7325,
    "faq": [
      {
        "question": "Apa keuntungan mencapai rank Platinum di Total Assault?",
        "answer": "Mendapatkan trophy eksklusif dan jumlah Pyroxene serta Advanced Coin maksimal."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-panduan-kelas-operator-arknights-vanguard-specialist",
    "game_id": "game-arknights",
    "title": "Panduan Kelas Operator Arknights: Memahami Fungsi Vanguard hingga Specialist",
    "slug": "panduan-kelas-operator-arknights-vanguard-specialist",
    "category": "BEGINNER",
    "thumbnail": "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Fungsi krusial DP generator Vanguard, physical blocker Defender, dan Crowd Control Specialist.",
    "content": "# Panduan Kelas Operator Arknights: Memahami Fungsi Vanguard hingga Specialist\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Tim Editorial Seraphi",
    "author_slug": "seraphi-editorial",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "beginner",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 13981,
    "faq": [
      {
        "question": "Kapan waktu yang tepat mendepoloy Medic?",
        "answer": "Segera setelah Vanguard atau Guard pertama mulai menerima damage stabil dari gelombang musuh."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-sistem-farming-3-turn-fgo-double-koyanskaya-oberon",
    "game_id": "game-fgo",
    "title": "Sistem Farming 3-Turn FGO: Setup Double Koyanskaya & Oberon",
    "slug": "sistem-farming-3-turn-fgo-double-koyanskaya-oberon",
    "category": "FARMING",
    "thumbnail": "https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Cara memanfaatkan 50% NP charge buffer untuk membersihkan wave musuh 3 putaran berturut-turut.",
    "content": "# Sistem Farming 3-Turn FGO: Setup Double Koyanskaya & Oberon\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Ryu Pratama",
    "author_slug": "ryu-mechanics",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "farming",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 17311,
    "faq": [
      {
        "question": "Apakah sistem Buster looping membutuhkan NP level tinggi?",
        "answer": "NP1 cukup untuk wave normal, namun NP2+ disarankan untuk event node 90++."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-pengaturan-sensitivitas-giroskop-pubg-mobile-no-recoil",
    "game_id": "game-pubgm",
    "title": "Pengaturan Sensitivitas Giroskop PUBG Mobile No Recoil Terbaik",
    "slug": "pengaturan-sensitivitas-giroskop-pubg-mobile-no-recoil",
    "category": "SETTINGS",
    "thumbnail": "https://images.unsplash.com/photo-1505298537670-f32d119be330?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Setting kode sensitivitas kamera dan ADS giroskop untuk M416 spray jarak 100 meter.",
    "content": "# Pengaturan Sensitivitas Giroskop PUBG Mobile No Recoil Terbaik\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Kaelen Arisandi",
    "author_slug": "kael-strats",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "settings",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 20988,
    "faq": [
      {
        "question": "Apakah giroskop wajib selalu aktif?",
        "answer": "Sangat disarankan aktif penuh (Always On) untuk micro-adjustment bidikan yang lebih cepat dibanding jempol."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1505298537670-f32d119be330?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-tips-gloo-wall-cepat-trik-duduk-pasang-free-fire",
    "game_id": "game-ff",
    "title": "Tips Gloo Wall Cepat & Trik Duduk Pasang Free Fire",
    "slug": "tips-gloo-wall-cepat-trik-duduk-pasang-free-fire",
    "category": "TIPS",
    "thumbnail": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Mekanisme pasang dinding es instan untuk menahan tembakan kejutan dan mengamankan open field.",
    "content": "# Tips Gloo Wall Cepat & Trik Duduk Pasang Free Fire\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Kaelen Arisandi",
    "author_slug": "kael-strats",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "tips",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 31265,
    "faq": [
      {
        "question": "Mengapa trik pasang gloo wall sambil jongkok lebih aman?",
        "answer": "Karena hitbox karakter mengecil seketika saat dinding terbentuk di depan."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-tips-gerakan-lanjutan-apex-legends-tap-strafe-wall-bounce",
    "game_id": "game-apex",
    "title": "Tips Gerakan Lanjutan Apex Legends: Tap Strafe & Wall Bounce",
    "slug": "tips-gerakan-lanjutan-apex-legends-tap-strafe-wall-bounce",
    "category": "TIPS",
    "thumbnail": "https://images.unsplash.com/photo-1453000109878-d4619d01587c?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Panduan menguasai momentum pergerakan cepat untuk mengelabui peluru musuh dalam pertempuran jarak dekat.",
    "content": "# Tips Gerakan Lanjutan Apex Legends: Tap Strafe & Wall Bounce\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Kaelen Arisandi",
    "author_slug": "kael-strats",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "tips",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 9492,
    "faq": [
      {
        "question": "Apakah tap strafing bisa dilakukan di controller?",
        "answer": "Secara alami mekanik ini hanya bisa dieksekusi di mouse dan keyboard via scroll wheel bind."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1453000109878-d4619d01587c?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-panduan-memahami-peran-posisi-1-hingga-5-dota-2",
    "game_id": "game-dota2",
    "title": "Panduan Memahami Peran Posisi 1 hingga 5 di Dota 2",
    "slug": "panduan-memahami-peran-posisi-1-hingga-5-dota-2",
    "category": "BEGINNER",
    "thumbnail": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Distribusi farm priority dari Hard Carry (Pos 1) hingga Hard Support warding (Pos 5).",
    "content": "# Panduan Memahami Peran Posisi 1 hingga 5 di Dota 2\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Kaelen Arisandi",
    "author_slug": "kael-strats",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "beginner",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 28519,
    "faq": [
      {
        "question": "Siapa yang bertanggung jawab membeli Observer Ward dan Sentry?",
        "answer": "Posisi 5 dan Posisi 4 membagi tugas penglihatan peta dan dewarding."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-panduan-manajemen-wave-minion-lol-freeze-push",
    "game_id": "game-lol",
    "title": "Panduan Manajemen Wave Minion League of Legends: Freeze, Slow Push, Fast Push",
    "slug": "panduan-manajemen-wave-minion-lol-freeze-push",
    "category": "TIPS",
    "thumbnail": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Kendalikan lane equilibrium untuk mematikan farm musuh dan menyiapkan dive tower bersama jungler.",
    "content": "# Panduan Manajemen Wave Minion League of Legends: Freeze, Slow Push, Fast Push\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Kaelen Arisandi",
    "author_slug": "kael-strats",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "tips",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 20068,
    "faq": [
      {
        "question": "Berapa sisa minion musuh yang dibutuhkan untuk menahan freeze wave?",
        "answer": "Pertahankan 3 hingga 4 minion caster musuh di luar jangkauan tembakan tower."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-panduan-pemula-blox-fruits-cara-cepat-naik-level-max",
    "game_id": "game-roblox",
    "title": "Panduan Pemula Blox Fruits: Cara Cepat Naik Level 1 hingga Max",
    "slug": "panduan-pemula-blox-fruits-cara-cepat-naik-level-max",
    "category": "FARMING",
    "thumbnail": "https://images.unsplash.com/photo-1753939223042-872934ffda15?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Rute pulau grinding di First Sea, Second Sea, hingga Third Sea, serta rekomendasi buah Logia.",
    "content": "# Panduan Pemula Blox Fruits: Cara Cepat Naik Level 1 hingga Max\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Lyra Valery",
    "author_slug": "lyra-lore",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "farming",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 8237,
    "faq": [
      {
        "question": "Buah apa yang terbaik untuk leveling di First Sea?",
        "answer": "Buah tipe Elemental (Logia) seperti Light atau Magma karena membuat kebal serangan NPC normal."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1753939223042-872934ffda15?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-panduan-redstone-dasar-komponen-sirkuit-pintu-otomatis",
    "game_id": "game-minecraft",
    "title": "Panduan Redstone Dasar: Komponen, Logika Sirkuit, dan Pintu Otomatis",
    "slug": "panduan-redstone-dasar-komponen-sirkuit-pintu-otomatis",
    "category": "BEGINNER",
    "thumbnail": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Belajar logika repeater, comparator, observer, dan membuat pintu piston otomatis 2x2.",
    "content": "# Panduan Redstone Dasar: Komponen, Logika Sirkuit, dan Pintu Otomatis\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Lyra Valery",
    "author_slug": "lyra-lore",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "beginner",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 12341,
    "faq": [
      {
        "question": "Berapa jarak maksimal sinyal redstone dust sebelum melemah?",
        "answer": "Sinyal redstone meredup setelah 15 blok dan membutuhkan Redstone Repeater untuk diperkuat."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-rute-farming-168-lumitoile-fontaine-neuvillette",
    "game_id": "game-genshin",
    "title": "Rute Farming 168 Lumitoile Fontaine untuk Ascension Neuvillette",
    "slug": "rute-farming-168-lumitoile-fontaine-neuvillette",
    "category": "FARMING",
    "thumbnail": "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Peta lokasi bintang laut Lumitoile di perairan Liffey dan area bawah air Fontaine.",
    "content": "# Rute Farming 168 Lumitoile Fontaine untuk Ascension Neuvillette\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Lyra Valery",
    "author_slug": "lyra-lore",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "farming",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 5720,
    "faq": [
      {
        "question": "Berapa lama waktu respawn material lokal Teyvat?",
        "answer": "Material lokal seperti Lumitoile akan muncul kembali 48 jam setelah diambil."
      }
    ],
    "related_characters": [
      "neuvillette"
    ],
    "featured_image": "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-panduan-apocalyptic-shadow-strategi-toughness-meter",
    "game_id": "game-hsr",
    "title": "Panduan Apocalyptic Shadow: Strategi Menguras Toughness Meter Bos",
    "slug": "panduan-apocalyptic-shadow-strategi-toughness-meter",
    "category": "BOSS",
    "thumbnail": "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Optimalisasi tim Weakness Break untuk melumpuhkan bos dan melipatgandakan vulnerability damage.",
    "content": "# Panduan Apocalyptic Shadow: Strategi Menguras Toughness Meter Bos\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Kaelen Arisandi",
    "author_slug": "kael-strats",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "boss",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 19133,
    "faq": [
      {
        "question": "Apa perbedaan utama Apocalyptic Shadow dibanding Memory of Chaos?",
        "answer": "Fokus pada kecepatan menguras Toughness Bar bos ketimbang sekadar total HP mentah."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-cara-mendapatkan-echo-bintang-5-gold-data-bank",
    "game_id": "game-wuwa",
    "title": "Cara Mendapatkan Echo Bintang 5 Gold Lebih Cepat di Data Bank",
    "slug": "cara-mendapatkan-echo-bintang-5-gold-data-bank",
    "category": "FARMING",
    "thumbnail": "https://images.unsplash.com/photo-1558459654-c430be5b0a44?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Trik menaikkan level Data Bank ke Level 20 agar drop rate Echo bintang 5 mencapai 80-100%.",
    "content": "# Cara Mendapatkan Echo Bintang 5 Gold Lebih Cepat di Data Bank\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Ryu Pratama",
    "author_slug": "ryu-mechanics",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "farming",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 12277,
    "faq": [
      {
        "question": "Bagaimana cara tercepat menaikkan Data Bank Level?",
        "answer": "Kalahkan dan tangkap setiap spesies monster baru di rarity tertinggi mereka untuk XP pertama kali."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1558459654-c430be5b0a44?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-rekomendasi-tim-f2p-terbaik-zenless-zone-zero-chapter-awal",
    "game_id": "game-zzz",
    "title": "Rekomendasi Tim Free-to-Play Terbaik Zenless Zone Zero Chapter Awal",
    "slug": "rekomendasi-tim-f2p-terbaik-zenless-zone-zero-chapter-awal",
    "category": "BEGINNER",
    "thumbnail": "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Sinergi starter Anby, Nicole, dan Billy yang dapat menyelesaikan seluruh story mode tanpa gacha S-Rank.",
    "content": "# Rekomendasi Tim Free-to-Play Terbaik Zenless Zone Zero Chapter Awal\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Tim Editorial Seraphi",
    "author_slug": "seraphi-editorial",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "beginner",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 20132,
    "faq": [
      {
        "question": "Apakah Billy Kid layak diinvestasikan hingga mid-game?",
        "answer": "Sangat layak, terutama dengan crouching stance yang melipatgandakan critical output tembakannya."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-daftar-item-defense-mobile-legends-kapan-membeli",
    "game_id": "game-mlbb",
    "title": "Daftar Item Defense Mobile Legends dan Kapan Harus Membelinya",
    "slug": "daftar-item-defense-mobile-legends-kapan-membeli",
    "category": "ITEM",
    "thumbnail": "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Bedah fungsi Radiant Armor vs Athena Shield, Dominance Ice vs Antique Cuirass untuk counter hero meta.",
    "content": "# Daftar Item Defense Mobile Legends dan Kapan Harus Membelinya\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Kaelen Arisandi",
    "author_slug": "kael-strats",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "item",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 28202,
    "faq": [
      {
        "question": "Kapan harus memilih Radiant Armor dibanding Athena Shield?",
        "answer": "Gunakan Radiant Armor melawan magic damage bertubi-tubi (DPS seperti Chang’e atau Valir)."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-panduan-komunikasi-tim-callout-efektif-valorant",
    "game_id": "game-valorant",
    "title": "Panduan Mengatur Komunikasi Tim & Callout Efektif Valorant",
    "slug": "panduan-komunikasi-tim-callout-efektif-valorant",
    "category": "TIPS",
    "thumbnail": "https://images.unsplash.com/photo-1533895328642-8035bacd565a?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Cara memberikan info singkat, nama lokasi standar, dan menghindari radio silent saat fase retake site.",
    "content": "# Panduan Mengatur Komunikasi Tim & Callout Efektif Valorant\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Kaelen Arisandi",
    "author_slug": "kael-strats",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "tips",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 22842,
    "faq": [
      {
        "question": "Apa saja 3 poin info wajib saat tereliminasi?",
        "answer": "Nama agen musuh, perkiraan sisa HP musuh, dan lokasi terakhir atau arah langkah kakinya."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1533895328642-8035bacd565a?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-cara-mengalahkan-ender-dragon-pertama-kali-pemula",
    "game_id": "game-minecraft",
    "title": "Cara Mengalahkan Ender Dragon Pertama Kali untuk Pemula",
    "slug": "cara-mengalahkan-ender-dragon-pertama-kali-pemula",
    "category": "BOSS",
    "thumbnail": "https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Persiapan perlengkapan, trik menghancurkan End Crystal menggunakan panah atau snowballs, dan taktik ranjang ledak.",
    "content": "# Cara Mengalahkan Ender Dragon Pertama Kali untuk Pemula\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Lyra Valery",
    "author_slug": "lyra-lore",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "boss",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 17872,
    "faq": [
      {
        "question": "Mengapa kasur (bed) bisa meledak di dimensi The End?",
        "answer": "Karena kasur tidak diizinkan untuk tidur di Nether dan End, memicu ledakan berdaya hancur tinggi setara TNT."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-tips-memilih-buah-iblis-bounty-hunting-blox-fruits",
    "game_id": "game-roblox",
    "title": "Tips Memilih Buah Iblis Terbaik untuk Bounty Hunting di Blox Fruits",
    "slug": "tips-memilih-buah-iblis-bounty-hunting-blox-fruits",
    "category": "TIPS",
    "thumbnail": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Kombinasi buah Portal, Dough, dan Leopard untuk duel PvP kompetitif satu lawan satu.",
    "content": "# Tips Memilih Buah Iblis Terbaik untuk Bounty Hunting di Blox Fruits\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Lyra Valery",
    "author_slug": "lyra-lore",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "tips",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 3552,
    "faq": [
      {
        "question": "Mengapa buah Portal sangat populer untuk PvP?",
        "answer": "Skill World Warp dan Dimensional Rift memungkinkan pergerakan instan dan kombo trap yang sulit ditebak."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-panduan-senjata-terbaik-playstyle-apex-legends",
    "game_id": "game-apex",
    "title": "Panduan Memilih Senjata Terbaik Sesuai Playstyle di Apex Legends",
    "slug": "panduan-senjata-terbaik-playstyle-apex-legends",
    "category": "WEAPON",
    "thumbnail": "https://images.unsplash.com/photo-1556762226-f59720fd8b49?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Perbandingan R-301, Flatline, Nemesis, dan Mastiff untuk baku tembak jarak dekat hingga menengah.",
    "content": "# Panduan Memilih Senjata Terbaik Sesuai Playstyle di Apex Legends\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Kaelen Arisandi",
    "author_slug": "kael-strats",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "weapon",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 9200,
    "faq": [
      {
        "question": "Apakah R-301 Carbine masih ramah untuk pemula?",
        "answer": "Ya, pola recoil R-301 adalah salah satu yang paling mudah dikontrol di Apex Legends."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1556762226-f59720fd8b49?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-panduan-efisiensi-resin-teyvat-prioritas-farming",
    "game_id": "game-genshin",
    "title": "Panduan Efisiensi Resin Teyvat: Prioritas Karakter, Senjata & Artefak",
    "slug": "panduan-efisiensi-resin-teyvat-prioritas-farming",
    "category": "FARMING",
    "thumbnail": "https://images.unsplash.com/photo-1571442463800-1337d7af9d2f?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Cara mengalokasikan 160 resin harian agar akun cepat kuat tanpa membuang resource percuma.",
    "content": "# Panduan Efisiensi Resin Teyvat: Prioritas Karakter, Senjata & Artefak\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Ryu Pratama",
    "author_slug": "ryu-mechanics",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "farming",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 10914,
    "faq": [
      {
        "question": "Kapan sebaiknya mulai menggunakan Fragile Resin?",
        "answer": "Simpan seluruh Fragile Resin hingga mencapai Adventure Rank 45 saat domain artefak menjamin drop emas bintang 5."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1571442463800-1337d7af9d2f?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-panduan-relic-farming-honkai-star-rail-stat-optimal",
    "game_id": "game-hsr",
    "title": "Panduan Relic Farming Honkai Star Rail: Stat Utama vs Sub-Stat",
    "slug": "panduan-relic-farming-honkai-star-rail-stat-optimal",
    "category": "FARMING",
    "thumbnail": "https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Kriteria menyimpan relic berharga dan kapan harus menghancurkan relic sampah menjadi material sintetis.",
    "content": "# Panduan Relic Farming Honkai Star Rail: Stat Utama vs Sub-Stat\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Ryu Pratama",
    "author_slug": "ryu-mechanics",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "farming",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 7881,
    "faq": [
      {
        "question": "Apakah SPD stat selalu lebih penting dibanding ATK% di Star Rail?",
        "answer": "Ya, mencapai SPD breakpoint tertentu (134, 143, 160) memberi giliran tambahan krusial di Memory of Chaos."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-daftar-siswi-bintang-2-1-blue-archive-wajib-dinaikkan",
    "game_id": "game-ba",
    "title": "Daftar Siswi Bintang 2 dan 1 Blue Archive yang Wajib Dinaikkan (Meta Low Rarity)",
    "slug": "daftar-siswi-bintang-2-1-blue-archive-wajib-dinaikkan",
    "category": "CHARACTER BUILD",
    "thumbnail": "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Karakter murah seperti Serina, Tsubaki, Mutsuki, dan Kotama yang tetap menjadi andalan level akhir.",
    "content": "# Daftar Siswi Bintang 2 dan 1 Blue Archive yang Wajib Dinaikkan (Meta Low Rarity)\n\n## Pengantar & Ikhtisar\nPanduan komprehensif ini dirancang oleh analis Seraphi Game untuk memaksimalkan efisiensi bermain, kalkulasi damage, dan efektivitas strategi di level tertinggi.\n\n## Ringkasan Singkat\n- **Fokus Utama**: Optimalisasi rotasi dan sinergi tim.\n- **Tingkat Kesulitan**: Ramah pemula hingga lanjutan.\n- **Investasi Resource**: Prioritaskan leveling skill utama sebelum farming artefak akhir.\n\n## Panduan Mekanik & Langkah Utama\n1. **Pahami Prioritas Skill**: Maksimalkan skill burst dan amplifier damage sebelum basic attack jika karakter berorientasi off-field.\n2. **Kalkulasi Energy Recharge**: Pastikan burst dapat aktif setiap rotasi tanpa jeda waktu tunggu (downtime).\n3. **Posisikan Karakter**: Perhatikan penempatan agar efek buff area menjangkau seluruh anggota tim.\n\n## Tips & Trik Pro\n- Gunakan cancel animation untuk menghemat stamina dan mempercepat rotasi kombo.\n- Simpan ultimate untuk gelombang musuh kedua jika gelombang pertama sudah dapat dihabisi dengan skill biasa.\n\n## FAQ\nPertanyaan yang sering diajukan seputar panduan ini dapat dilihat pada bagian tanya jawab di bawah.",
    "author": "Tim Editorial Seraphi",
    "author_slug": "seraphi-editorial",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-05T14:30:00.000Z",
    "tags": [
      "character build",
      "guide",
      "tips",
      "meta"
    ],
    "status": "PUBLISHED",
    "views": 12088,
    "faq": [
      {
        "question": "Mengapa Tsubaki dianggap shielder/tank terbaik meski berstatus bintang 2?",
        "answer": "Skill taunt area dan regenerasi HP otomatis saat sekarat menjadikannya tank terkokoh di raid dan PvP."
      }
    ],
    "related_characters": [],
    "featured_image": "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&auto=format&fit=crop&q=80"
  }
];

export const EXPANSION_NEWS: News[] = [
  {
    "id": "news-zzz-1-5",
    "game_id": "game-zzz",
    "title": "Zenless Zone Zero Umumkan Update Versi Terbaru: Karakter S-Rank & Wilayah Baru",
    "slug": "zenless-zone-zero-update-versi-terbaru-karakter-s-rank",
    "category": "Update",
    "thumbnail": "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&auto=format&fit=crop&q=80",
    "excerpt": "HoYoverse resmi mengumumkan ekspansi cerita Hollow terbaru bersama karakter S-Rank berelemen Anomaly di New Eridu.",
    "content": "HoYoverse mengumumkan pembaruan besar untuk Zenless Zone Zero yang membawa berbagai konten segar bagi para Proxy. Pembaruan ini memperkenalkan babak cerita baru yang berlatar di distrik luar New Eridu.\n\nSelain itu, dua karakter S-Rank baru dipastikan hadir dalam banner terbatas fase pertama dan kedua, lengkap dengan W-Engine signature mereka. Berbagai peningkatan kualitas hidup (QoL) seperti skip dialog dan fitur farming TV yang lebih cepat juga turut dihadirkan.",
    "author": "Tim Editorial Seraphi",
    "author_slug": "seraphi-editorial",
    "published_at": "2026-03-01T08:00:00.000Z",
    "updated_at": "2026-03-01T08:00:00.000Z",
    "tags": [
      "Update",
      "Zenless Zone Zero",
      "HoYoverse"
    ],
    "status": "PUBLISHED",
    "views": 18200,
    "featured_image": "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-wuwa-banner",
    "game_id": "game-wuwa",
    "title": "Wuthering Waves Rilis Teaser Resonator Baru Beratribut Glacio",
    "slug": "wuthering-waves-rilis-teaser-resonator-baru-glacio",
    "category": "Pengumuman",
    "thumbnail": "https://images.unsplash.com/photo-1580983561371-7f4b242d8ec0?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Kuro Games memamerkan cuplikan animasi bertempo tinggi dari Resonator misterius yang akan bergabung ke jajaran karakter Huanglong.",
    "content": "Kuro Games kembali mengejutkan komunitas dengan meluncurkan video teaser karakter baru yang memamerkan animasi pertarungan spektakuler. Karakter ini dikabarkan memiliki gaya bermain dual-wielding dengan kemampuan pembekuan area.",
    "author": "Lyra Valery",
    "author_slug": "lyra-lore",
    "published_at": "2026-03-02T11:00:00.000Z",
    "updated_at": "2026-03-02T11:00:00.000Z",
    "tags": [
      "Karakter Baru",
      "Wuthering Waves",
      "Kuro Games"
    ],
    "status": "PUBLISHED",
    "views": 14500,
    "featured_image": "https://images.unsplash.com/photo-1580983561371-7f4b242d8ec0?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-genshin-natlan-event",
    "game_id": "game-genshin",
    "title": "Genshin Impact Buka Event Festival Perang Natlan Berhadiah Senjata Bintang 4 Gratis",
    "slug": "genshin-impact-event-festival-perang-natlan-senjata-gratis",
    "category": "Event",
    "thumbnail": "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Traveler berkesempatan membawa pulang 1000 Primogem, Crown of Insight, dan senjata polearm eksklusif event.",
    "content": "Festival tahunan bangsa Pyro di Natlan telah resmi dimulai. Pemain yang telah menyelesaikan Archon Quest dapat berpartisipasi dalam rangkaian tantangan balap Saurian dan pertempuran arena.",
    "author": "Lyra Valery",
    "author_slug": "lyra-lore",
    "published_at": "2026-03-03T09:30:00.000Z",
    "updated_at": "2026-03-03T09:30:00.000Z",
    "tags": [
      "Event",
      "Genshin Impact",
      "Primogem"
    ],
    "status": "PUBLISHED",
    "views": 22400,
    "featured_image": "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-hsr-collab",
    "game_id": "game-hsr",
    "title": "Honkai: Star Rail Bocorkan Info Kolaborasi Global Terbesar Tahun Ini",
    "slug": "honkai-star-rail-bocoran-kolaborasi-global-terbesar",
    "category": "Kolaborasi",
    "thumbnail": "https://images.unsplash.com/photo-1515606378517-3451a4fa2e12?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Kolaborasi lintas waralaba populer dipastikan membawa event cerita khusus dan skin eksklusif para kru Astral Express.",
    "content": "Melalui siaran langsung khusus pengembang, HoYoverse mengonfirmasi kolaborasi global yang telah lama dinantikan para penggemar. Event ini akan berjalan selama satu siklus patch penuh.",
    "author": "Tim Editorial Seraphi",
    "author_slug": "seraphi-editorial",
    "published_at": "2026-03-04T13:15:00.000Z",
    "updated_at": "2026-03-04T13:15:00.000Z",
    "tags": [
      "Kolaborasi",
      "Honkai Star Rail"
    ],
    "status": "PUBLISHED",
    "views": 26800,
    "featured_image": "https://images.unsplash.com/photo-1515606378517-3451a4fa2e12?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-mlbb-m-series",
    "game_id": "game-mlbb",
    "title": "Jadwal Lengkap Turnamen Dunia MLBB M-Series: Tim Indonesia Siap Berlaga",
    "slug": "jadwal-lengkap-turnamen-dunia-mlbb-m-series-indonesia",
    "category": "Esports",
    "thumbnail": "https://images.unsplash.com/photo-1573322420067-20b6228d9158?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Dua perwakilan Indonesia siap berjuang memperebutkan gelar juara dunia Mobile Legends di hadapan ribuan pendukung.",
    "content": "Panggung kompetitif tertinggi Mobile Legends kembali bergulir. Enam belas tim terbaik dari seluruh penjuru dunia akan bertanding memperebutkan total hadiah miliaran rupiah.",
    "author": "Kaelen Arisandi",
    "author_slug": "kael-strats",
    "published_at": "2026-03-05T07:45:00.000Z",
    "updated_at": "2026-03-05T07:45:00.000Z",
    "tags": [
      "Esports",
      "Mobile Legends",
      "Turnamen"
    ],
    "status": "PUBLISHED",
    "views": 31000,
    "featured_image": "https://images.unsplash.com/photo-1573322420067-20b6228d9158?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-val-vct",
    "game_id": "game-valorant",
    "title": "VCT Masters Musim Ini Umumkan Format Pertandingan Baru & Rotasi Map",
    "slug": "vct-masters-format-baru-dan-rotasi-map",
    "category": "Esports",
    "thumbnail": "https://images.unsplash.com/photo-1519162952575-c6c7199502a3?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Riot Games memperkenalkan sistem Swiss stage yang lebih adil dan mengembalikan map klasik ke map pool turnamen resmi.",
    "content": "Riot Games resmi mengumumkan penyesuaian regulasi turnamen internasional Valorant Champions Tour. Perubahan ini disambut antusias oleh para atlet pro dan komunitas penonton.",
    "author": "Kaelen Arisandi",
    "author_slug": "kael-strats",
    "published_at": "2026-03-05T15:20:00.000Z",
    "updated_at": "2026-03-05T15:20:00.000Z",
    "tags": [
      "Esports",
      "Valorant",
      "VCT"
    ],
    "status": "PUBLISHED",
    "views": 19400,
    "featured_image": "https://images.unsplash.com/photo-1519162952575-c6c7199502a3?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-ba-fes",
    "game_id": "game-ba",
    "title": "Blue Archive Gelar Ulang Tahun Spesial: Hadiah 100 Tiket Rekrutmen Gratis untuk Semua Pemain",
    "slug": "blue-archive-ulang-tahun-100-tiket-gacha-gratis",
    "category": "Event",
    "thumbnail": "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Nexon membagikan login bonus masif dan melipatgandakan drop rate murid bintang 3 selama periode perayaan festival.",
    "content": "Kivotos bersuka cita dalam perayaan ulang tahun Blue Archive. Seluruh Sensei yang login selama masa perayaan akan mendapatkan 10 tarikan gacha gratis setiap hari hingga total 100 tarikan.",
    "author": "Tim Editorial Seraphi",
    "author_slug": "seraphi-editorial",
    "published_at": "2026-03-06T06:00:00.000Z",
    "updated_at": "2026-03-06T06:00:00.000Z",
    "tags": [
      "Gacha",
      "Blue Archive",
      "Event"
    ],
    "status": "PUBLISHED",
    "views": 24100,
    "featured_image": "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-arknights-anime",
    "game_id": "game-arknights",
    "title": "Musim Lanjutan Anime Arknights Dikonfirmasi Masuk Tahap Produksi",
    "slug": "anime-arknights-musim-lanjutan-tahap-produksi",
    "category": "Media",
    "thumbnail": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Yostar Pictures kembali memegang kendali animasi untuk adaptasi babak cerita epik pertempuran Victoria.",
    "content": "Kabar gembira bagi para Dokter dan penggemar serial animasi Arknights. Musim baru yang akan mengadaptasi saga konflik Victoria resmi dikonfirmasi tengah dikerjakan oleh studio Yostar Pictures.",
    "author": "Lyra Valery",
    "author_slug": "lyra-lore",
    "published_at": "2026-03-06T12:00:00.000Z",
    "updated_at": "2026-03-06T12:00:00.000Z",
    "tags": [
      "Anime",
      "Arknights",
      "Yostar"
    ],
    "status": "PUBLISHED",
    "views": 16800,
    "featured_image": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-fgo-anniversary",
    "game_id": "game-fgo",
    "title": "Fate/Grand Order Rayakan Pencapaian Unduhan Global dengan Servant Bintang 5 Gratis",
    "slug": "fate-grand-order-pencapaian-unduhan-servant-gratis",
    "category": "Event",
    "thumbnail": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Master Chaldea dapat memilih satu Servant bintang 5 permanen secara cuma-cuma melalui tiket penukaran spesial.",
    "content": "Merayakan rekor unduhan global terbaru, Aniplex membagikan tiket Servant SSR gratis yang dapat langsung ditukarkan dengan puluhan Servant legendaris di shop Chaldea.",
    "author": "Ryu Pratama",
    "author_slug": "ryu-mechanics",
    "published_at": "2026-03-07T09:00:00.000Z",
    "updated_at": "2026-03-07T09:00:00.000Z",
    "tags": [
      "FGO",
      "Event",
      "Gacha"
    ],
    "status": "PUBLISHED",
    "views": 21500,
    "featured_image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-pubg-pmgc",
    "game_id": "game-pubgm",
    "title": "PUBG Mobile Global Championship Umumkan Tuan Rumah Grand Finals",
    "slug": "pubg-mobile-pmgc-tuan-rumah-grand-finals",
    "category": "Esports",
    "thumbnail": "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Jakarta kembali terpilih menjadi salah satu destinasi arena panggung pertarungan skuad Battle Royale terbaik dunia.",
    "content": "Level Infinite mengonfirmasi bahwa kota Jakarta akan menjadi salah satu tuan rumah babak final turnamen dunia PMGC tahun ini, mengundang antusiasme luar biasa dari para penggemar lokal.",
    "author": "Kaelen Arisandi",
    "author_slug": "kael-strats",
    "published_at": "2026-03-07T14:30:00.000Z",
    "updated_at": "2026-03-07T14:30:00.000Z",
    "tags": [
      "Esports",
      "PUBG Mobile",
      "PMGC"
    ],
    "status": "PUBLISHED",
    "views": 28900,
    "featured_image": "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-ff-collab-anime",
    "game_id": "game-ff",
    "title": "Free Fire Gandeng Serial Shonen Terkenal untuk Event Kolaborasi Mendatang",
    "slug": "free-fire-kolaborasi-anime-shonen-terkenal",
    "category": "Kolaborasi",
    "thumbnail": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Bundle kostum bertema ninja dan skin gloo wall animasi siap mendarat di Bermuda bulan depan.",
    "content": "Garena meresmikan kemitraan terbaru dengan studio anime Jepang ternama. Pemain Free Fire dapat menantikan mode pertempuran tematik khusus dan emote gerakan khas anime.",
    "author": "Tim Editorial Seraphi",
    "author_slug": "seraphi-editorial",
    "published_at": "2026-03-08T08:00:00.000Z",
    "updated_at": "2026-03-08T08:00:00.000Z",
    "tags": [
      "Free Fire",
      "Kolaborasi",
      "Garena"
    ],
    "status": "PUBLISHED",
    "views": 33200,
    "featured_image": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-apex-season-new",
    "game_id": "game-apex",
    "title": "Apex Legends Ungkap Musim Baru: Rework Legend & Perubahan Map Storm Point",
    "slug": "apex-legends-musim-baru-rework-legend-storm-point",
    "category": "Update",
    "thumbnail": "https://images.unsplash.com/photo-1526566661780-1a67ea3c863e?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Respawn Entertainment membagikan patch notes mendalam yang merombak meta skirmisher dan menambah POI baru.",
    "content": "Musim baru Apex Legends berfokus pada keseimbangan kompetitif. Respawn menyelaraskan kemampuan pasif para legend dan memperbaiki alur rotasi di map kepulauan Storm Point.",
    "author": "Ryu Pratama",
    "author_slug": "ryu-mechanics",
    "published_at": "2026-03-08T11:45:00.000Z",
    "updated_at": "2026-03-08T11:45:00.000Z",
    "tags": [
      "Apex Legends",
      "Patch Notes",
      "Update"
    ],
    "status": "PUBLISHED",
    "views": 17400,
    "featured_image": "https://images.unsplash.com/photo-1526566661780-1a67ea3c863e?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-dota-patch",
    "game_id": "game-dota2",
    "title": "Valve Luncurkan Patch Keseimbangan Dota 2: Hero Meta Melemah",
    "slug": "valve-luncurkan-patch-keseimbangan-dota-2",
    "category": "Update",
    "thumbnail": "https://images.unsplash.com/photo-1511994714008-b6d68a8b32a2?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Patch numerik baru menyeimbangkan facet hero yang terlalu dominan dan menyesuaikan harga item early game.",
    "content": "Valve merilis pembaruan keseimbangan darurat untuk Dota 2 menjelang kualifikasi turnamen major. Sejumlah facet hero yang memiliki win rate di atas 56% mendapatkan penyesuaian stat.",
    "author": "Kaelen Arisandi",
    "author_slug": "kael-strats",
    "published_at": "2026-03-08T16:10:00.000Z",
    "updated_at": "2026-03-08T16:10:00.000Z",
    "tags": [
      "Dota 2",
      "Patch",
      "Valve"
    ],
    "status": "PUBLISHED",
    "views": 20100,
    "featured_image": "https://images.unsplash.com/photo-1511994714008-b6d68a8b32a2?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-lol-msi",
    "game_id": "game-lol",
    "title": "Riot Games Rilis Format Baru Turnamen Mid-Season Invitational League of Legends",
    "slug": "riot-games-format-baru-msi-league-of-legends",
    "category": "Esports",
    "thumbnail": "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Juara MSI tahun ini dipastikan mengamankan tiket langsung menuju kejuaraan bergengsi Worlds akhir tahun.",
    "content": "Panggung kompetisi internasional League of Legends kini memiliki taruhan yang jauh lebih besar. Pemenang turnamen MSI tidak hanya membawa pulang trofi tetapi juga slot kualifikasi otomatis Worlds.",
    "author": "Kaelen Arisandi",
    "author_slug": "kael-strats",
    "published_at": "2026-03-09T07:20:00.000Z",
    "updated_at": "2026-03-09T07:20:00.000Z",
    "tags": [
      "League of Legends",
      "Esports",
      "Riot Games"
    ],
    "status": "PUBLISHED",
    "views": 18900,
    "featured_image": "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-roblox-update",
    "game_id": "game-roblox",
    "title": "Roblox Tingkatkan Engine Grafis & Batas Kapasitas Server Komunitas",
    "slug": "roblox-tingkatkan-engine-grafis-kapasitas-server",
    "category": "Update",
    "thumbnail": "https://images.unsplash.com/photo-1557683311-eac922347aa1?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Pengembang game Roblox kini dapat memanfaatkan sistem pencahayaan dinamis baru dan server hingga 500 pemain.",
    "content": "Roblox Developer Conference memperkenalkan lompatan teknologi engine masa depan. Kreator game kini memiliki keleluasaan merancang lingkungan yang jauh lebih realistis dan imersif.",
    "author": "Tim Editorial Seraphi",
    "author_slug": "seraphi-editorial",
    "published_at": "2026-03-09T10:50:00.000Z",
    "updated_at": "2026-03-09T10:50:00.000Z",
    "tags": [
      "Roblox",
      "Update",
      "Developer"
    ],
    "status": "PUBLISHED",
    "views": 29800,
    "featured_image": "https://images.unsplash.com/photo-1557683311-eac922347aa1?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-mc-drop",
    "game_id": "game-minecraft",
    "title": "Mojang Umumkan Bundel Fitur Baru Minecraft: Mobs dan Blok Bioma Eksotis",
    "slug": "mojang-umumkan-fitur-baru-minecraft-bioma-eksotis",
    "category": "Update",
    "thumbnail": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Uji coba snapshot terbaru menghadirkan mekanik crafting baru serta mob pendamping setia bagi penjelajah gua.",
    "content": "Mojang Studios merilis preview snapshot untuk pembaruan Minecraft mendatang. Komunitas kini dapat menguji coba langsung varian blok dekorasi baru serta interaksi mob unik.",
    "author": "Lyra Valery",
    "author_slug": "lyra-lore",
    "published_at": "2026-03-09T14:00:00.000Z",
    "updated_at": "2026-03-09T14:00:00.000Z",
    "tags": [
      "Minecraft",
      "Mojang",
      "Snapshot"
    ],
    "status": "PUBLISHED",
    "views": 35100,
    "featured_image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-gaming-industry",
    "game_id": null,
    "title": "Pertumbuhan Industri Gaming Indonesia 2026: Mobile Masih Jadi Rajanya",
    "slug": "pertumbuhan-industri-gaming-indonesia-2026-mobile-dominan",
    "category": "Industri",
    "thumbnail": "https://images.unsplash.com/photo-1478860409698-8707f313ee8b?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Laporan tahunan menunjukkan penetrasi game mobile di tanah air tumbuh 18% didorong perkembangan ekosistem esports lokal.",
    "content": "Riset pasar video game Asia Tenggara menempatkan Indonesia sebagai pasar dengan pertumbuhan pengguna aktif tercepat. Game bergenre MOBA, Battle Royale, dan Gacha RPG menjadi pendorong utama.",
    "author": "Tim Editorial Seraphi",
    "author_slug": "seraphi-editorial",
    "published_at": "2026-03-10T08:30:00.000Z",
    "updated_at": "2026-03-10T08:30:00.000Z",
    "tags": [
      "Industri Game",
      "Indonesia",
      "Esports"
    ],
    "status": "PUBLISHED",
    "views": 42000,
    "featured_image": "https://images.unsplash.com/photo-1478860409698-8707f313ee8b?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-steam-sale",
    "game_id": null,
    "title": "Steam Spring Sale 2026 Resmi Dimulai: Diskon Game AAA hingga 80%",
    "slug": "steam-spring-sale-2026-diskon-game-aaa-80-persen",
    "category": "Diskon",
    "thumbnail": "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Ribuan judul game PC mendapatkan potongan harga terbesar awal tahun, termasuk RPG populer dan game multiplayer.",
    "content": "Platform distribusi game digital Steam membuka pesta diskon musim semi tahunan. Berbagai game favorit komunitas kini dapat dibeli dengan harga sangat terjangkau.",
    "author": "Tim Editorial Seraphi",
    "author_slug": "seraphi-editorial",
    "published_at": "2026-03-10T11:00:00.000Z",
    "updated_at": "2026-03-10T11:00:00.000Z",
    "tags": [
      "Steam",
      "Diskon",
      "PC Gaming"
    ],
    "status": "PUBLISHED",
    "views": 38700,
    "featured_image": "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-esports-sea",
    "game_id": null,
    "title": "Indonesia Borong Medali Emas Cabang Esports di Pesta Olahraga Asia Tenggara",
    "slug": "indonesia-borong-medali-emas-cabang-esports-asia-tenggara",
    "category": "Esports",
    "thumbnail": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Timnas esports Indonesia berhasil membawa pulang medali emas dari nomor pertandingan game mobile dan konsol.",
    "content": "Kontingen atlet esports Indonesia menorehkan prestasi gemilang dengan menjuarai podium tertinggi di nomor pertandingan beregu, membuktikan dominasi kualitas atlet tanah air di level regional.",
    "author": "Kaelen Arisandi",
    "author_slug": "kael-strats",
    "published_at": "2026-03-10T16:00:00.000Z",
    "updated_at": "2026-03-10T16:00:00.000Z",
    "tags": [
      "Esports",
      "Indonesia",
      "Prestasi"
    ],
    "status": "PUBLISHED",
    "views": 45600,
    "featured_image": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-ai-gaming",
    "game_id": null,
    "title": "Bagaimana Perkembangan AI Mengubah Desain NPC di Game Modern",
    "slug": "bagaimana-perkembangan-ai-mengubah-desain-npc-game-modern",
    "category": "Teknologi",
    "thumbnail": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Teknologi kecerdasan buatan generatif membuka interaksi dialog tanpa batas dan perilaku karakter non-pemain yang adaptif.",
    "content": "Para pengembang game terkemuka mulai mengintegrasikan modul kecerdasan buatan ke dalam sistem NPC untuk menghasilkan respon yang dinamis sesuai kepribadian karakter dan tindakan pemain di dalam game.",
    "author": "Ryu Pratama",
    "author_slug": "ryu-mechanics",
    "published_at": "2026-03-10T18:00:00.000Z",
    "updated_at": "2026-03-10T18:00:00.000Z",
    "tags": [
      "Teknologi",
      "AI",
      "Game Development"
    ],
    "status": "PUBLISHED",
    "views": 27300,
    "featured_image": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=80"
  }
];

export const EXPANSION_REDEEM_CODES: RedeemCode[] = [
  {
    "id": "code-zzz-1",
    "game_id": "game-zzz",
    "code": "ZZZFREEPOLYC",
    "reward": "300 Polychrome, 20.000 Dennies, 2 Senior Investigator Log",
    "status": "ACTIVE",
    "expired_at": "2026-12-31T23:59:59.000Z",
    "source": "Official Livestream Broadcast",
    "last_checked": "2026-03-08T10:00:00.000Z",
    "verified_at": "2026-03-08T10:00:00.000Z",
    "verification_provider": "manual",
    "is_demo": false,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-08T10:00:00.000Z"
  },
  {
    "id": "code-zzz-2",
    "game_id": "game-zzz",
    "code": "ZENLESSLAUNCH2026",
    "reward": "100 Polychrome, 5 Boopon",
    "status": "ACTIVE",
    "expired_at": "2026-11-30T23:59:59.000Z",
    "source": "Official Social Media X",
    "last_checked": "2026-03-07T12:00:00.000Z",
    "verified_at": "2026-03-07T12:00:00.000Z",
    "verification_provider": "manual",
    "is_demo": false,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-07T12:00:00.000Z"
  },
  {
    "id": "code-zzz-old",
    "game_id": "game-zzz",
    "code": "ZZZEXPIREDBETA",
    "reward": "50 Polychrome",
    "status": "EXPIRED",
    "expired_at": "2025-12-31T23:59:59.000Z",
    "source": "Closed Beta Milestone",
    "last_checked": "2026-03-01T00:00:00.000Z",
    "verified_at": "2026-03-01T00:00:00.000Z",
    "verification_provider": "official",
    "is_demo": false,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "code-wuwa-2",
    "game_id": "game-wuwa",
    "code": "KUROSPECIAL2026",
    "reward": "100 Astrite, 1 Forgery Premium Supply",
    "status": "ACTIVE",
    "expired_at": "2026-10-31T23:59:59.000Z",
    "source": "Official Developer Stream",
    "last_checked": "2026-03-06T15:00:00.000Z",
    "verified_at": "2026-03-06T15:00:00.000Z",
    "verification_provider": "manual",
    "is_demo": false,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-06T15:00:00.000Z"
  },
  {
    "id": "code-ba-1",
    "game_id": "game-ba",
    "code": "BLUEARCHIVEFES26",
    "reward": "1200 Pyroxene, 1.000.000 Credit Points",
    "status": "ACTIVE",
    "expired_at": "2026-08-31T23:59:59.000Z",
    "source": "Official Nexon Livestream",
    "last_checked": "2026-03-07T09:00:00.000Z",
    "verified_at": "2026-03-07T09:00:00.000Z",
    "verification_provider": "manual",
    "is_demo": false,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-07T09:00:00.000Z"
  },
  {
    "id": "code-ark-1",
    "game_id": "game-arknights",
    "code": "RHODESGIFT2026",
    "reward": "200 Orundum, 30.000 LMD, 5 Strategic Battle Records",
    "status": "ACTIVE",
    "expired_at": "2026-12-31T23:59:59.000Z",
    "source": "Official Yostar Web Event",
    "last_checked": "2026-03-08T11:00:00.000Z",
    "verified_at": "2026-03-08T11:00:00.000Z",
    "verification_provider": "community",
    "is_demo": false,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-08T11:00:00.000Z"
  },
  {
    "id": "code-pubg-1",
    "game_id": "game-pubgm",
    "code": "PUBGMCHAMP2026",
    "reward": "1 Classic Crate Coupon, 200 Silver Fragments",
    "status": "ACTIVE",
    "expired_at": "2026-09-30T23:59:59.000Z",
    "source": "PMGC Esports Broadcast",
    "last_checked": "2026-03-05T17:00:00.000Z",
    "verified_at": "2026-03-05T17:00:00.000Z",
    "verification_provider": "official",
    "is_demo": false,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-05T17:00:00.000Z"
  },
  {
    "id": "code-genshin-old-2",
    "game_id": "game-genshin",
    "code": "GENSHIN50EXPIRED",
    "reward": "60 Primogem",
    "status": "EXPIRED",
    "expired_at": "2025-10-01T00:00:00.000Z",
    "source": "Expired Livestream Code",
    "last_checked": "2026-03-01T00:00:00.000Z",
    "verified_at": "2026-03-01T00:00:00.000Z",
    "verification_provider": "official",
    "is_demo": false,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "code-hsr-old-2",
    "game_id": "game-hsr",
    "code": "STARRAIL2025OLD",
    "reward": "100 Stellar Jade",
    "status": "EXPIRED",
    "expired_at": "2025-11-01T00:00:00.000Z",
    "source": "Old Patch Code",
    "last_checked": "2026-03-01T00:00:00.000Z",
    "verified_at": "2026-03-01T00:00:00.000Z",
    "verification_provider": "official",
    "is_demo": false,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "code-roblox-1",
    "game_id": "game-roblox",
    "code": "BLOXFRUITS2026EXP",
    "reward": "2x EXP Boost selama 20 Menit, Stat Reset",
    "status": "ACTIVE",
    "expired_at": "2026-12-31T23:59:59.000Z",
    "source": "Gamer Robot Official Discord",
    "last_checked": "2026-03-08T16:00:00.000Z",
    "verified_at": "2026-03-08T16:00:00.000Z",
    "verification_provider": "community",
    "is_demo": false,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-08T16:00:00.000Z"
  },
  {
    "id": "code-mlbb-extra",
    "game_id": "game-mlbb",
    "code": "MLBBVIPDIAMOND",
    "reward": "50 Magic Dust, Premium Skin Fragment x5",
    "status": "UNKNOWN",
    "expired_at": "2026-06-30T00:00:00.000Z",
    "source": "Laporan Komunitas (Menunggu Verifikasi)",
    "last_checked": "2026-03-08T12:00:00.000Z",
    "verified_at": "2026-03-08T12:00:00.000Z",
    "verification_provider": "community",
    "is_demo": false,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-08T12:00:00.000Z"
  },
  {
    "id": "code-val-extra",
    "game_id": "game-valorant",
    "code": "VALORANTGUNBUDDY",
    "reward": "Player Card VCT Champions & Exclusive Gun Buddy",
    "status": "ACTIVE",
    "expired_at": "2026-12-31T23:59:59.000Z",
    "source": "Riot Games Redemption Portal",
    "last_checked": "2026-03-07T18:00:00.000Z",
    "verified_at": "2026-03-07T18:00:00.000Z",
    "verification_provider": "official",
    "is_demo": false,
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-07T18:00:00.000Z"
  }
];

export const EXPANSION_EVENTS: EventItem[] = [
  {
    "id": "event-zzz-1",
    "game_id": "game-zzz",
    "title": "Hollow Zero: Shiyu Defense Frontier",
    "description": "Tantangan bertingkat menaklukkan Ether Mutants dengan hadiah Polychrome masif dan material modifikasi W-Engine.",
    "image": "https://images.unsplash.com/photo-1568378780196-a9a0444a9151?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-03-01T04:00:00.000Z",
    "end_date": "2026-03-25T03:59:59.000Z",
    "status": "ACTIVE",
    "official_url": "https://zenless.hoyoverse.com",
    "rewards": "1200 Polychrome, 2 Master Tape, Boopon x10",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1568378780196-a9a0444a9151?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "event-wuwa-1",
    "game_id": "game-wuwa",
    "title": "Tower of Adversity: Hazard Zone Reset",
    "description": "Siklus baru arena tantangan terberat Huanglong dengan mutasi elemen khusus untuk menguji ketahanan tim.",
    "image": "https://images.unsplash.com/photo-1468254095679-bbcba94a7066?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-03-05T04:00:00.000Z",
    "end_date": "2026-03-20T03:59:59.000Z",
    "status": "ACTIVE",
    "official_url": "https://wutheringwaves.kurogames.com",
    "rewards": "700 Astrite, Advanced Echo EXP, Shell Credits",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-05T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1468254095679-bbcba94a7066?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "event-ba-1",
    "game_id": "game-ba",
    "title": "Total Assault: Binah Urban Warfare",
    "description": "Boss raid raksasa Binah dengan tipe armor Heavy Armor kembali menantang keahlian taktis Sensei di distrik kota.",
    "image": "https://images.unsplash.com/photo-1494256997604-768d1f608cac?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-03-10T02:00:00.000Z",
    "end_date": "2026-03-17T01:59:59.000Z",
    "status": "UPCOMING",
    "official_url": "https://bluearchive.nexon.com",
    "rewards": "1200 Pyroxene, Total Assault Coins, Advanced Skill Disc",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1494256997604-768d1f608cac?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "event-ark-1",
    "game_id": "game-arknights",
    "title": "Contingency Contract: Operation Pyrite",
    "description": "Tantangan bebas tanpa konsumsi Sanity dengan sistem risiko kontrak kustom untuk menguji seluruh komposisi operator.",
    "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-03-15T10:00:00.000Z",
    "end_date": "2026-03-29T03:59:59.000Z",
    "status": "UPCOMING",
    "official_url": "https://www.arknights.global",
    "rewards": "Operation Banners, D32 Steel, Royal Tokens",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "event-fgo-1",
    "game_id": "game-fgo",
    "title": "Chaldea Spring Lottery Festival",
    "description": "Event pengumpulan box lotere tanpa batas stamina untuk panen material skill gems dan QP masif.",
    "image": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-03-01T12:00:00.000Z",
    "end_date": "2026-03-15T11:59:59.000Z",
    "status": "ACTIVE",
    "official_url": "https://fate-go.us",
    "rewards": "Unlimited Skill Gems, 100M+ QP, Crystallized Lore",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "event-pubg-1",
    "game_id": "game-pubgm",
    "title": "Shadow Force Mode: Ninja Battleground",
    "description": "Mode tematik khusus di Erangel dengan pedang shadow blade, hook grapple, dan zona teleportasi rahasia.",
    "image": "https://images.unsplash.com/photo-1560094824-13b9bc472f86?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-02-20T00:00:00.000Z",
    "end_date": "2026-03-25T23:59:59.000Z",
    "status": "ACTIVE",
    "official_url": "https://www.pubgmobile.com",
    "rewards": "Shadow Warrior Suit, Exclusive Parachute, AG Currency",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-02-20T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1560094824-13b9bc472f86?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "event-ff-1",
    "game_id": "game-ff",
    "title": "Bermuda Red Carpet Carnival",
    "description": "Misi harian pertandingan Battle Royale dan Clash Squad dengan drop token penukaran bundle permanen gratis.",
    "image": "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-03-01T00:00:00.000Z",
    "end_date": "2026-03-14T23:59:59.000Z",
    "status": "ACTIVE",
    "official_url": "https://ff.garena.com",
    "rewards": "Carnival Master Bundle, Gloo Wall Skin, 50 Diamond Ticket",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "event-apex-1",
    "game_id": "game-apex",
    "title": "Three Strikes Limited-Time LTM",
    "description": "Mode intens penuh aksi di mana skuad memiliki 3 kali kesempatan hidup kembali secara instan pasca tereliminasi.",
    "image": "https://images.unsplash.com/photo-1531171673193-06ab3c43e4a5?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-03-02T18:00:00.000Z",
    "end_date": "2026-03-16T17:59:59.000Z",
    "status": "ACTIVE",
    "official_url": "https://www.ea.com/games/apex-legends",
    "rewards": "Apex Packs, Event Tracker, Legendary Weapon Charm",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-02T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1531171673193-06ab3c43e4a5?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "event-dota-1",
    "game_id": "game-dota2",
    "title": "Crownfall: The Perroying Act II",
    "description": "Eksplorasi peta narasi interaktif Crownfall dengan mini-games, visual novel, dan hadiah skin kustom arcanist.",
    "image": "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-02-15T00:00:00.000Z",
    "end_date": "2026-04-15T23:59:59.000Z",
    "status": "ACTIVE",
    "official_url": "https://www.dota2.com",
    "rewards": "Crownfall Treasure, Custom Voice Lines, Loading Screens",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-02-15T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "event-lol-1",
    "game_id": "game-lol",
    "title": "Arena 2v2v2v2 Gladiator Clash",
    "description": "Mode pertarungan gladiator 8 pemain dengan sistem augments unik dan pergantian peta arena cepat.",
    "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-03-05T19:00:00.000Z",
    "end_date": "2026-04-05T18:59:59.000Z",
    "status": "ACTIVE",
    "official_url": "https://www.leagueoflegends.com",
    "rewards": "Gladiator Titles, Hextech Chests, Mythic Essence",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-05T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "event-roblox-1",
    "game_id": "game-roblox",
    "title": "Blox Fruits: Sea Beast Raid Awakening",
    "description": "Event perburuan monster laut raksasa di Third Sea dengan peluang memperoleh artefak mistis dan kapal legendaris.",
    "image": "https://images.unsplash.com/photo-1457364559154-aa2644600ebb?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-03-08T00:00:00.000Z",
    "end_date": "2026-03-22T23:59:59.000Z",
    "status": "ACTIVE",
    "official_url": "https://www.roblox.com",
    "rewards": "Tsuchigumo Boat, 5000 Fragments, Shark Tooth Artifact",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-08T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1457364559154-aa2644600ebb?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "event-mc-1",
    "game_id": "game-minecraft",
    "title": "Minecraft Trial Chambers Community Challenge",
    "description": "Eksplorasi struktur Trial Chambers bawah tanah dan menaklukkan Breeze mob bersama komunitas global.",
    "image": "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-03-01T00:00:00.000Z",
    "end_date": "2026-03-31T23:59:59.000Z",
    "status": "ACTIVE",
    "official_url": "https://www.minecraft.net",
    "rewards": "Heavy Core Mace, Wind Charge Vault Loot, Cape Bedrock",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "event-genshin-future",
    "game_id": "game-genshin",
    "title": "Windblume Festival Mondstadt Rerun",
    "description": "Perayaan festival musim semi di kota kebebasan Mondstadt dengan kompetisi memanah dan lagu balada.",
    "image": "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-04-01T10:00:00.000Z",
    "end_date": "2026-04-18T03:59:59.000Z",
    "status": "UPCOMING",
    "official_url": "https://genshin.hoyoverse.com",
    "rewards": "1000 Primogem, Windblume Bow, Furniture Blueprint",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "event-hsr-future",
    "game_id": "game-hsr",
    "title": "Simulated Universe: Unknowable Domain",
    "description": "Ekspansi baru Simulated Universe Herta dengan sistem kurator artefak kalkulasi dan rute percabangan dimensi.",
    "image": "https://images.unsplash.com/photo-1585224907690-cbaf12e38471?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-04-05T04:00:00.000Z",
    "end_date": "2026-05-10T03:59:59.000Z",
    "status": "UPCOMING",
    "official_url": "https://hsr.hoyoverse.com",
    "rewards": "Self-Modeling Resin x2, 4500 Stellar Jade, Tracks of Destiny",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1585224907690-cbaf12e38471?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "event-mlbb-future",
    "game_id": "game-mlbb",
    "title": "515 All-Star Carnival Land of Dawn",
    "description": "Festival akbar tahunan Mobile Legends dengan vote hero favorit, border avatar eksklusif, dan skin promo diamond.",
    "image": "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-05-01T00:00:00.000Z",
    "end_date": "2026-05-31T23:59:59.000Z",
    "status": "UPCOMING",
    "official_url": "https://m.mobilelegends.com",
    "rewards": "515 Exclusive Skin, Promo Diamonds x800, Recall Effect",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "event-val-future",
    "game_id": "game-valorant",
    "title": "Valorant Night Market Spring Edition",
    "description": "Pasar malam rahasia diskon 6 skin senjata personal dengan potongan harga acak hingga 50%.",
    "image": "https://images.unsplash.com/photo-1579566346927-c68383817a25?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-04-10T00:00:00.000Z",
    "end_date": "2026-04-25T23:59:59.000Z",
    "status": "UPCOMING",
    "official_url": "https://playvalorant.com",
    "rewards": "Personalized Weapon Skin Discounts up to 50%",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1579566346927-c68383817a25?w=800&auto=format&fit=crop&q=80"
  }
];

export const EXPANSION_ITEMS: Item[] = [
  {
    "id": "item-staff-of-homa",
    "game_id": "game-genshin",
    "name": "Staff of Homa",
    "slug": "staff-of-homa",
    "type": "Polearm",
    "rarity": 5,
    "icon": "https://images.unsplash.com/photo-1528164344705-47542687000d?w=300&auto=format&fit=crop&q=80",
    "description": "Tongkat ritual pembersih api suci yang meningkatkan HP 20% dan memberikan bonus ATK berdasarkan Max HP pengguna.",
    "stats": {
      "Base ATK": "608",
      "CRIT DMG": "66.2%",
      "HP Bonus": "+20%"
    },
    "how_to_get": "Weapon Event Wish (Epitome Invocation)",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "item-tome-flowing-sands",
    "game_id": "game-genshin",
    "name": "Tome of the Eternal Flow",
    "slug": "tome-of-the-eternal-flow",
    "type": "Catalyst",
    "rarity": 5,
    "icon": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=300&auto=format&fit=crop&q=80",
    "description": "Kitab hukum kuno Fontaine yang melipatgandakan Charged Attack DMG saat HP bertambah atau berkurang.",
    "stats": {
      "Base ATK": "542",
      "CRIT DMG": "88.2%",
      "Charged DMG": "+42%"
    },
    "how_to_get": "Weapon Event Wish (Signature Neuvillette)",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "item-along-the-passing-shore",
    "game_id": "game-hsr",
    "name": "Along the Passing Shore",
    "slug": "along-the-passing-shore",
    "type": "Light Cone",
    "rarity": 5,
    "icon": "https://images.unsplash.com/photo-1510051640316-cee39563ddab?w=300&auto=format&fit=crop&q=80",
    "description": "Light Cone signature Acheron yang meningkatkan CRIT DMG dan menyematkan debuff Mirage Fizz pada musuh yang diserang.",
    "stats": {
      "HP": "1058",
      "ATK": "635",
      "DEF": "396",
      "CRIT DMG": "+36%"
    },
    "how_to_get": "Brilliant Fixation Event Warp",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "item-whereabouts-should-dreams-rest",
    "game_id": "game-hsr",
    "name": "Whereabouts Should Dreams Rest",
    "slug": "whereabouts-should-dreams-rest",
    "type": "Light Cone",
    "rarity": 5,
    "icon": "https://images.unsplash.com/photo-1485443856970-7b0483a73963?w=300&auto=format&fit=crop&q=80",
    "description": "Light Cone Destruction signature Firefly yang meningkatkan Break Effect hingga 60% dan memberi debuff Routed.",
    "stats": {
      "HP": "1164",
      "ATK": "476",
      "DEF": "529",
      "Break Effect": "+60%"
    },
    "how_to_get": "Brilliant Fixation Event Warp",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "item-immortality",
    "game_id": "game-mlbb",
    "name": "Immortality",
    "slug": "immortality",
    "type": "Defense Item",
    "rarity": 4,
    "icon": "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=300&auto=format&fit=crop&q=80",
    "description": "Menghidupkan kembali hero 2.5 detik setelah tereliminasi dengan 16% Max HP dan shield penyerap damage.",
    "stats": {
      "HP": "+800",
      "Physical Defense": "+20"
    },
    "how_to_get": "Shop In-Game seharga 2120 Gold",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "item-deep-sea-visitor",
    "game_id": "game-zzz",
    "name": "Deep Sea Visitor",
    "slug": "deep-sea-visitor",
    "type": "W-Engine",
    "rarity": 5,
    "icon": "https://images.unsplash.com/photo-1581343117330-0104b39ce4c9?w=300&auto=format&fit=crop&q=80",
    "description": "W-Engine Attack signature Ellen Joe yang memberikan Ice DMG Bonus +25% dan CRIT Rate tumpuk saat menggunakan Dash Attack.",
    "stats": {
      "Base ATK": "713",
      "CRIT Rate": "+24%",
      "Ice DMG": "+25%"
    },
    "how_to_get": "Exclusive Channel Signal Search",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "item-verdant-summit",
    "game_id": "game-wuwa",
    "name": "Verdant Summit",
    "slug": "verdant-summit",
    "type": "Broadblade",
    "rarity": 5,
    "icon": "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=300&auto=format&fit=crop&q=80",
    "description": "Broadblade signature Jiyan yang melipatgandakan Heavy Attack DMG setiap kali melancarkan Resonance Liberation.",
    "stats": {
      "Base ATK": "587",
      "CRIT DMG": "+48.6%",
      "Heavy DMG": "+48%"
    },
    "how_to_get": "Weapon Event Convene",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "item-lumitoile",
    "game_id": "game-genshin",
    "name": "Lumitoile",
    "slug": "lumitoile",
    "type": "Local Specialty",
    "rarity": 1,
    "icon": "https://images.unsplash.com/photo-1559526324-c1f275fbfa32?w=300&auto=format&fit=crop&q=80",
    "description": "Hewan bercangkang lembut berbentuk bintang yang memancarkan cahaya redup di pantai dan perairan dalam Fontaine.",
    "stats": {
      "Tipe": "Ascension Material Karakter Neuvillette"
    },
    "how_to_get": "Farming di Pesisir Liffey & Bawah Air Fontaine",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "item-cor-lapis",
    "game_id": "game-genshin",
    "name": "Cor Lapis",
    "slug": "cor-lapis",
    "type": "Local Specialty",
    "rarity": 1,
    "icon": "https://images.unsplash.com/photo-1553532434-5ab5b6b84993?w=300&auto=format&fit=crop&q=80",
    "description": "Kristal elemen Geo murni yang terkonsentrasi di tebing-tebing batu pegunungan Liyue.",
    "stats": {
      "Tipe": "Ascension Material Karakter Zhongli & Chongyun"
    },
    "how_to_get": "Menambang tebing Gunung Hulao & Mt. Tianheng Liyue",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "item-mace-heavy-core",
    "game_id": "game-minecraft",
    "name": "Mace",
    "slug": "mace",
    "type": "Weapon",
    "rarity": 5,
    "icon": "https://images.unsplash.com/photo-1603290989168-0cab99a6e996?w=300&auto=format&fit=crop&q=80",
    "description": "Senjata gada penghancur berat Minecraft yang meningkatkan damage serangan seiring ketinggian jatuh (Smash Attack).",
    "stats": {
      "Base Damage": "6",
      "Damage Multiplier": "+Density Enchantment"
    },
    "how_to_get": "Crafting Heavy Core + Breeze Rod dari Trial Vault",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "item-phantom-curse-katana",
    "game_id": "game-roblox",
    "name": "Cursed Dual Katana",
    "slug": "cursed-dual-katana",
    "type": "Mythical Sword",
    "rarity": 5,
    "icon": "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=300&auto=format&fit=crop&q=80",
    "description": "Pedang ganda mitologi terkuat di Blox Fruits yang menggabungkan kekuatan Yama dan Tushita dengan skill Slayer of Goliaths.",
    "stats": {
      "Grade": "Mythical",
      "Skill 1": "Revolving Slash",
      "Skill 2": "Slayer of Goliaths"
    },
    "how_to_get": "Menyelesaikan Puzzle Crypt Master di Haunted Castle",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  }
];
