import {
  insertGame,
  insertCharacter,
  insertItem,
  insertGuide,
  getGameById,
  getGameBySlug,
} from './db';
import { validateGame, validateCharacter, validateGuide, validateItem } from './validation';

export interface CsvImportResult {
  success: boolean;
  importedCount: number;
  totalRows: number;
  errors: { row: number; message: string }[];
}

/**
 * Standard RFC-4180 compliant CSV line parser supporting quoted fields and commas.
 */
export function parseCsv(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (insideQuotes) {
      if (char === '"' && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else if (char === '"') {
        insideQuotes = false;
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        insideQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentField.trim());
        currentField = '';
      } else if (char === '\r') {
        // ignore CR
      } else if (char === '\n') {
        currentRow.push(currentField.trim());
        if (currentRow.some((field) => field.length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentField = '';
      } else {
        currentField += char;
      }
    }
  }

  // Push last field and row if any
  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((field) => field.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Requirement 18: Import content from CSV safely with full validation and duplicate slug defense.
 */
export async function importContentFromCsv(
  entity: 'games' | 'characters' | 'items' | 'guides',
  csvContent: string
): Promise<CsvImportResult> {
  const rows = parseCsv(csvContent);
  if (rows.length < 2) {
    return {
      success: false,
      importedCount: 0,
      totalRows: 0,
      errors: [{ row: 0, message: 'File CSV kosong atau tidak memiliki baris header.' }],
    };
  }

  const headers = rows[0].map((h) => h.toLowerCase().trim());
  const dataRows = rows.slice(1);
  const errors: { row: number; message: string }[] = [];
  let importedCount = 0;

  for (let idx = 0; idx < dataRows.length; idx++) {
    const rowNum = idx + 2; // 1-based, including header
    const values = dataRows[idx];
    const rowData: Record<string, string> = {};

    headers.forEach((h, colIdx) => {
      rowData[h] = values[colIdx] || '';
    });

    try {
      if (entity === 'games') {
        const payload = {
          name: rowData.name,
          slug: rowData.slug,
          developer: rowData.developer || 'Unknown Developer',
          publisher: rowData.publisher || 'Unknown Publisher',
          release_date: rowData.release_date || new Date().toISOString().slice(0, 10),
          platforms: rowData.platforms ? rowData.platforms.split(';').map((s) => s.trim()) : ['PC'],
          genres: rowData.genres ? rowData.genres.split(';').map((s) => s.trim()) : ['Action'],
          description: rowData.description || 'Deskripsi game...',
          cover_image: rowData.cover_image || '/images/placeholder-game.svg',
          banner_image: rowData.banner_image || '/images/placeholder-game.svg',
          rating: parseFloat(rowData.rating) || 4.5,
          official_url: rowData.official_url || '',
          status: rowData.status || 'Active',
        };

        const val = validateGame(payload);
        if (!val.valid) throw new Error(val.error);

        await insertGame({
          id: `game-${payload.slug}-${Date.now().toString(36)}`,
          ...payload,
        });
        importedCount++;
      } else if (entity === 'characters') {
        // Resolve game_id by slug if slug provided
        let gameId = rowData.game_id;
        if (!gameId && rowData.game_slug) {
          const game = await getGameBySlug(rowData.game_slug);
          if (game) gameId = game.id;
        }

        const payload = {
          game_id: gameId,
          name: rowData.name,
          slug: rowData.slug,
          role: rowData.role || 'DPS',
          element: rowData.element || 'Neutral',
          weapon: rowData.weapon || 'Sword',
          rarity: parseInt(rowData.rarity, 10) || 5,
          description: rowData.description || 'Deskripsi karakter...',
          portrait: rowData.portrait || '/images/placeholder-character.svg',
          full_image: rowData.full_image || '/images/placeholder-character.svg',
          status: (rowData.status as any) || 'PUBLISHED',
        };

        const val = validateCharacter(payload);
        if (!val.valid) throw new Error(val.error);

        await insertCharacter({
          id: `char-${payload.slug}-${Date.now().toString(36)}`,
          game_id: payload.game_id,
          name: payload.name,
          slug: payload.slug,
          role: payload.role,
          element: payload.element,
          weapon: payload.weapon,
          rarity: payload.rarity,
          description: payload.description,
          portrait: payload.portrait,
          full_image: payload.full_image,
          release_date: rowData.release_date || new Date().toISOString().slice(0, 10),
          skills: [],
          talents: [],
          recommended_build: {
            main_role: payload.role,
            best_artifacts: rowData.artifacts || 'Standard Set',
            main_stats: 'ATK% / Elemental DMG / CRIT',
            sub_stats: 'CRIT Rate, CRIT DMG, ATK%',
            summary: 'Rekomendasi build seimbang.',
          },
          recommended_weapons: [],
          recommended_team: [],
          materials: [],
          status: payload.status,
        });
        importedCount++;
      } else if (entity === 'items') {
        let gameId = rowData.game_id;
        if (!gameId && rowData.game_slug) {
          const game = await getGameBySlug(rowData.game_slug);
          if (game) gameId = game.id;
        }

        const payload = {
          game_id: gameId,
          name: rowData.name,
          slug: rowData.slug,
          type: rowData.type || 'Weapon',
          rarity: parseInt(rowData.rarity, 10) || 4,
          description: rowData.description || 'Deskripsi item...',
          how_to_get: rowData.how_to_get || 'Didapatkan melalui quest atau drop.',
          icon: rowData.icon || '/images/placeholder-item.svg',
        };

        const val = validateItem(payload);
        if (!val.valid) throw new Error(val.error);

        await insertItem({
          id: `item-${payload.slug}-${Date.now().toString(36)}`,
          game_id: payload.game_id,
          name: payload.name,
          slug: payload.slug,
          type: payload.type,
          rarity: payload.rarity,
          description: payload.description,
          how_to_get: payload.how_to_get,
          icon: payload.icon,
          stats: {},
        });
        importedCount++;
      } else if (entity === 'guides') {
        let gameId = rowData.game_id;
        if (!gameId && rowData.game_slug) {
          const game = await getGameBySlug(rowData.game_slug);
          if (game) gameId = game.id;
        }

        const payload = {
          game_id: gameId,
          title: rowData.title,
          slug: rowData.slug,
          category: rowData.category || 'TIPS',
          excerpt: rowData.excerpt || 'Ringkasan panduan...',
          content: rowData.content || 'Konten panduan lengkap...',
          author: rowData.author || 'Tim Editorial Seraphi',
          status: (rowData.status as any) || 'PUBLISHED',
        };

        const val = validateGuide(payload);
        if (!val.valid) throw new Error(val.error);

        await insertGuide({
          id: `guide-${payload.slug}-${Date.now().toString(36)}`,
          game_id: payload.game_id,
          title: payload.title,
          slug: payload.slug,
          category: payload.category,
          thumbnail: rowData.thumbnail || '/images/placeholder-guide.svg',
          excerpt: payload.excerpt,
          content: payload.content,
          author: payload.author,
          tags: rowData.tags ? rowData.tags.split(';').map((s) => s.trim()) : ['tips'],
          status: payload.status,
          published_at: new Date().toISOString(),
        });
        importedCount++;
      }
    } catch (err: any) {
      errors.push({ row: rowNum, message: err.message || 'Gagal memproses baris' });
    }
  }

  return {
    success: errors.length === 0,
    importedCount,
    totalRows: dataRows.length,
    errors,
  };
}

export const importCsvData = importContentFromCsv;
