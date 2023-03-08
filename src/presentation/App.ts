import helmet from '@fastify/helmet';
import { inject, singleton } from 'tsyringe';
import fastify, { FastifyInstance } from 'fastify';
import { Config } from '@/shared/Config';
import { Logger } from '@/shared/loggers/Logger';
import * as Plugins from '@/presentation/_plugins';

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
      .register(helmet, {
        global: true,
        contentSecurityPolicy: Config.isProd() ? undefined : false,
      })
      .register(Plugins.prisma)
      .register(Plugins.mercurius);
  }

  public async initialize() {
    const { colors } = this.logger;
    await this.fastify.listen({ port: this.config.port });

    this.logger.info(`Server is running on: ${colors.yellow}http://localhost:${this.config.port}/graphiql`);
  }
}
