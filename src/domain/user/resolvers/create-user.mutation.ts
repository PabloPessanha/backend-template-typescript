import { singleton } from 'tsyringe';
import { MercuriusContext } from 'mercurius';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { UserInput } from '@/domain/user/inputs/user.input';
import { UserSchema } from '@/domain/user/schemas/user.schema';

@singleton()
@Resolver()
export class CreteUserResolver {
  @Mutation(() => UserSchema)
  public async createUser(@Ctx() ctx: MercuriusContext, @Arg('input') userInput: UserInput) {
    const user = await ctx.prisma.user.create({
      data: {
        name: userInput.name,
        age: userInput.age,
        address: {
          create: userInput.address,
        },
      },
      include: {
        address: true,
      },
    });

    return user;
  }
}
