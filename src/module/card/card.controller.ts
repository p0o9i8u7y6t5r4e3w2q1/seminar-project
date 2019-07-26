import { Controller, Post, Get, Param, Inject } from '@nestjs/common';
import { CardService } from './card.service';

@Controller('card')
export class CardController {
  constructor(
    @Inject(CardService)
    private readonly cardService: CardService,
  ) {}

  /**
   * 保存刷卡紀錄
   */
  @Post()
  saveRecord() {
    // TODO implement here
    this.cardService.saveRecord();
  }

  /**
   * 找出所有的表單
   */
  @Get()
  findRecord(classroomID: string, from: Date, to: Date) {
    // TODO implement here
    this.cardService.findRecord(classroomID, from, to);
  }

  /**
   * 檢查是否有開啟教室電源的權限
   */
  @Post()
  checkAuthorization(uid: string, classroomID: string) {
    // TODO implement here
    this.cardService.checkAuthorization(uid, classroomID);
  }
}
