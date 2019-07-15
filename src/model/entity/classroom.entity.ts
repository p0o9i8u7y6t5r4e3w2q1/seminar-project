import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Classroom {
  @PrimaryColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  capacity: number;

  @Column()
  price: number;

  public getID(): string {
    return this.id;
  }

  public setID(id: string): void {
    this.id = id;
  }

  public getType(): string {
    return this.type;
  }

  public setType(type: string): void {
    this.type = type;
  }

  public getCapacity(): number {
    return this.capacity;
  }

  public setCapacity(capacity: number): void {
    this.capacity = capacity;
  }

  public getPrice(): number {
    return this.price;
  }

  public setPrice(price: number): void {
    this.price = price;
  }
}
