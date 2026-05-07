import { GetAttestationByIdUseCase } from '../../../src/application/use-case/attestation/get-attestation-by-id.use-case.js';
import { container } from '../../../src/infrastructure/container.js';
import { createGetHandler } from '../../../src/interface/handler-factory.js';
import { withAuth } from '../../../src/interface/middleware/with-auth.js';
import { withCors } from '../../../src/interface/middleware/with-cors.js';
import { Response } from '../../../src/interface/response.js';

const useCase = new GetAttestationByIdUseCase(container.attestationRepo);

const handler = createGetHandler({
  operationName: 'GetAttestationById',
  execute: async (req) => {
    const publicId = req.query.publicId as string;
    const result = await useCase.execute(publicId);
    return result ? Response.ok(result) : Response.notFound('Attestation not found');
  },
});

export default withCors(withAuth(handler));
