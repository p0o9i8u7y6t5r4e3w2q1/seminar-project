import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Form {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  createTime: Date;

  public getID(): string {
    return this.id;
  }

  public setID(id: string): void {
    this.id = id;
  }

  public getCreate_time(): Date {
    return this.createTime;
  }

  public setCreate_time(createTime: Date): void {
    this.createTime = createTime;
  }
}
