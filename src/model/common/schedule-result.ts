export class ScheduleResult {
  scID: string;

  bookingFormID: string;

  status: number;

  public getScID(): string {
    return this.scID;
  }

  public setScID(scID: string): void {
    this.scID = scID;
  }

  public getBookingFormID(): string {
    return this.bookingFormID;
  }

  public setBookingFormID(bookingFormID: string): void {
    this.bookingFormID = bookingFormID;
  }

  public getStatus(): number {
    return this.status;
  }

  public setStatus(status: number): void {
    this.status = status;
  }
}
