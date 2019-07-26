import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('equipment')
export class Equipment {
  private _id: number;

  private _name: string;

  private _status: number;

  private _type: string;

  /* ---- setter and getter ---- */
  @PrimaryColumn('char', {
    length: 3,
    name: 'id',
  })
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

  @Column('tinyint', { name: 'status' })
  public get status() {
    return this._status;
  }
  public set status(status: number) {
    this._status = status;
  }

  @Column('char', { name: 'type' })
  public get type() {
    return this._type;
  }
  public set type(type: string) {
    this._type = type;
  }
}
