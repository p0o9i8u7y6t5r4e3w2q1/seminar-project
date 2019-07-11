import { Entity,  Column, PrimaryColumn } from 'typeorm';

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
}
