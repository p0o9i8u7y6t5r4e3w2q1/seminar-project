import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingForm } from '../../model/entity/booking-form.entity';
import { ScheduleService } from '../schedule/schedule.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingForm)
    private readonly formRepository: Repository<BookingForm>,
    @Inject(forwardRef(() => ScheduleService))
    private readonly scheduleService: ScheduleService,
  ) {}
  /**
   * 建立借用表單
   */
  createForm() {
    // TODO implement here
  }

  /**
   * 找出所有的表單
   */
  findAllForm() {
    // TODO implement here
  }

  /**
   * 找出待審核的申請
   */
  findOnPendingForm() {
    // TODO implement here
  }

  /**
   * 找出已審核的申請
   */
  findCheckedForm() {
    // TODO implement here
  }

  /**
   * 找出指定id(流水號)的表單
   * @param formId 表單流水號
   * @return
   */
  findOne(formId: string) {
    // TODO implement here
  }

  /**
   * 審核借用表單
   */
  checkForm() {
    // TODO implement here
  }

  /**
   * 刪除表單
   */
  deleteForm() {
    // TODO implement here
  }
  /**
   * 計算借用金額
   */
  calculateTotalCost(): number {
    // TODO implement here
    return null;
  }
}
