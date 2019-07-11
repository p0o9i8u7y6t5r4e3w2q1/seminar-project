import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Course {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;
}
