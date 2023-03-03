import 'reflect-metadata';
import fastify from 'fastify';
import { container } from 'tsyringe';
import { Config } from '@/config/Config';
import { Logger } from '@/shared/Logger';

const { port } = container.resolve(Config);
const log = container.resolve(Logger);

const app = fastify();

app.get('/', (_req, reply) => {
  reply.status(404).send({ message: 'ok' });
});

app.listen({ port }, () => {
  log.info(`Server is running, request url: http://localhost:${port}`);
});
