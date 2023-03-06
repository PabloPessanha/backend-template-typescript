import { inject, singleton } from 'tsyringe';
import { FastifyError, FastifyReply } from 'fastify';
import { ListUserUseCase } from '@/domain/user/useCases/list-user.usecase';

@singleton()
export class ListUserController {
  constructor(
    @inject(ListUserUseCase)
    private createUserUseCase: ListUserUseCase,
  ) {}

  public async index(reply: FastifyReply) {
    try {
      const users = await this.createUserUseCase.list();
      return reply.status(200).send(users);
    } catch (e) {
      const err = e as FastifyError;
      return reply.status(400).send({ error: err.message || e });
    }
  }
}
