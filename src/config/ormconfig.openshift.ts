import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Entitys } from '../model/entity';

export const OrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '10.130.12.58',
  port: 3306,
  username: 'seminar_topscret',
  password: 'seminar_topscret',
  database: 'seminar_project',
  entities: Entitys,
  synchronize: true,
};
