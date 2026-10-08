import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Search as SearchIcon, Gamepad2, Users, BookOpen, Newspaper, Package, Gift } from 'lucide-react';
import { searchAll } from '@/lib/db';
import Breadcrumbs from '@/components/Breadcrumbs';
import GameCard from '@/components/GameCard';
import CharacterCard from '@/components/CharacterCard';
import GuideCard from '@/components/GuideCard';
import NewsCard from '@/components/NewsCard';
import RedeemCodeCard from '@/components/RedeemCodeCard';

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q || '';
  return {
    title: query ? `Hasil Pencarian untuk "${query}" — SERAPHI GAME` : 'Pencarian Database — SERAPHI GAME',
    description: `Cari game, karakter, panduan build, berita game, dan kode redeem di database portal Seraphi Game.`,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q ? q.trim() : '';

  const results = query ? await searchAll(query) : null;
  const totalResults = results
    ? results.games.length +
      results.characters.length +
      results.guides.length +
      results.news.length +
      results.items.length +
      results.redeem_codes.length
    : 0;

  return (
    <div className="container" style={{ paddingBottom: 60 }}>
      <Breadcrumbs items={[{ label: 'Pencarian' }]} />

      <div style={{ margin: '20px 0 30px' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fff', marginBottom: 12 }}>
          Pencarian Database
        </h1>

        <form action="/search" method="GET" style={{ maxWidth: 640 }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Cari nama game, karakter, item, guide, atau berita..."
              className="form-control"
              style={{
                height: 52,
                borderRadius: 'var(--radius-full)',
                paddingLeft: 22,
                paddingRight: 110,
                fontSize: '1rem',
                border: '2px solid var(--border-medium)',
              }}
              autoFocus
            />
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              style={{
                position: 'absolute',
                right: 6,
                borderRadius: 'var(--radius-full)',
                padding: '10px 20px',
              }}
            >
              <SearchIcon size={16} />
              <span>Cari</span>
            </button>
          </div>
        </form>
      </div>

      {query ? (
        <div>
          <div style={{ marginBottom: 30, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Ditemukan <strong>{totalResults}</strong> hasil untuk kata kunci:{' '}
            <span style={{ color: 'var(--primary)', fontWeight: 800 }}>&ldquo;{query}&rdquo;</span>
          </div>

          {totalResults === 0 ? (
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 40,
                textAlign: 'center',
                color: 'var(--text-muted)',
              }}
            >
              <p style={{ fontSize: '1.1rem', marginBottom: 8, color: '#fff' }}>
                Tidak ada hasil yang cocok dengan &ldquo;{query}&rdquo;
              </p>
              <p style={{ fontSize: '0.88rem' }}>
                Coba gunakan kata kunci lain seperti <em>Neuvillette</em>, <em>Genshin</em>, <em>Fanny</em>, atau <em>Acheron</em>.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              {/* Category: Games */}
              {results!.games.length > 0 && (
                <section>
                  <div className="section-header">
                    <div className="section-title-wrap">
                      <Gamepad2 size={20} color="var(--primary)" />
                      <h2 className="section-title" style={{ fontSize: '1.3rem' }}>
                        Game ({results!.games.length})
                      </h2>
                    </div>
                  </div>
                  <div className="grid-games">
                    {results!.games.map((game) => (
                      <GameCard key={game.id} game={game} />
                    ))}
                  </div>
                </section>
              )}

              {/* Category: Characters */}
              {results!.characters.length > 0 && (
                <section>
                  <div className="section-header">
                    <div className="section-title-wrap">
                      <Users size={20} color="var(--secondary)" />
                      <h2 className="section-title" style={{ fontSize: '1.3rem' }}>
                        Karakter ({results!.characters.length})
                      </h2>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                    {results!.characters.map((char) => (
                      <CharacterCard
                        key={char.id}
                        character={char}
                        gameSlug={char.game_slug}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Category: Guides */}
              {results!.guides.length > 0 && (
                <section>
                  <div className="section-header">
                    <div className="section-title-wrap">
                      <BookOpen size={20} color="#a855f7" />
                      <h2 className="section-title" style={{ fontSize: '1.3rem' }}>
                        Panduan & Guide ({results!.guides.length})
                      </h2>
                    </div>
                  </div>
                  <div className="grid-cards">
                    {results!.guides.map((guide) => (
                      <GuideCard key={guide.id} guide={guide} />
                    ))}
                  </div>
                </section>
              )}

              {/* Category: News */}
              {results!.news.length > 0 && (
                <section>
                  <div className="section-header">
                    <div className="section-title-wrap">
                      <Newspaper size={20} color="#10b981" />
                      <h2 className="section-title" style={{ fontSize: '1.3rem' }}>
                        Berita ({results!.news.length})
                      </h2>
                    </div>
                  </div>
                  <div className="grid-news">
                    {results!.news.map((item) => (
                      <NewsCard key={item.id} news={item} />
                    ))}
                  </div>
                </section>
              )}

              {/* Category: Items */}
              {results!.items.length > 0 && (
                <section>
                  <div className="section-header">
                    <div className="section-title-wrap">
                      <Package size={20} color="#f59e0b" />
                      <h2 className="section-title" style={{ fontSize: '1.3rem' }}>
                        Item & Senjata ({results!.items.length})
                      </h2>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                    {results!.items.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          background: 'var(--bg-card)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-lg)',
                          padding: 16,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 14,
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.icon}
                          alt={item.name}
                          style={{ width: 50, height: 50, borderRadius: 6, objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            {item.type} {item.game_name ? `• ${item.game_name}` : ''}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Category: Redeem Codes */}
              {results!.redeem_codes.length > 0 && (
                <section>
                  <div className="section-header">
                    <div className="section-title-wrap">
                      <Gift size={20} color="#fbbf24" />
                      <h2 className="section-title" style={{ fontSize: '1.3rem' }}>
                        Kode Redeem ({results!.redeem_codes.length})
                      </h2>
                    </div>
                  </div>
                  <div className="grid-cards">
                    {results!.redeem_codes.map((code) => (
                      <RedeemCodeCard
                        key={code.id}
                        id={code.id}
                        game_id={code.game_id}
                        game_name={code.game_name}
                        code={code.code}
                        reward={code.reward}
                        status={code.status}
                        last_checked={code.last_checked}
                        source={code.source}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 30,
            marginTop: 20,
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: 12 }}>
            Saran Kata Kunci Populer
          </h3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['Neuvillette', 'Genshin Impact', 'Acheron', 'Firefly', 'Fanny MLBB', 'Valorant Aim', 'Kode Redeem Genshin', 'Elden Ring Malenia'].map((keyword) => (
              <Link
                key={keyword}
                href={`/search?q=${encodeURIComponent(keyword)}`}
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                {keyword}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
