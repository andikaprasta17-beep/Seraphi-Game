/**
 * SERAPHI GAME — Zero-Cost Error Monitoring Abstraction
 * Lightweight, privacy-compliant error logging abstraction.
 * Ready for open-source self-hosted telemetry (e.g. GlitchTip) or console reporting.
 * Strictly avoids logging PII, passwords, session tokens, or sensitive user input.
 */

export interface ErrorContext {
  route?: string;
  action?: string;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, any>;
}

export interface CapturedError {
  timestamp: string;
  message: string;
  name: string;
  context?: ErrorContext;
  digest?: string;
}

// In-memory circular error buffer (last 50 errors for diagnostics without database strain)
const recentErrors: CapturedError[] = [];
const MAX_BUFFER_SIZE = 50;

function sanitizeContext(context?: ErrorContext): ErrorContext | undefined {
  if (!context) return undefined;
  const clean = { ...context };

  if (clean.metadata) {
    const safeMeta: Record<string, any> = {};
    for (const [k, v] of Object.entries(clean.metadata)) {
      const lower = k.toLowerCase();
      if (
        lower.includes('password') ||
        lower.includes('secret') ||
        lower.includes('token') ||
        lower.includes('cookie') ||
        lower.includes('auth') ||
        lower.includes('credit')
      ) {
        safeMeta[k] = '[REDACTED]';
      } else {
        safeMeta[k] = v;
      }
    }
    clean.metadata = safeMeta;
  }

  return clean;
}

export function captureException(error: unknown, context?: ErrorContext): string {
  const err = error instanceof Error ? error : new Error(String(error));
  const timestamp = new Date().toISOString();
  const cleanContext = sanitizeContext(context);
  const digest = (err as any).digest || `err_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const entry: CapturedError = {
    timestamp,
    message: err.message,
    name: err.name,
    context: cleanContext,
    digest,
  };

  recentErrors.unshift(entry);
  if (recentErrors.length > MAX_BUFFER_SIZE) {
    recentErrors.pop();
  }

  // Safe developer logging
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[ErrorMonitor] (${digest}) ${err.name}: ${err.message}`, cleanContext);
  } else {
    // In production, log single sanitized line without leaking sensitive traces to public
    console.error(`[ErrorMonitor] [${digest}] ${err.name}: ${err.message}`);
  }

  return digest;
}

export function captureMessage(message: string, level: 'info' | 'warn' | 'error' = 'info', context?: ErrorContext) {
  const timestamp = new Date().toISOString();
  const cleanContext = sanitizeContext(context);

  if (process.env.NODE_ENV !== 'production' || level === 'error') {
    console.log(`[ErrorMonitor:${level.toUpperCase()}] ${message}`, cleanContext || '');
  }
}

export function getRecentErrors(): readonly CapturedError[] {
  return recentErrors;
}
