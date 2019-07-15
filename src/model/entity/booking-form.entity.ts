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
  @Column({ name: 'applicant_id' })
  applicantID: string;

  @Column({ name: 'applicant_phone' })
  applicantPhone: string;

  @Column({ name: 'applicant_email' })
  applicantEmail: string;

  @Column()
  reason: string;

  @Column()
  classroomId: string;

  // TODO: NEED CHECK
  borrowTimeRange: DatePeriodRange;

  // TODO: NEED CHECK
  @Column()
  equipmentIDs: string[];

  @Column({ name: 'depthead_check' })
  deptHeadCheck: number;

  @Column({ name: 'staff_check' })
  staffCheck: number;

  @Column()
  progress: number;

  @Column({ name: 'total_cost' })
  totalCost: number;

  /**
   * 計算借用金額
   */
  calculateTotalCost(): number {
    // TODO implement here
    return null;
  }

  public getIIMmemeber(): boolean {
    return this.iimMemeber;
  }

  public setIIMmemeber(iimMemeber: boolean): void {
    this.iimMemeber = iimMemeber;
  }

  public getApplicantName(): string {
    return this.applicantName;
  }

  public setApplicantName(applicantName: string): void {
    this.applicantName = applicantName;
  }

  public getApplicantID(): string {
    return this.applicantID;
  }

  public setApplicantID(applicantID: string): void {
    this.applicantID = applicantID;
  }

  public getApplicantEmail(): string {
    return this.applicantEmail;
  }

  public setApplicantEmail(applicantEmail: string): void {
    this.applicantEmail = applicantEmail;
  }

  public getReason(): string {
    return this.reason;
  }

  public setReason(reason: string): void {
    this.reason = reason;
  }

  public getBorrowTimeRange(): DatePeriodRange {
    return this.borrowTimeRange;
  }

  public setBorrowTimeRange(borrowTimeRange: DatePeriodRange): void {
    this.borrowTimeRange = borrowTimeRange;
  }

  public getEquipmentIDs(): string[] {
    return this.equipmentIDs;
  }

  public setEquipmentIDs(equipmentIDs: string[]): void {
    this.equipmentIDs = equipmentIDs;
  }

  public getDeptHeadCheck(): number {
    return this.deptHeadCheck;
  }

  public setDeptHeadCheck(deptHeadCheck: number): void {
    this.deptHeadCheck = deptHeadCheck;
  }

  public getStaffCheck(): number {
    return this.staffCheck;
  }

  public setStaffCheck(staffCheck: number): void {
    this.staffCheck = staffCheck;
  }

  public getProgress(): number {
    return this.progress;
  }

  public setProgress(progress: number): void {
    this.progress = progress;
  }

  public getTotalCost(): number {
    return this.totalCost;
  }

  public setTotalCost(totalCost: number): void {
    this.totalCost = totalCost;
  }
}
