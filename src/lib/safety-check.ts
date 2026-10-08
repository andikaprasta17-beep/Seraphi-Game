import { getSiteUrl, isIndexingEnabled, isProductionMode } from './seo';

export interface ProductionSafetyResult {
  passed: boolean;
  issues: string[];
  warnings: string[];
  checks: {
    siteUrl: 'PASS' | 'WARNING' | 'FAIL';
    indexingMode: 'PASS' | 'FAIL';
    demoContent: 'PASS' | 'FAIL';
    sessionSecret: 'PASS' | 'FAIL';
    adminPassword: 'PASS' | 'FAIL';
  };
  details: {
    siteUrl: string;
    contentMode: string;
    indexingEnabled: boolean;
    publishedDemoCount: number;
    hasStrongSecret: boolean;
    hasHardenedPassword: boolean;
  };
}

const INSECURE_DEMO_PASSWORDS = [
  'seraphi2026!',
  'admin123',
  'password',
  'admin',
  'seraphi_demo',
  'root',
  '12345678',
];

/**
 * Phase 5: Production Safety & Startup Configuration Verification
 */
export function runProductionSafetyCheck(providedStats?: { published_demo?: number }): ProductionSafetyResult {
  const issues: string[] = [];
  const warnings: string[] = [];

  const contentMode = (process.env.CONTENT_MODE || 'demo').toLowerCase();
  const siteUrl = getSiteUrl();
  const indexingEnabled = isIndexingEnabled();
  const sessionSecret = process.env.SESSION_SECRET || '';
  const adminPassword = process.env.ADMIN_PASSWORD || '';

  const stats = { published_demo: providedStats?.published_demo ?? 0 };

  // 1. Site URL Check
  let siteUrlStatus: 'PASS' | 'WARNING' | 'FAIL' = 'PASS';
  const isLocalhost = siteUrl.includes('localhost') || siteUrl.includes('127.0.0.1');
  if (contentMode === 'production' && isLocalhost) {
    siteUrlStatus = 'FAIL';
    issues.push(`NEXT_PUBLIC_SITE_URL masih mengarah ke localhost (${siteUrl}) dalam CONTENT_MODE=production.`);
  } else if (isLocalhost) {
    siteUrlStatus = 'WARNING';
    warnings.push(`NEXT_PUBLIC_SITE_URL menggunakan localhost (${siteUrl}).`);
  }

  // 2. Indexing vs Content Mode Check
  // Rule: Jika INDEXING_ENABLED=true tetapi CONTENT_MODE=demo -> status: FAIL
  let indexingModeStatus: 'PASS' | 'FAIL' = 'PASS';
  if (indexingEnabled && contentMode === 'demo') {
    indexingModeStatus = 'FAIL';
    issues.push('INDEXING_ENABLED=true aktif saat CONTENT_MODE=demo. Mesin pencari dapat mengindeks konten demo.');
  }

  // 3. Demo Content Check
  // Rule: Jika CONTENT_MODE=production dan Published Demo Content > 0 -> status: FAIL
  let demoContentStatus: 'PASS' | 'FAIL' = 'PASS';
  if (contentMode === 'production' && stats.published_demo > 0) {
    demoContentStatus = 'FAIL';
    issues.push(`Terdapat ${stats.published_demo} konten demo dengan status PUBLISHED dalam mode production.`);
  }

  // 4. Session Secret Check
  // Rule: Jika SESSION_SECRET terlalu pendek (< 32 char) atau tidak tersedia -> FAIL
  let sessionSecretStatus: 'PASS' | 'FAIL' = 'PASS';
  if (!sessionSecret || sessionSecret.length < 32 || sessionSecret.includes('never-use-in-prod')) {
    sessionSecretStatus = 'FAIL';
    issues.push('SESSION_SECRET tidak tersedia atau terlalu pendek (< 32 karakter) untuk production HMAC.');
  }

  // 5. Admin Password Hardening Check
  // Rule: Jika ADMIN_PASSWORD menggunakan password demo lama -> FAIL
  let adminPasswordStatus: 'PASS' | 'FAIL' = 'PASS';
  if (!adminPassword || INSECURE_DEMO_PASSWORDS.includes(adminPassword)) {
    adminPasswordStatus = 'FAIL';
    issues.push('ADMIN_PASSWORD terdeteksi menggunakan password demo lama yang tidak aman.');
  }

  const passed = issues.length === 0;

  return {
    passed,
    issues,
    warnings,
    checks: {
      siteUrl: siteUrlStatus,
      indexingMode: indexingModeStatus,
      demoContent: demoContentStatus,
      sessionSecret: sessionSecretStatus,
      adminPassword: adminPasswordStatus,
    },
    details: {
      siteUrl,
      contentMode,
      indexingEnabled,
      publishedDemoCount: stats.published_demo,
      hasStrongSecret: sessionSecretStatus === 'PASS',
      hasHardenedPassword: adminPasswordStatus === 'PASS',
    },
  };
}
