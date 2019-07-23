import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('equipment')
export class Equipment {
  @PrimaryColumn('char', {
    length: 3,
    name: 'id',
  })
  private _id: number;

  @Column('varchar', {
    length: 32,
    name: 'name',
  })
  private _name: string;

  @Column('int', { name: 'status' })
  private _status: number;

  @Column('char', { name: 'type' })
  private _type: string;

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

  public get status() {
    return this._status;
  }

  public set status(status: number) {
    this._status = status;
  }

  public get type() {
    return this._type;
  }

  public set type(type: string) {
    this._type = type;
  }
}
