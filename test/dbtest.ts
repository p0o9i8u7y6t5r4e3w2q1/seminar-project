import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as Model from '../src/model/entity';

createConnection()
  .then(async connection => {
    console.log('connection create success');
    let repository: any;
    // 1. User -- success
    /*
    repository = connection.getRepository(Model.User);
    const user = await connection.manager.findOneOrFail(Model.User, {
     email: 'rsliu@mail.ncku.edu.tw',
    });
    console.log(user);
     */

    // 2. Teacher -- success
    /*
    repository = connection.getRepository(Model.Teacher);
    const teacher = await repository.findOne({ where: { name: '王惠嘉' } });
    console.log(teacher);
     */

    // 3. BookingForm
    let form: any;
    // 3-a. non iiim member -- success
    // (i) insert booking form -- success
    repository = connection.getRepository(Model.BookingForm);
    form = new Model.BookingForm();
    form.iimMember = false;
    form.applicantName = '蔡寒玄';
    form.applicantEmail = 'email@example.com';
    form.classroomID = '61104';
    form.timeRange.date = new Date(2019, 1, 1);
    form.timeRange.startPeriod = '1';
    form.timeRange.endPeriod = '4';
    form.reason = '測試';
    console.log('＊ before insert bookingform');
    console.log(form);

    await repository.insert(form);
    console.log('＊ after insert bookingform');
    console.log(form);

    // (ii) test relation object
    form = await repository.findOneOrFail({
      where: { classroomID: '61104' },
      relations: ['classroom'],
    });
    console.log('＊ find bookingForm');
    console.log(form);
    console.log('＊get classroom data in bookingForm');
    console.log(form.classroom);

    // 3. semester course -- success
    /*
    repository = connection.getRepository(Model.SemesterCourse);
    const semesterCourse = await repository.find();
    console.log(semesterCourse);
     */
  })
  .catch(error => console.log(error));
