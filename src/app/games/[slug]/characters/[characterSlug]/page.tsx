import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Shield,
  Zap,
  Sword,
  Users,
  Package,
  BookOpen,
  Sparkles,
  Clock,
  ArrowRight,
} from 'lucide-react';
import {
  getGameBySlug,
  getCharacterBySlug,
  getCharacters,
  getGuides,
  getItems,
} from '@/lib/db';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import CharacterCard from '@/components/CharacterCard';
import ViewTracker from '@/components/ViewTracker';
import {
  generateSeoTitle,
  generateSeoDescription,
  getCanonicalUrl,
  getRobotsDirective,
  getSiteUrl,
} from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string; characterSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, characterSlug } = await params;
  const [game, character] = await Promise.all([
    getGameBySlug(slug),
    getCharacterBySlug(characterSlug, slug),
  ]);

  if (!game || !character) {
    return { title: 'Karakter Tidak Ditemukan' };
  }

  const title = character.meta_title || generateSeoTitle({
    type: 'character',
    title: character.name,
    gameName: game.name,
  });

  const description = character.meta_description || generateSeoDescription({
    type: 'character',
    title: character.name,
    gameName: game.name,
    fallbackText: character.description,
  });

  const siteUrl = getSiteUrl();
  const ogImageUrl = character.full_image || character.portrait || `${siteUrl}/api/og?title=${encodeURIComponent(character.name)}&game=${encodeURIComponent(game.name)}&category=Character+Guide`;

  return {
    title,
    description,
    alternates: {
      canonical: getCanonicalUrl(`/games/${game.slug}/characters/${character.slug}`),
    },
    robots: getRobotsDirective(character.status, character.no_index, character.is_demo),
    openGraph: {
      title,
      description,
      images: [{ url: ogImageUrl, width: 800, height: 1000, alt: character.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function CharacterDetailPage({ params }: Props) {
  const { slug, characterSlug } = await params;
  const [game, character] = await Promise.all([
    getGameBySlug(slug),
    getCharacterBySlug(characterSlug, slug),
  ]);

  if (!game || !character) {
    notFound();
  }

  const [allGameChars, gameGuides, allGameItems] = await Promise.all([
    getCharacters(game.id),
    getGuides({ gameIdOrSlug: game.id }),
    getItems(game.id),
  ]);
  const relatedCharacters = allGameChars.filter((c) => c.id !== character.id).slice(0, 4);
  const relatedGuides = gameGuides.slice(0, 3);
  const gameWeapons = allGameItems.filter((i) => i.type.toUpperCase() === 'WEAPON').slice(0, 3);
  const gameMaterials = allGameItems.filter((i) => i.type.toUpperCase() === 'MATERIAL').slice(0, 3);

  const formattedUpdatedDate = new Date(character.updated_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const siteUrl = getSiteUrl();

  const characterSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemPage',
    name: `Build ${character.name} — ${game.name}`,
    description: character.description,
    image: character.full_image || character.portrait,
    dateModified: character.updated_at,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: game.name, item: `${siteUrl}/games/${game.slug}` },
        { '@type': 'ListItem', position: 3, name: 'Characters', item: `${siteUrl}/games/${game.slug}/characters` },
        { '@type': 'ListItem', position: 4, name: character.name },
      ],
    },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Safe Internal View Counter */}
      <ViewTracker type="characters" id={character.id} slug={character.slug} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(characterSchema) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Database Game', href: '/games' },
          { label: game.name, href: `/games/${game.slug}` },
          { label: 'Karakter', href: `/games/${game.slug}/characters` },
          { label: character.name },
        ]}
      />

      {/* Hero Profile Card */}
      <div
        style={{
          background: 'var(--gradient-card)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-xl)',
          padding: 28,
          display: 'flex',
          gap: 28,
          alignItems: 'center',
          flexWrap: 'wrap',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 160,
            height: 160,
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '2px solid var(--border-glow)',
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={character.portrait}
            alt={character.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 6,
              left: 6,
              right: 6,
              background: 'rgba(0, 0, 0, 0.75)',
              borderRadius: 4,
              textAlign: 'center',
              color: '#fbbf24',
              fontSize: '0.85rem',
            }}
          >
            {'★'.repeat(character.rarity)}
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 260 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
            <span
              style={{
                background: 'rgba(0, 242, 254, 0.15)',
                color: 'var(--primary)',
                border: '1px solid var(--border-glow)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.78rem',
                fontWeight: 800,
                textTransform: 'uppercase',
              }}
            >
              {character.element}
            </span>
            <span
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.78rem',
                fontWeight: 700,
              }}
            >
              Role: {character.role}
            </span>
            <span
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.78rem',
                fontWeight: 700,
              }}
            >
              Tipe Senjata: {character.weapon}
            </span>
          </div>

          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fff', marginBottom: 10 }}>
            {character.name}
          </h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: 12 }}>
            {character.description}
          </p>

          {/* Dynamic Last Updated (Requirement 21) */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            <Clock size={14} color="var(--primary)" />
            <span>Terakhir diperbarui: {formattedUpdatedDate}</span>
          </div>
        </div>
      </div>

      {/* Ad Slot */}
      <AdSlot slotId="ad-article-incontent" />

      {/* Section 1: Skills & Talents */}
      {character.skills.length > 0 && (
        <section
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 24,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <Zap size={20} color="var(--primary)" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
              Skill & Talenta {character.name}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {character.skills.map((skill) => (
              <div
                key={skill.name}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 16,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>
                    {skill.name}
                  </div>
                  <span
                    style={{
                      background: 'rgba(0, 242, 254, 0.1)',
                      color: 'var(--primary)',
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    {skill.type}
                  </span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 2: Recommended Weapons */}
      {character.recommended_weapons.length > 0 && (
        <section
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 24,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <Sword size={20} color="#fbbf24" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
              Rekomendasi Senjata Terbaik
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {character.recommended_weapons.map((wep) => (
              <div
                key={wep.name}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span
                      style={{
                        background: '#fbbf24',
                        color: '#000',
                        fontWeight: 900,
                        fontSize: '0.75rem',
                        padding: '2px 6px',
                        borderRadius: 3,
                      }}
                    >
                      Rank #{wep.rank}
                    </span>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>
                      {wep.name}
                    </span>
                    <span style={{ color: '#fbbf24', fontSize: '0.85rem' }}>
                      {'★'.repeat(wep.rarity)}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
                    {wep.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 3: Recommended Build */}
      {character.recommended_build && (
        <section
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 24,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <Shield size={20} color="var(--primary)" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
              Rekomendasi Build & Stats
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {/* Artifact Set */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: 16,
              }}
            >
              <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)', marginBottom: 8, textTransform: 'uppercase' }}>
                Set Artefak / Relic
              </h3>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginBottom: 4 }}>
                {character.recommended_build.best_artifacts}
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0 }}>
                {character.recommended_build.summary}
              </p>
            </div>

            {/* Main Stats */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: 16,
              }}
            >
              <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#10b981', marginBottom: 8, textTransform: 'uppercase' }}>
                Prioritas Main Stats
              </h3>
              <div style={{ fontSize: '0.88rem', color: '#fff', lineHeight: 1.6 }}>
                {character.recommended_build.main_stats}
              </div>
            </div>

            {/* Sub Stats */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: 16,
              }}
            >
              <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#a855f7', marginBottom: 8, textTransform: 'uppercase' }}>
                Prioritas Sub-Stats
              </h3>
              <div style={{ fontSize: '0.88rem', color: '#c084fc', lineHeight: 1.6 }}>
                {character.recommended_build.sub_stats}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 4: Team Recommendations */}
      {character.recommended_team && character.recommended_team.length > 0 && (
        <section
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 24,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <Users size={20} color="#38bdf8" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
              Komposisi Tim Terbaik
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {character.recommended_team.map((member, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 16,
                }}
              >
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: 4 }}>
                  {member.character_name}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 700, marginBottom: 6 }}>
                  Role: {member.role}
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0 }}>
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 5: Ascension Materials */}
      {character.materials.length > 0 && (
        <section
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 24,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <Package size={20} color="#10b981" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
              Material Ascension & Upgrade
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
            {character.materials.map((mat) => (
              <div
                key={mat.name}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>
                    {mat.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {mat.type}
                  </div>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#10b981' }}>
                  x{mat.count}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 6: Related Weapons (Requirement 3) */}
      {gameWeapons.length > 0 && (
        <section
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 24,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Sword size={20} color="#fbbf24" />
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>
                Senjata Terkait di {game.name}
              </h2>
            </div>
            <Link href={`/games/${game.slug}/items`} className="section-view-all">
              <span>Semua Senjata</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
            {gameWeapons.map((wep) => (
              <Link
                key={wep.id}
                href={`/games/${game.slug}/items`}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 14,
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center',
                  textDecoration: 'none',
                }}
              >
                <img
                  src={wep.icon}
                  alt={wep.name}
                  style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }}
                />
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>{wep.name}</div>
                  <div style={{ color: '#fbbf24', fontSize: '0.75rem' }}>{'★'.repeat(wep.rarity)}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Section 7: Related Materials (Requirement 3) */}
      {gameMaterials.length > 0 && (
        <section
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 24,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Package size={20} color="#10b981" />
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>
                Material Terkait di {game.name}
              </h2>
            </div>
            <Link href={`/games/${game.slug}/items`} className="section-view-all">
              <span>Semua Material</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
            {gameMaterials.map((mat) => (
              <div
                key={mat.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 14,
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center',
                }}
              >
                <img
                  src={mat.icon}
                  alt={mat.name}
                  style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }}
                />
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>{mat.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{mat.how_to_get}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 8: Related Characters (Requirement 3) */}
      {relatedCharacters.length > 0 && (
        <section>
          <div className="section-header">
            <div className="section-title-wrap">
              <Users size={20} color="var(--primary)" />
              <h2 className="section-title" style={{ fontSize: '1.3rem' }}>
                Karakter Lain di {game.name}
              </h2>
            </div>
            <Link href={`/games/${game.slug}/characters`} className="section-view-all">
              <span>Semua Karakter</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
            {relatedCharacters.map((char) => (
              <CharacterCard key={char.id} character={char} gameSlug={game.slug} />
            ))}
          </div>
        </section>
      )}

      {/* Section 9: Related Guides Internal Linking */}
      {relatedGuides.length > 0 && (
        <section
          style={{
            background: 'rgba(0, 242, 254, 0.04)',
            border: '1px solid var(--border-glow)',
            borderRadius: 'var(--radius-lg)',
            padding: 24,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <BookOpen size={18} color="var(--primary)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
              Guide Terkait {character.name} & {game.name}
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {relatedGuides.map((guide) => (
              <Link
                key={guide.id}
                href={`/guides/${guide.slug}`}
                style={{
                  color: 'var(--primary)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span>➜ {guide.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
