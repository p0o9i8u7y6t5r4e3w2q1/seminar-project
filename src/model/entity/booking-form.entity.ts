import {
  Entity,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  RelationId,
  JoinTable,
  AfterLoad,
  AfterInsert,
} from 'typeorm';
import { Equipment } from './equipment.entity';
import { Form } from './form.entity';
import { Classroom } from './classroom.entity';
import { ScheduleResult } from '../common';
import {
  DateUtil,
  StringUtil,
  FormProgress,
  FormPendingProgress,
  PersonCheckStatus,
  RoomStatus,
  Period,
} from '../../util';

@Entity('booking_form')
export class BookingForm extends Form {
  @Column('tinyint', { name: 'is_iim_member' })
  iimMember: boolean = false;

  // 不是IIM成員的話，儲存使用者名稱
  @Column('varchar', {
    nullable: true,
    length: 32,
    name: 'applicant_name',
  })
  applicantName: string = null;

  // 是IIM成員的話，儲存使用者ID
  @Column('varchar', {
    nullable: true,
    length: 9,
    name: 'applicant_id',
  })
  applicantID: string = null;

  @Column('varchar', {
    length: 64,
    name: 'applicant_email',
  })
  applicantEmail: string = null;

  @Column('varchar', {
    length: 32,
    name: 'reason',
  })
  reason: string = null;

  @ManyToOne(() => Classroom, {
    primary: true,
    nullable: false,
  })
  @JoinColumn({ name: 'room_id' })
  classroom: Classroom;

  @Column('char', {
    length: 5,
    name: 'room_id',
  })
  classroomID: string;

  @ManyToMany(() => Equipment, { nullable: true })
  @JoinTable({
    name: 'booking_equipment',
    joinColumn: { name: 'form_id' },
    inverseJoinColumn: { name: 'equip_id' },
  })
  equipments: Equipment[];

  @RelationId((bookingForm: BookingForm) => bookingForm.equipments)
  equipmentIDs: string[];

  @Column('tinyint', { name: 'depthead_check' })
  deptHeadCheckStatus: PersonCheckStatus = PersonCheckStatus.UnChecked;

  @Column('tinyint', { name: 'staff_check' })
  staffCheckStatus: number = PersonCheckStatus.UnChecked;

  @Column('int', { name: 'total_cost' })
  totalCost: number = 0;

  constructor(init?: Partial<BookingForm>) {
    super();
    Object.assign(this, init);
  }

  /* ---- other functions ---- */
  /**
   * 計算借用金額
   */
  public calculateTotalCost(): number {
    // TODO implement here
    return null;
  }

  public deptHeadCheck(isApproved: boolean) {
    this.deptHeadCheckStatus = isApproved
      ? PersonCheckStatus.Approved
      : PersonCheckStatus.Rejected;

    if (!isApproved) this.progress = FormProgress.Rejected;
    else if (this.progress === FormProgress.StaffApproved) {
      this.progress = FormProgress.Approved;
    } else this.progress = FormProgress.DeptHeadApproved;
  }

  public staffCheck(isApproved: boolean) {
    this.staffCheckStatus = isApproved
      ? PersonCheckStatus.Approved
      : PersonCheckStatus.Rejected;

    if (!isApproved) this.progress = FormProgress.Rejected;
    else if (this.progress === FormProgress.DeptHeadApproved) {
      this.progress = FormProgress.Approved;
    } else this.progress = FormProgress.StaffApproved;
  }

  /* ---- listener in typeorm ---- */
  @AfterLoad()
  @AfterInsert()
  makeFormID() {
    this.formID = 'BF' + StringUtil.prefixZero(this.id, 6);
  }

  assignEquipments() {
    if (this.equipmentIDs) {
      const results: any[] = [];
      for (const id of this.equipmentIDs) {
        results.push({ id });
      }
      this.equipments = results;
    }
  }

  /**
   * @return number form real id
   */
  static findID(formID: string): number {
    // TODO need more validation
    return Number(formID.slice(2));
  }

  /* ---- implements IRoomSchedule functions ---- */
  public getScheduleResults(from: Date, to: Date): ScheduleResult[] {
    if (DateUtil.isDateInRange(this.timeRange.date, from, to)) return [];

    const startIdx = Period.indexOf(this.timeRange.startPeriod);
    const endIdx = Period.indexOf(this.timeRange.endPeriod);
    const results: ScheduleResult[] = [];
    for (let i = startIdx; i <= endIdx; i++) {
      const result = new ScheduleResult({
        date: this.timeRange.date,
        period: Period[i],
        formID: this.formID,
        key: { id: this.formID, type: BookingForm },
      });

      if (FormPendingProgress.includes(this.progress)) {
        result.status = RoomStatus.Pending;
      } else if (this.progress === FormProgress.Approved) {
        result.status = RoomStatus.Reserved;
      }
      // else form is rejected, do nothing

      results.push(result);
    }

    return results;
  }
}
