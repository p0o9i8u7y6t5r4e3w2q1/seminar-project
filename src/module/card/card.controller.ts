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
import { CreateCardRecordDto } from './dto';
import { ClassroomDateSchedule } from '../../model/common';

@Controller('card')
export class CardController {
  constructor(
    @Inject(CardService)
    private readonly cardService: CardService,
  ) {}

  /**
   * 保存刷卡紀錄
   */
  @Post('create')
  async saveRecord(@Body() createCardRecordDto: CreateCardRecordDto) {
    return await this.cardService
      .saveRecord(createCardRecordDto)
      .catch(error => {
        console.error(Error);
      });
  }

  /**
   * 找出所有的表單
   */
  @Get()
  async findRecord(
    @Query('classroomID') classroomID: string,
    @Query('from') from: Date,
    @Query('to') to: Date,
  ) {
    return await this.cardService
      .findRecord(classroomID, from, to)
      .then(value => {
        console.log('find all success');
        return value;
      })
      .catch(error => {
        console.error(Error);
      });
  }

  /**
   * 檢查是否有開啟教室電源的權限
   */
  @Post()
  async checkAuthorization(
    @Query('uid') uid: string,
    @Query('date') date: Date,
    @Query('classroomDateSchedule')
    classroomDateSchedule: ClassroomDateSchedule,
  ) {
    // TODO implement here
    return await this.cardService
      .checkAuthorization(uid, date, classroomDateSchedule)
      .then(value => {
        console.log('finish check authorization');
        return value;
      })
      .catch(error => {
        console.error(Error);
      });
  }
}
