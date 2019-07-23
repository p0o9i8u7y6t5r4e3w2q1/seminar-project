import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as Model from '../src/model/entity';

createConnection()
  .then(async connection => {
    console.log('connection create success');
    // 1. User -- success
    // const repository = connection.getRepository(Model.User);
    // const user = await repository.find();
    // console.log(user);
    //
    // 2. Teacher
    const repository = connection.getRepository(Model.Teacher);
    const teacher = await repository.findOne({ name: '王惠嘉' });
    console.log(teacher);
  })
  .catch(error => console.log(error));
