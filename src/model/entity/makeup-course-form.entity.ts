import { Entity, Column } from 'typeorm';
import { Form } from './form.entity';
import { DatePeriodRange } from '../common/date-period-range';

@Entity()
export class MakeupCourseForm extends Form {

    @Column()
    personId: string;

    @Column()
    classroomId: string;

    timeRange: DatePeriodRange;

    @Column()
    progress: number;
}
