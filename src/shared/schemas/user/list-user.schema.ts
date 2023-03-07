import { FastifySchema } from 'fastify';
import z from 'zod';

const UserAddress = z.object({
  state: z.enum(['RJ', 'SP']),
  cep: z.string().regex(/^[0-9]{5}-[0-9]{3}$/),
  street: z.string().optional(),
});

const ListUser = z.array(z.object({
  id: z.string(),
  name: z.string().min(4).optional(),
  age: z.number().optional(),
  address: UserAddress,
})).describe('Retorno em caso de sucesso');

export const ListUserSchema: FastifySchema = {
  response: {
    200: ListUser,
  },
  tags: ['User'],
  description: 'Rota responsável por devolver uma lista completa dos usuários',
};

export type ListUserResponse = z.infer<typeof ListUser>;
