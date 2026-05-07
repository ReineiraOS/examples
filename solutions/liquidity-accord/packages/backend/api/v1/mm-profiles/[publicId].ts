import { GetMMProfileByIdUseCase } from '../../../src/application/use-case/mm-profile/get-mm-profile-by-id.use-case.js';
import { container } from '../../../src/infrastructure/container.js';
import { createGetHandler } from '../../../src/interface/handler-factory.js';
import { withAuth } from '../../../src/interface/middleware/with-auth.js';
import { withCors } from '../../../src/interface/middleware/with-cors.js';
import { Response } from '../../../src/interface/response.js';

const useCase = new GetMMProfileByIdUseCase(container.mmProfileRepo);

const handler = createGetHandler({
  operationName: 'GetMMProfileById',
  execute: async (req) => {
    const publicId = req.query.publicId as string;
    const result = await useCase.execute(publicId);
    return result ? Response.ok(result) : Response.notFound('MM profile not found');
  },
});

export default withCors(withAuth(handler));
