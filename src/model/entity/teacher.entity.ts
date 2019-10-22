import { Entity, PrimaryColumn } from 'typeorm';
import { Person } from './person.entity';

@Entity('teacher')
export class Teacher extends Person {
  @PrimaryColumn('char', {
    length: 8,
    name: 'id',
  })
  id: string;

  constructor(init?: Partial<Teacher>) {
    super();
    Object.assign(this, init);
  }
}
