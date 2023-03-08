import { singleton } from 'tsyringe';
import { MercuriusContext } from 'mercurius';
import { Ctx, Query, Resolver } from 'type-graphql';
import { UserSchema } from '@/domain/user/schemas/user.schema';

@singleton()
@Resolver(() => UserSchema)
export class ListUsersResolver {
  @Query(() => [UserSchema])
  public async listUser(@Ctx() ctx: MercuriusContext) {
    const users = await ctx.prisma.user.findMany({ include: { address: true } });

    return users;
  }
}
