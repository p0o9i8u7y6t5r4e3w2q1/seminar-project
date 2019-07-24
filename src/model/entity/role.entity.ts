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
  private _id: number;

  private _name: string;

  private _auths: Authorization[];

  private _authIDs: number[];

  /* ---- setter and getter ---- */
  @PrimaryColumn('int', { name: 'id' })
  public get id() {
    return this._id;
  }
  public set id(id: number) {
    this._id = id;
  }

  @Column('varchar', {
    length: 32,
    name: 'name',
  })
  public get name() {
    return this._name;
  }
  public set name(name: string) {
    this._name = name;
  }

  @ManyToMany(type => Authorization, { nullable: false })
  @JoinTable({
    name: 'role_auth',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'auth_id' },
  })
  public get auths() {
    return this._auths;
  }
  public set auths(auths: Authorization[]) {
    this._auths = auths;
  }

  @RelationId((role: Role) => role.auths)
  public get authIDs() {
    return this._authIDs;
  }
  public set authIDs(authIDs: number[]) {
    this._authIDs = authIDs;
  }
}
