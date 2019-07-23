import { Entity, Column, PrimaryColumn, ManyToMany } from 'typeorm';
import { Role } from './role.entity';

@Entity('authorization')
export class Authorization {
  @PrimaryColumn('int', {
    name: 'id',
  })
  private _id: number;

  @Column('varchar', {
    nullable: false,
    length: 32,
    name: 'name',
  })
  private _name: string;

  /* 暫時不需要
  @ManyToMany(type=>Role, role=>role.authorizations)
  roles:Role[];
   */

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
}
