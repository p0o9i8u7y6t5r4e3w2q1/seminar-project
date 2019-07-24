import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity('authorization')
export class Authorization {
  private _id: number;

  private _name: string;

  /* 目前不需要
  @ManyToMany(type=>Role, role=>role.authorizations)
  roles:Role[];
   */

  /* ---- setter and getter ---- */
  @PrimaryColumn('int', { name: 'id' })
  public get id() {
    return this._id;
  }
  public set id(id: number) {
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
}
