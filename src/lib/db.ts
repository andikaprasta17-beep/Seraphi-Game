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
import { isProductionMode } from './seo';
import { DatabaseAdapter, GlobalSearchResult } from './db-adapter';
import { SqliteAdapter, getSqliteDatabase } from './db-sqlite';
import { PostgresAdapter } from './db-postgres';

// Re-export DatabaseSync accessor for backward compatibility and tests
export const getDatabase = getSqliteDatabase;

declare global {
  // eslint-disable-next-line no-var
  var _seraphi_active_adapter: DatabaseAdapter | undefined;
}

/**
 * Returns the active DatabaseAdapter based on DATABASE_PROVIDER and DATABASE_URL.
 * Production Koyeb + Neon target: DATABASE_PROVIDER=postgres
 * Local Development fallback: DATABASE_PROVIDER=sqlite
 */
export function getAdapter(): DatabaseAdapter {
  if (globalThis._seraphi_active_adapter) {
    return globalThis._seraphi_active_adapter;
  }

  const provider = process.env.DATABASE_PROVIDER;
  const dbUrl = process.env.DATABASE_URL;

  // Use PostgreSQL if explicitly requested or if DATABASE_URL is set without sqlite override
  if (provider === 'postgres' || (dbUrl && provider !== 'sqlite')) {
    globalThis._seraphi_active_adapter = new PostgresAdapter();
  } else {
    globalThis._seraphi_active_adapter = new SqliteAdapter();
  }

  return globalThis._seraphi_active_adapter;
}

// ---------------------------------------------------------------------------
// Phase 4 / Phase 5 Quality Gate Enforcements:
// All production queries strictly enforce: (is_demo = 0 OR is_demo IS NULL)
// ---------------------------------------------------------------------------

export async function checkDuplicateSlug(
  table: 'games' | 'characters' | 'guides' | 'news' | 'items' | 'authors' | 'events' | 'tier_lists',
  slug: string,
  excludeId?: string
): Promise<boolean> {
  return getAdapter().checkDuplicateSlug(table, slug, excludeId);
}

export async function getAuthors(): Promise<Author[]> {
  return getAdapter().getAuthors();
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  return getAdapter().getAuthorBySlug(slug);
}

export async function getAuthorById(id: string): Promise<Author | null> {
  return getAdapter().getAuthorById(id);
}

export async function insertAuthor(author: Author): Promise<void> {
  return getAdapter().insertAuthor(author);
}

export async function updateAuthor(id: string, updates: Partial<Author>): Promise<void> {
  return getAdapter().updateAuthor(id, updates);
}

export async function deleteAuthor(id: string): Promise<void> {
  return getAdapter().deleteAuthor(id);
}

export async function getGuidesByAuthor(authorId: string): Promise<Guide[]> {
  return getAdapter().getGuidesByAuthor(authorId);
}

export async function getNewsByAuthor(authorId: string): Promise<News[]> {
  return getAdapter().getNewsByAuthor(authorId);
}

export async function getGames(publishedOnly = true): Promise<Game[]> {
  return getAdapter().getGames(publishedOnly);
}

export async function getGameBySlug(slug: string): Promise<Game | null> {
  return getAdapter().getGameBySlug(slug);
}

export async function getGameById(id: string): Promise<Game | null> {
  return getAdapter().getGameById(id);
}

export async function insertGame(data: Omit<Game, 'created_at' | 'updated_at'>): Promise<Game> {
  return getAdapter().insertGame(data);
}

export async function updateGame(id: string, updates: Partial<Game>): Promise<void> {
  return getAdapter().updateGame(id, updates);
}

export async function deleteGame(id: string): Promise<void> {
  return getAdapter().deleteGame(id);
}

export async function getCharacters(gameIdOrSlug?: string, publishedOnly = true): Promise<Character[]> {
  return getAdapter().getCharacters(gameIdOrSlug, publishedOnly);
}

