import { inject, singleton } from 'tsyringe';
import { CreateUserBody } from '@/shared/schemas/user/create-user.schema';
import { CreateUserRepository } from '@/domain/user/repositories/create-user.repository';

@singleton()
export class CreateUserUseCase {
  constructor(
    @inject(CreateUserRepository)
    private createUserReposity: CreateUserRepository,
  ) {}

  public async create(user: CreateUserBody) {
    const response = await this.createUserReposity.create(user);
    return response;
  }
}
