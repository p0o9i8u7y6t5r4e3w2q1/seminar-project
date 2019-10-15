import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Entitys } from '../model/entity';

export const OrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'seminar-project',
  entities: Entitys,
  synchronize: true,
};
