import { MetadataRoute } from 'next';
import { getGames, getGuides, getNews, getCharacters, getAuthors } from '@/lib/db';
import { getSiteUrl, isIndexingEnabled, isProductionMode } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // If global indexing is disabled, emit empty sitemap
  if (!isIndexingEnabled()) {
    return [];
  }

  const baseUrl = getSiteUrl();
  const now = new Date();

  // 1. Static public indexable routes (Excludes administrative, API, draft, and internal search pages)
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/games`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/guides`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/news`, lastModified: now, changeFrequency: 'hourly', priority: 0.9 },
    { url: `${baseUrl}/tier-list`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/redeem-codes`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/events`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/editorial-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/affiliate-disclosure`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ];

  const [rawGames, rawChars, rawGuides, rawNews, authors] = await Promise.all([
    getGames(true),
    getCharacters(undefined, true),
    getGuides({ onlyPublished: true }),
    getNews({ onlyPublished: true }),
    getAuthors(),
  ]);

  // 2. Published Games & Sub-Hubs
  const games = isProductionMode() ? rawGames.filter((g) => !g.is_demo) : rawGames;
  const gameRoutes: MetadataRoute.Sitemap = games.flatMap((game) => [
    { url: `${baseUrl}/games/${game.slug}`, lastModified: new Date(game.updated_at), changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/games/${game.slug}/characters`, lastModified: new Date(game.updated_at), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/games/${game.slug}/guides`, lastModified: new Date(game.updated_at), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/games/${game.slug}/items`, lastModified: new Date(game.updated_at), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/games/${game.slug}/tier-list`, lastModified: new Date(game.updated_at), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/games/${game.slug}/redeem-codes`, lastModified: new Date(game.updated_at), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/games/${game.slug}/events`, lastModified: new Date(game.updated_at), changeFrequency: 'daily', priority: 0.75 },
    { url: `${baseUrl}/games/${game.slug}/news`, lastModified: new Date(game.updated_at), changeFrequency: 'daily', priority: 0.8 },
  ]);

  // 3. Published Characters (Requirement 13)
  const characters = isProductionMode() ? rawChars.filter((c) => !c.is_demo) : rawChars;
  const charRoutes: MetadataRoute.Sitemap = characters.map((c) => {
    const game = games.find((g) => g.id === c.game_id);
    const gameSlug = game ? game.slug : 'game';
    return {
      url: `${baseUrl}/games/${gameSlug}/characters/${c.slug}`,
      lastModified: new Date(c.updated_at),
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  // 4. Published Guides Only (Strictly excludes DRAFT, REVIEW, ARCHIVED per Requirement 13)
  const guides = isProductionMode() ? rawGuides.filter((g) => !g.is_demo) : rawGuides;
  const guideRoutes: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: new Date(g.updated_at),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 5. Published News Only (Strictly excludes DRAFT, REVIEW, ARCHIVED per Requirement 13)
  const newsList = isProductionMode() ? rawNews.filter((n) => !n.is_demo) : rawNews;
  const newsRoutes: MetadataRoute.Sitemap = newsList.map((n) => ({
    url: `${baseUrl}/news/${n.slug}`,
    lastModified: new Date(n.updated_at),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  // 6. Authors (Requirement 20)
  const authorRoutes: MetadataRoute.Sitemap = authors.map((a) => ({
    url: `${baseUrl}/authors/${a.slug}`,
    lastModified: new Date(a.updated_at || a.created_at),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...gameRoutes, ...charRoutes, ...guideRoutes, ...newsRoutes, ...authorRoutes];
}
