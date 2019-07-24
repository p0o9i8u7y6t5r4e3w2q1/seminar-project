import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('course')
export class Course {
  private _id: string;

  private _name: string;

  @PrimaryColumn('char', {
    length: 7,
    name: 'id',
  })
  public get id() {
    return this._id;
  }
  public set id(id: string) {
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
}
