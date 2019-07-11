import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class ScheduleChange {

    @PrimaryColumn()
    classroomId: string;

    @PrimaryColumn()
    date: Date;

    @PrimaryColumn()
    peroid: string;

    @Column()
    scId: string;

    @Column()
    formId: string;

    @Column()
    type: number;
}
