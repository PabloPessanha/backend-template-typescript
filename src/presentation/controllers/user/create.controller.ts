import { inject, singleton } from 'tsyringe';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { Logger } from '@/shared/Logger';

@singleton()
export class CreateUserController {
  constructor(
    @inject(Logger)
    private logger: Logger,
  ) {}

  public async index(request: FastifyRequest, reply: FastifyReply) {
    try {
      this.logger.info(JSON.stringify(request.body));
      return reply.status(200).send(request.body);
    } catch (e) {
      const err = e as FastifyError;
      return reply.status(400).send({ error: err.message || e });
    }
  }
}
