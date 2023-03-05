import z from 'zod';

const CreateUser = z.object({
  name: z.string().min(4).optional(),
});

export const schema = {
  body: CreateUser,
  response: {
    200: CreateUser,
  },
};

export type CreateUserBody = z.infer<typeof CreateUser>;
