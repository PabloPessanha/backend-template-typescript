import { singleton } from 'tsyringe';
import logger from 'npmlog';

@singleton()
export class Logger {
  private log = logger;

  constructor() {
    this.log.heading = ' '.repeat(2);
    this.log.headingStyle = { fg: '' };
    this.log.prefixStyle = { bold: true, fg: 'magenta' };
  }

  public info(...args: unknown[]) {
    const msg = args.join(' ') as string;
    return this.log.info('[api]', msg);
  }

  public warn(...args: unknown[]) {
    const msg = args.join(' ') as string;
    return this.log.warn('[api]', msg);
  }

  public error(...args: unknown[]) {
    const msg = args.join(' ') as string;
    return this.log.error('[api]', msg);
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
