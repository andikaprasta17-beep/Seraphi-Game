import { Game, Character, Guide, News, RedeemCode, EventItem, Item, TierList, AdSlotConfig } from './types';
import {
  SEED_AUTHORS,
  EXPANSION_GAMES,
  EXPANSION_CHARACTERS,
  EXPANSION_GUIDES,
  EXPANSION_NEWS,
  EXPANSION_REDEEM_CODES,
  EXPANSION_EVENTS,
  EXPANSION_ITEMS,
} from './data-seed-expansion';

export { SEED_AUTHORS };

export const SEED_GAMES: Game[] = [
  {
    "id": "game-genshin",
    "name": "Genshin Impact",
    "slug": "genshin-impact",
    "cover_image": "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80",
    "banner_image": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
    "description": "Game open-world action RPG karya HoYoverse berlatar di dunia Teyvat yang luas dengan 7 elemen dan puluhan karakter memukau.",
    "developer": "miHoYo / HoYoverse",
    "publisher": "HoYoverse / Cognosphere",
    "release_date": "2020-09-28",
    "platforms": [
      "PC",
      "PlayStation 5",
      "PlayStation 4",
      "Android",
      "iOS"
    ],
    "genres": [
      "Open World",
      "Action RPG",
      "Gacha",
      "Adventure"
    ],
    "status": "Active",
    "rating": 4.8,
    "official_url": "https://genshin.hoyoverse.com",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "game-hsr",
    "name": "Honkai: Star Rail",
    "slug": "honkai-star-rail",
    "cover_image": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80",
    "banner_image": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1600&auto=format&fit=crop&q=80",
    "description": "Space fantasy RPG turn-based dari HoYoverse dengan perjalanan Astral Express melintasi galaksi dan pertempuran strategis mendalam.",
    "developer": "miHoYo / HoYoverse",
    "publisher": "HoYoverse",
    "release_date": "2023-04-26",
    "platforms": [
      "PC",
      "PlayStation 5",
      "Android",
      "iOS"
    ],
    "genres": [
      "Turn-Based RPG",
      "Sci-Fi",
      "Gacha",
      "Adventure"
    ],
    "status": "Active",
    "rating": 4.9,
    "official_url": "https://hsr.hoyoverse.com",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "game-mlbb",
    "name": "Mobile Legends: Bang Bang",
    "slug": "mobile-legends",
    "cover_image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80",
    "banner_image": "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&auto=format&fit=crop&q=80",
    "description": "Game MOBA 5v5 terpopuler di Indonesia dan Asia Tenggara dengan puluhan hero unik, pertempuran intens 10 menit, dan scene esports raksasa.",
    "developer": "Moonton",
    "publisher": "Moonton / ByteDance",
    "release_date": "2016-07-14",
    "platforms": [
      "Android",
      "iOS"
    ],
    "genres": [
      "MOBA",
      "Strategy",
      "Competitive",
      "Action"
    ],
    "status": "Active",
    "rating": 4.7,
    "official_url": "https://m.mobilelegends.com",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "game-valorant",
    "name": "Valorant",
    "slug": "valorant",
    "cover_image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
    "banner_image": "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1600&auto=format&fit=crop&q=80",
    "description": "Tactical hero-shooter 5v5 berbasis kemampuan agent dan presisi tembakan tajam dari Riot Games dengan ekosistem esports global VCT.",
    "developer": "Riot Games",
    "publisher": "Riot Games",
    "release_date": "2020-06-02",
    "platforms": [
      "PC",
      "PlayStation 5",
      "Xbox Series X/S"
    ],
    "genres": [
      "Tactical Shooter",
      "FPS",
      "Hero Shooter",
      "Competitive"
    ],
    "status": "Active",
    "rating": 4.8,
    "official_url": "https://playvalorant.com",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "game-wuwa",
    "name": "Wuthering Waves",
    "slug": "wuthering-waves",
    "cover_image": "https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?w=600&auto=format&fit=crop&q=80",
    "banner_image": "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=1600&auto=format&fit=crop&q=80",
    "description": "Open world action RPG bertema post-apocalyptic dengan sistem pertarungan cepat, dodge parry fleksibel, dan mekanisme Echo kustomisasi.",
    "developer": "Kuro Games",
    "publisher": "Kuro Games",
    "release_date": "2024-05-22",
    "platforms": [
      "PC",
      "PlayStation 5",
      "Android",
      "iOS"
    ],
    "genres": [
      "Open World",
      "Action RPG",
      "Gacha",
      "Fast-Paced"
    ],
    "status": "Active",
    "rating": 4.6,
    "official_url": "https://wutheringwaves.kurogames.com",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "game-zzz",
    "name": "Zenless Zone Zero",
    "slug": "zenless-zone-zero",
    "cover_image": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80",
    "banner_image": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1600&auto=format&fit=crop&q=80",
    "description": "Urban fantasy action RPG bertempo cepat dengan estetika street anime keren dari HoYoverse di metropolis terakhir New Eridu.",
    "developer": "miHoYo / HoYoverse",
    "publisher": "HoYoverse",
    "release_date": "2024-07-04",
    "platforms": [
      "PC",
      "PlayStation 5",
      "Android",
      "iOS"
    ],
    "genres": [
      "Action RPG",
      "Hack and Slash",
      "Urban Fantasy",
      "Gacha"
    ],
    "status": "Active",
    "rating": 4.7,
    "official_url": "https://zenless.hoyoverse.com",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "game-wukong",
    "name": "Black Myth: Wukong",
    "slug": "black-myth-wukong",
    "cover_image": "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&auto=format&fit=crop&q=80",
    "banner_image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&auto=format&fit=crop&q=80",
    "description": "Action RPG berakar pada mitologi Tiongkok klasik Perjalanan ke Barat. Mengendalikan sang Destined One menghadapi takdir legendaris.",
    "developer": "Game Science",
    "publisher": "Game Science",
    "release_date": "2024-08-20",
    "platforms": [
      "PC",
      "PlayStation 5"
    ],
    "genres": [
      "Action RPG",
      "Souls-like",
      "Mythology",
      "Adventure"
    ],
    "status": "Released",
    "rating": 4.9,
    "official_url": "https://www.heishenhua.com",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "game-elden-ring",
    "name": "Elden Ring",
    "slug": "elden-ring",
    "cover_image": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    "banner_image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80",
    "description": "Karya mahakarya FromSoftware & George R.R. Martin. Jelajahi Lands Between dan jadilah Elden Lord dalam petualangan souls-like spektakuler.",
    "developer": "FromSoftware Inc.",
    "publisher": "Bandai Namco Entertainment",
    "release_date": "2022-02-25",
    "platforms": [
      "PC",
      "PlayStation 5",
      "PlayStation 4",
      "Xbox Series X/S",
      "Xbox One"
    ],
    "genres": [
      "Action RPG",
      "Souls-like",
      "Open World",
      "Dark Fantasy"
    ],
    "status": "Released",
    "rating": 5,
    "official_url": "https://www.bandainamcoent.com/games/elden-ring",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "game-pubgm",
    "name": "PUBG Mobile",
    "slug": "pubg-mobile",
    "cover_image": "https://images.unsplash.com/photo-1528238646472-f2366160b6c1?w=600&auto=format&fit=crop&q=80",
    "banner_image": "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=1600&auto=format&fit=crop&q=80",
    "description": "Game battle royale mobile legendaris. Terjun bersama 100 pemain di pulau terpencil dan bertahan hidup hingga menjadi pemain terakhir.",
    "developer": "LightSpeed & Quantum Studio",
    "publisher": "Level Infinite / Krafton",
    "release_date": "2018-03-19",
    "platforms": [
      "Android",
      "iOS"
    ],
    "genres": [
      "Battle Royale",
      "Shooter",
      "Survival",
      "Multiplayer"
    ],
    "status": "Active",
    "rating": 4.6,
    "official_url": "https://www.pubgmobile.com",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "game-ff",
    "name": "Free Fire",
    "slug": "free-fire",
    "cover_image": "https://images.unsplash.com/photo-1564460549828-f0219a31bf90?w=600&auto=format&fit=crop&q=80",
    "banner_image": "https://images.unsplash.com/photo-1500004621732-74cd4ad4d53e?w=1600&auto=format&fit=crop&q=80",
    "description": "Survival shooter mobile cepat berdurasi 10 menit dengan 50 pemain, skill karakter unik, dan gameplay seru di mana saja.",
    "developer": "111 Dots Studio",
    "publisher": "Garena",
    "release_date": "2017-12-08",
    "platforms": [
      "Android",
      "iOS"
    ],
    "genres": [
      "Battle Royale",
      "Shooter",
      "Survival",
      "Action"
    ],
    "status": "Active",
    "rating": 4.5,
    "official_url": "https://ff.garena.com",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  }
];

