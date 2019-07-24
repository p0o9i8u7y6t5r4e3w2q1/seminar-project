import { Entity, PrimaryColumn } from 'typeorm';
import { Person } from './person.entity';

@Entity('student')
export class Student extends Person {
  @PrimaryColumn('char', {
    length: 9,
    name: 'id',
  })
  public get id() {
    return this._id;
  }
  public set id(id: string) {
    this._id = id;
  }
}
