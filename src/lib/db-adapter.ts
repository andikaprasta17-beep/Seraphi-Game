import {
  Game,
  Character,
  Guide,
  News,
  RedeemCode,
  EventItem,
  Item,
  TierList,
  AdSlotConfig,
  AdminUser,
  ContactMessage,
  Author,
  ProductionContentStats,
  DashboardStats,
} from './types';

export interface GlobalSearchResult {
  games: Game[];
  characters: (Character & { game_name?: string; game_slug?: string })[];
  guides: (Guide & { game_name?: string; game_slug?: string })[];
  news: (News & { game_name?: string })[];
  items: (Item & { game_name?: string })[];
  redeem_codes: (RedeemCode & { game_name?: string })[];
}

export interface DatabaseAdapter {
  readonly provider: 'sqlite' | 'postgres';

  // Raw query execution
  query<T = any>(sql: string, params?: any[]): Promise<T[]>;
  get<T = any>(sql: string, params?: any[]): Promise<T | null>;
  run(sql: string, params?: any[]): Promise<{ changes?: number }>;
  exec(sql: string): Promise<void>;
  close(): Promise<void>;

  // Slug check
  checkDuplicateSlug(table: string, slug: string, excludeId?: string): Promise<boolean>;

  // Authors
  getAuthors(): Promise<Author[]>;
  getAuthorBySlug(slug: string): Promise<Author | null>;
  getAuthorById(id: string): Promise<Author | null>;
  insertAuthor(author: Author): Promise<void>;
  updateAuthor(id: string, updates: Partial<Author>): Promise<void>;
  deleteAuthor(id: string): Promise<void>;
  getGuidesByAuthor(authorId: string): Promise<Guide[]>;
  getNewsByAuthor(authorId: string): Promise<News[]>;

  // Games
  getGames(publishedOnly?: boolean): Promise<Game[]>;
  getGameBySlug(slug: string): Promise<Game | null>;
  getGameById(id: string): Promise<Game | null>;
  insertGame(data: Omit<Game, 'created_at' | 'updated_at'>): Promise<Game>;
  updateGame(id: string, updates: Partial<Game>): Promise<void>;
  deleteGame(id: string): Promise<void>;

  // Characters
  getCharacters(gameIdOrSlug?: string, publishedOnly?: boolean): Promise<Character[]>;
  getCharacterBySlug(slug: string, gameSlug?: string): Promise<Character | null>;
  getCharacterById(id: string): Promise<Character | null>;
  insertCharacter(data: Omit<Character, 'created_at' | 'updated_at'>): Promise<Character>;
  updateCharacter(id: string, updates: Partial<Character>): Promise<void>;
  deleteCharacter(id: string): Promise<void>;

  // Guides
  getGuides(options?: {
    gameIdOrSlug?: string;
    category?: string;
    tag?: string;
    limit?: number;
    publishedOnly?: boolean;
    onlyPublished?: boolean;
  }): Promise<Guide[]>;
  getGuideBySlug(slug: string): Promise<Guide | null>;
  getGuideById(id: string): Promise<Guide | null>;
  insertGuide(data: Omit<Guide, 'created_at' | 'updated_at' | 'views'>): Promise<Guide>;
  updateGuide(id: string, updates: Partial<Guide>): Promise<void>;
  deleteGuide(id: string): Promise<void>;

  // News
  getNews(options?: {
    gameIdOrSlug?: string;
    category?: string;
    limit?: number;
    publishedOnly?: boolean;
    onlyPublished?: boolean;
  }): Promise<News[]>;
  getNewsBySlug(slug: string): Promise<News | null>;
  getNewsById(id: string): Promise<News | null>;
  insertNewsItem(data: Omit<News, 'created_at' | 'updated_at' | 'views'>): Promise<News>;
  updateNewsItem(id: string, updates: Partial<News>): Promise<void>;
  deleteNewsItem(id: string): Promise<void>;

  // Redeem Codes
  getRedeemCodes(gameIdOrSlug?: string, activeOnly?: boolean): Promise<RedeemCode[]>;
  getRedeemCodeById(id: string): Promise<RedeemCode | null>;
  insertRedeemCode(data: Omit<RedeemCode, 'created_at' | 'updated_at'>): Promise<RedeemCode>;
  updateRedeemCode(id: string, updates: Partial<RedeemCode>): Promise<void>;
  deleteRedeemCode(id: string): Promise<void>;

  // Events
  getEvents(options?: { gameId?: string; status?: string }): Promise<(EventItem & { game_name?: string; game_slug?: string })[]>;
  insertEventItem(data: Omit<EventItem, 'created_at' | 'updated_at'>): Promise<EventItem>;
  deleteEventItem(id: string): Promise<void>;

  // Items
  getItems(gameId?: string): Promise<Item[]>;
  getItemById(id: string): Promise<Item | null>;
  getItemBySlug(slug: string, gameSlug?: string): Promise<Item | null>;
  insertItem(data: Omit<Item, 'created_at' | 'updated_at'>): Promise<Item>;
  updateItem(id: string, updates: Partial<Item>): Promise<void>;
  deleteItem(id: string): Promise<void>;

  // Tier Lists
  getTierLists(gameId?: string): Promise<TierList[]>;
  getTierListBySlug(slug: string): Promise<TierList | null>;

  // Ad Slots
  getAdSlots(): Promise<AdSlotConfig[]>;
  getAdSlotById(id: string): Promise<AdSlotConfig | null>;
  updateAdSlot(id: string, updates: Partial<AdSlotConfig>): Promise<void>;

  // Popular Content & View Counters
  getPopularGames(limit?: number): Promise<Game[]>;
  getPopularGuides(limit?: number): Promise<Guide[]>;
  getPopularCharacters(limit?: number): Promise<Character[]>;
  getPopularNews(limit?: number): Promise<News[]>;
  incrementViews(table: 'games' | 'characters' | 'guides' | 'news', idOrSlug: string): Promise<void>;

  // Global Search
  searchAll(query: string): Promise<GlobalSearchResult>;

  // Admin & Analytics
  getAdminUser(username: string): Promise<AdminUser | null>;
  syncAdminUserFromEnv(): Promise<void>;
  getDashboardStats(): Promise<DashboardStats>;
  getProductionContentStats(): Promise<ProductionContentStats>;
  toggleDemoStatus(
    table: 'games' | 'characters' | 'guides' | 'news' | 'items' | 'redeem_codes' | 'events',
    id: string
  ): Promise<boolean>;

  // Contact Messages
  insertContactMessage(msg: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<ContactMessage>;
  getContactMessages(status?: string): Promise<ContactMessage[]>;
  updateContactMessageStatus(id: string, status: 'UNREAD' | 'READ' | 'ARCHIVED'): Promise<void>;
  deleteContactMessage(id: string): Promise<void>;
}
