import { Injectable } from '@nestjs/common';

@Injectable()
export class BookingService {
	
	/**
	 * 建立借用表單
	 */
	create() {
        // TODO implement here
	}

	/**
	 * 找出所有的表單
	 */
	findAll() {
        // TODO implement here
	}

    /**
     * 找出待審核的申請
     */
    findOnPending() {
        // TODO implement here
    }

    /**
     * 找出已審核的申請
     */
    findChecked() {
        // TODO implement here
    }

	/**
	 * 找出指定id(流水號)的表單
	 * @param formId 表單流水號
	 * @return 
	 */
	findOne() {
        // TODO implement here
	}

	/**
	 * 審核借用表單
	 */
	checkBooking() {
        // TODO implement here
	}

	/**
	 * 刪除表單
	 */
	delete() {
        // TODO implement here
	}
    /**
     * 
     */
    calculateTotalCost() :  number {
        // TODO implement here
        return null;
    }
}
