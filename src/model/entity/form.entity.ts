import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Form {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    create_time: Date;
}
