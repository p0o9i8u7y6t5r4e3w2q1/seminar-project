import { Entity, PrimaryColumn } from 'typeorm';
import { Person } from './person.entity';

@Entity('staff')
export class Staff extends Person {
  @PrimaryColumn('char', {
    length: 8,
    name: 'id',
  })
  id: string;
}
