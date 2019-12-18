import {
  Controller,
  Post,
  Get,
  Query,
  Body,
  Param,
  Inject,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardRecordDto, CheckAuthorizationDto } from './dto';
import { ApiUseTags, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { DateUtil, SwipeCardResult } from '../../util';

@ApiUseTags('card')
@Controller('card')
export class CardController {
  constructor(
    @Inject(CardService)
    private readonly cardService: CardService,
  ) {}

  /**
   * 保存刷卡紀錄
   */
  @ApiOperation({ title: '保存刷卡紀錄' })
  @Post('records')
  async saveRecord(@Body() createCardRecordDto: CreateCardRecordDto) {
    return await this.cardService.saveRecord(createCardRecordDto);
  }

  /**
   * 查詢所有刷卡紀錄
   */
  @ApiOperation({ title: '查詢所有刷卡紀錄' })
  @ApiImplicitQuery({
    name: 'from',
    type: String,
    description: '起始日期-e.g."2018-01-01"',
  })
  @ApiImplicitQuery({
    name: 'to',
    type: String,
    description: '結束日期-e.g."2018-01-01"',
  })
  @Get('records')
  async findRecord(
    @Query('classroomID') classroomID: string,
    @Query('from') from: Date,
    @Query('to') to: Date,
  ) {
    return await this.cardService.findRecord(classroomID, from, to);
  }

  @ApiOperation({ title: '查詢卡片擁有者' })
  @Get('owner')
  async findOwner(@Query('uid') uid: string) {
    return await this.cardService.findCardOwner(uid);
  }

  /**
   * 檢查是否有開啟教室電源的權限
   */
  @ApiOperation({
    title: '檢查開電權限',
    description: '目前不提供教室備用卡的檢測',
  })
  @Post('checkAuth')
  async checkAuthorization(@Body() checkDto: CheckAuthorizationDto) {
    const date = DateUtil.now();
    const result = await this.cardService.checkAuth(
      date,
      checkDto.classroomID,
      checkDto.uid,
      checkDto.turnOn,
    );

    await this.cardService.saveRecord({
      uid: checkDto.uid,
      classroomID: checkDto.classroomID,
      recordTime: date,
      swipeResult: this.getSwipeResult(result.hasAuth, checkDto.turnOn),
    });

    return result;
  }

  /**
   * 檢查是否有開啟教室電源的權限
   */
  @ApiImplicitQuery({
    name: 'time',
    type: String,
    description: '要檢測的時間e.g."2018-01-01T15:00"',
  })
  @ApiOperation({
    title: '檢查開電權限(測試版)',
    description: '目前不提供教室備用卡的檢測',
  })
  @Post('test/checkAuth')
  async checkAuthorizationTest(
    @Query('time') time: string,
    @Body() checkDto: CheckAuthorizationDto,
  ) {
    const date = new Date(time);
    const result = await this.cardService.checkAuth(
      date,
      checkDto.classroomID,
      checkDto.uid,
      checkDto.turnOn,
    );

    await this.cardService.saveRecord({
      uid: checkDto.uid,
      classroomID: checkDto.classroomID,
      recordTime: date,
      swipeResult: this.getSwipeResult(result.hasAuth, checkDto.turnOn),
    });

    return result;
  }

  private getSwipeResult(hasAuth: boolean, turnOn: boolean) {
    if (!hasAuth) {
      return SwipeCardResult.Failed;
    } else if (turnOn) {
      return SwipeCardResult.SuccessTurnOn;
    } else {
      return SwipeCardResult.SuccessTurnOff;
    }
  }
}
