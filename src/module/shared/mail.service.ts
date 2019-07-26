import { Injectable } from '@nestjs/common';
import { BookingForm } from '../../model/entity';

@Injectable()
export class MailService {
  sendEmail(bookingForm: BookingForm) {}
}
