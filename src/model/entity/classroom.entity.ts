import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('classroom')
export class Classroom {
  private _id: string;

  private _type: string;

  private _capacity: number;

  private _price: number;

  /* ---- setter and getter ---- */
  @PrimaryColumn('char', {
    length: 5,
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
    name: 'type',
  })
  public get type() {
    return this._type;
  }
  public set type(type: string) {
    this._type = type;
  }

  @Column('smallint', { name: 'capacity' })
  public get capacity() {
    return this._capacity;
  }
  public set capacity(capacity: number) {
    this._capacity = capacity;
  }

  @Column('int', { name: 'price' })
  public get price() {
    return this._price;
  }
  public set price(price: number) {
    this._price = price;
  }
}
