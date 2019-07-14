import { Entity, Column } from 'typeorm';
import { Form } from './form.entity';
import { DatePeriodRange } from '../common/date-period-range';

@Entity()
export class BookingForm extends Form {
    @Column({ name: 'is_iim_member' })
    iimMemeber: boolean;

    /**
     * 不是IIM成員的話，儲存使用者名稱
     */
    @Column({ name: 'applicant_name' })
    applicantName: string;

    /**
     * 是IIM成員的話，儲存使用者ID
     */
    @Column({ name: 'applicant_id'})
    applicantId: string;

    @Column({ name: 'applicant_phone'})
    applicantPhone: string;

    @Column({name:'applicant_email'})
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

    @Column({name:'depthead_check'})
    deptHeadCheck: number;

    @Column({name:'staff_check'})
    staffCheck: number;

    @Column()
    progress: number;

    @Column({name:'total_cost'})
    totalCost: number;

    /**
     * 計算借用金額
     */
    calculateTotalCost(): number {
        // TODO implement here
        return null;
    }
}
