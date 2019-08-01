import {
  Entity,
  Column,
  PrimaryColumn,
  JoinTable,
  RelationId,
  ManyToMany,
} from 'typeorm';
import { Authorization } from './authorization.entity';

@Entity('role')
export class Role {
  @PrimaryColumn('int', { name: 'id' })
  id: number;

  @Column('varchar', {
    length: 32,
    name: 'name',
  })
  name: string;

  @ManyToMany(type => Authorization, { nullable: false })
  @JoinTable({
    name: 'role_auth',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'auth_id' },
  })
  auths: Authorization[];

  @RelationId((role: Role) => role.auths)
  authIDs: number[];
}
