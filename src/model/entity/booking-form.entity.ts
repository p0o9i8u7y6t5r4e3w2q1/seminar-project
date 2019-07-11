import { Entity, Column } from 'typeorm';
import { Form } from './form.entity'
import { DatePeriodRange } from '../common/date-period-range';

@Entity()
export class BookingForm extends Form {

    @Column()
    iimMemeber: boolean;

    @Column()
    apply_date: Date;

    /**
     * 不是IIM成員的話，儲存使用者名稱
     */
    @Column()
    applicantName: string;

    /**
     * 是IIM成員的話，儲存使用者ID
     */
    @Column()
    applicantId: string;

    @Column()
    applicantPhone: string;

    @Column()
    applicantEmail: string;

    @Column()
    reason: string;
    
    @Column()
    classroomId: string;

    // TODO: NEED CHECK
    borrowTimeRange: DatePeriodRange;

    // TODO: NEED CHECK
    @Column()
    equipmentIds: string[];

    @Column()
    deptHeadStatus: number;

    @Column()
    staffStatus: number;

    @Column()
    progress: number;

    @Column()
    totalcost: number;

    /**
     * 計算借用金額
     */
    calculateTotalCost() :  number {
        // TODO implement here
        return null;
    }

}
