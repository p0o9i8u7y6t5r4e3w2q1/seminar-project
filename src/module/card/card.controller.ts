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
import { ApiUseTags } from '@nestjs/swagger';

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
  @Post('create')
  async saveRecord(@Body() createCardRecordDto: CreateCardRecordDto) {
    return { record: await this.cardService.saveRecord(createCardRecordDto) };
  }

  /**
   * 找出所有的表單
   */
  @Get('find')
  async findRecord(
    @Query('classroomID') classroomID: string,
    @Query('from') from: Date,
    @Query('to') to: Date,
  ) {
    return { record: await this.cardService.findRecord(classroomID, from, to) };
  }

  /**
   * 檢查是否有開啟教室電源的權限
   */
  @Post('check')
  async checkAuthorization(
    @Body('uid') uid: string,
    @Body('classroomID') classroomID: string,
  ) {
    return {
      result: await this.cardService.checkAuthorization(
        uid,
        classroomID,
        new Date(),
      ),
    };
  }
}
