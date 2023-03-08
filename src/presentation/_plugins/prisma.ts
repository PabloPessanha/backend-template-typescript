import fp from 'fastify-plugin';
import { container } from 'tsyringe';
import { FastifyPluginAsync } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { DatabaseLogger } from '@/shared/loggers/DatabaseLogger';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

export const prismaPlugin: FastifyPluginAsync = fp(async (server) => {
  const prisma = new PrismaClient();
  await prisma.$connect();

  const logger = container.resolve(DatabaseLogger);
  logger.info('Connection was successfully established');

  server.decorate('prisma', prisma);
  server.addHook('onClose', async () => {
    logger.info('Connection was successfully disconnected');
    await prisma.$disconnect();
  });
});
