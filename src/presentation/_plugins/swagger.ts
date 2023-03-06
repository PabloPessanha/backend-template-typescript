import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';
import fastifySwaggerUi from '@fastify/swagger-ui';

export const swaggerPlugin: FastifyPluginAsync = fp(async (server) => {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Test API',
        description: 'Sample backend service',
        version: '1.0.0',
      },
      servers: [],
    },
    transform: jsonSchemaTransform,
  });

  server.register(fastifySwaggerUi, { routePrefix: '/v1/docs' });
});
