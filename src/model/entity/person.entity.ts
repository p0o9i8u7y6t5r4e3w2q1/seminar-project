import { Column } from 'typeorm';

export abstract class Person {
  protected _id: string;

  @Column('varchar', {
    length: 32,
    name: 'name',
  })
  protected _name: string;

  @Column('char', {
    nullable: true,
    length: 8,
    name: 'card_uid',
  })
  protected _uid: string;

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

  public get uid() {
    return this._uid;
  }

  public set uid(uid: string) {
    this._uid = uid;
  }
}
