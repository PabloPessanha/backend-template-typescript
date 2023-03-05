import { FastifyInstance } from 'fastify';
import { singleton } from 'tsyringe';
import { BaseRouter } from '@/shared/base/BaseRouter';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import * as createUserSchema from '../validation/user/create.schema';

@singleton()
export class UserRoute extends BaseRouter {
  public async setup(fastify: FastifyInstance) {
    fastify.route({
      method: 'GET',
      url: '/user',
      handler: (_resquest, reply) => reply.send({ message: 'ok' }),
    });

    fastify.withTypeProvider<ZodTypeProvider>().route({
      method: 'POST',
      url: '/user',
      schema: createUserSchema.schema,
      handler: (request, reply) => {
        reply.status(200).send({ name: request.body.name });
      },
    });
  }
}
