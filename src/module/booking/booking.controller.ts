import {
  OnModuleInit,
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
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { EquipmentService } from './equipment.service';
import {
  CreateIIMBookingFormDto,
  CreateGeneralBookingFormDto,
  FindAvailableEquipmentDto,
  DeleteFormDto,
} from './dto';
import { CheckFormDto, FindFormDto, InformService } from '../shared';
import { Roles, AuthenticatedGuard, RolesGuard } from '../user';
import { RoleType, SUCCESS } from '../../util';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { BehaviorSubject } from 'rxjs';

const STAFF_BF_COUNT = 'staffBookingCount'; // number of pending form for staff
const DEPTHEAD_BF_COUNT = 'staffBookingCount'; // number of pending form for deptHead

@ApiUseTags('bookings')
@Controller('bookings')
export class BookingController implements OnModuleInit {
  constructor(
    @Inject(BookingService)
    private readonly bookingService: BookingService,
    @Inject(EquipmentService)
    private readonly equipService: EquipmentService,
    @Inject(InformService)
    private readonly inform: InformService,
  ) {}

  private staffPendingCount = 0;
  private deptHeadPendingCount = 0;
  async onModuleInit() {
    this.staffPendingCount = await this.bookingService.findPendingFormsCount(
      RoleType.Staff,
    );
    this.deptHeadPendingCount = await this.bookingService.findPendingFormsCount(
      RoleType.Staff,
    );
    this.inform.register(
      STAFF_BF_COUNT,
      new BehaviorSubject(this.staffPendingCount),
    );
    this.inform.register(
      DEPTHEAD_BF_COUNT,
      new BehaviorSubject(this.deptHeadPendingCount),
    );
  }

  // 不確定將通知的邏輯放在這裡合不合適
  private notify(event: 'check' | 'new', roleID?: number) {
    if (event === 'new') {
      this.inform.next(STAFF_BF_COUNT, ++this.staffPendingCount);
      this.inform.next(DEPTHEAD_BF_COUNT, ++this.deptHeadPendingCount);
    } else {
      // event == 'check'
      if (roleID === RoleType.Staff) {
        this.inform.next(STAFF_BF_COUNT, --this.staffPendingCount);
      } else {
        // roleID == RoleType.DeptHead
        this.inform.next(DEPTHEAD_BF_COUNT, --this.deptHeadPendingCount);
      }
    }
  }

  /**
   * 建立借用表單
   */
  @ApiOperation({ title: '新增系內人借用申請' })
  @Post('iim')
  async createFormByIIMMember(@Body() createFormDto: CreateIIMBookingFormDto) {
    const form = await this.bookingService.createFormByIIMMember(createFormDto);
    this.notify('new');
    return form;
  }

  @ApiOperation({ title: '新增系外人借用申請' })
  @Post('general')
  async createFormByNotIIMMember(
    @Body() createFormDto: CreateGeneralBookingFormDto,
  ) {
    return await this.bookingService.createFormByNotIIMMember(createFormDto);
  }

  /**
   * 找出所有的借用表單
   */
  @ApiOperation({ title: '查詢所有借用申請' })
  @Get()
  async findAllForm() {
    return await this.bookingService.findAllForm();
  }

  /**
   * 根據使用者身分，找出待審核的申請
   */
  @ApiOperation({
    title: '查詢所有待審核申請',
    description: '依照使用者身分，找出待審核申請',
  })
  @Get('pending')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.DeptHead, RoleType.Staff)
  async findPendingForm(@Req() req: any) {
    return await this.bookingService.findPendingForm(req.user.roleID);
  }

  /**
   * 根據使用者身分，找出已審核的申請
   */
  @ApiOperation({
    title: '查詢所有已審核申請',
    description: '依照使用者身分，找出已審核申請',
  })
  @Get('checked')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.DeptHead, RoleType.Staff)
  async findCheckedForm(@Req() req: any) {
    const form = await this.bookingService.findCheckedForm(req.user.roleID);
    this.notify('check');
    return form;
  }

  /**
   * 找出指定id(流水號)的表單
   * @param {string} formID 表單流水號
   */
  @ApiOperation({ title: '查詢指定的借用申請' })
  @Get('forms/:formID')
  async findOneForm(@Param() dto: FindFormDto) {
    return await this.bookingService.findOneForm(dto.formID);
  }

  /**
   * 審核借用表單
   * @param {string} formID 表單流水號
   * @param {boolean} isApproved 審核同意或拒絕
   */
  @ApiOperation({ title: '審核借用申請' })
  @Put(':formID/check')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.DeptHead, RoleType.Staff)
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
  @ApiOperation({ title: '刪除借用申請' })
  @Delete(':formID')
  async deleteForm(
    @Param('formID') formID: string,
    @Body() deleteDto: DeleteFormDto,
  ) {
    await this.bookingService.deleteForm(formID, deleteDto.email);
    return SUCCESS;
  }

  /**
   * 尋找可以用的設備
   */
  @ApiOperation({
    title: '查詢可用設備',
    description: '依時間範圍與設備類型，找出可用的設備',
  })
  @Post('equipments/available')
  async findAvailableEquipment(@Body() findDto: FindAvailableEquipmentDto) {
    return await this.equipService.findAvailableEquipment(
      findDto.timeRange,
      findDto.equipType,
    );
  }
}
