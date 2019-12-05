import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Entitys } from '../model/entity';

export const OrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'mysql.seminar-project.svc',
  port: 3306,
  username: 'seminar_topscret',
  password: 'seminar_topscret',
  database: 'seminar-project',
  entities: Entitys,
  synchronize: true,
};
