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
  StringUtil,
  FormProgress,
  FormPendingProgress,
  PersonCheckStatus,
  RoomStatus,
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

  @Column('char', {
    length: 5,
    name: 'room_id',
  })
  classroomID: string;

  @ManyToMany(type => Equipment, { nullable: true })
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

  /* ---- implements IRoomSchedule functions ---- */
  public getScheduleResult(): ScheduleResult {
    const result = new ScheduleResult();
    result.formID = this.formID;

    if (FormPendingProgress.includes(this.progress)) {
      result.status = RoomStatus.Pending;
    } else if (this.progress === FormProgress.Approved) {
      result.status = RoomStatus.Reserved;
    }
    // else form is rejected, do nothing

    return result;
  }
}
