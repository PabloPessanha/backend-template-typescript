import helmet from '@fastify/helmet';
import fastify, { FastifyInstance } from 'fastify';
import { container, inject, singleton } from 'tsyringe';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { Config } from '@/config/Config';
import { Logger } from '@/shared/loggers/Logger';
import { BaseRouter } from '@/shared/base/BaseRouter';
import * as Routes from '@/presentation/routes';
import * as Plugins from '@/presentation/plugins';

@singleton()
export class Application {
  private fastify: FastifyInstance;

  constructor(
    @inject(Logger)
    private logger: Logger,

    @inject(Config)
    private config: Config,
  ) {
    this.fastify = fastify()
      .setSerializerCompiler(serializerCompiler)
      .setValidatorCompiler(validatorCompiler)
      .register(helmet, { global: true })
      .register(Plugins.swagger)
      .register(Plugins.prisma);
  }

  private setupRoutes() {
    const routes = Object.values(Routes);

    for (const route of routes) {
      const instance = container.resolve<BaseRouter>(route);
      this.fastify.register((f) => instance.setup(f), { prefix: '/v1' });
    }
  }

  private async setupServer() {
    const { colors } = this.logger;
    await this.fastify.listen({
      port: this.config.port,
    });
    this.logger.info(`Server is running on: ${colors.yellow}http://localhost:${this.config.port}`);
    this.logger.info(`Docs is running on: ${colors.yellow}http://localhost:${this.config.port}/v1/docs`);

    await this.fastify.ready();
  }

  public initialize() {
    this.setupRoutes();
    this.setupServer();
  }
}
