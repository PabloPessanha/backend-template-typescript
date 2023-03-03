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
}
