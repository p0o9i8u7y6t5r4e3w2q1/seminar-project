import { Controller, Post, Get, Param } from '@nestjs/common';
import { CardService } from './card.service';

@Controller('card')
export class CardController {
	constructor(private readonly cardService: CardService) {}

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
	findRecord() {
        // TODO implement here
        this.cardService.findRecord();
	}

    /**
     * 檢查是否有開啟教室電源的權限
     */
    @Post()
    checkAuthorization() {
        // TODO implement here
        this.cardService.checkAuthorization();
    }
}
