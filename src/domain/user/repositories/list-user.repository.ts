import { inject, singleton } from 'tsyringe';
import { Database } from '@/infrastructure/database';

@singleton()
export class ListUserRepository {
  constructor(
    @inject(Database)
    private db: Database,
  ) {}

  public async list() {
    return this.db.user.findMany({
      include: {
        address: {
          select: {
            cep: true,
            street: true,
            state: true,
          },
        },
      },
    });
  }
}
