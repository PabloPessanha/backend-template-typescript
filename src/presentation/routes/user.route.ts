import { FastifyInstance } from 'fastify';
import { singleton, inject } from 'tsyringe';
import { BaseRouter } from '@/shared/base/BaseRouter';
import { CreateUserBody, CreateUserSchema } from '@/shared/schemas/user/create-user.schema';
import { CreateUserController } from '@/presentation/controllers/user/create-user.controller';

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

    fastify.route<{ Body: CreateUserBody }>({
      method: 'POST',
      url: '/user',
      schema: CreateUserSchema,
      handler: (req, reply) => this.createUserHandler.index(req, reply),
    });
  }
}
