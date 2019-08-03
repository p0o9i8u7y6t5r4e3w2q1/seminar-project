import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity('authorization')
export class Authorization {
  @PrimaryColumn('int', { name: 'id' })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 32,
    name: 'name',
  })
  name: string;

  /* 目前不需要
  @ManyToMany(type=>Role, role=>role.authorizations)
  roles:Role[];
   */

  constructor(init?: Partial<Authorization>) {
    Object.assign(this, init);
  }
}
