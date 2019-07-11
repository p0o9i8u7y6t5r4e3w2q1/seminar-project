import { Column } from 'typeorm';

export class DatePeriodRange {

    @Column()
    date: Date;

    @Column()
    startPeriod: string;

    @Column()
    endPeriod: string;

    constructor() {}
}
