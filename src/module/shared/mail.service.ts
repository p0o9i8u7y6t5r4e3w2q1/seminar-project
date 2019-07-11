import { Injectable } from '@nestjs/common';
import { BookingForm } from '../entity/booking-form.entity'

@Injectable()
export class MailService {
    sendEmail(bookingForm: BookingForm) {
	}
}
