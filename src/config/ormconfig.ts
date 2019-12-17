import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Entitys } from '../model/entity';

export const OrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOSTNAME,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: Entitys,
  synchronize: true,
};
