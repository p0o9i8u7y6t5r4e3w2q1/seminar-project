import {
  EntityRepository,
  Repository,
  DeepPartial,
  SaveOptions,
  InsertResult,
} from 'typeorm';
import { BookingForm } from '../entity';

@EntityRepository(BookingForm)
export class BookingFormRepository extends Repository<BookingForm> {
  public findOneByFormID(formID: string) {
    return this.findOneOrFail(this.findID(formID));
  }

  public deleteByFormID(formID: string) {
    return this.delete(this.findID(formID));
  }

  public updateByFormID(formID: string, partial: DeepPartial<BookingForm>) {
    return this.update(this.findID(formID), partial);
  }

  public findID(formID: string) {
    return BookingForm.findID(formID);
  }

  insert(data: BookingForm | BookingForm[]): Promise<InsertResult> {
    if (Array.isArray(data)) {
      for (const e of data) {
        (e as BookingForm).assignEquipments();
      }
    } else {
      (data as BookingForm).assignEquipments();
    }
    return super.insert(data);
  }

  save(
    data: Array<DeepPartial<BookingForm>>,
    options?: SaveOptions,
  ): Promise<Array<DeepPartial<BookingForm>>>;
  save(
    data: DeepPartial<BookingForm>,
    options?: SaveOptions,
  ): Promise<DeepPartial<BookingForm>>;
  public async save(data: any, options?: any): Promise<any> {
    if (Array.isArray(data)) {
      for (const e of data) {
        (e as BookingForm).assignEquipments();
      }
    } else {
      (data as BookingForm).assignEquipments();
    }
    return super.save(data, options);
  }
}
