import { inject, singleton } from 'tsyringe';
import { ListUserRepository } from '@/domain/user/repositories/list-user.repository';

@singleton()
export class ListUserUseCase {
  constructor(
    @inject(ListUserRepository)
    private listUserReposity: ListUserRepository,
  ) {}

  public async list() {
    return this.listUserReposity.list();
  }
}
