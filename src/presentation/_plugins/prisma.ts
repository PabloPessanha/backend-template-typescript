import fp from 'fastify-plugin';
import { container } from 'tsyringe';
import { FastifyPluginAsync } from 'fastify';
import { Database } from '@/infrastructure/database';
import { DatabaseLogger } from '@/shared/loggers/DatabaseLogger';

export const prismaPlugin: FastifyPluginAsync = fp(async (server) => {
  const prisma = container.resolve(Database);
  const logger = container.resolve(DatabaseLogger);

  await prisma.$connect();
  logger.info('Connection was successfully established');

  server.addHook('onClose', async () => {
    await prisma.$disconnect();
  });
});
