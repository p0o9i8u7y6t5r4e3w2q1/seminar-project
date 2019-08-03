import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('classroom')
export class Classroom {
  @PrimaryColumn('char', {
    length: 5,
    name: 'id',
  })
  id: string;

  @Column('varchar', {
    length: 32,
    name: 'type',
  })
  type: string;

  @Column('smallint', { name: 'capacity' })
  capacity: number;

  @Column('int', { name: 'price' })
  price: number;

  constructor(init?: Partial<Classroom>) {
    Object.assign(this, init);
  }
}
