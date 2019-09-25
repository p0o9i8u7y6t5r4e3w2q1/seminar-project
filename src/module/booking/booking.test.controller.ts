import {
  Controller,
  Req,
  Post,
  Get,
  Put,
  Delete,
  Query,
  Param,
  Body,
  Inject,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CheckFormDto } from './dto';
import { RoleType } from '../../util';
import {ApiUseTags} from '@nestjs/swagger';

@ApiUseTags('test')
@Controller('test/booking')
export class BookingTestController {
  constructor(
    @Inject(BookingService)
    private readonly bookingService: BookingService,
  ) {}

  /**
   * 根據使用者身分，找出待審核的申請
   */
  @Get('findPending')
  async findPendingForm(@Query('roleID', ParseIntPipe) roleID: RoleType) {
    return await this.bookingService.findPendingForm(roleID);
  }

  /**
   * 根據使用者身分，找出已審核的申請
   */
  @Get('findChecked')
  async findCheckedForm(@Query('roleID', ParseIntPipe) roleID: RoleType) {
    return await this.bookingService.findCheckedForm(roleID);
  }

  /**
   * 審核借用表單
   * @param {string} formID 表單流水號
   * @param {boolean} isApproved 審核同意或拒絕
   */
  @Put('check/:formID')
  async checkForm(
    @Param('formID') formID: string,
    @Query('roleID', ParseIntPipe) roleID: RoleType,
    @Body() checkDto: CheckFormDto,
  ) {
    return await this.bookingService.checkForm(
      formID,
      roleID,
      checkDto.isApproved,
    );
  }
}