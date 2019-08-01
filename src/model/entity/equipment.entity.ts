import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('equipment')
export class Equipment {
  @PrimaryColumn('char', {
    length: 3,
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    length: 32,
    name: 'name',
  })
  name: string;

  @Column('tinyint', { name: 'status' })
  status: number;

  @Column('char', { name: 'type' })
  type: string;
}
