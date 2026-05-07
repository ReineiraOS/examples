import type { VercelRequest, VercelResponse } from '@vercel/node';
import { CreateEngagementDtoSchema } from '../../../src/application/dto/engagement/create-engagement.dto.js';
import { CreateEngagementUseCase } from '../../../src/application/use-case/engagement/create-engagement.use-case.js';
import { GetEngagementsUseCase } from '../../../src/application/use-case/engagement/get-engagements.use-case.js';
import { container } from '../../../src/infrastructure/container.js';
import { createHandler, createGetHandler, sendResponse } from '../../../src/interface/handler-factory.js';
import { withAuth } from '../../../src/interface/middleware/with-auth.js';
import { withCors } from '../../../src/interface/middleware/with-cors.js';
import { Response } from '../../../src/interface/response.js';

const createUseCase = new CreateEngagementUseCase(container.engagementRepo);
const listUseCase = new GetEngagementsUseCase(container.engagementRepo);

const postHandler = createHandler({
  operationName: 'CreateEngagement',
  schema: CreateEngagementDtoSchema,
  execute: async (dto, _req, authPayload) => {
    const result = await createUseCase.execute(dto, authPayload!.userId);
    return Response.created(result);
  },
});

const getHandler = createGetHandler({
  operationName: 'GetEngagements',
  execute: async (req, authPayload) => {
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const result = await listUseCase.execute(authPayload!.userId, limit);
    return Response.ok(result);
  },
});

const handler = async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  if (req.method === 'POST') return postHandler(req, res);
  if (req.method === 'GET') return getHandler(req, res);
  sendResponse(res, Response.badRequest('Method not allowed'));
};

export default withCors(withAuth(handler));
