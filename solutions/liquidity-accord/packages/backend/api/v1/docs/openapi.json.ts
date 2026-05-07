import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendResponse } from '../../../src/interface/handler-factory.js';
import { withCors } from '../../../src/interface/middleware/with-cors.js';
import { Response } from '../../../src/interface/response.js';

const PLACEHOLDER_SPEC = {
  openapi: '3.1.0',
  info: {
    title: 'Liquidity Accord API',
    version: '0.1.0',
    description: 'Backend API for Liquidity Accord — confidential MM performance bonds and delisting insurance on ReineiraOS',
  },
  servers: [{ url: '/api/v1' }],
  paths: {},
};

const handler = async (_req: VercelRequest, res: VercelResponse): Promise<void> => {
  sendResponse(res, Response.ok(PLACEHOLDER_SPEC));
};

export default withCors(handler);
