import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Schedule {


    @PrimaryColumn()
    weekday: number;

    /**
     * 節次
     */
    @PrimaryColumn()
    period: string;

    @PrimaryColumn()
    classroomId: string;

    @Column()
    scId: string;
}
