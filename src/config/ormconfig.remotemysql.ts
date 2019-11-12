import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Entitys } from '../model/entity';

export const OrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'remotemysql.com',
  port: 3306,
  username: 'COqiWwdFBF',
  password: 'dQpYCITijw',
  database: 'COqiWwdFBF',
  entities: Entitys,
  synchronize: true,
};
