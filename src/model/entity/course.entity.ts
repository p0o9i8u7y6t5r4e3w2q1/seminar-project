import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('course')
export class Course {
  @PrimaryColumn('char', {
    length: 7,
    name: 'id',
  })
  private _id: string;

  @Column('varchar', {
    length: 32,
    name: 'name',
  })
  private _name: string;

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
}
