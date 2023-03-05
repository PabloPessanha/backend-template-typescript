import { FastifyInstance } from 'fastify';
import { singleton, inject } from 'tsyringe';
import { BaseRouter } from '@/shared/base/BaseRouter';
import { CreateUserSchema } from '@/shared/schemas/user/create.schema';
import { CreateUserController } from '@/presentation/controllers/user/create.controller';

@singleton()
export class UserRoute extends BaseRouter {
  constructor(
    @inject(CreateUserController)
    private createUserHandler: CreateUserController,
  ) {
    super();
  }

  public async setup(fastify: FastifyInstance) {
    fastify.route({
      method: 'GET',
      url: '/user',
      handler: (_r, reply) => reply.send({ message: 'ok' }),
    });

    fastify.route({
      method: 'POST',
      url: '/user',
      schema: CreateUserSchema,
      handler: (req, reply) => this.createUserHandler.index(req, reply),
    });
  }
}
