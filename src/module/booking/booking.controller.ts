import {
  Controller,
  Req,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Inject,
  UseGuards,
  UseFilters,
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
import { Roles, AuthenticatedGuard, RolesGuard } from '../user';
import { RoleType } from '../../util';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

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
   * 根據使用者身分，找出待審核的申請
   */
  @Get('findPending')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.DeptHead, RoleType.Staff)
  async findPendingForm(@Req() req: any) {
    return await this.bookingService.findPendingForm(req.user.roleID);
  }

  /**
   * 根據使用者身分，找出已審核的申請
   */
  @Get('findChecked')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.DeptHead, RoleType.Staff)
  async findCheckedForm(@Req() req: any) {
    return await this.bookingService.findCheckedForm(req.user.roleID);
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
   * @param {string} formID 表單流水號
   * @param {boolean} isApproved 審核同意或拒絕
   */
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.DeptHead, RoleType.Staff)
  @Put('check/:formID')
  async checkForm(
    @Param('formID') formID: string,
    @Req() req: any,
    @Body() checkDto: CheckFormDto,
  ) {
    return await this.bookingService.checkForm(
      formID,
      req.user.roleID,
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
