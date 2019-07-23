import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { Role } from './role.entity';

@Entity('user')
export class User {
  @PrimaryColumn('varchar', {
    length: 9,
    name: 'id',
  })
  private _id: string;

  @Column('varchar', {
    nullable: false,
    length: 20,
    name: 'password',
  })
  private _password: string;

  @Column('varchar', {
    nullable: false,
    length: 32,
    name: 'name',
  })
  private _name: string;

  @Column('varchar', {
    nullable: false,
    length: 100,
    name: 'email',
  })
  private _email: string;

  @ManyToOne(type => Role, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'role_id' })
  private _role: Role;

  @RelationId((user: User) => user._role)
  private _roleID: number;

  public get id() {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get name() {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get password() {
    return this._password;
  }

  public set password(password: string) {
    this._password = password;
  }

  public get email() {
    return this._email;
  }

  public set email(email: string) {
    this._email = email;
  }

  public get roleID() {
    return this._roleID;
  }

  public set roleID(roleID: number) {
    this._roleID = roleID;
  }
}
