import { EntityRepository, EntityManager } from 'typeorm';
import { Person, Staff, Student, Teacher } from '../entity';

@EntityRepository()
export class PersonRepository {
  constructor(private manager: EntityManager) {}

  public async findByUID(uid: string): Promise<Person> {
    // 1. find Person from Student
    let person: Person = await this.manager.findOne(Student, { uid });
    if (person != null) return person;

    // 2. if not found in Student, try to find from Teacher
    person = await this.manager.findOne(Teacher, { uid });
    if (person != null) return person;

    // 3. if not found in Student and Teacher, then find from Staff
    person = await this.manager.findOne(Staff, { uid });
    return person; // return person anyway
  }

  // by my setting
  // teacher id start with 'z0'
  // staff id start with 'z1'
  // student id otherwise
  public async findByID(id: string): Promise<Person> {
    // 1. find Person from Student
    let person: Person = await this.manager.findOne(Student, id);
    if (person != null) return person;

    // 2. if not found in Student, try to find from Teacher
    person = await this.manager.findOne(Teacher, id);
    if (person != null) return person;

    // 3. if not found in Student and Teacher, then find from Staff
    person = await this.manager.findOne(Staff, id);
    return person; // return person anyway
  }
}