export const SEED_CHARACTERS: Character[] = [
  {
    "id": "char-neuvillette",
    "game_id": "game-genshin",
    "name": "Neuvillette",
    "slug": "neuvillette",
    "portrait": "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1000&auto=format&fit=crop&q=80",
    "description": "Iudex of Fontaine dan Naga Hidro sejati yang memimpin pengadilan Fontaine dengan keadilan mutlak.",
    "role": "Main DPS",
    "element": "Hydro",
    "weapon": "Catalyst",
    "rarity": 5,
    "release_date": "2023-09-27",
    "skills": [
      {
        "name": "As Water Seeks Equilibrium",
        "type": "Normal & Charged Attack",
        "description": "Melepaskan semburan air berkekuatan dahsyat Torrential Judgement ke arah musuh dalam garis lurus."
      },
      {
        "name": "O Tears, I Shall Repay",
        "type": "Elemental Skill",
        "description": "Memanggil Raging Waterfall menimbulkan AoE Hydro DMG dan menciptakan 3 Sourcewater Droplets."
      },
      {
        "name": "O Tides, I Have Returned",
        "type": "Elemental Burst",
        "description": "Melepaskan ombak raksasa beruntun dan memunculkan 6 Sourcewater Droplets untuk Charged Attack instan."
      }
    ],
    "talents": [
      {
        "name": "Heir to the Ancient Seas Authority",
        "description": "Meningkatkan damage Charged Attack hingga 160% saat anggota party memicu reaksi Hydro."
      },
      {
        "name": "Discipline of the Supreme Arbitration",
        "description": "Mendapat 0.6% Hydro DMG Bonus untuk setiap 1% HP di atas 30% Max HP."
      }
    ],
    "recommended_build": {
      "main_role": "On-field Hypercarry Hydro DPS",
      "best_artifacts": "4-Piece Marechaussee Hunter",
      "main_stats": "Sands: HP% | Goblet: Hydro DMG% atau HP% | Circlet: CRIT DMG",
      "sub_stats": "CRIT DMG > CRIT Rate > HP% > Energy Recharge",
      "summary": "Fokus pada HP dan CRIT DMG tinggi karena Charged Attack Neuvillette scaling penuh dari Max HP."
    },
    "recommended_weapons": [
      {
        "name": "Tome of the Eternal Flow",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata signature terbaik, memberikan HP% dan bonus Charged Attack luar biasa."
      },
      {
        "name": "Sacrificial Jade",
        "rarity": 4,
        "rank": 2,
        "note": "Pilihan Battle Pass terbaik dengan Crit Rate tinggi dan buff HP 64%."
      },
      {
        "name": "Prototype Amber",
        "rarity": 4,
        "rank": 3,
        "note": "Opsi F2P craftable yang sangat solid untuk HP% dan regenerasi energi."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Furina",
        "role": "Sub-DPS / Buffer",
        "description": "Memberikan Fanfare damage bonus masif dan sinergi fluktuasi HP."
      },
      {
        "character_name": "Kazuha",
        "role": "Support / Debuffer",
        "description": "Swirl Hydro dan memberikan Elemental DMG buff serta crowd control."
      },
      {
        "character_name": "Zhongli",
        "role": "Shielder",
        "description": "Resistensi interupsi dan pengurangan elemen resist musuh 20%."
      }
    ],
    "materials": [
      {
        "name": "Varunada Lazurite Gemstone",
        "type": "Ascension Gem",
        "count": 6
      },
      {
        "name": "Fontemer Unihorn",
        "type": "Boss Drop (Millennial Pearl Seahorse)",
        "count": 46
      },
      {
        "name": "Lumitoile",
        "type": "Fontaine Specialty",
        "count": 168
      },
      {
        "name": "Transoceanic Chunk",
        "type": "Fontemer Aberrant",
        "count": 36
      }
    ],
    "status": "PUBLISHED",
    "created_at": "2026-01-05T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-furina",
    "game_id": "game-genshin",
    "name": "Furina",
    "slug": "furina",
    "portrait": "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1603794067602-9feaa4f70e0c?w=1000&auto=format&fit=crop&q=80",
    "description": "Bintang panggung Fontaine yang memikat penonton dengan pertunjukan epik dan berkah pencerahan Salon Solitaire.",
    "role": "Sub-DPS / Buffer",
    "element": "Hydro",
    "weapon": "Sword",
    "rarity": 5,
    "release_date": "2023-11-08",
    "skills": [
      {
        "name": "Salon Solitaire",
        "type": "Elemental Skill",
        "description": "Memanggil 3 anggota Salon Solitaire yang menyerang musuh otomatis dan mengonsumsi HP anggota party."
      },
      {
        "name": "Let the People Rejoice",
        "type": "Elemental Burst",
        "description": "Mengumpulkan poin Fanfare dari kenaikan dan penurunan HP party untuk memberi buff Damage global hingga 75%."
      }
    ],
    "talents": [
      {
        "name": "Endless Waltz",
        "description": "Saat karakter aktif terkena overheal, Furina menyembuhkan anggota party lain sebesar 2% HP tiap 2 detik."
      },
      {
        "name": "Unheard Confession",
        "description": "Meningkatkan damage Salon Members hingga 28% berdasarkan Max HP Furina."
      }
    ],
    "recommended_build": {
      "main_role": "Off-field Hydro Buffer & Sub-DPS",
      "best_artifacts": "4-Piece Golden Troupe",
      "main_stats": "Sands: HP% atau ER | Goblet: HP% atau Hydro DMG | Circlet: CRIT Rate / DMG",
      "sub_stats": "Energy Recharge (170-190%) > CRIT Rate > CRIT DMG > HP%",
      "summary": "Pastikan ER cukup untuk Burst setiap rotasi dan gunakan healer party seperti Baizhu atau Jean."
    },
    "recommended_weapons": [
      {
        "name": "Splendor of Tranquil Waters",
        "rarity": 5,
        "rank": 1,
        "note": "Signature weapon pemberi Crit DMG dan skill damage bonus tertinggi."
      },
      {
        "name": "Fleuve Cendre Ferryman",
        "rarity": 4,
        "rank": 2,
        "note": "Senjata pancingan F2P terbaik dengan ER tinggi dan Crit Rate pada skill."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Neuvillette",
        "role": "Main DPS",
        "description": "Pemanfaat terbaik dari Fanfare Furina."
      },
      {
        "character_name": "Jean",
        "role": "Team Healer",
        "description": "Instan mengisi Fanfare poin ke maksimum dengan Burst team heal."
      }
    ],
    "materials": [
      {
        "name": "Water That Failed To Transcend",
        "type": "Boss Drop",
        "count": 46
      },
      {
        "name": "Lakelight Lily",
        "type": "Local Specialty",
        "count": 168
      }
    ],
    "status": "PUBLISHED",
    "created_at": "2026-01-06T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-raiden",
    "game_id": "game-genshin",
    "name": "Raiden Shogun",
    "slug": "raiden-shogun",
    "portrait": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1612487528505-d2338264c821?w=1000&auto=format&fit=crop&q=80",
    "description": "Archon Elektro dari Inazuma yang mengejar Keabadian (Eternity), pengisi baterai energi party nomor satu di Teyvat.",
    "role": "Sub-DPS / Battery / Hypercarry",
    "element": "Electro",
    "weapon": "Polearm",
    "rarity": 5,
    "release_date": "2021-09-01",
    "skills": [
      {
        "name": "Transcendence: Baleful Omen",
        "type": "Elemental Skill",
        "description": "Memberikan serangan koordinasi Electro dan menaikkan Elemental Burst DMG seluruh anggota party."
      },
      {
        "name": "Secret Art: Musou Shinsetsu",
        "type": "Elemental Burst",
        "description": "Tebasan Musou no Hitotachi yang meregenerasi energi seluruh party dengan damage masif."
      }
    ],
    "talents": [
      {
        "name": "Enlightened One",
        "description": "Setiap 1% ER di atas 100% memberi 0.4% Electro DMG Bonus dan 0.6% pemulihan energi party."
      }
    ],
    "recommended_build": {
      "main_role": "Electro Battery & Burst DPS",
      "best_artifacts": "4-Piece Emblem of Severed Fate",
      "main_stats": "Sands: ER% | Goblet: Electro DMG% atau ATK% | Circlet: CRIT Rate/DMG",
      "sub_stats": "ER% (220-270%) > CRIT Rate > CRIT DMG > ATK%",
      "summary": "Prioritaskan Emblem 4-set untuk konversi Energy Recharge menjadi Burst DMG."
    },
    "recommended_weapons": [
      {
        "name": "Engulfing Lightning",
        "rarity": 5,
        "rank": 1,
        "note": "Signature weapon terbaik yang mengonversi ER menjadi ATK."
      },
      {
        "name": "The Catch",
        "rarity": 4,
        "rank": 2,
        "note": "Senjata F2P pancingan terbaik sepanjang masa untuk Raiden."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Xiangling",
        "role": "Off-field Pyro DPS",
        "description": "Pemicu reaksi Overload dan Vaporize tak henti."
      },
      {
        "character_name": "Bennett",
        "role": "Buffer & Healer",
        "description": "ATK boost masif di lingkaran Fantastic Voyage."
      },
      {
        "character_name": "Xingqiu",
        "role": "Hydro Enabler",
        "description": "Sinergi tim Raiden National klasik paling stabil."
      }
    ],
    "materials": [
      {
        "name": "Storm Beads",
        "type": "Thunder Manifestation",
        "count": 46
      },
      {
        "name": "Amakumo Fruit",
        "type": "Inazuma Specialty",
        "count": 168
      }
    ],
    "status": "PUBLISHED",
    "created_at": "2026-01-07T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-nahida",
    "game_id": "game-genshin",
    "name": "Nahida",
    "slug": "nahida",
    "portrait": "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=1000&auto=format&fit=crop&q=80",
    "description": "Dendro Archon dari Sumeru, Lesser Lord Kusanali, fondasi utama seluruh tim berbasis reaksi Dendro.",
    "role": "Sub-DPS / Dendro Enabler",
    "element": "Dendro",
    "weapon": "Catalyst",
    "rarity": 5,
    "release_date": "2022-11-02",
    "skills": [
      {
        "name": "All Schemes to Know",
        "type": "Elemental Skill",
        "description": "Menghubungkan hingga 8 musuh dengan Seed of Skandha dan memicu Tri-Karma Purification saat reaksi terjadi."
      },
      {
        "name": "Illusory Heart",
        "type": "Elemental Burst",
        "description": "Mendirikan Shrine of Maya yang memberi buff Elemental Mastery hingga 250 EM kepada karakter aktif."
      }
    ],
    "talents": [
      {
        "name": "Compassion Illuminated",
        "description": "Memberikan 25% EM dari anggota tim dengan EM tertinggi ke karakter aktif di dalam Shrine."
      }
    ],
    "recommended_build": {
      "main_role": "Dendro Support & Sub-DPS",
      "best_artifacts": "4-Piece Deepwood Memories",
      "main_stats": "Sands: EM | Goblet: EM atau Dendro DMG | Circlet: EM atau CRIT",
      "sub_stats": "EM (target 800-1000) > CRIT Rate > CRIT DMG > ER",
      "summary": "Kunci mutlak untuk reaksi Bloom, Hyperbloom, Burgeon, Quicken, dan Aggravate."
    },
    "recommended_weapons": [
      {
        "name": "A Thousand Floating Dreams",
        "rarity": 5,
        "rank": 1,
        "note": "Signature weapon terbaik dengan EM melimpah."
      },
      {
        "name": "Sacrificial Fragments",
        "rarity": 4,
        "rank": 2,
        "note": "Pilihan 4-star F2P terbaik dengan stat EM tinggi."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Alhaitham",
        "role": "Main DPS",
        "description": "DPS Dendro yang bersinergi sempurna dengan Nahida."
      },
      {
        "character_name": "Kuki Shinobu",
        "role": "Hyperbloom Trigger",
        "description": "Pemicu Hyperbloom dengan EM tinggi dan heal konsisten."
      }
    ],
    "materials": [
      {
        "name": "Quelled Creeper",
        "type": "Dendro Hypostasis",
        "count": 46
      },
      {
        "name": "Kalpalata Lotus",
        "type": "Sumeru Specialty",
        "count": 168
      }
    ],
    "status": "PUBLISHED",
    "created_at": "2026-01-08T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-zhongli",
    "game_id": "game-genshin",
    "name": "Zhongli",
    "slug": "zhongli",
    "portrait": "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?w=1000&auto=format&fit=crop&q=80",
    "description": "Geo Archon dari Liyue, Rex Lapis. Shielder terkuat di Teyvat yang menjamin kenyamanan bermain tanpa gangguan musuh.",
    "role": "Shielder / Support",
    "element": "Geo",
    "weapon": "Polearm",
    "rarity": 5,
    "release_date": "2020-12-01",
    "skills": [
      {
        "name": "Dominus Lapidis",
        "type": "Elemental Skill",
        "description": "Menciptakan Stone Stele dan Jade Shield tebal yang mengurangi 20% all elemental & physical RES musuh sekitar."
      },
      {
        "name": "Planet Befall",
        "type": "Elemental Burst",
        "description": "Menjatuhkan meteorit raksasa yang membekukan musuh dalam status Petrification selama hingga 4 detik."
      }
    ],
    "talents": [
      {
        "name": "Resonant Waves",
        "description": "Meningkatkan kekuatan perisai Jade Shield sebesar 5% setiap kali menerima damage (maks 5 stack)."
      }
    ],
    "recommended_build": {
      "main_role": "Pure Shielder / Utility Support",
      "best_artifacts": "4-Piece Tenacity of the Millelith",
      "main_stats": "Sands: HP% | Goblet: HP% | Circlet: HP%",
      "sub_stats": "HP% > Flat HP > Energy Recharge",
      "summary": "Build HP penuh untuk perisai yang nyaris tidak bisa ditembus oleh serangan musuh apapun."
    },
    "recommended_weapons": [
      {
        "name": "Black Tassel",
        "rarity": 3,
        "rank": 1,
        "note": "Senjata bintang 3 paling murah dan terbaik untuk memaksimalkan HP."
      },
      {
        "name": "Favonius Lance",
        "rarity": 4,
        "rank": 2,
        "note": "Memberi partikel energi untuk party saat menggunakan build hybrid."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Hu Tao",
        "role": "Main DPS",
        "description": "Memerlukan shield Zhongli karena Hu Tao bertarung di bawah 50% HP."
      },
      {
        "character_name": "Xingqiu",
        "role": "Sub-DPS",
        "description": "Menyediakan Hydro aura konsisten."
      }
    ],
    "materials": [
      {
        "name": "Basalt Pillar",
        "type": "Geo Hypostasis",
        "count": 46
      },
      {
        "name": "Cor Lapis",
        "type": "Liyue Specialty",
        "count": 168
      }
    ],
    "status": "PUBLISHED",
    "created_at": "2026-01-09T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-acheron",
    "game_id": "game-hsr",
    "name": "Acheron",
    "slug": "acheron",
    "portrait": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?w=1000&auto=format&fit=crop&q=80",
    "description": "Galaxy Ranger pengembara bayangan (Emanator of Nihility) yang menebas takdir dengan pedang Naught dan Crimson Knot.",
    "role": "Main DPS",
    "element": "Lightning",
    "weapon": "The Nihility",
    "rarity": 5,
    "release_date": "2024-03-27",
    "skills": [
      {
        "name": "Octobolt Flash",
        "type": "Skill",
        "description": "Menghasilkan 1 poin Slashed Dream dan menempelkan 1 Crimson Knot pada musuh sasaran."
      },
      {
        "name": "Slashed Dream Cries in Red",
        "type": "Ultimate",
        "description": "Menghancurkan musuh dalam 4 tebasan beruntun dengan penetrasi All-Type RES tanpa batas Energy."
      }
    ],
    "talents": [
      {
        "name": "The Abyss",
        "description": "Saat party memiliki 1/2 karakter Nihility lain, damage Acheron meningkat 115%/160% secara independen."
      }
    ],
    "recommended_build": {
      "main_role": "Nihility Hypercarry Lightning DPS",
      "best_artifacts": "4-Piece Pioneer Diver of Dead Waters + 2-Piece Izumo Gensei",
      "main_stats": "Body: CRIT Rate/DMG | Feet: ATK% | Sphere: Lightning DMG / ATK% | Rope: ATK%",
      "sub_stats": "CRIT DMG > CRIT Rate > ATK% > Speed",
      "summary": "Tidak butuh Energy Recharge sama sekali karena Ultimate diaktifkan lewat akumulasi 9 poin Slashed Dream debuff."
    },
    "recommended_weapons": [
      {
        "name": "Along the Passing Shore",
        "rarity": 5,
        "rank": 1,
        "note": "Signature Light Cone pemberi Crit DMG, debuff Mirage Fizzle, dan Ultimate DMG."
      },
      {
        "name": "Good Night and Sleep Well",
        "rarity": 4,
        "rank": 2,
        "note": "Pilihan 4-star terbaik jika musuh terkena 3 debuff."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Pela",
        "role": "Defense Shredder",
        "description": "Memberikan AOE DEF shred dan mengisi Crimson Knot dengan cepat."
      },
      {
        "character_name": "Silver Wolf",
        "role": "Single Target Debuffer",
        "description": "Menempelkan All-Type weakness dan beragam debuff stat."
      },
      {
        "character_name": "Aventurine",
        "role": "Sustain & Debuffer",
        "description": "Shield tebal dan Ultimate yang menempelkan debuff Unnerve."
      }
    ],
    "materials": [
      {
        "name": "Shape Shifter Lightning Staff",
        "type": "Boss Drop",
        "count": 65
      },
      {
        "name": "Dream Collection Component",
        "type": "Penacony Material",
        "count": 73
      }
    ],
    "status": "PUBLISHED",
    "created_at": "2026-01-10T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-firefly",
    "game_id": "game-hsr",
    "name": "Firefly (SAM)",
    "slug": "firefly",
    "portrait": "https://images.unsplash.com/photo-1589749807521-dd6bc0d4f75d?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=1000&auto=format&fit=crop&q=80",
    "description": "Anggota Stellaron Hunters yang bertarung mengenakan zirah mekanik raksasa SAM dengan kekuatan Super Break dahsyat.",
    "role": "Main DPS",
    "element": "Fire",
    "weapon": "The Destruction",
    "rarity": 5,
    "release_date": "2024-06-19",
    "skills": [
      {
        "name": "Order: Aerial Bombardment",
        "type": "Enhanced Skill",
        "description": "Menghasilkan Fire DMG masif ke target dan musuh sekitar serta menanamkan Fire Weakness paksa."
      },
      {
        "name": "Fyrefly Type-IV: Complete Combustion",
        "type": "Ultimate",
        "description": "Memasuki kondisi Complete Combustion, menaikkan Speed sebesar 60 dan Weakness Break Efficiency 50%."
      }
    ],
    "talents": [
      {
        "name": "Chrysalid Pyronexus",
        "description": "Semakin rendah HP, semakin tinggi pengurangan damage yang diterima (hingga 40%)."
      }
    ],
    "recommended_build": {
      "main_role": "Super Break Fire DPS",
      "best_artifacts": "4-Piece Iron Cavalry Against the Scourge + 2-Piece Forge of the Kalpagni Lantern",
      "main_stats": "Body: ATK% | Feet: Speed | Sphere: ATK% | Rope: Break Effect",
      "sub_stats": "Break Effect (target 360%+) > Speed (target 150+) > ATK%",
      "summary": "Fokus murni ke Break Effect dan Speed, tidak memerlukan Crit Rate maupun Crit DMG sama sekali."
    },
    "recommended_weapons": [
      {
        "name": "Whereabouts Should Dreams Rest",
        "rarity": 5,
        "rank": 1,
        "note": "Signature LC dengan Break Effect 60% dan debuff Rout penambah Break DMG."
      },
      {
        "name": "Fall of an Aeon",
        "rarity": 5,
        "rank": 2,
        "note": "Opsi Herta Store F2P super gratis dengan ATK bonus dan Break buff."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Harmony Trailblazer",
        "role": "Super Break Enabler",
        "description": "Pondasi utama yang mengaktifkan Super Break DMG."
      },
      {
        "character_name": "Ruan Mei",
        "role": "Break Support",
        "description": "Meningkatkan Break Efficiency 50% dan menunda recovery musuh."
      },
      {
        "character_name": "Gallagher",
        "role": "Healer & Break DPS",
        "description": "Sustain api dengan Besotted debuff dan break reduction tinggi."
      }
    ],
    "materials": [
      {
        "name": "Raging Heart",
        "type": "Penacony Boss Material",
        "count": 65
      },
      {
        "name": "Tatters of Thought",
        "type": "Memory Zone Meme Drop",
        "count": 73
      }
    ],
    "status": "PUBLISHED",
    "created_at": "2026-01-11T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-aventurine",
    "game_id": "game-hsr",
    "name": "Aventurine",
    "slug": "aventurine",
    "portrait": "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=1000&auto=format&fit=crop&q=80",
    "description": "Manajer senior IPC dari Ten Stonehearts (Kakavasha) yang menguasai seni pertaruhan dan perisai tumpuk tanpa batas.",
    "role": "Sustain / Shielder / Sub-DPS",
    "element": "Imaginary",
    "weapon": "The Preservation",
    "rarity": 5,
    "release_date": "2024-04-17",
    "skills": [
      {
        "name": "Cornerstone Deluxe",
        "type": "Skill",
        "description": "Memberikan Fortified Wager shield yang dapat ditumpuk hingga 200% ke seluruh anggota party."
      },
      {
        "name": "Roulette Shark",
        "type": "Ultimate",
        "description": "Mengacak Blind Bet 1-7 poin dan memberikan debuff Unnerve (musuh menerima +15% CRIT DMG)."
      }
    ],
    "talents": [
      {
        "name": "Shot Loaded Right",
        "description": "Saat shield party diserang atau sekutu melancarkan Follow-Up Attack, Aventurine mengumpulkan Blind Bet untuk melancarkan serangan balasan."
      }
    ],
    "recommended_build": {
      "main_role": "Defensive Preservation & Follow-up DPS",
      "best_artifacts": "4-Piece Knight of Purity Palace + 2-Piece Broken Keel",
      "main_stats": "Body: DEF% atau CRIT DMG | Feet: Speed atau DEF% | Sphere: DEF% atau Imaginary DMG | Rope: DEF%",
      "sub_stats": "DEF% (target 4000 DEF) > Speed > Effect RES > CRIT DMG",
      "summary": "Mencapai 4000 DEF otomatis memberi Aventurine 48% CRIT Rate gratis dari passivenya."
    },
    "recommended_weapons": [
      {
        "name": "Inherently Unjust Destiny",
        "rarity": 5,
        "rank": 1,
        "note": "Signature LC penambah DEF 40%, Crit DMG, dan debuff tambahan."
      },
      {
        "name": "Concert for Two",
        "rarity": 4,
        "rank": 2,
        "note": "LC 4-star pemberi DEF% dan DMG bonus per karakter ber-shield."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Dr. Ratio",
        "role": "Main DPS",
        "description": "Pemicu Follow-up attack yang bersinergi langsung dengan Aventurine."
      },
      {
        "character_name": "Topaz & Numby",
        "role": "Sub-DPS / Debuffer",
        "description": "Meningkatkan Follow-up damage dan mengaktifkan Blind Bet berulang kali."
      }
    ],
    "materials": [
      {
        "name": "Suppression Baton",
        "type": "Stagnant Shadow Drop",
        "count": 65
      },
      {
        "name": "Dream Flow Valve",
        "type": "Penacony Material",
        "count": 73
      }
    ],
    "status": "PUBLISHED",
    "created_at": "2026-01-12T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-fanny",
    "game_id": "game-mlbb",
    "name": "Fanny",
    "slug": "fanny",
    "portrait": "https://images.unsplash.com/photo-1545579833-0e15a2cdb26b?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=80",
    "description": "Blade Dancer paling lincah dan beresiko tinggi di Land of Dawn yang bermanuver melintasi dinding menggunakan Steel Cable.",
    "role": "Assassin",
    "element": "Physical",
    "weapon": "Dual Blades & Cables",
    "rarity": 5,
    "release_date": "2016-09-01",
    "skills": [
      {
        "name": "Air Superiority",
        "type": "Passive",
        "description": "Meningkatkan damage terbang sebesar 15%-30% dan meninggalkan Prey Mark yang memulihkan energi."
      },
      {
        "name": "Steel Cable",
        "type": "Skill 2",
        "description": "Menembakkan kabel ke dinding untuk meluncur cepat. Mengaktifkan Tornado Strike otomatis saat mendekati musuh."
      },
      {
        "name": "Cut Throat",
        "type": "Ultimate",
        "description": "Menghujam musuh seketika dengan Physical DMG tinggi yang bertambah berdasarkan stack Prey Mark."
      }
    ],
    "talents": [
      {
        "name": "Custom Assassin Emblem",
        "description": "Thrill + Master Assassin + Killing Spree untuk regen HP dan Movement Speed instan pasca eliminasi."
      }
    ],
    "recommended_build": {
      "main_role": "Fast Jungler & Backline Assassin",
      "best_artifacts": "Hunter Strike + Blade of the Heptaseas + Malefic Roar",
      "main_stats": "Physical PEN > Physical ATK > Cooldown Reduction > Defense",
      "sub_stats": "Maksimalkan Purple Buff agar energi kabel tidak cepat habis.",
      "summary": "Kunci Fanny adalah kecepatan eksekusi kabel garis lurus dan timing kontes monster hutan."
    },
    "recommended_weapons": [
      {
        "name": "Hunter Strike",
        "rarity": 5,
        "rank": 1,
        "note": "Memberikan Physical Attack, Cooldown Reduction, dan Movement Speed pasif."
      },
      {
        "name": "Blade of Despair",
        "rarity": 5,
        "rank": 2,
        "note": "Meningkatkan Physical Attack drastis pada target ber-HP di bawah 50%."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Angela",
        "role": "Support",
        "description": "Ultimate Heartguard memberi shield dan movement speed tambahan saat meluncur."
      },
      {
        "character_name": "Khufra",
        "role": "Tank Roamer",
        "description": "Inisiasi crowd control untuk mengunci target Fanny."
      }
    ],
    "materials": [],
    "status": "PUBLISHED",
    "created_at": "2026-01-13T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-ling",
    "game_id": "game-mlbb",
    "name": "Ling",
    "slug": "ling",
    "portrait": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=1000&auto=format&fit=crop&q=80",
    "description": "Cyan Finch yang melompat di atas dinding Land of Dawn dan memotong musuh dengan pedang tempest mematikan.",
    "role": "Assassin",
    "element": "Physical",
    "weapon": "Rapier of Light",
    "rarity": 5,
    "release_date": "2019-11-02",
    "skills": [
      {
        "name": "Finch Poise",
        "type": "Skill 1",
        "description": "Melompat ke atas dinding untuk mendapat regenerasi Lightness Point dan Crit Chance permanen."
      },
      {
        "name": "Defiant Sword",
        "type": "Skill 2",
        "description": "Menerjang ke arah target dengan damage tusukan yang memicu efek on-hit dan menyembuhkan HP."
      },
      {
        "name": "Tempest of Blades",
        "type": "Ultimate",
        "description": "Menjadi invincible, melompat ke udara, menghantam tanah, dan memunculkan 4 Tempest Blades."
      }
    ],
    "talents": [
      {
        "name": "Custom Assassin Emblem",
        "description": "Swift + Weapon Master + Killing Spree untuk attack speed dan sustainability."
      }
    ],
    "recommended_build": {
      "main_role": "Hyper Jungler Crit-Burst",
      "best_artifacts": "Berserker Fury + Endless Battle + Malefic Roar + Haas Claws",
      "main_stats": "Crit Chance > Physical ATK > Lifesteal > Physical PEN",
      "sub_stats": "Timing memungut 4 pedang Ultimate menentukan apakah kombo reset terus menerus.",
      "summary": "Manfaatkan dinding untuk rotasi tercepat mengambil objektif Turtle dan Lord."
    },
    "recommended_weapons": [
      {
        "name": "Berserker Fury",
        "rarity": 5,
        "rank": 1,
        "note": "Core item Ling pemberi 65 Physical Attack dan 25% Crit Chance."
      },
      {
        "name": "Endless Battle",
        "rarity": 5,
        "rank": 2,
        "note": "True damage pasif setelah menggunakan Defiant Sword."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Tigreal",
        "role": "Tank",
        "description": "Mengumpulkan 5 musuh sekaligus untuk Ultimate tempest Ling."
      }
    ],
    "materials": [],
    "status": "PUBLISHED",
    "created_at": "2026-01-14T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-beatrix",
    "game_id": "game-mlbb",
    "name": "Beatrix",
    "slug": "beatrix",
    "portrait": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1000&auto=format&fit=crop&q=80",
    "description": "Gadis jenius pencipta 4 senjata mekanis canggih: Renner (Sniper), Bennett (Rocket), Wesker (Shotgun), dan Nibiru (SMG).",
    "role": "Marksman",
    "element": "Physical",
    "weapon": "4 Gun Armory",
    "rarity": 4,
    "release_date": "2021-03-19",
    "skills": [
      {
        "name": "Masterful Gunner",
        "type": "Passive",
        "description": "Memungkinkan Beatrix membawa 2 senjata aktif dan menukar senjata cadangan dengan Need Backup."
      },
      {
        "name": "Renner Apathy",
        "type": "Ultimate (Sniper)",
        "description": "Membidik musuh jarak sangat jauh dan menembakkan peluru berdamage masif one-shot."
      }
    ],
    "talents": [
      {
        "name": "Custom Marksman Emblem",
        "description": "Bravery + Fatal + Quantum Charge untuk mobility dan laning sustain."
      }
    ],
    "recommended_build": {
      "main_role": "Gold Lane Flex Marksman",
      "best_artifacts": "Blade of Despair + Malefic Roar + Demon Hunter Sword + Rose Gold Meteor",
      "main_stats": "Physical ATK > Physical PEN > Attack Speed",
      "sub_stats": "Kuasai swapping senjata antara Wesker untuk jarak dekat dan Renner untuk poke.",
      "summary": "Marksman paling fleksibel di pro scene karena adaptabilitas tinggi di segala situasi war."
    },
    "recommended_weapons": [
      {
        "name": "Blade of Despair",
        "rarity": 5,
        "rank": 1,
        "note": "Memaksimalkan burst damage satu tembakan Renner Sniper."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Grock",
        "role": "Tank",
        "description": "Membuat dinding pertahanan untuk memberi ruang tembak Beatrix."
      }
    ],
    "materials": [],
    "status": "PUBLISHED",
    "created_at": "2026-01-15T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-jett",
    "game_id": "game-valorant",
    "name": "Jett",
    "slug": "jett",
    "portrait": "https://images.unsplash.com/photo-1495510096779-5fbe73258c83?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1533310266094-8898a03807dd?w=1000&auto=format&fit=crop&q=80",
    "description": "Duelist gesit dari Korea Selatan yang memanipulasi angin untuk bermanuver tak terduga dan mengeksekusi musuh dengan pisau kunai.",
    "role": "Duelist",
    "element": "Wind / Radiant",
    "weapon": "Operator / Vandal",
    "rarity": 5,
    "release_date": "2020-06-02",
    "skills": [
      {
        "name": "Tailwind",
        "type": "Signature (E)",
        "description": "Dash instan ke arah gerakan setelah mengaktifkan wind charge, kunci meloloskan diri setelah menembak Operator."
      },
      {
        "name": "Updraft",
        "type": "Ability (Q)",
        "description": "Melontarkan Jett tinggi ke udara untuk mengintip angle vertikal yang tidak biasa."
      },
      {
        "name": "Blade Storm",
        "type": "Ultimate (X)",
        "description": "Mempersenjatai diri dengan 5 pisau terbang akurat bahkan saat melayang di udara yang langsung reset saat membunuh."
      }
    ],
    "talents": [
      {
        "name": "Drift",
        "description": "Menahan tombol Space saat di udara membuat Jett melayang perlahan tanpa menerima fall damage."
      }
    ],
    "recommended_build": {
      "main_role": "Primary Entry Fragger & Sniper",
      "best_artifacts": "Heavy Shields + Operator + Cloudburst Smoke",
      "main_stats": "First Blood Frequency > Entry Space Creation > Eco Round Clutch",
      "sub_stats": "Gunakan Tailwind untuk memotong choke point site dan mendirikan Cloudburst sebelum dash.",
      "summary": "Agent paling populer di pro scene VCT untuk pertempuran agresif dan pergerakan cepat."
    },
    "recommended_weapons": [
      {
        "name": "Operator",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata sniper one-shot terbaik dengan sinergi dash melarikan diri."
      },
      {
        "name": "Vandal",
        "rarity": 4,
        "rank": 2,
        "note": "Rifle one-tap headshot di semua jarak pandang."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Sova",
        "role": "Initiator",
        "description": "Recon Bolt memberi wallhack info sebelum Jett entry."
      },
      {
        "character_name": "Omen",
        "role": "Controller",
        "description": "Menutup crossfire musuh dengan Dark Cover."
      }
    ],
    "materials": [],
    "status": "PUBLISHED",
    "created_at": "2026-01-16T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-omen",
    "game_id": "game-valorant",
    "name": "Omen",
    "slug": "omen",
    "portrait": "https://images.unsplash.com/photo-1566650515715-390bca494b46?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1000&auto=format&fit=crop&q=80",
    "description": "Makhluk bayangan Controller yang berburu di antara kabut kegelapan, membutakan musuh, dan berteleportasi melintasi medan tempur.",
    "role": "Controller",
    "element": "Shadow / Radiant",
    "weapon": "Phantom / Ghost",
    "rarity": 5,
    "release_date": "2020-06-02",
    "skills": [
      {
        "name": "Dark Cover",
        "type": "Signature (E)",
        "description": "Menempatkan bola asap bayangan hollow jarak jauh yang beregenerasi otomatis setelah 30 detik."
      },
      {
        "name": "Paranoia",
        "type": "Ability (Q)",
        "description": "Menembakkan proyektil bayangan menembus dinding yang memekakkan dan membutakan penglihatan musuh."
      },
      {
        "name": "From the Shadows",
        "type": "Ultimate (X)",
        "description": "Berteleportasi ke lokasi manapun di seluruh map, dapat membatalkan teleport jika lokasi dijaga."
      }
    ],
    "talents": [
      {
        "name": "Shrouded Step",
        "description": "Teleportasi jarak pendek setelah jeda singkat untuk berpindah elevasi atau mengelabui suara."
      }
    ],
    "recommended_build": {
      "main_role": "Map Controller & Mindgame Lurker",
      "best_artifacts": "Phantom + Heavy Shields + Regular Smokes",
      "main_stats": "Smoke Timing > Paranoia Flash Utility > Clutch Lurking",
      "sub_stats": "Asap Omen berongga di dalam, gunakan untuk one-way smokes di entrance site.",
      "summary": "Controller paling serbaguna di hampir semua map seperti Ascent, Haven, dan Lotus."
    },
    "recommended_weapons": [
      {
        "name": "Phantom",
        "rarity": 5,
        "rank": 1,
        "note": "Tidak memiliki bullet tracer saat menembak menembus asap gelap."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Jett",
        "role": "Duelist",
        "description": "Memanfaatkan Paranoia flash Omen untuk langsung push site."
      }
    ],
    "materials": [],
    "status": "PUBLISHED",
    "created_at": "2026-01-17T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-sova",
    "game_id": "game-valorant",
    "name": "Sova",
    "slug": "sova",
    "portrait": "https://images.unsplash.com/photo-1519756301029-33fef7098ba4?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=1000&auto=format&fit=crop&q=80",
    "description": "Pemanah presisi dari Siberia yang melacak jejak musuh dengan panah sensor canggih dan drone pengintai jarak jauh.",
    "role": "Initiator",
    "element": "Info Hunter",
    "weapon": "Vandal / Sheriff",
    "rarity": 4,
    "release_date": "2020-06-02",
    "skills": [
      {
        "name": "Recon Bolt",
        "type": "Signature (E)",
        "description": "Menembakkan panah pantul yang mendeteksi dan mengungkap lokasi musuh dalam garis pandang."
      },
      {
        "name": "Shock Bolt",
        "type": "Ability (Q)",
        "description": "Panah bermuatan listrik eksplosif untuk membersihkan sudut tersembunyi atau menggagalkan defuse."
      },
      {
        "name": "Hunter Fury",
        "type": "Ultimate (X)",
        "description": "Menembakkan 3 gelombang energi menembus dinding di seluruh map yang memberikan damage mematikan."
      }
    ],
    "talents": [
      {
        "name": "Owl Drone",
        "description": "Mengendalikan drone terbang yang menembakkan dart penanda musuh."
      }
    ],
    "recommended_build": {
      "main_role": "Intel Gathering & Post-Plant Lineup Master",
      "best_artifacts": "Shock Dart Lineups + Vandal + Recon Arrow",
      "main_stats": "Lineup Knowledge > Wallbang Timing > Information Sharing",
      "sub_stats": "Kuasai 2-3 lineup Recon Bolt di setiap site untuk info pembuka ronde instan.",
      "summary": "Kunci kemenangan taktikal di map terbuka seperti Ascent, Breeze, dan Icebox."
    },
    "recommended_weapons": [
      {
        "name": "Vandal",
        "rarity": 5,
        "rank": 1,
        "note": "Sinergi tembakan wallbang setelah musuh terdeteksi Recon Bolt."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Killjoy",
        "role": "Sentinel",
        "description": "Kombinasi lockdown dan Hunter Fury membersihkan seluruh site."
      }
    ],
    "materials": [],
    "status": "PUBLISHED",
    "created_at": "2026-01-18T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-jinshi",
    "game_id": "game-wuwa",
    "name": "Jinhsi",
    "slug": "jinhsi",
    "portrait": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=1000&auto=format&fit=crop&q=80",
    "description": "Magistrate of Jinzhou yang mewarisi kekuatan naga suci Jue, melancarkan serangan Spectro udara dengan damage meledak.",
    "role": "Main DPS",
    "element": "Spectro",
    "weapon": "Broadblade",
    "rarity": 5,
    "release_date": "2024-06-28",
    "skills": [
      {
        "name": "Trailing Lights of Eons",
        "type": "Resonance Skill",
        "description": "Melancarkan serangan tebasan terbang yang dapat diupgrade menjadi Illuminous Epiphany berdamage nuklir."
      },
      {
        "name": "Purification of Evil",
        "type": "Resonance Liberation",
        "description": "Memanggil perwujudan naga Jue untuk menghantam medan tempur dengan Spectro AoE masif."
      }
    ],
    "talents": [
      {
        "name": "Incarnation of Divinity",
        "description": "Mengubah gaya bertarung ke mode Incarnation setelah kombo 4 serangan normal."
      }
    ],
    "recommended_build": {
      "main_role": "Spectro Burst Hypercarry",
      "best_artifacts": "Celestial Light Sonata (5-piece) + Jue (Cost 4 Echo)",
      "main_stats": "Cost 4: CRIT Rate/DMG | Cost 3: Spectro DMG x2 | Cost 1: ATK% x2",
      "sub_stats": "CRIT DMG > CRIT Rate > Resonance Skill DMG > Energy Regeneration",
      "summary": "Kumpulkan Incandescence meter hingga maksimal melalui serangan elemen sekutu sebelum menembakkan Dragon Laser."
    },
    "recommended_weapons": [
      {
        "name": "Ages of Harvest",
        "rarity": 5,
        "rank": 1,
        "note": "Signature weapon pemberi Crit Rate, All-Attribute DMG, dan Skill DMG luar biasa."
      },
      {
        "name": "Lustrous Razor",
        "rarity": 5,
        "rank": 2,
        "note": "Pilihan standar bintang 5 dengan Energy Regen dan Resonance Liberation bonus."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Yuanwu",
        "role": "Off-field Coordinated Attacker",
        "description": "Mengisi stack Incandescence Jinhsi secepat kilat dengan pilar petirnya."
      },
      {
        "character_name": "Verina",
        "role": "Healer / Universal Buffer",
        "description": "Memberikan 15% All-Type DMG buff dan heal konsisten."
      }
    ],
    "materials": [
      {
        "name": "Sentinel Dagger",
        "type": "Jue Boss Drop",
        "count": 26
      },
      {
        "name": "Loong Pearl",
        "type": "Jinzhou Specialty",
        "count": 60
      }
    ],
    "status": "PUBLISHED",
    "created_at": "2026-01-19T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-changli",
    "game_id": "game-wuwa",
    "name": "Changli",
    "slug": "changli",
    "portrait": "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=1000&auto=format&fit=crop&q=80",
    "description": "Konselor Jinzhou berjuluk Burung Phoenix Merah, ahli strategi brilian dengan tarian pedang Fusion berkobar.",
    "role": "Main DPS / Quickswap Buffer",
    "element": "Fusion",
    "weapon": "Sword",
    "rarity": 5,
    "release_date": "2024-07-22",
    "skills": [
      {
        "name": "Tripartite Flames",
        "type": "Resonance Skill",
        "description": "Menerobos musuh dan memasuki kondisi True Sight untuk serangan lanjutan udara atau darat."
      },
      {
        "name": "Radiance of Feathers",
        "type": "Resonance Liberation",
        "description": "Tebasan Phoenix membara yang memberikan 4 stack Enflamement instan."
      }
    ],
    "talents": [
      {
        "name": "Flaming Sacrifice",
        "description": "Outro Skill memberikan 20% Fusion DMG dan 25% Resonance Liberation DMG ke karakter berikutnya."
      }
    ],
    "recommended_build": {
      "main_role": "Fusion Quickswap & Burst DPS",
      "best_artifacts": "Molten Rift Sonata (5-piece) + Inferno Rider (Cost 4 Echo)",
      "main_stats": "Cost 4: CRIT DMG / Rate | Cost 3: Fusion DMG x2 | Cost 1: ATK% x2",
      "sub_stats": "CRIT DMG > CRIT Rate > Skill DMG > ATK%",
      "summary": "Kumpulkan 4 tumpukan Enflamement lalu lepaskan Heavy Attack Flaming Vow."
    },
    "recommended_weapons": [
      {
        "name": "Blazing Brilliance",
        "rarity": 5,
        "rank": 1,
        "note": "Signature weapon penambah Crit DMG tinggi dan ATK buff bertumpuk."
      },
      {
        "name": "Emerald of Genesis",
        "rarity": 5,
        "rank": 2,
        "note": "Senjata standar bintang 5 dengan Crit Rate dan Energy Regen."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Encore",
        "role": "Fusion DPS Partner",
        "description": "Menerima buff Outro Skill Changli secara maksimal."
      },
      {
        "character_name": "Verina",
        "role": "Support",
        "description": "ATK boost dan koordinasi penyembuhan."
      }
    ],
    "materials": [
      {
        "name": "Rage Tacet Core",
        "type": "Inferno Rider Drop",
        "count": 46
      },
      {
        "name": "Pavo Plum",
        "type": "Mt. Firmament Specialty",
        "count": 60
      }
    ],
    "status": "PUBLISHED",
    "created_at": "2026-01-20T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-ellen",
    "game_id": "game-zzz",
    "name": "Ellen Joe",
    "slug": "ellen-joe",
    "portrait": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1000&auto=format&fit=crop&q=80",
    "description": "Pelayan bersirip hiu dari Victoria Housekeeping Co. yang meluncur di es dengan gunting raksasa dan sikap santai.",
    "role": "Attack (Main DPS)",
    "element": "Ice",
    "weapon": "Shears & Tail",
    "rarity": 5,
    "release_date": "2024-07-04",
    "skills": [
      {
        "name": "Flash Freeze Dash",
        "type": "Special Dash",
        "description": "Meluncur cepat di atas permukaan es untuk mengumpulkan stack Flash Freeze Charge."
      },
      {
        "name": "Tail Whip & Shark Scissor",
        "type": "EX Special Attack",
        "description": "Mengibaskan ekor berduri dan memotong musuh dengan gunting es raksasa berdamage Ice beruntun."
      },
      {
        "name": "Avalanche Finale",
        "type": "Ultimate",
        "description": "Menenggelamkan musuh ke dalam lautan es dan mengguntingnya dari bawah menjadi pecahan kristal."
      }
    ],
    "talents": [
      {
        "name": "Cold Storage",
        "description": "Serangan dengan Flash Freeze Charge mendapat +100% Ice DMG dan Crit Rate tambahan."
      }
    ],
    "recommended_build": {
      "main_role": "Fast Ice Attack Hypercarry",
      "best_artifacts": "4-Piece Polar Metal + 2-Piece Woodpecker Electro",
      "main_stats": "Disk 4: CRIT Rate/DMG | Disk 5: Ice DMG% | Disk 6: ATK%",
      "sub_stats": "CRIT DMG > CRIT Rate > PEN Ratio > ATK%",
      "summary": "Gunakan Roaming state dash untuk terus mempertahankan Flash Freeze Charges aktif."
    },
    "recommended_weapons": [
      {
        "name": "Deep Sea Visitor",
        "rarity": 5,
        "rank": 1,
        "note": "Signature W-Engine penambah Crit Rate dan Ice DMG bonus masif."
      },
      {
        "name": "Starlight Engine",
        "rarity": 4,
        "rank": 2,
        "note": "Pilihan F2P craftable terbaik dari Box Gadget."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Lycaon",
        "role": "Stunner",
        "description": "Membuat musuh Daze cepat dan mengurangi Ice RES musuh 25%."
      },
      {
        "character_name": "Soukaku",
        "role": "Support / Buffer",
        "description": "Memberikan hingga 1000 Flat ATK dan 20% Ice DMG bonus ke Ellen."
      }
    ],
    "materials": [],
    "status": "PUBLISHED",
    "created_at": "2026-01-21T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-zhu-yuan",
    "game_id": "game-zzz",
    "name": "Zhu Yuan",
    "slug": "zhu-yuan",
    "portrait": "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1000&auto=format&fit=crop&q=80",
    "description": "Kapten tim Investigasi Kriminal Kepolisian New Eridu (N.E.P.S.) yang menggunakan senjata api Ether berdaya ledak presisi.",
    "role": "Attack (Burst DPS)",
    "element": "Ether",
    "weapon": "Customized Firearms",
    "rarity": 5,
    "release_date": "2024-07-24",
    "skills": [
      {
        "name": "Suppressive Fire",
        "type": "EX Special Attack",
        "description": "Menembakkan peluru Ether beruntun dan mengisi kembali Enhanced Shotgun Shells."
      },
      {
        "name": "Max Obliteration Protocol",
        "type": "Ultimate",
        "description": "Menembakkan laser meriam Ether jarak jauh yang menghancurkan musuh dalam kondisi Stun."
      }
    ],
    "talents": [
      {
        "name": "Tactical Coordination",
        "description": "Meningkatkan Crit Rate sebesar 30% selama 10 detik setelah menggunakan EX Special atau Chain Attack."
      }
    ],
    "recommended_build": {
      "main_role": "Ether Burst Finisher",
      "best_artifacts": "4-Piece Chaotic Metal + 2-Piece Woodpecker Electro",
      "main_stats": "Disk 4: CRIT DMG | Disk 5: Ether DMG% | Disk 6: ATK%",
      "sub_stats": "CRIT DMG > CRIT Rate > ATK% > PEN Ratio",
      "summary": "Kumpulkan peluru Enhanced Shells dan tembakkan kombo Suppressive Fire saat musuh terkena status Stun."
    },
    "recommended_weapons": [
      {
        "name": "Riot Suppressor Mark VI",
        "rarity": 5,
        "rank": 1,
        "note": "Signature W-Engine penambah Crit DMG dan Ether DMG pasif."
      }
    ],
    "recommended_team": [
      {
        "character_name": "Anby Demara",
        "role": "Stunner",
        "description": "Stunner F2P handal pengisi Daze meter musuh."
      },
      {
        "character_name": "Nicole Demara",
        "role": "Support / DEF Shred",
        "description": "Mengelompokkan musuh dan mengurangi defense 40% dengan medan Ether."
      }
    ],
    "materials": [],
    "status": "PUBLISHED",
    "created_at": "2026-01-22T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-destined-one",
    "game_id": "game-wukong",
    "name": "The Destined One (Wukong)",
    "slug": "the-destined-one",
    "portrait": "https://images.unsplash.com/photo-1586508887700-bc5ce707b322?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1000&auto=format&fit=crop&q=80",
    "description": "Kera terpilih yang menapaki jejak Sun Wukong legendaris untuk mengumpulkan 6 relik suci dan membuka takdir abadi.",
    "role": "Warrior / Staff Master",
    "element": "Qi / Transformations",
    "weapon": "Staff of Wukong",
    "rarity": 5,
    "release_date": "2024-08-20",
    "skills": [
      {
        "name": "Immobilize Spell",
        "type": "Mysticism",
        "description": "Membekukan musuh seketika di tempat untuk kombo serangan tanpa cela."
      },
      {
        "name": "Cloud Step",
        "type": "Alteration",
        "description": "Meninggalkan klon bayangan pengumpan dan beralih ke wujud asap tak kasat mata."
      },
      {
        "name": "A Pluck of Many",
        "type": "Strand",
        "description": "Mencabut bulu untuk memanggil belasan klon kera yang mengeroyok target."
      }
    ],
    "talents": [
      {
        "name": "Smash Stance",
        "description": "Sikap tongkat berat dengan serangan lompat penghancur armor musuh saat Focus Point penuh."
      }
    ],
    "recommended_build": {
      "main_role": "Agile Staff Stance & Spell Synergy",
      "best_artifacts": "Pilgrim Set / Golden Suozi Armor",
      "main_stats": "Focus Points > Stamina Recovery > Spell Coolness > Critical Hit",
      "sub_stats": "Kuasai perfect dodge untuk mengisi Focus Point instan tanpa terkena pukulan.",
      "summary": "Kombinasi Immobilize, A Pluck of Many, dan Red Tides transformation mampu mengalahkan boss tersulit."
    },
    "recommended_weapons": [
      {
        "name": "Jingubang Staff",
        "rarity": 5,
        "rank": 1,
        "note": "Senjata pusaka Sun Wukong dengan jangkauan dan Crit rate tertinggi."
      }
    ],
    "recommended_team": [],
    "materials": [],
    "status": "PUBLISHED",
    "created_at": "2026-01-23T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-malenia",
    "game_id": "game-elden-ring",
    "name": "Malenia, Blade of Miquella",
    "slug": "malenia",
    "portrait": "https://images.unsplash.com/photo-1522346513757-54c552451fdc?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1563191911-e65f8655ebf9?w=1000&auto=format&fit=crop&q=80",
    "description": "Demigod tak terkalahkan di Elphael, Brace of the Haligtree. Menguasai pedang katana anggun dan kutukan Scarlet Rot mematikan.",
    "role": "Boss & Lore Character",
    "element": "Scarlet Rot / Physical",
    "weapon": "Hand of Malenia",
    "rarity": 5,
    "release_date": "2022-02-25",
    "skills": [
      {
        "name": "Waterfowl Dance",
        "type": "Katana Dance",
        "description": "Tiga rentetan tebasan tornado beruntun di udara yang menyerap HP pemain tiap kontak."
      },
      {
        "name": "Scarlet Aeonia",
        "type": "Rot Bloom",
        "description": "Meluncur dari langit dan mekar sebagai bunga Scarlet Rot raksasa dengan ledakan racun mematikan."
      }
    ],
    "talents": [
      {
        "name": "Lifesteal on Hit",
        "description": "Menyembuhkan HP dirinya sendiri setiap kali tebasannya mengenai pemain, bahkan saat ditangkis dengan perisai."
      }
    ],
    "recommended_build": {
      "main_role": "Dexterity / Bleed Katana Master",
      "best_artifacts": "Rotten Winged Sword Insignia + Lord of Blood Exultation",
      "main_stats": "Dexterity > Vigor > Endurance > Arcane",
      "sub_stats": "Serangan beruntun memicu kenaikan attack bertingkat.",
      "summary": "Boss paling ikonik dan menantang dalam sejarah game souls-like modern."
    },
    "recommended_weapons": [
      {
        "name": "Hand of Malenia",
        "rarity": 5,
        "rank": 1,
        "note": "Katana terpanjang dengan Ash of War Waterfowl Dance."
      }
    ],
    "recommended_team": [],
    "materials": [],
    "status": "PUBLISHED",
    "created_at": "2026-01-24T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "char-alok",
    "game_id": "game-ff",
    "name": "DJ Alok",
    "slug": "dj-alok",
    "portrait": "https://images.unsplash.com/photo-1506031765313-0bc574a405f0?w=400&auto=format&fit=crop&q=80",
    "full_image": "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1000&auto=format&fit=crop&q=80",
    "description": "Karakter legendaris Free Fire berwujud DJ ternama dunia dengan aura musik yang mempercepat lari dan memulihkan HP rekan tim.",
    "role": "Support / Rusher",
    "element": "Sound Wave",
    "weapon": "MP40 / M1887",
    "rarity": 5,
    "release_date": "2019-11-05",
    "skills": [
      {
        "name": "Drop the Beat",
        "type": "Active Skill",
        "description": "Menciptakan aura 5 meter yang menaikkan moving speed 15% dan memulihkan 3 HP per detik selama 10 detik."
      }
    ],
    "talents": [
      {
        "name": "Party Rhythm",
        "description": "Musik meningkatkan akurasi tembakan saat bergerak cepat."
      }
    ],
    "recommended_build": {
      "main_role": "Rush & Squad Survival Leader",
      "best_artifacts": "Kelly + Hayato + Moco Combo",
      "main_stats": "Movement Speed > Healing Sustainability > Close Range DPS",
      "sub_stats": "Kombinasikan skill Alok dengan shotgun M1887 untuk duel jarak dekat instan.",
      "summary": "Karakter paling dicintai dalam sejarah Free Fire Indonesia untuk mode Battle Royale dan Clash Squad."
    },
    "recommended_weapons": [
      {
        "name": "MP40",
        "rarity": 5,
        "rank": 1,
        "note": "SMG dengan fire rate tercepat di Free Fire."
      },
      {
        "name": "M1887",
        "rarity": 5,
        "rank": 2,
        "note": "Shotgun dua peluru berdamage mematikan one-tap."
      }
    ],
    "recommended_team": [],
    "materials": [],
    "status": "PUBLISHED",
    "created_at": "2026-01-25T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  }
];

export const SEED_GUIDES: Guide[] = [
  {
    "id": "guide-neuvillette-build",
    "game_id": "game-genshin",
    "title": "Build Neuvillette Terbaik 2026: Senjata, Artefak, dan Tim Hypercarry",
    "slug": "build-neuvillette-terbaik-senjata-artefak-tim",
    "category": "Character Build",
    "thumbnail": "https://images.unsplash.com/photo-1525268771113-32d9e9021a97?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Panduan lengkap memaksimalkan damage Charged Attack Neuvillette: pilihan artefak Marechaussee Hunter, senjata F2P terbaik, dan kombinasi tim Furina Kazuha.",
    "content": "\n# Panduan Lengkap Build Neuvillette (Genshin Impact)\n\nNeuvillette adalah salah satu On-field Hydro DPS terkuat di Genshin Impact. Mekanisme utamanya bertumpu pada **Charged Attack: Equitable Judgment**, yaitu semburan air jarak jauh berkekuatan tinggi yang melibas semua musuh di jalurnya.\n\n---\n\n## 1. Prioritas Talent\n1. **Normal Attack / Charged Attack** (Prioritas Utama — Tingkatkan hingga Level 10 / Crown)\n2. **Elemental Burst** (Level 8+)\n3. **Elemental Skill** (Level 8+)\n\n---\n\n## 2. Pilihan Artefak Terbaik\n\n### Rekomendasi Utama: 4-Piece Marechaussee Hunter\n- **2-Piece:** Normal dan Charged Attack DMG +15%.\n- **4-Piece:** Saat HP saat ini bertambah atau berkurang, CRIT Rate meningkat 12% selama 5 detik (dapat ditumpuk hingga 3 kali, total **+36% CRIT Rate**).\n- Karena Neuvillette menguras HP-nya sendiri saat menembakkan Charged Attack dan menyerap Sourcewater Droplets untuk memulihkan HP, ia dapat mempertahankan 36% CRIT Rate ini secara terus menerus!\n\n### Main Stat Artefak:\n- **Sands:** HP%\n- **Goblet:** Hydro DMG Bonus atau HP%\n- **Circlet:** CRIT DMG (karena Anda sudah mendapatkan 36% CRIT Rate dari 4-set Marechaussee Hunter)\n\n### Target Sub-Stat:\nCRIT DMG > CRIT Rate (cukup 40%-55% sebelum buff) > HP% > Energy Recharge (110%-120%).\n\n---\n\n## 3. Pilihan Senjata (Weapon)\n\n1. **Tome of the Eternal Flow (Bintang 5 — Signature)**\n   Menyediakan CRIT DMG 88.2%, HP bertambah, dan memberi buff Charged Attack DMG hingga 42% saat HP berfluktuasi.\n2. **Sacrificial Jade (Bintang 4 — Battle Pass)**\n   Opsi bintang 4 terkuat. Memberi CRIT Rate 36.8% dan meningkatkan Max HP sebesar 64% saat berada di luar medan tempur selama 5 detik.\n3. **Prototype Amber (Bintang 4 — F2P Craftable)**\n   Dapat dibuat gratis di Blacksmith. Memberi HP 41.3%, regenerasi energi pasca Burst, dan sedikit healing ke seluruh tim.\n\n---\n\n## 4. Rekomendasi Komposisi Tim\n\n### Komposisi Hypercarry Fontaine\n- **Neuvillette** (Main DPS)\n- **Furina** (Sub-DPS & Fanfare Damage Buffer)\n- **Kaedehara Kazuha** (Swirl Hydro Shred & Elemental DMG Buffer)\n- **Zhongli** / **Baizhu** (Shielder & Interruption Resistance)\n\nDengan komposisi ini, semburan air Neuvillette dapat menembus 80.000 hingga 120.000 damage per tick secara konsisten di Spiral Abyss Lantai 12!\n",
    "author": "Seraphi Editorial Team",
    "published_at": "2026-02-15T10:00:00.000Z",
    "updated_at": "2026-03-01T14:00:00.000Z",
    "tags": [
      "Genshin Impact",
      "Neuvillette",
      "Character Build",
      "Hydro",
      "Fontaine"
    ],
    "status": "PUBLISHED",
    "views": 12450,
    "featured_image": "https://images.unsplash.com/photo-1525268771113-32d9e9021a97?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-furina-build",
    "game_id": "game-genshin",
    "title": "Build Furina Sub-DPS & Buffer: Maksimalkan Fanfare Points",
    "slug": "build-furina-sub-dps-buffer-fanfare",
    "category": "Character Build",
    "thumbnail": "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Cara optimal memainkan Furina sebagai buffer universal nomor satu di Genshin Impact. Penjelasan artefak Golden Troupe dan manajemen rotasi HP tim.",
    "content": "\n# Build Furina: Sub-DPS & Buffer Universal\n\nFurina mengubah cara menyusun tim di Genshin Impact. Melalui mekanik Fanfare pada Elemental Burst miliknya, seluruh anggota party bisa menerima peningkatan All-Elemental DMG hingga **75%**!\n\n## Kunci Utama Artefak: 4-Piece Golden Troupe\nGolden Troupe memberikan peningkatan Elemental Skill DMG hingga total **70%** saat karakter berada di luar arena (off-field). Karena 3 anggota Salon Solitaire Furina terus menyerang secara otomatis, Furina menghasilkan puluhan ribu damage pasif setiap detiknya.\n\n## Rekomendasi Senjata F2P\nPancing senjata **Fleuve Cendre Ferryman** di perairan Fontaine. Senjata ini memberikan Energy Recharge tinggi dan tambahan 16% CRIT Rate pada Elemental Skill!\n",
    "author": "Seraphi Editorial Team",
    "published_at": "2026-02-16T12:00:00.000Z",
    "updated_at": "2026-03-01T12:00:00.000Z",
    "tags": [
      "Genshin Impact",
      "Furina",
      "Build",
      "Hydro",
      "Buffer"
    ],
    "status": "PUBLISHED",
    "views": 9800,
    "featured_image": "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-genshin-beginner",
    "game_id": "game-genshin",
    "title": "Panduan Pemula Genshin Impact: Cara Cepat Menaikkan AR dan Menghemat Primogem",
    "slug": "panduan-pemula-genshin-impact-ar-primogem",
    "category": "Beginner Guide",
    "thumbnail": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Tips esensial untuk pemain baru Genshin Impact: prioritas quest harian, efisiensi resin, hindari gacha banner standar, dan rute eksplorasi cepat.",
    "content": "\n# Panduan Pemula Genshin Impact\n\nMemulai petualangan di dunia Teyvat bisa terasa luar biasa luas. Berikut tips paling krusial agar akun Anda berkembang efisien sejak hari pertama:\n\n1. **Gunakan Primogem Hanya untuk Intertwined Fate (Batu Ungu)**: Jangan pernah menukar Primogem untuk Acquaint Fate (Batu Biru) karena banner standar bisa didapatkan gratis.\n2. **Keluarkan Original Resin Setiap Hari**: Jangan biarkan resin 160/160 penuh. Gunakan untuk Ley Line Mora/EXP Book di awal game.\n3. **Fokus Build 1 Karakter DPS Utama Dulu**: Jangan bagi rata resource ke 10 karakter sekaligus.\n4. **Buka Semua Waypoint dan Teleport**: Ini akan mempercepat perjalanan quest harian.\n",
    "author": "Rian Pratama",
    "published_at": "2026-02-10T09:00:00.000Z",
    "updated_at": "2026-02-28T08:00:00.000Z",
    "tags": [
      "Genshin Impact",
      "Pemula",
      "Tips & Trik",
      "Primogem"
    ],
    "status": "PUBLISHED",
    "views": 15420,
    "featured_image": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-acheron-build",
    "game_id": "game-hsr",
    "title": "Build Acheron Honkai Star Rail: Relic, Light Cone, & Sinergi Nihility",
    "slug": "build-acheron-honkai-star-rail-relic-light-cone",
    "category": "Character Build",
    "thumbnail": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Panduan lengkap Emanator Nihility Acheron: mekanisme akumulasi 9 stack Crimson Knot, relic Pioneer Diver, dan Light Cone terbaik.",
    "content": "\n# Panduan Lengkap Build Acheron (Honkai: Star Rail)\n\nAcheron mendominasi meta Honkai Star Rail dengan mekanik unik: **ia tidak menggunakan Energy**. Ultimate miliknya aktif setelah mengumpulkan 9 poin Slashed Dream melalui debuff yang diberikan oleh dirinya atau rekan tim.\n\n## Pilihan Relic & Planar Ornament\n- **Cavern Relic:** 4-Piece Pioneer Diver of Dead Waters (memberi Crit Rate, Crit DMG, dan bonus damage pada musuh yang terkena 3 debuff).\n- **Planar Ornament:** 2-Piece Izumo Gensei and Takama Divine Realm (memberi +12% ATK dan +12% CRIT Rate jika ada karakter se-path Nihility di party).\n\n## Komposisi Tim Wajib:\nPasif Acheron (E0) mewajibkan **minimal 2 karakter Nihility lain** untuk membuka pengali damage independen 160%:\n- **Acheron** (Main DPS)\n- **Pela** (AoE Defense Shred via Resolution Shines LC)\n- **Silver Wolf** / **Jiaoqiu** / **Black Swan** (Debuffer)\n- **Aventurine** / **Gallagher** (Sustain ber-debuff)\n",
    "author": "Seraphi Editorial Team",
    "published_at": "2026-02-18T14:00:00.000Z",
    "updated_at": "2026-03-02T10:00:00.000Z",
    "tags": [
      "Honkai: Star Rail",
      "Acheron",
      "Build",
      "Nihility"
    ],
    "status": "PUBLISHED",
    "views": 18900,
    "featured_image": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-firefly-super-break",
    "game_id": "game-hsr",
    "title": "Guide Firefly Super Break: Ruan Mei, Harmony MC & Cara Hit Jutaan Damage",
    "slug": "guide-firefly-super-break-ruan-mei-harmony-mc",
    "category": "Character Build",
    "thumbnail": "https://images.unsplash.com/photo-1509462757601-b142a3aa6061?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Rahasia menghasilkan damage ratusan ribu hingga jutaan dengan SAM Firefly melalui meta Super Break. Pembahasan stat Break Effect dan Speed tuning.",
    "content": "\n# Panduan Meta Super Break: SAM Firefly\n\nFirefly merevolusi cara bermain Honkai: Star Rail dengan membuang ketergantungan pada CRIT Rate dan CRIT DMG. Semua damage Firefly bergantung pada **Break Effect** dan **Super Break DMG**.\n\n## Stat Prioritas:\n- **Break Effect:** Minimal 360% saat dalam kondisi Complete Combustion.\n- **Speed:** Minimal 150 (atau 154+ di luar pertempuran) agar dapat bertindak 4 kali dalam 1 siklus Ultimate.\n- **ATK%:** Konversi pasif Firefly mengubah ATK di atas 1800 menjadi Break Effect tambahan.\n\n## Tim Kombo Emas:\nFirefly + Harmony Trailblazer + Ruan Mei + Gallagher. Komposisi ini adalah salah satu tim paling mematikan dan paling konsisten menembus Memory of Chaos 12 dan Apocalyptic Shadow!\n",
    "author": "Budi Santoso",
    "published_at": "2026-02-20T11:00:00.000Z",
    "updated_at": "2026-03-01T15:00:00.000Z",
    "tags": [
      "Honkai: Star Rail",
      "Firefly",
      "Super Break",
      "Destruction"
    ],
    "status": "PUBLISHED",
    "views": 14200,
    "featured_image": "https://images.unsplash.com/photo-1509462757601-b142a3aa6061?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-fanny-cable-mastery",
    "game_id": "game-mlbb",
    "title": "Cara Menguasai Fanny MLBB: Rumus Kabel Garis Lurus & Tips Hemat Energi",
    "slug": "cara-menguasai-fanny-mlbb-rumus-kabel-hemat-energi",
    "category": "Tips & Tricks",
    "thumbnail": "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Tutorial lengkap manuver kabel Fanny Mobile Legends: cara melakukan kabel lurus, kabel silang di celah tembok sempit, dan trik menjaga Purple Buff.",
    "content": "\n# Panduan Lengkap Menguasai Fanny Mobile Legends\n\nFanny dikenal sebagai salah satu hero mekanik tertinggi di Mobile Legends. Sekali dikuasai, Fanny bisa meratakan formasi lawan sebelum musuh sempat bereaksi.\n\n## 1. Memahami Vektor Tarikan Kabel\nKabel Fanny bergerak menuju titik perpotongan antara kabel pertama dan kabel kedua:\n- **Kabel Lurus:** Tembakkan kabel 1 ke tembok depan dan kabel 2 ke tembok sejajar di sisi berlawanan untuk meluncur lurus dengan kecepatan maksimum.\n- **Kabel Belok (V-Shape):** Tembakkan kabel kedua dengan sudut 90 derajat untuk berbelok tajam di tikungan jungle.\n\n## 2. Kunci Manajemen Energi\nTanpa Purple Buff, energi Fanny akan terkuras setelah 3-4 kabel. Selalu prioritaskan mengamankan Buff Ungu Anda tepat waktu di menit 00:35 dan tiap 2 menit sekali setelahnya.\n",
    "author": "Kevin \"Ghost\" Wijaya",
    "published_at": "2026-02-12T16:00:00.000Z",
    "updated_at": "2026-02-27T10:00:00.000Z",
    "tags": [
      "Mobile Legends",
      "Fanny",
      "Assassin",
      "Guide Mekanik"
    ],
    "status": "PUBLISHED",
    "views": 22100,
    "featured_image": "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-mlbb-jungler-rotation",
    "game_id": "game-mlbb",
    "title": "Tips Rotasi Jungler Mobile Legends: Maksimalkan Turtle & Lord Control",
    "slug": "tips-rotasi-jungler-mobile-legends-turtle-lord",
    "category": "Walkthrough",
    "thumbnail": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Rute jungle optimal menit 0 hingga menit 15: cara gank lane lawan, timing Retribution saat adu objektif, dan tips comeback saat tertinggal gold.",
    "content": "\n# Panduan Rotasi Jungler Modern MLBB\n\nMenjadi Jungler bukan cuma soal mengeliminasi hero lawan, melainkan memegang kendali tempo seluruh permainan melalui kontrol objektif:\n\n1. **Jalur Menit Pertama:** Awali dari buff yang berseberangan dengan lokasi Turtle pertama, agar saat Turtle muncul di menit 02:00, Anda sudah berada di posisi level 4 tepat di lane Turtle.\n2. **Kalkulasi Retribution:** Periksa angka damage Retribution di atas ikon skill. Jangan menekan Retribution sebelum HP Turtle/Lord berada di bawah ambang batas tersebut.\n",
    "author": "Kevin \"Ghost\" Wijaya",
    "published_at": "2026-02-14T08:00:00.000Z",
    "updated_at": "2026-02-25T11:00:00.000Z",
    "tags": [
      "Mobile Legends",
      "Jungler",
      "Rotasi",
      "Esports"
    ],
    "status": "PUBLISHED",
    "views": 11300,
    "featured_image": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-valorant-aim-crosshair",
    "game_id": "game-valorant",
    "title": "Panduan Aim & Crosshair Placement Valorant untuk Pemula Menuju Immortal",
    "slug": "panduan-aim-crosshair-placement-valorant-pemula",
    "category": "Beginner Guide",
    "thumbnail": "https://images.unsplash.com/photo-1562953842-188bb7ce6588?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Cara melatih crosshair placement setinggi kepala, setting sensivitas eDPI yang tepat, dan rutinitas latihan The Range 15 menit setiap hari.",
    "content": "\n# Panduan Aim & Crosshair Placement Valorant\n\nDalam game tactical shooter seperti Valorant, 70% keberhasilan duel ditentukan sebelum Anda menekan klik kiri: yaitu **Crosshair Placement**.\n\n## 1. Selalu Tempatkan Crosshair Setinggi Kepala\nGunakan indikator visual pada dinding map (seperti garis kotak, ventilasi, atau garis pintu) sebagai acuan ketinggian kepala musuh. Jangan pernah menundukkan crosshair ke arah lantai saat berjalan!\n\n## 2. Hitung eDPI yang Stabil\n- **Rumus eDPI:** DPI Mouse × Sensitivitas In-game.\n- Standar pemain profesional berkisar antara **200 hingga 320 eDPI** (misalnya 800 DPI dengan in-game sens 0.3 - 0.35). Nilai ini memberi kestabilan mikro-koreksi tanpa kehilangan kemampuan memutar 180 derajat.\n",
    "author": "Dimas \"Apex\" Nugraha",
    "published_at": "2026-02-17T15:00:00.000Z",
    "updated_at": "2026-02-28T09:00:00.000Z",
    "tags": [
      "Valorant",
      "Aim",
      "Crosshair",
      "FPS Guide"
    ],
    "status": "PUBLISHED",
    "views": 16700,
    "featured_image": "https://images.unsplash.com/photo-1562953842-188bb7ce6588?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-sova-ascent-lineups",
    "game_id": "game-valorant",
    "title": "Lineups Sova Ascent Paling Efektif untuk Info & Post-Plant Kill",
    "slug": "lineups-sova-ascent-paling-efektif-info-post-plant",
    "category": "Tips & Tricks",
    "thumbnail": "https://images.unsplash.com/photo-1455165814004-1126a7199f9b?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Daftar koordinat panah Recon Bolt dan Shock Dart terbaik di map Ascent untuk membuka site A dan B serta menggagalkan defuse dari jarak aman.",
    "content": "\n# Lineups Panah Sova di Map Ascent\n\nMap Ascent adalah taman bermain utama Sova karena banyak sudut terbuka dan dinding tembus peluru (paper-thin walls).\n\n## Recon Bolt B Site Main dari A Lobby\nBerdiri di pojok pintu A Lobby, arahkan garis HUD Charge Bar tepat di ujung antena menara, lakukan 1 Bounce dengan 2 Bar daya. Panah akan mendarat di atas jendela B Main dan mengungkap seluruh pergerakan musuh yang mencoba menerobos!\n",
    "author": "Dimas \"Apex\" Nugraha",
    "published_at": "2026-02-19T13:00:00.000Z",
    "updated_at": "2026-02-26T14:00:00.000Z",
    "tags": [
      "Valorant",
      "Sova",
      "Lineups",
      "Ascent"
    ],
    "status": "PUBLISHED",
    "views": 8900,
    "featured_image": "https://images.unsplash.com/photo-1455165814004-1126a7199f9b?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-jinhsi-wuwa-build",
    "game_id": "game-wuwa",
    "title": "Guide Jinhsi Wuthering Waves: Rotasi Skill & Komposisi Tim Resonance",
    "slug": "guide-jinhsi-wuthering-waves-rotasi-skill-tim",
    "category": "Character Build",
    "thumbnail": "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Maksimalkan damage Dragon Laser Jinhsi dengan pengisian bar Incandescence instan lewat Yuanwu dan Yinlin. Panduan Echo Jue dan main stats.",
    "content": "\n# Panduan Build Jinhsi (Wuthering Waves)\n\nJinhsi adalah nuklir Spectro nomor satu di Wuthering Waves. Kunci mencapai damage ratusan ribu adalah mengisi gauge **Incandescence** hingga maksimal (50 poin) sebelum melepaskan Skill tingkat 4: **Illuminous Epiphany**.\n\n## Echo Terbaik: 5-Piece Celestial Light\n- **Main Echo (Cost 4):** Jue (Memberi Resonance Skill DMG bonus dan serangan naga otomatis).\n- **Prioritas Stat:** Crit DMG > Crit Rate > Spectro DMG Bonus.\n",
    "author": "Seraphi Editorial Team",
    "published_at": "2026-02-21T10:00:00.000Z",
    "updated_at": "2026-03-01T16:00:00.000Z",
    "tags": [
      "Wuthering Waves",
      "Jinhsi",
      "Spectro",
      "Build"
    ],
    "status": "PUBLISHED",
    "views": 13100,
    "featured_image": "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-changli-wuwa-build",
    "game_id": "game-wuwa",
    "title": "Build Changli Fusion DPS: Timing Forte Circuit & True Sight Combo",
    "slug": "build-changli-fusion-dps-timing-forte-circuit",
    "category": "Character Build",
    "thumbnail": "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Kuasai manuver udara anggun Changli: cara mengumpulkan stack Enflamement dengan cepat, timing dodge counter, dan sinergi tim bersama Encore.",
    "content": "\n# Build & Rotasi Changli (Wuthering Waves)\n\nChangli menghadirkan gameplay paling dinamis dengan perpindahan mulus antara serangan darat dan tebasan udara berselimut api phoenix.\n\n## Mekanik True Sight\nSetiap kali menggunakan Resonance Skill atau Intro Skill, Changli memasuki kondisi **True Sight**. Menekan Basic Attack akan mengeksekusi serangan Conquest/Charge yang langsung menambah 1 tumpukan Enflamement. Kumpulkan 4 tumpukan untuk melepaskan Heavy Attack Flaming Vow dengan pengali damage masif!\n",
    "author": "Seraphi Editorial Team",
    "published_at": "2026-02-22T09:00:00.000Z",
    "updated_at": "2026-02-28T10:00:00.000Z",
    "tags": [
      "Wuthering Waves",
      "Changli",
      "Fusion",
      "Build"
    ],
    "status": "PUBLISHED",
    "views": 10400,
    "featured_image": "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-ellen-joe-zzz",
    "game_id": "game-zzz",
    "title": "Panduan Ellen Joe Zenless Zone Zero: Flash Freeze Dash & Combo Anomaly",
    "slug": "panduan-ellen-joe-zenless-zone-zero-flash-freeze",
    "category": "Character Build",
    "thumbnail": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Cara memanfaatkan Roaming State Ellen Joe untuk mendapatkan Flash Freeze charge gratis, kombo gunting es, dan tim mono-ice bersama Lycaon Soukaku.",
    "content": "\n# Panduan Ellen Joe (Zenless Zone Zero)\n\nEllen Joe adalah DPS tipe Attack berelemen Ice yang mengandalkan mobilitas tinggi untuk memotong musuh sebelum mereka sempat bereaksi.\n\n## Tips Mengumpulkan Flash Freeze Charge\nTahan tombol Dash untuk memasuki kondisi **Roaming State**, lalu tekan Basic Attack saat berada di dekat musuh untuk melakukan guntingan berputar yang langsung mengisi 3 muatan Flash Freeze Charge secara instan!\n",
    "author": "Seraphi Editorial Team",
    "published_at": "2026-02-23T14:00:00.000Z",
    "updated_at": "2026-03-02T11:00:00.000Z",
    "tags": [
      "Zenless Zone Zero",
      "Ellen Joe",
      "Ice DPS",
      "Build"
    ],
    "status": "PUBLISHED",
    "views": 11900,
    "featured_image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-malenia-elden-ring",
    "game_id": "game-elden-ring",
    "title": "Cara Mengalahkan Boss Malenia di Elden Ring: Trik Hindari Waterfowl Dance",
    "slug": "cara-mengalahkan-boss-malenia-elden-ring-waterfowl-dance",
    "category": "Boss Guide",
    "thumbnail": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Panduan bertahan hidup melawan Malenia Blade of Miquella: trik lari melingkar untuk dodgeroll Waterfowl Dance dan senjata counter Frostbite/Bleed.",
    "content": "\n# Panduan Mengalahkan Malenia (Elden Ring)\n\nMalenia adalah salah satu boss tersulit dalam sejarah game FromSoftware karena kemampuan lifesteal pasif dan serangan legendaris **Waterfowl Dance**.\n\n## Cara Menghindari Waterfowl Dance:\n1. **Fase 1 Tebasan:** Begitu Malenia melayang di udara, segera lari menjauh secepat mungkin dan melompat di akhir tebasan.\n2. **Fase 2 Tebasan:** Roll ke arah depan menembus tubuh Malenia tepat saat ia meluncur.\n3. **Fase 3 Tebasan:** Cukup berjalan ke arah berlawanan tanpa panik karena tracking tebasan ketiga memiliki jeda.\n",
    "author": "Fajar \"Souls\" Hidayat",
    "published_at": "2026-02-11T16:00:00.000Z",
    "updated_at": "2026-02-27T12:00:00.000Z",
    "tags": [
      "Elden Ring",
      "Malenia",
      "Boss Guide",
      "Souls-like"
    ],
    "status": "PUBLISHED",
    "views": 25400,
    "featured_image": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-erlang-wukong",
    "game_id": "game-wukong",
    "title": "Tips Melawan Erlang Shen di Black Myth: Wukong — Manajemen Qi & Spell",
    "slug": "tips-melawan-erlang-shen-black-myth-wukong",
    "category": "Boss Guide",
    "thumbnail": "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Strategi mengikis armor kebal Erlang Sacred Divinity: penggunaan Plantain Fan untuk memecah perisai dan kombinasi transformasi Red Tides.",
    "content": "\n# Strategi Melawan Erlang Shen (Black Myth: Wukong)\n\nErlang Shen adalah secret boss terkuat di Black Myth: Wukong dengan perisai pelindung yang menolak hampir semua damage biasa.\n\n## Kunci Utama: Gunakan Vessel Plantain Fan\nAktifkan Plantain Fan saat pertarungan dimulai untuk memunculkan tornado angin yang langsung meremukkan perisai Erlang hingga nol, membuka kesempatan kombo tongkat Smash Stance penuh!\n",
    "author": "Fajar \"Souls\" Hidayat",
    "published_at": "2026-02-24T12:00:00.000Z",
    "updated_at": "2026-03-01T08:00:00.000Z",
    "tags": [
      "Black Myth: Wukong",
      "Erlang Shen",
      "Boss Guide"
    ],
    "status": "PUBLISHED",
    "views": 19800,
    "featured_image": "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-pubgm-settings",
    "game_id": "game-pubgm",
    "title": "Sensitivitas & Setting Kontrol PUBG Mobile Terbaik 2026: No Recoil",
    "slug": "sensitivitas-setting-kontrol-pubg-mobile-terbaik",
    "category": "Tips & Tricks",
    "thumbnail": "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Kode layout 4 jari terbaik dan setting Gyroscope selalu aktif untuk menembak lurus tanpa hentakan recoil pada senjata M416 dan Beryl M762.",
    "content": "\n# Setting Sensitivitas PUBG Mobile Terbaik\n\nMenembak stabil dari jarak jauh membutuhkan kombinasi layout tombol yang responsif dan pengaturan Gyroscope yang pas.\n\n## Rekomendasi Gyroscope ADS (Always On):\n- No Scope: 300%\n- Red Dot / Holographic: 300%\n- 2x Scope: 300%\n- 3x Scope: 240%\n- 4x Scope: 210%\n- 6x Scope (Adjust ke 3x): 120%\n",
    "author": "Reza \"Sniper\" Pratama",
    "published_at": "2026-02-13T10:00:00.000Z",
    "updated_at": "2026-02-28T14:00:00.000Z",
    "tags": [
      "PUBG Mobile",
      "Sensitivitas",
      "Gyroscope",
      "No Recoil"
    ],
    "status": "PUBLISHED",
    "views": 24100,
    "featured_image": "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-pubgm-erangel-loot",
    "game_id": "game-pubgm",
    "title": "Rute Looting Terbaik di Map Erangel PUBG Mobile: Pochinki vs Sosnovka",
    "slug": "rute-looting-terbaik-erangel-pubg-mobile",
    "category": "Walkthrough",
    "thumbnail": "https://images.unsplash.com/photo-1462899006636-339e08d1844e?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Pilihan drop zone teraman untuk push rank vs hot-drop untuk farming kill di Erangel. Lokasi spawn kendaraan flare gun rahasia.",
    "content": "\n# Rute Looting Map Erangel PUBG Mobile\n\nMengetahui kapan harus bertempur di Pochinki atau rotasi tenang di Mylta Power adalah kunci meraih Winner Winner Chicken Dinner secara konsisten.\n",
    "author": "Reza \"Sniper\" Pratama",
    "published_at": "2026-02-15T15:00:00.000Z",
    "updated_at": "2026-02-25T11:00:00.000Z",
    "tags": [
      "PUBG Mobile",
      "Erangel",
      "Looting",
      "Battle Royale"
    ],
    "status": "PUBLISHED",
    "views": 8700,
    "featured_image": "https://images.unsplash.com/photo-1462899006636-339e08d1844e?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-ff-headshot-settings",
    "game_id": "game-ff",
    "title": "Panduan Headshot Free Fire: Setting DPI & Tarikan Aim Sensitivitas",
    "slug": "panduan-headshot-free-fire-setting-dpi-aim",
    "category": "Tips & Tricks",
    "thumbnail": "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Trik tarikan tombol tembak ke atas (drag shot) agar peluru otomatis mengunci kepala musuh. Rekomendasi sensitivitas lihat sekeliling 100.",
    "content": "\n# Panduan Auto Headshot Drag Shot Free Fire\n\nTrik Drag Shot adalah teknik wajib bagi setiap pemain Free Fire untuk menumbangkan lawan dalam hitungan sepersekian detik menggunakan senjata shotgun atau SMG.\n",
    "author": "Ilham \"Booyah\" Ramadhan",
    "published_at": "2026-02-14T11:00:00.000Z",
    "updated_at": "2026-02-26T10:00:00.000Z",
    "tags": [
      "Free Fire",
      "Headshot",
      "Sensitivitas",
      "Tips & Trik"
    ],
    "status": "PUBLISHED",
    "views": 29500,
    "featured_image": "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-ff-clash-squad-combos",
    "game_id": "game-ff",
    "title": "Kombinasi Skill Karakter Free Fire Terbaik untuk Push Rank Clash Squad",
    "slug": "kombinasi-skill-karakter-free-fire-clash-squad",
    "category": "Character Build",
    "thumbnail": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Rekomendasi kombinasi karakter aktif dan pasif paling mendominasi mode CS: Alok, Tatsuya, Hayato, dan Kelly untuk mobilitas tak tertandingi.",
    "content": "\n# Kombinasi Skill Terbaik Clash Squad Free Fire\n\nDi arena Clash Squad yang sempit dan berdurasi kilat, mobilitas dan burst armor penetration adalah penentu utama kemenangan tim.\n",
    "author": "Ilham \"Booyah\" Ramadhan",
    "published_at": "2026-02-16T14:00:00.000Z",
    "updated_at": "2026-02-27T08:00:00.000Z",
    "tags": [
      "Free Fire",
      "Clash Squad",
      "Karakter",
      "Skill Build"
    ],
    "status": "PUBLISHED",
    "views": 17300,
    "featured_image": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-farming-primogem-jade",
    "game_id": "game-genshin",
    "title": "Farming Guide Primogem & Stellar Jade: Rute Harian & Event Gacha Hemat",
    "slug": "farming-guide-primogem-stellar-jade-gacha-hemat",
    "category": "Farming Guide",
    "thumbnail": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Cara mengumpulkan 80-90 tarikan gacha setiap patch sebagai pemain F2P murni di Genshin Impact dan Honkai: Star Rail.",
    "content": "\n# Rute Farming Primogem & Stellar Jade Maksimal\n\nBagi pemain gratisan (F2P), disiplin menyelesaikan Daily Commission, Spiral Abyss, Simulated Universe, dan Event Terbatas menjamin Anda mendapatkan minimal 1 karakter bintang 5 setiap update patch!\n",
    "author": "Seraphi Editorial Team",
    "published_at": "2026-02-22T15:00:00.000Z",
    "updated_at": "2026-03-01T12:00:00.000Z",
    "tags": [
      "Genshin Impact",
      "Honkai: Star Rail",
      "Farming",
      "F2P Gacha"
    ],
    "status": "PUBLISHED",
    "views": 21800,
    "featured_image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "guide-relic-artifact-priority",
    "game_id": "game-hsr",
    "title": "Panduan Memilih Relic & Artefak: Prioritas Sub-Stat vs Main-Stat di Game RPG",
    "slug": "panduan-memilih-relic-artefak-prioritas-stat",
    "category": "Beginner Guide",
    "thumbnail": "https://images.unsplash.com/photo-1513257805917-a0da1146eb15?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Jangan tertipu bonus set 4-piece! Kapan Anda harus memprioritaskan sub-stat berkualitas tinggi dibanding memaksakan set artefak yang buruk.",
    "content": "\n# Kaidah Emas Pemilihan Stat di Game Gacha RPG\n\nSalah satu kesalahan paling umum pemain pemula adalah memaksakan bonus 4-piece set padahal stat yang didapatkan tidak mendukung karakter. Main stat yang tepat selalu mengalahkan set bonus yang salah!\n",
    "author": "Seraphi Editorial Team",
    "published_at": "2026-02-25T11:00:00.000Z",
    "updated_at": "2026-03-02T09:00:00.000Z",
    "tags": [
      "Guide RPG",
      "Artefak",
      "Relic",
      "Tips & Trik"
    ],
    "status": "PUBLISHED",
    "views": 12100,
    "featured_image": "https://images.unsplash.com/photo-1513257805917-a0da1146eb15?w=800&auto=format&fit=crop&q=80"
  }
];

export const SEED_NEWS: News[] = [
  {
    "id": "news-genshin-5-4",
    "game_id": "game-genshin",
    "title": "Genshin Impact Versi 5.4 Resmi Diumumkan: Banners Baru & Ekspansi Wilayah Natlan",
    "slug": "genshin-impact-versi-5-4-resmi-diumumkan-banners-natlan",
    "category": "Update Patch",
    "thumbnail": "https://images.unsplash.com/photo-1486218119243-13883505764c?w=800&auto=format&fit=crop&q=80",
    "excerpt": "HoYoverse resmi mengumumkan siaran langsung program khusus versi 5.4 yang menghadirkan karakter bintang lima baru dan area lava Natlan terdalam.",
    "content": "\nHoYoverse baru saja mengumumkan detail resmi pembaruan versi 5.4 untuk Genshin Impact. Update ini menjanjikan kelanjutan Archon Quest di negara perang Natlan bersama pengenalan karakter Pyro terbaru.\n\nSelain itu, fitur Quality of Life (QoL) baru berupa sistem rekomendasi artefak otomatis dan peningkatan kapasitas inventaris artefak menjadi 2.500 slot juga dipastikan hadir untuk kenyamanan Traveler.\n",
    "author": "Redaksi Seraphi",
    "published_at": "2026-03-01T10:00:00.000Z",
    "updated_at": "2026-03-01T10:00:00.000Z",
    "tags": [
      "Genshin Impact",
      "Update 5.4",
      "Natlan",
      "Banners"
    ],
    "status": "PUBLISHED",
    "views": 14500,
    "featured_image": "https://images.unsplash.com/photo-1486218119243-13883505764c?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-hsr-new-planet",
    "game_id": "game-hsr",
    "title": "Honkai: Star Rail Siapkan Destinasi Planet Baru Pasca Penacony di Update Mendatang",
    "slug": "honkai-star-rail-siapkan-destinasi-planet-baru-astral-express",
    "category": "Update Patch",
    "thumbnail": "https://images.unsplash.com/photo-1543699565-003b8adda5fc?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Kru Astral Express bersiap melompat ke koordinat peradaban berikutnya dengan jalan cerita faksi baru dan musuh bertipe mekanis kuno.",
    "content": "\nSetelah perjalanan panjang yang penuh misteri di Planet Perayaan Penacony, HoYoverse memberikan teaser mengenai rute warp Astral Express berikutnya. Pemain dapat menantikan faksi Aeon baru dan ekspansi Simulated Universe yang lebih menantang.\n",
    "author": "Redaksi Seraphi",
    "published_at": "2026-03-02T11:00:00.000Z",
    "updated_at": "2026-03-02T11:00:00.000Z",
    "tags": [
      "Honkai: Star Rail",
      "Astral Express",
      "Penacony",
      "Update"
    ],
    "status": "PUBLISHED",
    "views": 11200,
    "featured_image": "https://images.unsplash.com/photo-1543699565-003b8adda5fc?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-mlbb-patch-buff-nerf",
    "game_id": "game-mlbb",
    "title": "Mobile Legends Rilis Patch Baru: Buff Hero Assassin & Penyesuaian Defense Item",
    "slug": "mobile-legends-rilis-patch-baru-buff-assassin-nerf-defense",
    "category": "Update Patch",
    "thumbnail": "https://images.unsplash.com/photo-1533821312764-eb0483f98f69?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Moonton merilis update patch penyeimbang kompetitif: hero assassin jungle seperti Ling dan Lancelot mendapat peningkatan penetrasi awal game.",
    "content": "\nUpdate terbaru Mobile Legends: Bang Bang membawa perubahan besar pada meta Land of Dawn. Penyesuaian item pertahanan Twilight Armor dan Radiant Armor membuat hero-hero bertipe physical assassin kembali berjaya di panggung turnamen.\n",
    "author": "Redaksi Seraphi",
    "published_at": "2026-03-03T09:30:00.000Z",
    "updated_at": "2026-03-03T09:30:00.000Z",
    "tags": [
      "Mobile Legends",
      "Patch Notes",
      "Buff & Nerf",
      "Assassin"
    ],
    "status": "PUBLISHED",
    "views": 18700,
    "featured_image": "https://images.unsplash.com/photo-1533821312764-eb0483f98f69?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-mpl-season-new",
    "game_id": "game-mlbb",
    "title": "MPL Indonesia Season Baru Resmi Dimulai: Persaingan Perebutan Tiket MSC Memanas",
    "slug": "mpl-indonesia-season-baru-resmi-dimulai-tiket-msc",
    "category": "Esports",
    "thumbnail": "https://images.unsplash.com/photo-1518475155060-0d631de637e4?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Sembilan tim terbaik esports tanah air siap berlaga di panggung MPL ID Arena dengan susunan roster kejutan dari transfer pemain internasional.",
    "content": "\nPanggung kasta tertinggi MLBB Indonesia kembali hadir dengan format pertandingan yang lebih kompetitif. Antusiasme fans memenuhi arena untuk menyaksikan tim-tim raksasa bersaing meraih gelar juara dan slot ke kejuaraan dunia.\n",
    "author": "Redaksi Seraphi",
    "published_at": "2026-03-03T14:00:00.000Z",
    "updated_at": "2026-03-03T14:00:00.000Z",
    "tags": [
      "Mobile Legends",
      "MPL ID",
      "Esports",
      "Turnamen"
    ],
    "status": "PUBLISHED",
    "views": 20100,
    "featured_image": "https://images.unsplash.com/photo-1518475155060-0d631de637e4?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-valorant-new-agent",
    "game_id": "game-valorant",
    "title": "Riot Games Goda Agent Controller Baru Valorant dengan Mekanisme Manipulasi Suara",
    "slug": "riot-games-goda-agent-controller-baru-valorant",
    "category": "Announcement",
    "thumbnail": "https://images.unsplash.com/photo-1549813069-f95e44d7f498?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Teaser perdana agent ke-27 Valorant memperlihatkan gadget canggih yang mampu memalsukan suara langkah kaki dan menutupi penglihatan area luas.",
    "content": "\nRiot Games merilis teaser video singkat di kanal resmi VCT yang mengindikasikan kehadiran sosok Controller baru asal Asia Tenggara. Karakter ini digadang-gadang dapat mengubah cara pemain mengontrol informasi audio saat ronde berjalan.\n",
    "author": "Redaksi Seraphi",
    "published_at": "2026-03-04T13:00:00.000Z",
    "updated_at": "2026-03-04T13:00:00.000Z",
    "tags": [
      "Valorant",
      "Agent Baru",
      "Controller",
      "Riot Games"
    ],
    "status": "PUBLISHED",
    "views": 16400,
    "featured_image": "https://images.unsplash.com/photo-1549813069-f95e44d7f498?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-wuwa-auto-recycle",
    "game_id": "game-wuwa",
    "title": "Wuthering Waves Luncurkan Fitur Echo Auto-Recycle & Event Eksklusif Jinzhou",
    "slug": "wuthering-waves-luncurkan-fitur-echo-auto-recycle",
    "category": "Update Patch",
    "thumbnail": "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Kuro Games mendengar aspirasi pemain dengan menghadirkan filter peleburan Echo otomatis yang memudahkan pencarian stat terbaik tanpa pusing.",
    "content": "\nKuro Games terus memanjakan komunitas Wuthering Waves dengan pembaruan sistem Echo yang lebih ramah pemain. Fitur penguncian otomatis untuk stat CRIT dan peleburan Echo tidak terpakai kini dapat diakses dengan sekali klik.\n",
    "author": "Redaksi Seraphi",
    "published_at": "2026-03-04T17:00:00.000Z",
    "updated_at": "2026-03-04T17:00:00.000Z",
    "tags": [
      "Wuthering Waves",
      "Echo System",
      "Kuro Games",
      "Update"
    ],
    "status": "PUBLISHED",
    "views": 9400,
    "featured_image": "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-zzz-50m-downloads",
    "game_id": "game-zzz",
    "title": "Zenless Zone Zero Tembus 50 Juta Unduhan Global: Hadiah Polychrome Gratis Dibagikan",
    "slug": "zenless-zone-zero-tembus-50-juta-unduhan-global",
    "category": "Announcement",
    "thumbnail": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Sebagai bentuk apresiasi kepada Proxies di seluruh dunia, HoYoverse mengirimkan 1.600 Polychrome dan Boopon gratis melalui in-game mail.",
    "content": "\nPrestasi gemilang ditorehkan oleh Zenless Zone Zero yang berhasil mencapai 50 juta download lintas platform PC, PlayStation 5, dan mobile. Jangan lewatkan batas klaim hadiah gratis di menu pesan sebelum akhir bulan ini!\n",
    "author": "Redaksi Seraphi",
    "published_at": "2026-03-05T08:00:00.000Z",
    "updated_at": "2026-03-05T08:00:00.000Z",
    "tags": [
      "Zenless Zone Zero",
      "Polychrome",
      "Milestone",
      "HoYoverse"
    ],
    "status": "PUBLISHED",
    "views": 15300,
    "featured_image": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-wukong-dlc-expansion",
    "game_id": "game-wukong",
    "title": "Game Science Konfirmasi Pengembangan DLC Ekspansi Cerita Black Myth: Wukong",
    "slug": "game-science-konfirmasi-dlc-cerita-black-myth-wukong",
    "category": "Industry",
    "thumbnail": "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Setelah mendulang kesuksesan fantastis di tangga penjualan global, Game Science memastikan petualangan sang Destined One akan berlanjut.",
    "content": "\nKabar gembira bagi para penggemar souls-like berlatar mitologi. Game Science mengonfirmasi secara resmi bahwa ekspansi DLC cerita sedang dalam tahap pengerjaan aktif dengan target pengumuman trailer perdana di kuartal mendatang.\n",
    "author": "Redaksi Seraphi",
    "published_at": "2026-03-05T15:00:00.000Z",
    "updated_at": "2026-03-05T15:00:00.000Z",
    "tags": [
      "Black Myth: Wukong",
      "DLC",
      "Game Science",
      "Action RPG"
    ],
    "status": "PUBLISHED",
    "views": 23400,
    "featured_image": "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-elden-ring-shadow-records",
    "game_id": "game-elden-ring",
    "title": "Elden Ring Cetak Rekor Pemain Bersamaan Tertinggi Pasca Diskon Musim Semi Steam",
    "slug": "elden-ring-cetak-rekor-pemain-tertinggi-steam",
    "category": "Industry",
    "thumbnail": "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Komunitas Lands Between kembali ramai dengan ratusan ribu pemain baru dan veteran yang menuntaskan ekspansi Shadow of the Erdtree.",
    "content": "\nElden Ring membuktikan statusnya sebagai salah satu game aksi terbaik dekade ini dengan angka concurrent players yang terus melonjak tinggi di platform Steam.\n",
    "author": "Redaksi Seraphi",
    "published_at": "2026-03-05T18:00:00.000Z",
    "updated_at": "2026-03-05T18:00:00.000Z",
    "tags": [
      "Elden Ring",
      "FromSoftware",
      "Steam",
      "Gaming Records"
    ],
    "status": "PUBLISHED",
    "views": 12900,
    "featured_image": "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-pubgm-anime-collab",
    "game_id": "game-pubgm",
    "title": "PUBG Mobile Hadirkan Kolaborasi Anime Populer dengan Skin Kendaraan Eksklusif",
    "slug": "pubg-mobile-hadirkan-kolaborasi-anime-populer",
    "category": "Event",
    "thumbnail": "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Pemain dapat mengendarai mobil bergaya anime futuristik dan menggunakan efek elimanasi spesial di medan tempur Erangel dan Livik.",
    "content": "\nLevel Infinite meresmikan kolaborasi tematik terbaru di PUBG Mobile yang menghadirkan kostum anime bertema mecha serta mode gameplay mini khusus di pulau lobi.\n",
    "author": "Redaksi Seraphi",
    "published_at": "2026-03-06T09:00:00.000Z",
    "updated_at": "2026-03-06T09:00:00.000Z",
    "tags": [
      "PUBG Mobile",
      "Kolaborasi",
      "Anime",
      "Skin"
    ],
    "status": "PUBLISHED",
    "views": 10700,
    "featured_image": "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-ff-ob-update",
    "game_id": "game-ff",
    "title": "Free Fire Rilis Update Patch OB Baru: Rework Map Bermuda & Penyesuaian Shotgun",
    "slug": "free-fire-rilis-update-patch-ob-rework-bermuda",
    "category": "Update Patch",
    "thumbnail": "https://images.unsplash.com/photo-1537813281636-9a12ad03f637?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Garena memperbarui grafis kawasan Clock Tower dan Bimasakti Strip serta menyeimbangkan jarak tembak senjata M1887 dan Charge Buster.",
    "content": "\nGarena resmi menggulirkan patch pembaruan OB terbaru untuk seluruh survivor Free Fire. Rework tampilan visual map Bermuda membuat pertempuran terasa lebih segar dan optimal di perangkat spesifikasi ringan.\n",
    "author": "Redaksi Seraphi",
    "published_at": "2026-03-06T11:00:00.000Z",
    "updated_at": "2026-03-06T11:00:00.000Z",
    "tags": [
      "Free Fire",
      "Patch OB",
      "Garena",
      "Bermuda"
    ],
    "status": "PUBLISHED",
    "views": 14100,
    "featured_image": "https://images.unsplash.com/photo-1537813281636-9a12ad03f637?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-playstation-state-of-play",
    "game_id": null,
    "title": "PlayStation State of Play Umumkan Deretan Game Action RPG Baru untuk PS5",
    "slug": "playstation-state-of-play-umumkan-action-rpg-baru-ps5",
    "category": "Industry",
    "thumbnail": "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Sony Interactive Entertainment menyuguhkan trailer gameplay baru dari pengembang Asia dan studio barat dengan pemanfaatan DualSense penuh.",
    "content": "\nDalam siaran State of Play berdurasi 40 menit, Sony memamerkan beragam judul game yang akan meluncur tahun ini, termasuk sekuel aksi RPG yang telah dinantikan banyak gamer konsol.\n",
    "author": "Redaksi Seraphi",
    "published_at": "2026-03-06T14:30:00.000Z",
    "updated_at": "2026-03-06T14:30:00.000Z",
    "tags": [
      "PlayStation",
      "PS5",
      "State of Play",
      "Console Gaming"
    ],
    "status": "PUBLISHED",
    "views": 17800,
    "featured_image": "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-nintendo-switch-2-rumor",
    "game_id": null,
    "title": "Informasi Spesifikasi Konsol Generasi Baru Nintendo Semakin Terkuak ke Publik",
    "slug": "informasi-spesifikasi-konsol-generasi-baru-nintendo",
    "category": "Industry",
    "thumbnail": "https://images.unsplash.com/photo-1536799097017-5b57f1a7e56e?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Laporan pemasok industri menyebutkan konsol handheld penerus Switch akan mendukung resolusi 4K docked dengan teknologi DLSS mutakhir.",
    "content": "\nPenggemar Nintendo di seluruh dunia kian antusias menanti pengumuman resmi konsol penerus Nintendo Switch. Berbagai bocoran mengindikasikan kompatibilitas mundur (backwards compatibility) penuh untuk pustaka game lama.\n",
    "author": "Redaksi Seraphi",
    "published_at": "2026-03-07T08:00:00.000Z",
    "updated_at": "2026-03-07T08:00:00.000Z",
    "tags": [
      "Nintendo",
      "Switch 2",
      "Konsol",
      "Gaming Hardware"
    ],
    "status": "PUBLISHED",
    "views": 21500,
    "featured_image": "https://images.unsplash.com/photo-1536799097017-5b57f1a7e56e?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-steam-sale-dates",
    "game_id": null,
    "title": "Jadwal Steam Seasonal Sale 2026 Resmi Ditetapkan: Siapkan Wishlist Game Favorit",
    "slug": "jadwal-steam-seasonal-sale-2026-resmi-ditetapkan",
    "category": "Industry",
    "thumbnail": "https://images.unsplash.com/photo-1520206319821-0496cfdeb31e?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Valve mengumumkan kalender diskon musiman sepanjang tahun dengan potongan harga hingga 90% untuk ribuan judul game PC original.",
    "content": "\nBagi gamer PC, kalender diskon Steam adalah momen paling dinanti. Pastikan memeriksa daftar wishlist Anda untuk mengamankan game impian dengan harga terjangkau.\n",
    "author": "Redaksi Seraphi",
    "published_at": "2026-03-07T12:00:00.000Z",
    "updated_at": "2026-03-07T12:00:00.000Z",
    "tags": [
      "Steam",
      "Valve",
      "Diskon Game",
      "PC Gaming"
    ],
    "status": "PUBLISHED",
    "views": 13900,
    "featured_image": "https://images.unsplash.com/photo-1520206319821-0496cfdeb31e?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "news-esports-world-cup",
    "game_id": null,
    "title": "Esports World Cup Resmi Tambahkan Turnamen Game Mobile Populer dengan Hadiah Rekor",
    "slug": "esports-world-cup-tambahkan-turnamen-game-mobile-populer",
    "category": "Esports",
    "thumbnail": "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=800&auto=format&fit=crop&q=80",
    "excerpt": "Ajang kejuaraan dunia multi-cabang ini mengalokasikan total prize pool puluhan juta dolar untuk cabang Mobile Legends, PUBG Mobile, dan Free Fire.",
    "content": "\nEkosistem esports mobile terus mengukuhkan posisinya di panggung global. Tim-tim esports asal Indonesia dipastikan mendapat undangan resmi untuk mewakili Merah Putih di ajang bergengsi tersebut.\n",
    "author": "Redaksi Seraphi",
    "published_at": "2026-03-07T16:00:00.000Z",
    "updated_at": "2026-03-07T16:00:00.000Z",
    "tags": [
      "Esports",
      "World Cup",
      "Mobile Legends",
      "PUBG Mobile"
    ],
    "status": "PUBLISHED",
    "views": 18200,
    "featured_image": "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=800&auto=format&fit=crop&q=80"
  }
];

export const SEED_REDEEM_CODES: RedeemCode[] = [
  {
    "id": "code-genshin-1",
    "game_id": "game-genshin",
    "code": "GENSHINGIFT",
    "reward": "50 Primogems, 3 Hero's Wit",
    "status": "ACTIVE",
    "expired_at": "2026-12-31T23:59:59.000Z",
    "source": "Official HoYoverse Promo",
    "last_checked": "2026-03-07T12:00:00.000Z",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-07T12:00:00.000Z"
  },
  {
    "id": "code-genshin-2",
    "game_id": "game-genshin",
    "code": "WA8M5YWAVVJ7",
    "reward": "60 Primogems, 5 Adventurer's Experience",
    "status": "ACTIVE",
    "expired_at": "2026-04-15T23:59:59.000Z",
    "source": "Version 5.4 Live Stream",
    "last_checked": "2026-03-07T12:00:00.000Z",
    "created_at": "2026-02-01T00:00:00.000Z",
    "updated_at": "2026-03-07T12:00:00.000Z"
  },
  {
    "id": "code-genshin-3",
    "game_id": "game-genshin",
    "code": "GSIMPACT2026",
    "reward": "10,000 Mora, 10 Adventurer EXP, 5 Fine Ore",
    "status": "ACTIVE",
    "expired_at": "2026-06-30T23:59:59.000Z",
    "source": "Community Celebration",
    "last_checked": "2026-03-07T12:00:00.000Z",
    "created_at": "2026-01-10T00:00:00.000Z",
    "updated_at": "2026-03-07T12:00:00.000Z"
  },
  {
    "id": "code-genshin-4",
    "game_id": "game-genshin",
    "code": "8S84TS83M439",
    "reward": "100 Primogems, 10 Mystic Enhancement Ore",
    "status": "EXPIRED",
    "expired_at": "2026-02-28T23:59:59.000Z",
    "source": "Lantern Rite Stream (Kedaluwarsa)",
    "last_checked": "2026-03-07T12:00:00.000Z",
    "created_at": "2026-01-15T00:00:00.000Z",
    "updated_at": "2026-03-07T12:00:00.000Z"
  },
  {
    "id": "code-hsr-1",
    "game_id": "game-hsr",
    "code": "STARRAILGIFT",
    "reward": "50 Stellar Jade, 10,000 Credits, 2 Traveler's Guide",
    "status": "ACTIVE",
    "expired_at": "2026-12-31T23:59:59.000Z",
    "source": "Official HoYoverse Promo",
    "last_checked": "2026-03-07T12:00:00.000Z",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-07T12:00:00.000Z"
  },
  {
    "id": "code-hsr-2",
    "game_id": "game-hsr",
    "code": "2T96EP37J8G2",
    "reward": "60 Stellar Jade, 1 Refined Aether",
    "status": "ACTIVE",
    "expired_at": "2026-04-30T23:59:59.000Z",
    "source": "Version Update Special Code",
    "last_checked": "2026-03-07T12:00:00.000Z",
    "created_at": "2026-02-10T00:00:00.000Z",
    "updated_at": "2026-03-07T12:00:00.000Z"
  },
  {
    "id": "code-hsr-3",
    "game_id": "game-hsr",
    "code": "HSRVER3UPDATE",
    "reward": "100 Stellar Jade, 50,000 Credits",
    "status": "ACTIVE",
    "expired_at": "2026-05-31T23:59:59.000Z",
    "source": "Special Program Celebration",
    "last_checked": "2026-03-07T12:00:00.000Z",
    "created_at": "2026-02-20T00:00:00.000Z",
    "updated_at": "2026-03-07T12:00:00.000Z"
  },
  {
    "id": "code-mlbb-1",
    "game_id": "game-mlbb",
    "code": "MLBBSERAPHIC26",
    "reward": "100 Magic Dust, 1 Skin Trial Pack (3 Hari), 5 Hero Fragment",
    "status": "ACTIVE",
    "expired_at": "2026-06-30T23:59:59.000Z",
    "source": "Moonton Official Community Event",
    "last_checked": "2026-03-07T12:00:00.000Z",
    "created_at": "2026-01-05T00:00:00.000Z",
    "updated_at": "2026-03-07T12:00:00.000Z"
  },
  {
    "id": "code-mlbb-2",
    "game_id": "game-mlbb",
    "code": "TOGETHERMLBB2026",
    "reward": "1 Tournament Chest, 20 Battle Points Boost Card",
    "status": "ACTIVE",
    "expired_at": "2026-05-15T23:59:59.000Z",
    "source": "MPL Celebration Broadcast",
    "last_checked": "2026-03-07T12:00:00.000Z",
    "created_at": "2026-02-01T00:00:00.000Z",
    "updated_at": "2026-03-07T12:00:00.000Z"
  },
  {
    "id": "code-valorant-1",
    "game_id": "game-valorant",
    "code": "CC-VLRNT-SERAPHI-2026",
    "reward": "Exclusive Player Card & Gun Buddy \"Neon Seraph\"",
    "status": "ACTIVE",
    "expired_at": "2026-08-31T23:59:59.000Z",
    "source": "Riot Games Community Drop",
    "last_checked": "2026-03-07T12:00:00.000Z",
    "created_at": "2026-01-15T00:00:00.000Z",
    "updated_at": "2026-03-07T12:00:00.000Z"
  },
  {
    "id": "code-wuwa-1",
    "game_id": "game-wuwa",
    "code": "WUTHERINGGIFT",
    "reward": "50 Astrite, 2 Premium Resonance Potion, 10,000 Shell Credits",
    "status": "ACTIVE",
    "expired_at": "2026-12-31T23:59:59.000Z",
    "source": "Kuro Games Official Promo",
    "last_checked": "2026-03-07T12:00:00.000Z",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-07T12:00:00.000Z"
  },
  {
    "id": "code-ff-1",
    "game_id": "game-ff",
    "code": "FF11-HHGC-GK3B",
    "reward": "1x Weapon Royale Voucher & Pumpkin Warrior (Bottom)",
    "status": "ACTIVE",
    "expired_at": "2026-04-30T23:59:59.000Z",
    "source": "Garena Free Fire Indonesia Rewards",
    "last_checked": "2026-03-07T12:00:00.000Z",
    "created_at": "2026-02-05T00:00:00.000Z",
    "updated_at": "2026-03-07T12:00:00.000Z"
  }
];

export const SEED_EVENTS: EventItem[] = [
  {
    "id": "event-lantern-rite-2026",
    "game_id": "game-genshin",
    "title": "Festival Lantern Rite: Cahaya Harapan Liyue",
    "description": "Rayakan festival tahun baru Liyue dengan berbagai minigame seru, tantangan pertempuran, dan klaim karakter bintang 4 Liyue gratis pilihan Anda.",
    "image": "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-02-10T04:00:00.000Z",
    "end_date": "2026-03-20T03:59:59.000Z",
    "status": "ACTIVE",
    "official_url": "https://genshin.hoyoverse.com",
    "rewards": "1.600 Primogem, Karakter Bintang 4 Liyue Gratis, Mahkota Insight, Mora",
    "created_at": "2026-01-15T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "event-stellaron-hunt-hsr",
    "game_id": "game-hsr",
    "title": "Penacony Dreamscape Gala: Stellaron Hunt Challenge",
    "description": "Tantangan mingguan di ruang mimpi Penacony. Taklukkan bos elit dengan modifier acak untuk mendapatkan relic sintetis dan bahan upgrade langka.",
    "image": "https://images.unsplash.com/photo-1510182760-5565485cf674?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-02-25T04:00:00.000Z",
    "end_date": "2026-03-28T03:59:59.000Z",
    "status": "ACTIVE",
    "official_url": "https://hsr.hoyoverse.com",
    "rewards": "1.200 Stellar Jade, Self-Modeling Resin, Tracks of Destiny",
    "created_at": "2026-02-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1510182760-5565485cf674?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "event-mlbb-515-party",
    "game_id": "game-mlbb",
    "title": "515 All-Star Party Mobile Legends 2026",
    "description": "Event tahunan terbesar Mobile Legends! Selesaikan misi harian bersama teman mabar, kumpulkan koin 515, dan tukarkan dengan skin eksklusif All-Star gratis.",
    "image": "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-04-01T00:00:00.000Z",
    "end_date": "2026-05-15T23:59:59.000Z",
    "status": "UPCOMING",
    "official_url": "https://m.mobilelegends.com",
    "rewards": "Skin Eksklusif All-Star 515 Gratis, Efek Recall Permanen, Avatar Border",
    "created_at": "2026-02-15T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "event-vct-masters",
    "game_id": "game-valorant",
    "title": "VCT Masters World Tour 2026: In-Game Pick'Em & Watch Party",
    "description": "Prediksi tim pemenang setiap pertandingan turnamen dunia VCT dan saksikan siaran langsung untuk mendapatkan drop skin kartu dan title langka.",
    "image": "https://images.unsplash.com/photo-1519397165361-ec1538bfd9eb?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-03-12T10:00:00.000Z",
    "end_date": "2026-03-26T22:00:00.000Z",
    "status": "UPCOMING",
    "official_url": "https://valorantesports.com",
    "rewards": "Exclusive Gun Buddy \"Masters Trophy\", Player Card VCT 2026, Radianite Points",
    "created_at": "2026-02-10T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1519397165361-ec1538bfd9eb?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "event-solis-wuwa",
    "game_id": "game-wuwa",
    "title": "Solis Awakening Festival: Tantangan Menara Jinzhou",
    "description": "Jelajahi kembali area Mt. Firmament dalam mode tantangan waktu untuk memperoleh Echo bintang 5 dengan main-stat yang dapat dipilih secara bebas.",
    "image": "https://images.unsplash.com/photo-1581093577421-f561a654a353?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-02-18T04:00:00.000Z",
    "end_date": "2026-03-15T03:59:59.000Z",
    "status": "ACTIVE",
    "official_url": "https://wutheringwaves.kurogames.com",
    "rewards": "1.000 Astrite, Custom Echo Selector Box, Forgery Material",
    "created_at": "2026-02-05T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1581093577421-f561a654a353?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "event-zzz-music-gala",
    "game_id": "game-zzz",
    "title": "New Eridu Street Music Festival",
    "description": "Bantu klub musik jalanan Sixth Street menyusun playlist konser Hollow dan kalahkan monster Ethereal bertempo ritmis.",
    "image": "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-02-28T04:00:00.000Z",
    "end_date": "2026-03-22T03:59:59.000Z",
    "status": "ACTIVE",
    "official_url": "https://zenless.hoyoverse.com",
    "rewards": "900 Polychrome, W-Engine Bintang 4 Gratis, Tuning Calibrator",
    "created_at": "2026-02-12T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "event-elden-ring-bossrush",
    "game_id": "game-elden-ring",
    "title": "Lands Between Community Boss Rush Celebration",
    "description": "Event komunitas perayaan tahunan: ikuti tantangan marathon boss run tanpa summons dan raih gelar kehormatan di papan peringkat.",
    "image": "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-01-10T00:00:00.000Z",
    "end_date": "2026-02-10T00:00:00.000Z",
    "status": "ENDED",
    "official_url": "https://bandainamcoent.com",
    "rewards": "Sertifikat Komunitas Digital & Wallpaper 4K Eksklusif",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-02-11T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "event-pubgm-warmup",
    "game_id": "game-pubgm",
    "title": "PUBG Mobile Global Warmup Season Challenge",
    "description": "Kumpulkan poin rank di mode Klasik Erangel untuk membuka peti hadiah skin parasut bertema esports dan setelan tempur komando.",
    "image": "https://images.unsplash.com/photo-1566694271355-9ead56467fd0?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-02-20T00:00:00.000Z",
    "end_date": "2026-03-25T23:59:59.000Z",
    "status": "ACTIVE",
    "official_url": "https://pubgmobile.com",
    "rewards": "Skin M416 Camo Permanen, Parasut PMGC, Peti Klasik Kupon",
    "created_at": "2026-02-05T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1566694271355-9ead56467fd0?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "event-ff-booyah-day",
    "game_id": "game-ff",
    "title": "Booyah Day 2026: Pesta Kemenangan Survivor",
    "description": "Capai target total Booyah kumulatif bersama seluruh pemain Indonesia untuk membuka bundle legendaris secara cuma-cuma.",
    "image": "https://images.unsplash.com/photo-1539316814650-83bdbc5339be?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-03-10T04:00:00.000Z",
    "end_date": "2026-04-05T23:59:59.000Z",
    "status": "UPCOMING",
    "official_url": "https://ff.garena.com",
    "rewards": "Bundle Booyah Legend Permanen, Pet Emote, Magic Cube Fragment",
    "created_at": "2026-02-18T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1539316814650-83bdbc5339be?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "event-wukong-west-journey",
    "game_id": "game-wukong",
    "title": "Journey to the West Seasonal Speedrun Challenge",
    "description": "Tantangan komunitas untuk mengalahkan 5 boss babak akhir dengan pembatasan skill tertentu. Hadiah digital dan ranking hall of fame.",
    "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
    "start_date": "2026-01-15T00:00:00.000Z",
    "end_date": "2026-02-28T23:59:59.000Z",
    "status": "ENDED",
    "official_url": "https://heishenhua.com",
    "rewards": "Badge Komunitas Digital & Artbook Digital Game Science",
    "created_at": "2026-01-05T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z",
    "banner_image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80"
  }
];

export const SEED_ITEMS: Item[] = [
  {
    "id": "item-tome-eternal-flow",
    "game_id": "game-genshin",
    "name": "Tome of the Eternal Flow",
    "slug": "tome-of-the-eternal-flow",
    "type": "Weapon (Catalyst)",
    "rarity": 5,
    "icon": "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&auto=format&fit=crop&q=80",
    "description": "Kitab hukum kuno yang memancarkan kejernihan air murni. Senjata signature Neuvillette.",
    "stats": {
      "Base ATK": "542 (Lv 90)",
      "Sub Stat": "CRIT DMG 88.2%",
      "Effect": "HP meningkat 16%. Saat HP saat ini bertambah atau berkurang, Charged Attack DMG meningkat 14% selama 4 detik (maks 3 stack)."
    },
    "how_to_get": "Weapon Event Wish (Epitome Invocation)",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "item-sacrificial-jade",
    "game_id": "game-genshin",
    "name": "Sacrificial Jade",
    "slug": "sacrificial-jade",
    "type": "Weapon (Catalyst)",
    "rarity": 4,
    "icon": "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=300&auto=format&fit=crop&q=80",
    "description": "Artefak giok suci dari Chenyu Vale yang kaya akan energi alam.",
    "stats": {
      "Base ATK": "454 (Lv 90)",
      "Sub Stat": "CRIT Rate 36.8%",
      "Effect": "Saat berada di luar medan tempur lebih dari 5 detik, Max HP bertambah 32%-64% dan Elemental Mastery bertambah 40-80."
    },
    "how_to_get": "Battle Pass (Gnostic Hymn Level 30)",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "item-along-passing-shore",
    "game_id": "game-hsr",
    "name": "Along the Passing Shore",
    "slug": "along-the-passing-shore",
    "type": "Light Cone (Nihility)",
    "rarity": 5,
    "icon": "https://images.unsplash.com/photo-1519337718347-749509f114a8?w=300&auto=format&fit=crop&q=80",
    "description": "Light Cone kenangan Acheron yang menatap perbatasan sungai kematian.",
    "stats": {
      "Base HP": "1058 (Lv 80)",
      "Base ATK": "635 (Lv 80)",
      "Effect": "Meningkatkan CRIT DMG pemakai sebesar 36%. Saat serangan mengenai musuh, menempelkan Mirage Fizzle yang menaikkan damage diterima musuh 24%."
    },
    "how_to_get": "Brilliant Fixation Light Cone Warp",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "item-blade-of-despair",
    "game_id": "game-mlbb",
    "name": "Blade of Despair",
    "slug": "blade-of-despair",
    "type": "Item Attack",
    "rarity": 5,
    "icon": "https://images.unsplash.com/photo-1480694313141-fce5e697ee25?w=300&auto=format&fit=crop&q=80",
    "description": "Pedang legendaris dengan Physical Attack tertinggi di Mobile Legends.",
    "stats": {
      "+160": "Physical Attack",
      "+5%": "Movement Speed",
      "Pasif Unik": "Menyerang unit lawan yang memiliki HP di bawah 50% akan meningkatkan Physical Attack hero sebesar 25% selama 2 detik."
    },
    "how_to_get": "Toko Senjata In-game (3010 Gold)",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "item-vandal",
    "game_id": "game-valorant",
    "name": "Vandal Rifle",
    "slug": "vandal-rifle",
    "type": "Primary Rifle",
    "rarity": 4,
    "icon": "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=300&auto=format&fit=crop&q=80",
    "description": "Senjata senapan serbu otomatis paling mematikan di Valorant dengan 1-shot headshot kill di semua jarak.",
    "stats": {
      "Headshot DMG": "160 (Semua Jarak)",
      "Body DMG": "40",
      "Magazine Size": "25 Peluru",
      "Fire Rate": "9.75 Rounds/detik"
    },
    "how_to_get": "Buy Menu Ronde (2.900 Creds)",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-01T00:00:00.000Z"
  }
];

export const SEED_TIER_LISTS: TierList[] = [
  {
    "id": "tier-genshin-5-4",
    "game_id": "game-genshin",
    "title": "Genshin Impact Tier List Karakter Terbaik (Versi 5.4)",
    "slug": "genshin-impact-tier-list-karakter-terbaik",
    "description": "Peringkat karakter terkuat untuk Spiral Abyss Lantai 12 dan konten endgame Teyvat berdasarkan efisiensi damage, utility buff, dan fleksibilitas tim.",
    "version": "5.4",
    "updated_at": "2026-03-01T12:00:00.000Z",
    "tiers": [
      {
        "tier": "SS",
        "characters": [
          {
            "name": "Neuvillette",
            "slug": "neuvillette",
            "portrait": "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=400&auto=format&fit=crop&q=80",
            "role": "Main DPS",
            "element": "Hydro",
            "reason": "Hypercarry dengan survival mandiri, jangkauan luas, dan scaling damage raksasa."
          },
          {
            "name": "Furina",
            "slug": "furina",
            "portrait": "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&auto=format&fit=crop&q=80",
            "role": "Sub-DPS / Buffer",
            "element": "Hydro",
            "reason": "Penyedia Fanfare damage buff universal hingga 75% ke seluruh elemen."
          },
          {
            "name": "Nahida",
            "slug": "nahida",
            "portrait": "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=400&auto=format&fit=crop&q=80",
            "role": "Dendro Enabler",
            "element": "Dendro",
            "reason": "Kunci mutlak untuk seluruh reaksi Dendro, EM share 250 poin."
          },
          {
            "name": "Zhongli",
            "slug": "zhongli",
            "portrait": "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=400&auto=format&fit=crop&q=80",
            "role": "Shielder",
            "element": "Geo",
            "reason": "Perisai tertebal di game dengan 20% all-elemental RES shred pasif."
          }
        ]
      },
      {
        "tier": "S",
        "characters": [
          {
            "name": "Raiden Shogun",
            "slug": "raiden-shogun",
            "portrait": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80",
            "role": "Battery / Burst DPS",
            "element": "Electro",
            "reason": "Regenerasi energi baterai satu party dan burst output kuat."
          },
          {
            "name": "Kaedehara Kazuha",
            "slug": "kazuha",
            "portrait": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80",
            "role": "Crowd Control / Buffer",
            "element": "Anemo",
            "reason": "Swirl elemental buff and grouped enemy control."
          }
        ]
      },
      {
        "tier": "A",
        "characters": [
          {
            "name": "Hu Tao",
            "slug": "hu-tao",
            "portrait": "https://images.unsplash.com/photo-1530319067432-f2a729c03db5?w=400&auto=format&fit=crop&q=80",
            "role": "Pyro DPS",
            "element": "Pyro",
            "reason": "Single target vaporize burst tinggi."
          },
          {
            "name": "Alhaitham",
            "slug": "alhaitham",
            "portrait": "/images/placeholder-character.svg",
            "role": "Dendro DPS",
            "element": "Dendro",
            "reason": "Penyedia Spread DPS konsisten."
          }
        ]
      },
      {
        "tier": "B",
        "characters": [
          {
            "name": "Diluc",
            "slug": "diluc",
            "portrait": "/images/placeholder-character.svg",
            "role": "Main DPS",
            "element": "Pyro",
            "reason": "Solid F2P Pyro claymore tetapi tertinggal oleh DPS generasi baru."
          }
        ]
      },
      {
        "tier": "C",
        "characters": [
          {
            "name": "Aloy",
            "slug": "aloy",
            "portrait": "/images/placeholder-character.svg",
            "role": "Sub-DPS",
            "element": "Cryo",
            "reason": "Konstelasi tidak ada dan cooldown skill panjang."
          }
        ]
      }
    ]
  },
  {
    "id": "tier-hsr-current",
    "game_id": "game-hsr",
    "title": "Honkai: Star Rail Meta Tier List (Memory of Chaos & Apocalyptic Shadow)",
    "slug": "honkai-star-rail-meta-tier-list",
    "description": "Peringkat performa karakter di Memory of Chaos lantai 12 dan mode Apocalyptic Shadow.",
    "version": "2.7+",
    "updated_at": "2026-03-02T12:00:00.000Z",
    "tiers": [
      {
        "tier": "SS",
        "characters": [
          {
            "name": "Acheron",
            "slug": "acheron",
            "portrait": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&auto=format&fit=crop&q=80",
            "role": "Main DPS",
            "element": "Lightning",
            "reason": "Nihility nuke dengan penetrasi elemental res tanpa batas bar energy."
          },
          {
            "name": "Firefly",
            "slug": "firefly",
            "portrait": "https://images.unsplash.com/photo-1589749807521-dd6bc0d4f75d?w=400&auto=format&fit=crop&q=80",
            "role": "Super Break DPS",
            "element": "Fire",
            "reason": "Menciptakan fire weakness paksa dan mengeliminasi toughness meter kilat."
          },
          {
            "name": "Aventurine",
            "slug": "aventurine",
            "portrait": "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&auto=format&fit=crop&q=80",
            "role": "Sustain / Shielder",
            "element": "Imaginary",
            "reason": "Shield bertumpuk otomatis pasca follow up dan tahanan CC debuff."
          }
        ]
      },
      {
        "tier": "S",
        "characters": [
          {
            "name": "Ruan Mei",
            "slug": "ruan-mei",
            "portrait": "/images/placeholder-character.svg",
            "role": "Break Support",
            "element": "Ice",
            "reason": "Meningkatkan Break Efficiency 50% dan All-Type RES penetration."
          }
        ]
      },
      {
        "tier": "A",
        "characters": [
          {
            "name": "Dr. Ratio",
            "slug": "dr-ratio",
            "portrait": "/images/placeholder-character.svg",
            "role": "Single Target DPS",
            "element": "Imaginary",
            "reason": "Follow-up attacker kuat dengan syarat debuff musuh."
          }
        ]
      },
      {
        "tier": "B",
        "characters": [
          {
            "name": "Yanqing",
            "slug": "yanqing",
            "portrait": "/images/placeholder-character.svg",
            "role": "Single Target DPS",
            "element": "Ice",
            "reason": "Kehilangan seluruh buff saat terkena serangan musuh."
          }
        ]
      },
      {
        "tier": "C",
        "characters": [
          {
            "name": "Arlan",
            "slug": "arlan",
            "portrait": "/images/placeholder-character.svg",
            "role": "Destruction DPS",
            "element": "Lightning",
            "reason": "Mekanik HP rendah terlalu berisiko dibanding hasil damage."
          }
        ]
      }
    ]
  }
];

export const SEED_AD_SLOTS: AdSlotConfig[] = [
  {
    "id": "ad-home-top",
    "name": "Homepage Top Header Banner",
    "slot_type": "banner_top",
    "is_active": true,
    "ad_type": "custom",
    "image_url": "/images/ad-partner.svg",
    "target_url": "https://seraphigame.id/community",
    "label": "SERAPHI GAMING PARTNER — Gabung Komunitas Discord Seraphi Game Indonesia!"
  },
  {
    "id": "ad-sidebar-1",
    "name": "Article Sidebar Sticky Banner",
    "slot_type": "sidebar",
    "is_active": true,
    "ad_type": "adsense_placeholder",
    "label": "Slot Iklan Sidebar 300x250 (Google AdSense / Sponsor)"
  },
  {
    "id": "ad-article-incontent",
    "name": "In-Article Responsive Ad",
    "slot_type": "in_article",
    "is_active": true,
    "ad_type": "adsense_placeholder",
    "label": "Slot Iklan Artikel Responsive (Google AdSense)"
  },
  {
    "id": "ad-game-footer",
    "name": "Game Detail Bottom Sponsor",
    "slot_type": "footer",
    "is_active": true,
    "ad_type": "custom",
    "image_url": "/images/ad-sponsor.svg",
    "target_url": "https://seraphigame.id/partner",
    "label": "TEMPAT TOP-UP GAME RESMI & TERPERCAYA — Gunakan Kode Diskon SERAPHI"
  }
];

export const ALL_SEED_GAMES = [...SEED_GAMES, ...EXPANSION_GAMES];
export const ALL_SEED_CHARACTERS = [...SEED_CHARACTERS, ...EXPANSION_CHARACTERS];
export const ALL_SEED_GUIDES = [...SEED_GUIDES, ...EXPANSION_GUIDES];
export const ALL_SEED_NEWS = [...SEED_NEWS, ...EXPANSION_NEWS];
export const ALL_SEED_REDEEM_CODES = [...SEED_REDEEM_CODES, ...EXPANSION_REDEEM_CODES];
export const ALL_SEED_EVENTS = [...SEED_EVENTS, ...EXPANSION_EVENTS];
export const ALL_SEED_ITEMS = [...SEED_ITEMS, ...EXPANSION_ITEMS];
