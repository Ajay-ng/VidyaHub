import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';

export const PG_CONNECTION = 'PG_CONNECTION';

export const databaseProviders = [
  {
    provide: PG_CONNECTION,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      console.log('DB_HOST:', configService.get('DB_HOST'));
      console.log('DB_PORT:', configService.get('DB_PORT'));
      console.log('DB_USER:', configService.get('DB_USER'));
      console.log('DB_PASSWORD:', configService.get('DB_PASSWORD'));
      console.log('DB_NAME:', configService.get('DB_NAME'));

      const pool = new Pool({
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<number>('DB_PORT')),
        user: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
      });

      await pool.query('SELECT NOW()');

      console.log('✅ PostgreSQL Connected');
      console.log('DB_NAME:', configService.get('DB_NAME'));
      return pool;
    },
  },
];