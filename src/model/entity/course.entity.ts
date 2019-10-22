import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('course')
export class Course {
  @PrimaryColumn('char', {
    length: 7,
    name: 'id',
  })
  id: string;

  @Column('varchar', {
    length: 32,
    name: 'name',
  })
  name: string;

  constructor(init?: Partial<Course>) {
    Object.assign(this, init);
  }
}
