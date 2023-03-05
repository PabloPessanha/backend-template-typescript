import helmet from '@fastify/helmet';
import fastify, { FastifyInstance } from 'fastify';
import { container, inject, singleton } from 'tsyringe';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { Config } from '@/config/Config';
import { Logger } from '@/shared/Logger';
import { Swagger } from '@/config/Swagger';
import { BaseRouter } from '@/shared/base/BaseRouter';
import * as routers from '@/presentation/routes';

@singleton()
export class Application {
  private fastify: FastifyInstance;

  constructor(
    @inject(Logger)
    private logger: Logger,

    @inject(Config)
    private config: Config,

    @inject(Swagger)
    private swagger: Swagger,
  ) {
    this.fastify = fastify()
      .setSerializerCompiler(serializerCompiler)
      .setValidatorCompiler(validatorCompiler)
      .register(helmet, { global: true });
    this.swagger.setup(this.fastify);
  }

  private setupRoutes() {
    const routes = Object.values(routers);

    for (const route of routes) {
      const instance = container.resolve<BaseRouter>(route);
      this.fastify.register(() => instance.setup(this.fastify), { path: '/v1/' });
    }
  }

  private async setupServer() {
    this.fastify.listen({
      port: this.config.port,
    }, () => this.logger.info(`Server is running on: http://localhost:${this.config.port}`));

    await this.fastify.ready();
  }

  public initialize() {
    this.setupRoutes();
    this.setupServer();
  }
}
