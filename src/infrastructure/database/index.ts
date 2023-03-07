import { PrismaClient } from '@prisma/client';
import { singleton } from 'tsyringe';

@singleton()
export class Database extends PrismaClient {
  constructor() {
    super();
  }
}
