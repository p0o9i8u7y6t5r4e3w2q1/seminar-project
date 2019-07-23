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
  private _id: number;

  @Column('varchar', {
    length: 32,
    name: 'name',
  })
  private _name: string;

  @ManyToMany(type => Authorization, { nullable: false })
  @JoinTable({
    name: 'role_auth',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'auth_id' },
  })
  private _auths: Authorization[];

  @RelationId((role: Role) => role._auths)
  private _authIDs: number[];

  public get id() {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get name() {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get authIDs() {
    return this._authIDs;
  }

  public set authIDs(authIDs: number[]) {
    this._authIDs = authIDs;
  }
}
