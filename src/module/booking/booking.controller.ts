import { Controller, Post, Get, Put, Delete, Param} from '@nestjs/common';
import { BookingService } from './booking.service'; 

@Controller('booking')
export class BookingController {

	constructor(private readonly bookingService: BookingService) {}

	/**
	 * 建立借用表單
	 */
	@Post()
	create() {
        // TODO implement here
		this.bookingService.create();
	}

	/**
	 * 找出所有的表單
	 */
	@Get()
	findAll() {
        // TODO implement here
		this.bookingService.findAll();
	}

    /**
     * 找出待審核的申請
     */
    @Get()
    findOnPending() {
        // TODO implement here
		this.bookingService.findOnPending();
    }

    /**
     * 找出已審核的申請
     */
    @Get()
    findChecked() {
        // TODO implement here
		this.bookingService.findChecked();
    }

	/**
	 * 找出指定id(流水號)的表單
	 * @param id 表單流水號
	 * @return 
	 */
	@Get(':id')
	findOne(@Param('id') id: string ) {
        // TODO implement here
		this.bookingService.findOne();
	}

	/**
	 * 審核借用表單
	 */
	@Put(':id')
	checkBooking() {
        // TODO implement here
		this.bookingService.checkBooking();
	}

	/**
	 * 刪除表單
	 */
	@Delete(':id')
	delete(@Param('id') id: string) {
		// TODO
		this.bookingService.delete();
	}
}
