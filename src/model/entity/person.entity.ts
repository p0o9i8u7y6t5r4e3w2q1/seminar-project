import { BaseEntity, Column, PrimaryColumn } from 'typeorm';

export abstract class Person extends BaseEntity {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    uid: string;
}
