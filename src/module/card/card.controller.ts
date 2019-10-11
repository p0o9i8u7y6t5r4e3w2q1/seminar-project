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
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

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
  @ApiOperation({ title: '檢查開電權限' })
  @Post('checkAuth')
  async checkAuthorization(@Body() checkDto: CheckAuthorizationDto) {
    return await this.cardService.checkAuthorization(
      checkDto.uid,
      checkDto.classroomID,
      new Date(),
    );
  }
}
