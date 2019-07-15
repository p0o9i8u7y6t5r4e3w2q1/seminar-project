import { Controller, Post, Get, Put, Delete, Param } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  /**
   * 建立借用表單
   */
  @Post()
  createForm() {
    // TODO implement here
  }

  /**
   * 找出所有的表單
   */
  @Get()
  findAllForm() {
    // TODO implement here
  }

  /**
   * 找出待審核的申請
   */
  @Get()
  findOnPendingForm() {
    // TODO implement here
  }

  /**
   * 找出已審核的申請
   */
  @Get()
  findCheckedForm() {
    // TODO implement here
  }

  /**
   * 找出指定id(流水號)的表單
   * @param id 表單流水號
   * @return
   */
  @Get(':id')
  findOneForm(@Param('id') id: string) {
    // TODO implement here
  }

  /**
   * 審核借用表單
   */
  @Put(':id')
  checkForm() {
    // TODO implement here
    this.bookingService.checkBooking();
  }

  /**
   * 刪除表單
   */
  @Delete(':id')
  deleteForm(@Param('id') id: string) {
    // TODO
    this.bookingService.delete();
  }
}
