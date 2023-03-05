import { singleton } from 'tsyringe';
import { Logger } from './Logger';

@singleton()
export class DatabaseLogger extends Logger {
  constructor() {
    super();
    this.prefix = '[DATABASE]';
    this.log.prefixStyle = { bold: true, fg: 'yellow' };
  }
}
