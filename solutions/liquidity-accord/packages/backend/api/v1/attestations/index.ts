import type { VercelRequest, VercelResponse } from '@vercel/node';
import { CreateAttestationDtoSchema } from '../../../src/application/dto/attestation/create-attestation.dto.js';
import { CreateAttestationUseCase } from '../../../src/application/use-case/attestation/create-attestation.use-case.js';
import { GetAttestationsUseCase } from '../../../src/application/use-case/attestation/get-attestations.use-case.js';
import { container } from '../../../src/infrastructure/container.js';
import { createHandler, createGetHandler, sendResponse } from '../../../src/interface/handler-factory.js';
import { withAuth } from '../../../src/interface/middleware/with-auth.js';
import { withCors } from '../../../src/interface/middleware/with-cors.js';
import { Response } from '../../../src/interface/response.js';

const createUseCase = new CreateAttestationUseCase(container.attestationRepo);
const listUseCase = new GetAttestationsUseCase(container.attestationRepo);

const postHandler = createHandler({
  operationName: 'CreateAttestation',
  schema: CreateAttestationDtoSchema,
  execute: async (dto) => {
    const result = await createUseCase.execute(dto);
    return Response.created(result);
  },
});

const getHandler = createGetHandler({
  operationName: 'GetAttestations',
  execute: async (req) => {
    const engagementPublicId = req.query.engagement_public_id as string | undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const result = await listUseCase.execute(engagementPublicId, limit);
    return Response.ok(result);
  },
});

const handler = async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  if (req.method === 'POST') return postHandler(req, res);
  if (req.method === 'GET') return getHandler(req, res);
  sendResponse(res, Response.badRequest('Method not allowed'));
};

export default withCors(withAuth(handler));
