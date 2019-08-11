import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Inject,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateIIMBookingFormDto, CreateGeneralBookingFormDto } from './dto';
import { DatePeriodRangeDto } from '../shared/dto/date-period-range.dto';
import { BookingForm } from '../../model/entity';
import { ApiUseTags } from '@nestjs/swagger';

// TODO 初步寫完，需要測試
@ApiUseTags('booking')
@Controller('booking')
export class BookingController {
  constructor(
    @Inject(BookingService)
    private readonly bookingService: BookingService,
  ) {}

  /**
   * 建立借用表單
   */
  @Post('/iim')
  async createFormByIIMMember(@Body() createFormDto: CreateIIMBookingFormDto) {
    return await this.bookingService.createFormByIIMMember(createFormDto);
  }

  @Post('/general')
  async createFormByNotIIMMember(@Body() createFormDto: CreateGeneralBookingFormDto) {
    return await this.bookingService.createFormByNotIIMMember(createFormDto);
  }

  /**
   * 找出所有的借用表單
   */
  @Get('findAll')
  async findAllForm(): Promise<BookingForm[]> {
    return await this.bookingService.findAllForm();
  }

  /**
   * 找出待審核的申請
   */
  @Get('findPending')
  async findPendingForm(@Query() roleType: number): Promise<BookingForm[]> {
    // TODO implement here
    return await this.bookingService.findPendingForm(roleType);
  }

  /**
   * 找出已審核的申請
   */
  @Get('findChecked')
  async findCheckedForm(@Query() roleType: number): Promise<BookingForm[]> {
    // TODO implement here
    return await this.bookingService.findCheckedForm(roleType);
  }

  /**
   * 找出指定id(流水號)的表單
   * @param {string} id 表單流水號
   */
  @Get(':id')
  async findOneForm(@Param('id') id: string): Promise<BookingForm> {
    // TODO implement here
    return await this.bookingService.findOneForm(id);
  }

  /**
   * 審核借用表單
   * @param {number} roleType 角色代號
   * @param {string} formID 表單流水號
   * @param {boolean} isApproved 審核同意或拒絕
   */
  @Put(':id')
  async checkForm(@Param('id') formID: string, @Query() roleType: number, @Query() isApproved: boolean) {
    return await this.bookingService.checkForm(formID, roleType, isApproved);
  }

  /**
   * 刪除表單
   * @param {string} id 表單流水號
   */
  @Delete(':formID')
  async deleteForm(@Param('formID') id: string) {
    return await this.bookingService.deleteForm(id);
  }

  /**
   * 尋找可以用的設備
   */
  findAvailableEquipment(timeRange: DatePeriodRangeDto, equipType: number) {
    // TODO
  }
}
