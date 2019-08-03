import { Entity, PrimaryColumn } from 'typeorm';
import { Person } from './person.entity';

@Entity('student')
export class Student extends Person {
  @PrimaryColumn('char', {
    length: 9,
    name: 'id',
  })
  id: string;

  constructor(init?: Partial<Student>) {
    super();
    Object.assign(this, init);
  }
}
