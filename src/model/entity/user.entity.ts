import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User { 

    @PrimaryColumn()
    id: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    roleId: number;
}
