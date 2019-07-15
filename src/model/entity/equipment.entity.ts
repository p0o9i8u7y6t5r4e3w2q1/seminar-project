import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Equipment {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  public getID(): number {
    return this.id;
  }

  public setID(id: number): void {
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }
}
