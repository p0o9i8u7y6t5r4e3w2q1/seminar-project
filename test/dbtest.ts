import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as Model from '../src/model/entity';

createConnection()
  .then(async connection => {
    console.log('connection create success');
    // 1. User
    // const repository = connection.getRepository(Model.User);
    const user = await connection.manager.findOne(Model.User, {
      email: 'rsliu@mail.ncku.edu.tw',
    });
    console.log(user);

    // 2. Teacher -- failure
    // const repository = connection.getRepository(Model.Teacher);
    // const teacher = await repository.findOne({ where: { name: '王惠嘉' } });
    // console.log(teacher);
  })
  .catch(error => console.log(error));
