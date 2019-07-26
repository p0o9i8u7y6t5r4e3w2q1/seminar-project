import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity('user')
export class User {
  private _id: string;

  private _password: string;

  private _name: string;

  private _email: string;

  private _role: Role;

  private _roleID: number;

  /* ---- setter and getter ---- */
  @PrimaryColumn('varchar', {
    length: 9,
    name: 'id',
  })
  public get id() {
    return this._id;
  }
  public set id(id: string) {
    this._id = id;
  }

  @Column('varchar', {
    nullable: false,
    length: 32,
    name: 'name',
  })
  public get name() {
    return this._name;
  }
  public set name(name: string) {
    this._name = name;
  }

  @Column('varchar', {
    nullable: false,
    length: 20,
    name: 'password',
  })
  public get password() {
    return this._password;
  }
  public set password(password: string) {
    this._password = password;
  }

  @Column('varchar', {
    nullable: false,
    length: 64,
    name: 'email',
  })
  public get email() {
    return this._email;
  }
  public set email(email: string) {
    this._email = email;
  }

  @ManyToOne(type => Role, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  public get role() {
    return this._role;
  }
  public set role(role: Role) {
    this._role = role;
  }

  @Column('tinyint', {
    name: 'role_id',
  })
  public get roleID() {
    return this._roleID;
  }
  public set roleID(roleID: number) {
    this._roleID = roleID;
  }
}