export async function getCharacterBySlug(slug: string, gameSlug?: string): Promise<Character | null> {
  return getAdapter().getCharacterBySlug(slug, gameSlug);
}

export async function getCharacterById(id: string): Promise<Character | null> {
  return getAdapter().getCharacterById(id);
}

export async function insertCharacter(data: Omit<Character, 'created_at' | 'updated_at'>): Promise<Character> {
  return getAdapter().insertCharacter(data);
}

export async function updateCharacter(id: string, updates: Partial<Character>): Promise<void> {
  return getAdapter().updateCharacter(id, updates);
}

export async function deleteCharacter(id: string): Promise<void> {
  return getAdapter().deleteCharacter(id);
}

export async function getGuides(options?: {
  gameIdOrSlug?: string;
  category?: string;
  tag?: string;
  limit?: number;
  publishedOnly?: boolean;
  onlyPublished?: boolean;
}): Promise<Guide[]> {
  return getAdapter().getGuides(options);
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  return getAdapter().getGuideBySlug(slug);
}

export async function getGuideById(id: string): Promise<Guide | null> {
  return getAdapter().getGuideById(id);
}

export async function insertGuide(data: Omit<Guide, 'created_at' | 'updated_at' | 'views'>): Promise<Guide> {
  return getAdapter().insertGuide(data);
}

export async function updateGuide(id: string, updates: Partial<Guide>): Promise<void> {
  return getAdapter().updateGuide(id, updates);
}

export async function deleteGuide(id: string): Promise<void> {
  return getAdapter().deleteGuide(id);
}

export async function getNews(options?: {
  gameIdOrSlug?: string;
  category?: string;
  limit?: number;
  publishedOnly?: boolean;
  onlyPublished?: boolean;
}): Promise<News[]> {
  return getAdapter().getNews(options);
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
  return getAdapter().getNewsBySlug(slug);
}

export async function getNewsById(id: string): Promise<News | null> {
  return getAdapter().getNewsById(id);
}

export async function insertNewsItem(data: Omit<News, 'created_at' | 'updated_at' | 'views'>): Promise<News> {
  return getAdapter().insertNewsItem(data);
}

export async function updateNewsItem(id: string, updates: Partial<News>): Promise<void> {
  return getAdapter().updateNewsItem(id, updates);
}

export async function deleteNewsItem(id: string): Promise<void> {
  return getAdapter().deleteNewsItem(id);
}

export async function getRedeemCodes(gameIdOrSlug?: string, activeOnly = false): Promise<RedeemCode[]> {
  return getAdapter().getRedeemCodes(gameIdOrSlug, activeOnly);
}

export async function getRedeemCodeById(id: string): Promise<RedeemCode | null> {
  return getAdapter().getRedeemCodeById(id);
}

export async function insertRedeemCode(data: Omit<RedeemCode, 'created_at' | 'updated_at'>): Promise<RedeemCode> {
  return getAdapter().insertRedeemCode(data);
}

export async function updateRedeemCode(id: string, updates: Partial<RedeemCode>): Promise<void> {
  return getAdapter().updateRedeemCode(id, updates);
}

export async function deleteRedeemCode(id: string): Promise<void> {
  return getAdapter().deleteRedeemCode(id);
}

export async function getEvents(options?: { gameId?: string; status?: string }): Promise<(EventItem & { game_name?: string; game_slug?: string })[]> {
  return getAdapter().getEvents(options);
}

export async function getEventById(id: string): Promise<EventItem | null> {
  return getAdapter().getEventById(id);
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  return getAdapter().getEventBySlug(slug);
}

export async function insertEventItem(data: Omit<EventItem, 'created_at' | 'updated_at'>): Promise<EventItem> {
  return getAdapter().insertEventItem(data);
}

export async function updateEventItem(id: string, updates: Partial<EventItem>): Promise<void> {
  return getAdapter().updateEventItem(id, updates);
}

export async function deleteEventItem(id: string): Promise<void> {
  return getAdapter().deleteEventItem(id);
}

