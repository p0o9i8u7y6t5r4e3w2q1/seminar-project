import { Entity, PrimaryColumn } from 'typeorm';
import { Person } from './person.entity';

@Entity('student')
export class Student extends Person {
  @PrimaryColumn('char', {
    length: 9,
    name: 'id',
  })
  protected _id: string;
}
