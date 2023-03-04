import { FastifyInstance } from 'fastify';

export abstract class BaseRouter {
  public abstract setup(fastify: FastifyInstance): Promise<void>;
}