export async function getItems(gameId?: string): Promise<Item[]> {
  return getAdapter().getItems(gameId);
}

export async function getItemById(id: string): Promise<Item | null> {
  return getAdapter().getItemById(id);
}

export async function getItemBySlug(slug: string, gameSlug?: string): Promise<Item | null> {
  return getAdapter().getItemBySlug(slug, gameSlug);
}

export async function insertItem(data: Omit<Item, 'created_at' | 'updated_at'>): Promise<Item> {
  return getAdapter().insertItem(data);
}

export async function updateItem(id: string, updates: Partial<Item>): Promise<void> {
  return getAdapter().updateItem(id, updates);
}

export async function deleteItem(id: string): Promise<void> {
  return getAdapter().deleteItem(id);
}

export async function getTierLists(gameIdOrSlug?: string): Promise<TierList[]> {
  return getAdapter().getTierLists(gameIdOrSlug);
}

export async function getTierListBySlug(slug: string): Promise<TierList | null> {
  return getAdapter().getTierListBySlug(slug);
}

export async function insertTierList(data: Omit<TierList, 'created_at' | 'updated_at'>): Promise<TierList> {
  return getAdapter().insertTierList(data);
}

export async function updateTierList(id: string, updates: Partial<TierList>): Promise<void> {
  return getAdapter().updateTierList(id, updates);
}

export async function getAdSlots(): Promise<AdSlotConfig[]> {
  return getAdapter().getAdSlots();
}

export async function getAdSlotById(id: string): Promise<AdSlotConfig | null> {
  return getAdapter().getAdSlotById(id);
}

export async function updateAdSlot(id: string, updates: Partial<AdSlotConfig>): Promise<void> {
  return getAdapter().updateAdSlot(id, updates);
}

export async function getPopularGames(limit = 5): Promise<Game[]> {
  return getAdapter().getPopularGames(limit);
}

export async function getPopularGuides(limit = 5): Promise<Guide[]> {
  return getAdapter().getPopularGuides(limit);
}

export async function getPopularCharacters(limit = 5): Promise<Character[]> {
  return getAdapter().getPopularCharacters(limit);
}

export async function getPopularNews(limit = 5): Promise<News[]> {
  return getAdapter().getPopularNews(limit);
}

export async function incrementViews(table: 'games' | 'characters' | 'guides' | 'news', idOrSlug: string): Promise<void> {
  return getAdapter().incrementViews(table, idOrSlug);
}

export async function searchAll(query: string): Promise<GlobalSearchResult> {
  // In production mode, (is_demo = 0 OR is_demo IS NULL) is strictly enforced by the adapter
  if (isProductionMode()) {
    // production mode check
  }
  return getAdapter().searchAll(query);
}

export async function getAdminUser(username: string): Promise<AdminUser | null> {
  return getAdapter().getAdminUser(username);
}

export async function syncAdminUserFromEnv(): Promise<void> {
  return getAdapter().syncAdminUserFromEnv();
}

export async function getDashboardStats(): Promise<DashboardStats> {
  return getAdapter().getDashboardStats();
}

export async function getProductionContentStats(): Promise<ProductionContentStats> {
  return getAdapter().getProductionContentStats();
}

export async function toggleDemoStatus(
  table: 'games' | 'characters' | 'guides' | 'news' | 'items' | 'redeem_codes' | 'events',
  id: string
): Promise<boolean> {
  return getAdapter().toggleDemoStatus(table, id);
}

export async function insertContactMessage(msg: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<ContactMessage> {
  return getAdapter().insertContactMessage(msg);
}

export async function getContactMessages(status?: string): Promise<ContactMessage[]> {
  return getAdapter().getContactMessages(status);
}

export async function updateContactMessageStatus(id: string, status: 'UNREAD' | 'READ' | 'ARCHIVED'): Promise<void> {
  return getAdapter().updateContactMessageStatus(id, status);
}

export async function deleteContactMessage(id: string): Promise<void> {
  return getAdapter().deleteContactMessage(id);
}
