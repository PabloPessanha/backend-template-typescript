import { FastifyInstance } from 'fastify';
import { singleton } from 'tsyringe';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';

@singleton()
export class Swagger {
  public setup(fastify: FastifyInstance) {
    fastify.register(fastifySwagger, {
      openapi: {
        info: {
          title: 'SampleApi',
          description: 'Sample backend service',
          version: '1.0.0',
        },
        servers: [],
      },
      transform: jsonSchemaTransform,
    });

    fastify.register(fastifySwaggerUI, { routePrefix: '/v1/docs' });
  }
}
