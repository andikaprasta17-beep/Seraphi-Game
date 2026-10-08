export type ContentStatus = 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED';

export interface Author {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  bio: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Game {
  id: string;
  name: string;
  slug: string;
  cover_image: string;
  banner_image: string;
  description: string;
  developer: string;
  publisher: string;
  release_date: string;
  platforms: string[];
  genres: string[];
  status: string;
  rating: number;
  official_url: string;
  created_at: string;
  updated_at: string;
  views?: number;
  is_demo?: boolean;
  meta_title?: string;
  meta_description?: string;
  no_index?: boolean;
}

export interface CharacterSkill {
  name: string;
  type: string;
  description: string;
  icon?: string;
}

export interface CharacterTalent {
  name: string;
  description: string;
}

export interface CharacterWeaponRecommendation {
  name: string;
  rarity: number;
  rank: number;
  note: string;
}

export interface CharacterTeamMember {
  character_name: string;
  role: string;
  description: string;
}

export interface CharacterMaterial {
  name: string;
  type: string;
  count: number;
  icon?: string;
}

export interface Character {
  id: string;
  game_id: string;
  name: string;
  slug: string;
  portrait: string;
  full_image: string;
  description: string;
  role: string;
  element: string;
  weapon: string;
  rarity: number;
  release_date: string;
  skills: CharacterSkill[];
  talents: CharacterTalent[];
  recommended_build: {
    main_role: string;
    best_artifacts: string;
    main_stats: string;
    sub_stats: string;
    summary: string;
  };
  recommended_weapons: CharacterWeaponRecommendation[];
  recommended_team: CharacterTeamMember[];
  materials: CharacterMaterial[];
  status: ContentStatus;
  created_at: string;
  updated_at: string;
  views?: number;
  is_demo?: boolean;
  meta_title?: string;
  meta_description?: string;
  no_index?: boolean;
}

export interface Item {
  id: string;
  game_id: string;
  name: string;
  slug: string;
  type: string;
  rarity: number;
  icon: string;
  description: string;
  stats: Record<string, string>;
  how_to_get: string;
  is_demo?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Guide {
  id: string;
  game_id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  // DB column names (actual storage fields)
  author_id?: string;
  featured_image?: string;
  difficulty?: string;
  reading_time?: number;
  canonical_url?: string;
  related_guide_ids?: string[];
  related_character_ids?: string[];
  created_at?: string;         // set by DB; seed data may use published_at instead
  updated_at: string;
  views?: number;
  status: ContentStatus;
  is_demo?: boolean;
  meta_title?: string;
  meta_description?: string;
  no_index?: boolean;
  tags: string[];
  faq?: FaqItem[];
  // UI alias fields (mapped from DB columns for display)
  thumbnail?: string;          // alias for featured_image
  author?: string;             // resolved author name
  author_slug?: string;        // resolved author slug
  published_at?: string;       // alias for created_at
  related_characters?: string[]; // alias for related_character_ids
  related_items?: string[];    // deprecated field
}

export interface News {
  id: string;
  game_id?: string | null;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  // DB column names (actual storage fields)
  author_id?: string;
  featured_image?: string;
  created_at?: string;         // set by DB; seed data may use published_at instead
  updated_at: string;
  views?: number;
  status: ContentStatus;
  is_demo?: boolean;
  meta_title?: string;
  meta_description?: string;
  no_index?: boolean;
  tags: string[];
  // UI alias fields (mapped from DB columns for display)
  thumbnail?: string;          // alias for featured_image
  author?: string;             // resolved author name
  author_slug?: string;        // resolved author slug
  published_at?: string;       // alias for created_at
}

export interface RedeemCode {
  id: string;
  game_id: string;
  game_name?: string;
  game_slug?: string;
  code: string;
  reward: string;
  status: 'ACTIVE' | 'EXPIRED' | 'UNKNOWN';
  expired_at: string;
  source: string;
  last_checked: string;
  verified_at?: string;
  is_demo?: boolean;
  verification_provider?: 'manual' | 'official' | 'community' | string;
  created_at: string;
  updated_at: string;
}

export interface EventItem {
  id: string;
  game_id: string;
  game_name?: string;
  game_slug?: string;
  title: string;
  slug?: string;
  description: string;
  type?: string;
  image: string;
  banner_image?: string;
  start_date: string;
  end_date: string;
  status: 'UPCOMING' | 'ACTIVE' | 'ENDED';
  official_url: string;
  rewards: string | any;
  is_demo?: boolean;
  created_at: string;
  updated_at: string;
}

export interface TierListEntry {
  tier: 'SS' | 'S' | 'A' | 'B' | 'C';
  characters: {
    name: string;
    slug: string;
    portrait: string;
    role: string;
    element: string;
    reason: string;
  }[];
}

export interface TierList {
  id: string;
  game_id: string;
  game_name?: string;
  game_slug?: string;
  title: string;
  slug: string;
  description: string;
  version: string;
  tiers: TierListEntry[];
  updated_at: string;
  created_at?: string;
  is_demo?: boolean;
}

export interface AdSlotConfig {
  id: string;
  name: string;
  slot_type: 'banner_top' | 'sidebar' | 'in_article' | 'footer' | 'popup';
  is_active: boolean;
  ad_type: 'custom' | 'adsense_placeholder';
  image_url?: string;
  target_url?: string;
  label?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AffiliateLink {
  id: string;
  title: string;
  url: string;
  provider: string;
  affiliate_enabled: boolean;
  game_id?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  password_hash: string;
  role: 'superadmin' | 'editor';
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'UNREAD' | 'READ' | 'ARCHIVED';
  created_at: string;
}

export type ContentMode = 'demo' | 'production';

export interface ContentCategoryStats {
  total: number;
  demo_count: number;
  published_prod_count: number;
}

export interface ProductionContentStats {
  published_real: number;
  published_demo: number;
  draft: number;
  review: number;
  archived: number;
  has_demo_warning: boolean;
  games?: ContentCategoryStats;
  characters?: ContentCategoryStats;
  guides?: ContentCategoryStats;
  news?: ContentCategoryStats;
  items?: ContentCategoryStats;
  redeem_codes?: ContentCategoryStats;
  events?: ContentCategoryStats;
}

export interface LaunchCheckItem {
  key?: string;
  category: string;
  title: string;
  description: string;
  status: 'PASS' | 'WARNING' | 'FAIL';
  detail: string;
}

export interface DashboardRecentlyUpdatedItem {
  id: string;
  title: string;
  type: string;
  status: string;
  updated_at: string;
  game?: string;
  is_demo?: number | boolean;
}

export interface DashboardStats {
  gamesCount: number;
  charsCount: number;
  guidesCount: number;
  newsCount: number;
  codesCount: number;
  eventsCount: number;
  publishedGames: number;
  publishedChars: number;
  publishedGuides: number;
  publishedNews: number;
  activeCodes: number;
  upcomingEvents: number;
  draftGuides: number;
  recentlyUpdated: DashboardRecentlyUpdatedItem[];
  totalGames?: number;
  totalCharacters?: number;
  totalGuides?: number;
  totalNews?: number;
  totalRedeemCodes?: number;
  activeRedeemCodes?: number;
  totalEvents?: number;
  activeEvents?: number;
  totalViews?: number;
  recentGuides?: any[];
  recentNews?: any[];
}

