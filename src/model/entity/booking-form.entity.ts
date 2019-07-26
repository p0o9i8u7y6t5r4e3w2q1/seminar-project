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
  FormProgress,
  FormPendingProgress,
  PersonCheckStatus,
  RoomStatus,
} from '../../util';

@Entity('booking_form')
export class BookingForm extends Form {
  private _iimMember: boolean = false;

  // 不是IIM成員的話，儲存使用者名稱
  private _applicantName: string = null;

  // 是IIM成員的話，儲存使用者ID
  private _applicantID: string = null;

  private _applicantEmail: string = null;

  private _reason: string = null;

  private _equipments: Equipment[];

  private _equipmentIDs: string[];

  private _deptHeadCheckStatus: PersonCheckStatus = PersonCheckStatus.UnChecked;

  private _staffCheckStatus: number = PersonCheckStatus.UnChecked;

  private _totalCost: number = 0;

  /* ---- setter and getter ---- */
  @Column('tinyint', { name: 'is_iim_member' })
  public get iimMember() {
    return this._iimMember;
  }
  public set iimMember(iimMember: boolean) {
    this._iimMember = iimMember;
  }

  @Column('varchar', {
    nullable: true,
    length: 32,
    name: 'applicant_name',
  })
  public get applicantName() {
    return this._applicantName;
  }
  public set applicantName(applicantName: string) {
    this._applicantName = applicantName;
  }

  @Column('varchar', {
    nullable: true,
    length: 9,
    name: 'applicant_id',
  })
  public get applicantID() {
    return this._applicantID;
  }
  public set applicantID(applicantID: string) {
    this._applicantID = applicantID;
  }

  @Column('varchar', {
    length: 64,
    name: 'applicant_email',
  })
  public get applicantEmail() {
    return this._applicantEmail;
  }
  public set applicantEmail(applicantEmail: string) {
    this._applicantEmail = applicantEmail;
  }

  @Column('varchar', {
    length: 32,
    name: 'reason',
  })
  public get reason() {
    return this._reason;
  }
  public set reason(reason: string) {
    this._reason = reason;
  }

  @ManyToOne(type => Classroom, {
    nullable: true,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'room_id', referencedColumnName: 'id' })
  public get classroom() {
    return this._classroom;
  }
  public set classroom(classroom: Classroom) {
    this._classroom = classroom;
  }

  @Column('char', {
    length: 5,
    name: 'room_id',
  })
  public get classroomID() {
    return this._classroomID;
  }
  public set classroomID(classroomID: string) {
    this._classroomID = classroomID;
  }

  @ManyToMany(type => Equipment, { nullable: true })
  @JoinTable({
    name: 'booking_equipment',
    joinColumn: { name: 'form_id' },
    inverseJoinColumn: { name: 'equip_id' },
  })
  public get equipments() {
    return this._equipments;
  }
  public set equipments(equipments: Equipment[]) {
    this._equipments = equipments;
  }

  @RelationId((bookingForm: BookingForm) => bookingForm.equipments)
  public get equipmentIDs() {
    return this._equipmentIDs;
  }
  public set equipmentIDs(equipmentIDs: string[]) {
    this._equipmentIDs = equipmentIDs;
  }

  @Column('tinyint', { name: 'depthead_check' })
  public get deptHeadCheckStatus() {
    return this._deptHeadCheckStatus;
  }
  public set deptHeadCheckStatus(deptHeadCheckStatus: number) {
    this._deptHeadCheckStatus = deptHeadCheckStatus;
  }

  @Column('tinyint', { name: 'staff_check' })
  public get staffCheckStatus() {
    return this._staffCheckStatus;
  }
  public set staffCheckStatus(staffCheckStatus: number) {
    this._staffCheckStatus = staffCheckStatus;
  }

  @Column('int', { name: 'total_cost' })
  public get totalCost() {
    return this._totalCost;
  }
  public set totalCost(totalCost: number) {
    this._totalCost = totalCost;
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
    this._deptHeadCheckStatus = isApproved
      ? PersonCheckStatus.Approved
      : PersonCheckStatus.Rejected;

    if (!isApproved) this._progress = FormProgress.Rejected;
    else if (this._progress === FormProgress.StaffApproved) {
      this._progress = FormProgress.Approved;
    } else this._progress = FormProgress.DeptHeadApproved;
  }

  public staffCheck(isApproved: boolean) {
    this._staffCheckStatus = isApproved
      ? PersonCheckStatus.Approved
      : PersonCheckStatus.Rejected;

    if (!isApproved) this._progress = FormProgress.Rejected;
    else if (this._progress === FormProgress.DeptHeadApproved) {
      this._progress = FormProgress.Approved;
    } else this._progress = FormProgress.StaffApproved;
  }

  /* ---- listener in typeorm ---- */
  @AfterLoad()
  @AfterInsert()
  makeFormID() {
    let tempStr = '' + this._id;
    for (let i = tempStr.length; i <= 6; i++) {
      tempStr = '0' + tempStr;
    }
    this._formID = 'BF' + tempStr;
  }

  /* ---- implements IRoomSchedule functions ---- */
  public getScheduleResult(): ScheduleResult {
    const result = new ScheduleResult();
    result.formID = this._formID;

    if (FormPendingProgress.includes(this.progress)) {
      result.status = RoomStatus.Pending;
    } else if (this.progress === FormProgress.Approved) {
      result.status = RoomStatus.Reserved;
    }
    // else form is rejected, do nothing

    return result;
  }
}
