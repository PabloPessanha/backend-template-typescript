import { inject, singleton } from 'tsyringe';
import { CreateUserBody } from '@/shared/schemas/user/create-user.schema';
import { Database } from '@/infrastructure/database';

@singleton()
export class CreateUserRepository {
  constructor(
    @inject(Database)
    private db: Database,
  ) {}

  public async create(user: CreateUserBody) {
    const createdUser = await this.db.user.create({
      data: {
        name: user.name,
        age: user.age,
      },
    });

    const address = await this.db.address.create({
      data: {
        ...user.address,
        userId: createdUser.id,
      },
    });

    return { ...createdUser, address };
  }
}
