import { BaseEntity, Column, PrimaryColumn } from 'typeorm';

export abstract class Person extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  uid: string;

  public getID(): string {
    return this.id;
  }

  public setID(id: string): void {
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getUID(): string {
    return this.uid;
  }

  public setUID(uid: string): void {
    this.uid = uid;
  }
}
