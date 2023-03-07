import { inject, singleton } from 'tsyringe';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserBody } from '@/shared/schemas/user/create-user.schema';
import { CreateUserUseCase } from '@/domain/user/useCases/create-user.usecase';

@singleton()
export class CreateUserController {
  constructor(
    @inject(CreateUserUseCase)
    private createUserUseCase: CreateUserUseCase,
  ) {}

  public async index(request: FastifyRequest<{ Body: CreateUserBody }>, reply: FastifyReply) {
    try {
      const createdUser = await this.createUserUseCase.create(request.body);
      return reply.status(200).send(createdUser);
    } catch (e) {
      const err = e as FastifyError;
      return reply.status(400).send({ error: err.message || e });
    }
  }
}
