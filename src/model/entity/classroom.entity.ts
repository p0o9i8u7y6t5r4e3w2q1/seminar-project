import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('classroom')
export class Classroom {
  @PrimaryColumn('char', {
    length: 5,
    name: 'id',
  })
  private _id: string;

  @Column('varchar', {
    length: 32,
    name: 'type',
  })
  private _type: string;

  @Column('smallint', { name: 'capacity' })
  private _capacity: number;

  @Column('int', { name: 'price' })
  private _price: number;

  public get id() {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get type() {
    return this._type;
  }

  public set type(type: string) {
    this._type = type;
  }

  public get capacity() {
    return this._capacity;
  }

  public set capacity(capacity: number) {
    this._capacity = capacity;
  }

  public get price() {
    return this._price;
  }

  public set price(price: number) {
    this._price = price;
  }
}
