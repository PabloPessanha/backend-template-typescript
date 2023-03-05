import { singleton } from 'tsyringe';
import 'dotenv/config';

@singleton()
export class Config {
  public readonly port = Number(process.env.PORT) || 4444;
  public readonly host = process.env.API_HOST || `http://localhost:${this.port}`;

  public readonly database = {
    host: process.env.DATABASE_HOST || '',
    port: Number(process.env.DATABASE_PORT) || 5432,
    user: process.env.POSTGRES_USER || 'test',
    password: process.env.POSTGRES_PASSWORD || 'test',
    name: process.env.POSTGRES_DATABASE || 'test',
  };

  public static isDev() {
    return process.env.NODE_ENV === 'development';
  }

  public static isProd() {
    return process.env.NODE_ENV === 'production';
  }
}
