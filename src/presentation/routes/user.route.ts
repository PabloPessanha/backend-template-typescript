import { BaseRouter } from '@/shared/base/BaseRouter';
import { FastifyInstance } from 'fastify';
import { singleton } from 'tsyringe';

@singleton()
export class UserRoute extends BaseRouter {
  public async setup(fastify: FastifyInstance) {
    fastify.route({
      method: 'GET',
      url: '/',
      handler: (_resquest, reply) => reply.send({ message: 'ok' }),
    });

    fastify.route<{ Body: { name?: string } }>({
      method: 'POST',
      url: '/user',
      handler: (request, reply) => {
        reply.status(200).send({ name: request.body.name });
      },
    });
  }
}
