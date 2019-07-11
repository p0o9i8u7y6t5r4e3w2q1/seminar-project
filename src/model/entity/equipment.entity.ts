import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Equipment {

    @PrimaryColumn()
    id: number;

    @Column()
    name: string;
}
