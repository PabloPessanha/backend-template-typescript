import { singleton } from 'tsyringe';
import 'dotenv/config';

@singleton()
export class Config {
  public readonly port = Number(process.env.PORT) || 4444;

  public static isDev() {
    return process.env.NODE_ENV === 'development';
  }

  public static isProd() {
    return process.env.NODE_ENV === 'production';
  }
}
