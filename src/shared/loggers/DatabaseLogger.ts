import { singleton } from 'tsyringe';
import { Logger } from './Logger';

@singleton()
export class DatabaseLogger extends Logger {
  constructor() {
    super();
    this.prefix = `${this.colors.yellow}[DATABASE]`;
  }
}
