import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getEnv } from '../../core/config.js';
import type { VercelHandler } from '../handler-factory.js';
import { sendResponse } from '../handler-factory.js';
import { Response } from '../response.js';

function resolveOrigin(requestOrigin: string | undefined): string {
  let allowedRaw: string;
  try {
    allowedRaw = getEnv().ALLOWED_ORIGINS;
  } catch {
    return requestOrigin ?? '*';
  }

  if (allowedRaw === '*') {
    return requestOrigin ?? '*';
  }

  const allowed = allowedRaw
    .split(/[,\s]+/)
    .map((o) => o.trim())
    .filter((o) => o.length > 0);

  if (requestOrigin && allowed.includes(requestOrigin)) {
    return requestOrigin;
  }

  return allowed[0] ?? requestOrigin ?? '*';
}

function setCorsHeaders(res: VercelResponse, origin: string): void {
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Idempotency-Key, X-Wallet-Provider',
  );
  res.setHeader('Access-Control-Max-Age', '86400');
}

export function withCors(handler: VercelHandler): VercelHandler {
  return async (req: VercelRequest, res: VercelResponse): Promise<void> => {
    const requestOrigin = req.headers.origin as string | undefined;
    const origin = resolveOrigin(requestOrigin);

    if (req.method === 'OPTIONS') {
      setCorsHeaders(res, origin);
      sendResponse(res, Response.noContent());
      return;
    }

    setCorsHeaders(res, origin);
    return handler(req, res);
  };
}
