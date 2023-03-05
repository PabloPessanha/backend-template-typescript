import { singleton } from 'tsyringe';
import logger from 'npmlog';

@singleton()
export class Logger {
  protected log = logger;
  protected prefix: string;

  constructor() {
    this.prefix = '[API]';
    this.log.heading = ' '.repeat(2);
    this.log.headingStyle = { fg: '' };
    this.log.prefixStyle = { bold: true, fg: 'magenta' };
  }

  public info(...args: unknown[]) {
    const msg = args.join(' ') as string;
    return this.log.info(this.prefix, msg);
  }

  public warn(...args: unknown[]) {
    const msg = args.join(' ') as string;
    return this.log.warn(this.prefix, msg);
  }

  public error(...args: unknown[]) {
    const msg = args.join(' ') as string;
    return this.log.error(this.prefix, msg);
  }

  get colors() {
    return {
      black: '\x1b[30m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m',
      white: '\x1b[37m',
      gray: '\x1b[90m',
    };
  }
}
