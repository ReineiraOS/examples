import type { VercelRequest, VercelResponse } from '@vercel/node';
import { CreateMMProfileDtoSchema } from '../../../src/application/dto/mm-profile/create-mm-profile.dto.js';
import { CreateMMProfileUseCase } from '../../../src/application/use-case/mm-profile/create-mm-profile.use-case.js';
import { GetMMProfilesUseCase } from '../../../src/application/use-case/mm-profile/get-mm-profiles.use-case.js';
import { container } from '../../../src/infrastructure/container.js';
import { createHandler, createGetHandler, sendResponse } from '../../../src/interface/handler-factory.js';
import { withAuth } from '../../../src/interface/middleware/with-auth.js';
import { withCors } from '../../../src/interface/middleware/with-cors.js';
import { Response } from '../../../src/interface/response.js';

const createUseCase = new CreateMMProfileUseCase(container.mmProfileRepo);
const listUseCase = new GetMMProfilesUseCase(container.mmProfileRepo);

const postHandler = createHandler({
  operationName: 'CreateMMProfile',
  schema: CreateMMProfileDtoSchema,
  execute: async (dto) => {
    const result = await createUseCase.execute(dto);
    return Response.created(result);
  },
});

const getHandler = createGetHandler({
  operationName: 'GetMMProfiles',
  execute: async (req) => {
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const result = await listUseCase.execute(limit);
    return Response.ok(result);
  },
});

const handler = async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  if (req.method === 'POST') return postHandler(req, res);
  if (req.method === 'GET') return getHandler(req, res);
  sendResponse(res, Response.badRequest('Method not allowed'));
};

export default withCors(withAuth(handler));
