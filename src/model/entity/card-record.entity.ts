import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class CardRecord {

    @PrimaryColumn()
    id:string

    @Column()
    uid: string;

    @Column()
    classroomId: string;

    @Column()
    recordTime: Date;
}
