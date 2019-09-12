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
  ParseIntPipe,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateIIMBookingFormDto, CreateGeneralBookingFormDto } from './dto';
import { DatePeriodRangeDto } from '../shared/dto/date-period-range.dto';
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
  async createFormByNotIIMMember(
    @Body() createFormDto: CreateGeneralBookingFormDto,
  ) {
    return await this.bookingService.createFormByNotIIMMember(createFormDto);
  }

  /**
   * 找出所有的借用表單
   */
  @Get('findAll')
  async findAllForm() {
    return await this.bookingService.findAllForm();
  }

  /**
   * 找出待審核的申請
   */
  @Get('findPending')
  async findPendingForm(@Query('roleType', ParseIntPipe) roleType: number) {
    return await this.bookingService.findPendingForm(roleType);
  }

  /**
   * 找出已審核的申請
   */
  @Get('findChecked')
  async findCheckedForm(@Query('roleType', ParseIntPipe) roleType: number) {
    return await this.bookingService.findCheckedForm(roleType);
  }

  /**
   * 找出指定id(流水號)的表單
   * @param {string} formID 表單流水號
   */
  @Get('find/:formID')
  async findOneForm(@Param('formID') formID: string) {
    return await this.bookingService.findOneForm(formID);
  }

  /**
   * 審核借用表單
   * @param {number} roleType 角色代號
   * @param {string} formID 表單流水號
   * @param {boolean} isApproved 審核同意或拒絕
   */
  @Put('check/:formID')
  async checkForm(
    @Param('formID') formID: string,
    @Body('roleType', ParseIntPipe) roleType: number,
    @Body('isApproved') isApproved: boolean,
  ) {
    return await this.bookingService.checkForm(formID, roleType, isApproved);
  }

  /**
   * 刪除表單
   * @param {string} id 表單流水號
   */
  @Delete('delete/:formID')
  async deleteForm(@Param('formID') formID: string, @Body('email')email:string) {
    return await this.bookingService.deleteForm(formID,email);
  }

  /**
   * 尋找可以用的設備
   */
  findAvailableEquipment(timeRange: DatePeriodRangeDto, equipType: number) {
    // TODO
  }
}
