import { FastifyInstance } from 'fastify';
import { singleton, inject } from 'tsyringe';
import { BaseRouter } from '@/shared/base/BaseRouter';
import * as createUserSchema from '@/presentation/validation/user/create.schema';
import { CreateUserHandler } from '../handlers/user/create.handler';

@singleton()
export class UserRoute extends BaseRouter {
  constructor(
    @inject(CreateUserHandler)
    private createUserHandler: CreateUserHandler,
  ) {
    super();
  }

  public async setup(fastify: FastifyInstance) {
    fastify.get('/user', {}, (_req, reply) => {
      reply.send({ message: 'ok' });
    });

    fastify.post(
      '/user',
      { schema: createUserSchema.schema },
      (req, reply) => this.createUserHandler.createUser(req, reply),
    );
  }
}
