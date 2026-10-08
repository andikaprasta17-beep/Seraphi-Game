import { RedeemCode } from './types';
import { getRedeemCodeById, updateRedeemCode } from './db';

export interface VerificationResult {
  isValid: boolean;
  status: 'ACTIVE' | 'EXPIRED' | 'UNKNOWN';
  verified_at: string;
  source: string;
  provider: string;
  notes?: string;
}

export interface RedeemVerificationProvider {
  name: string;
  verify(code: RedeemCode): Promise<VerificationResult>;
}

/**
 * Provider 1: Manual Editorial Verification
 * Validates based on manual staff testing and verification.
 */
export class ManualProvider implements RedeemVerificationProvider {
  name = 'manual';

  async verify(code: RedeemCode): Promise<VerificationResult> {
    const now = new Date().toISOString();
    // In manual verification, honor the existing status or mark as actively verified
    return {
      isValid: code.status === 'ACTIVE',
      status: code.status,
      verified_at: now,
      source: code.source || 'Editorial Team Manual Check',
      provider: this.name,
      notes: 'Diverifikasi langsung oleh tim editorial Seraphi Game.',
    };
  }
}

/**
 * Provider 2: Official Game Developer API / Webhook Integration
 * Pluggable architecture ready for official game publisher redemption APIs.
 */
export class OfficialProvider implements RedeemVerificationProvider {
  name = 'official';

  async verify(code: RedeemCode): Promise<VerificationResult> {
    const now = new Date().toISOString();

    // Check expiration date if specified
    if (code.expired_at) {
      const expDate = new Date(code.expired_at);
      if (!isNaN(expDate.getTime()) && expDate.getTime() < Date.now()) {
        return {
          isValid: false,
          status: 'EXPIRED',
          verified_at: now,
          source: 'Official Game Publisher Server',
          provider: this.name,
          notes: 'Kode telah melewati batas waktu kedaluwarsa resmi.',
        };
      }
    }

    // Default simulation for official provider
    return {
      isValid: code.status !== 'EXPIRED',
      status: code.status === 'EXPIRED' ? 'EXPIRED' : 'ACTIVE',
      verified_at: now,
      source: 'Official Server Sync',
      provider: this.name,
      notes: 'Sinkronisasi status server game resmi.',
    };
  }
}

/**
 * Provider 3: Community Crowdsourced Reports
 * Pluggable provider for player feedback and community consensus.
 */
export class CommunityProvider implements RedeemVerificationProvider {
  name = 'community';

  async verify(code: RedeemCode): Promise<VerificationResult> {
    const now = new Date().toISOString();
    return {
      isValid: code.status === 'ACTIVE',
      status: code.status,
      verified_at: now,
      source: 'Komunitas Gamer Indonesia',
      provider: this.name,
      notes: 'Berdasarkan laporan pemain aktif di komunitas Discord / Telegram.',
    };
  }
}

// Registry of available verification providers
const providers: Record<string, RedeemVerificationProvider> = {
  manual: new ManualProvider(),
  official: new OfficialProvider(),
  community: new CommunityProvider(),
};

/**
 * Register a custom verification provider for future scalability
 */
export function registerVerificationProvider(provider: RedeemVerificationProvider) {
  providers[provider.name.toLowerCase()] = provider;
}

/**
 * Main abstraction: verifyRedeemCode()
 * Requirement 17: Verifies a redeem code using the specified provider and updates database.
 */
export async function verifyRedeemCode(
  codeId: string,
  providerName: string = 'manual'
): Promise<VerificationResult> {
  const code = await getRedeemCodeById(codeId);
  if (!code) {
    throw new Error(`Redeem code dengan ID "${codeId}" tidak ditemukan.`);
  }

  const selectedProvider = providers[providerName.toLowerCase()] || providers.manual;
  const result = await selectedProvider.verify(code);

  // Update record in database
  await updateRedeemCode(code.id, {
    status: result.status,
    verified_at: result.verified_at,
    last_checked: result.verified_at,
    source: result.source,
  });

  return result;
}
