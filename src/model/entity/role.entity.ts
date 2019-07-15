import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  authIDs: number[];

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

  public getAuthIDs(): number[] {
    return this.authIDs;
  }

  public setAuthIDs(authIDs: number[]): void {
    this.authIDs = authIDs;
  }
}
