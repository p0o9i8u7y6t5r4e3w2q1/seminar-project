import { Injectable } from '@nestjs/common';

@Injectable()
export class CardService {

	/**
	 * 保存刷卡紀錄
	 */
	saveRecord() {
        // TODO implement here
	}

    /**
     * 找出指定教室、時間範圍的刷卡記錄
     */
    findRecord() {
        // TODO implement here
	}

    /**
     * 檢查是否有開啟教室電源的權限
     */
    checkAuthorization() {
        // TODO implement here
    }
}
