import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity('user')
export class User {
  @PrimaryColumn('varchar', {
    length: 9,
    name: 'id',
  })
  id: string;

  @Column('varchar', {
    nullable: false,
    length: 20,
    name: 'password',
  })
  password: string;

  @Column('varchar', {
    nullable: false,
    length: 32,
    name: 'name',
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    length: 64,
    name: 'email',
  })
  email: string;

  @ManyToOne(type => Role, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column('tinyint', { name: 'role_id' })
  roleID: number;
}
