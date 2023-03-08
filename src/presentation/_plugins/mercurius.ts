import path from 'path';
import fp from 'fastify-plugin';
import mercurius from 'mercurius';
import { container } from 'tsyringe';
import { buildSchema } from 'type-graphql';
import { FastifyPluginAsync } from 'fastify';
import { PrismaClient } from '@prisma/client';

declare module 'mercurius' {
  interface MercuriusContext {
    prisma: PrismaClient
  }
}

export const mercuriusPlugin: FastifyPluginAsync = fp(async (server) => {
  const schema = await buildSchema({
    resolvers: [path.join(__dirname, '../../domain/**/resolvers/*.ts')],
    validate: false,
    container: { get: (cls) => container.resolve(cls) },
  });

  server.register(mercurius, {
    schema,
    graphiql: true,
    context: () => ({ prisma: server.prisma }),
  });
});
