import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingForm } from '../../model/entity/booking-form.entity';
import { ScheduleService } from '../schedule/schedule.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingForm)
    private readonly formRepository: Repository<BookingForm>,
    @Inject()
    private readonly scheduleService: ScheduleService,
  ) {}
  /**
   * 建立借用表單
   */
  create() {
    // TODO implement here
  }

  /**
   * 找出所有的表單
   */
  async findAll(): Promise<BookingForm[]> {
    // TODO implement here
    return await this.formRepository.find();
  }

  /**
   * 找出待審核的申請
   */
  findOnPending() {
    // TODO implement here
  }

  /**
   * 找出已審核的申請
   */
  findChecked() {
    // TODO implement here
  }

  /**
   * 找出指定id(流水號)的表單
   * @param formId 表單流水號
   * @return
   */
  async findOne(formId: string): Promise<BookingForm> {
    // TODO implement here
    return await this.formRepository.findOne(formId);
  }

  /**
   * 審核借用表單
   */
  checkBooking(): void {
    // TODO implement here
  }

  /**
   * 刪除表單
   */
  delete() {
    // TODO implement here
  }
  /**
   *
   */
  calculateTotalCost(): number {
    // TODO implement here
    return null;
  }
}
