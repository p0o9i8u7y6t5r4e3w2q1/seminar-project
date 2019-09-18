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
import { EquipmentService } from './equipment.service';
import {
  CreateIIMBookingFormDto,
  CreateGeneralBookingFormDto,
  FindAvailableEquipmentDto,
  DeleteFormDto,
  CheckFormDto,
} from './dto';
import { ApiUseTags } from '@nestjs/swagger';

// TODO 初步寫完，需要測試
@ApiUseTags('booking')
@Controller('booking')
export class BookingController {
  constructor(
    @Inject(BookingService)
    private readonly bookingService: BookingService,
    @Inject(EquipmentService)
    private readonly equipService: EquipmentService,
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
    @Body() checkDto: CheckFormDto,
  ) {
    return await this.bookingService.checkForm(
      formID,
      checkDto.roleType,
      checkDto.isApproved,
    );
  }

  /**
   * 刪除表單
   * @param {string} id 表單流水號
   */
  @Delete('delete/:formID')
  async deleteForm(
    @Param('formID') formID: string,
    @Body() deleteDto: DeleteFormDto,
  ) {
    return await this.bookingService.deleteForm(formID, deleteDto.email);
  }

  /**
   * 尋找可以用的設備
   */
  @Post('/availableEquipment')
  async findAvailableEquipment(@Body() findDto: FindAvailableEquipmentDto) {
    return await this.equipService.findAvailableEquipment(
      findDto.timeRange,
      findDto.equipType,
    );
  }
}
