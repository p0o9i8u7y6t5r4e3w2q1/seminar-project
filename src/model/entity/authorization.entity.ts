import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Authorization {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}
