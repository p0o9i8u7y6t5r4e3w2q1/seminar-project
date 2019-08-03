import { EntityRepository, EntityManager } from 'typeorm';
import { ScheduleResult } from '../common';
import { MakeupCourseForm, BookingForm, SemesterCourse } from '../entity';

@EntityRepository()
export class ScheduleResultRepository {
  constructor(private manager: EntityManager) {}

  async loadKeyObject(data: ScheduleResult | ScheduleResult[]): Promise<void> {
    if (Array.isArray(data)) {
      for (const e of data) {
        this.loadKeyObject(e);
      }
    } else {
      if (data.key == null) return;
      if (data.key.id == null || data.key.type) return;
      data.key.obj = await this.findObject(data.key.id, data.key.type);
    }
  }

  private findObject(id: string, type: any): Promise<any> {
    switch (type) {
      case MakeupCourseForm:
        return this.manager.findOne(MakeupCourseForm, {
          id: MakeupCourseForm.findID(id),
        });
      case BookingForm:
        return this.manager.findOne(BookingForm, {
          id: BookingForm.findID(id),
        });
      case SemesterCourse:
        // XXX add relations
        return this.manager.findOne(SemesterCourse, id);
    }
  }
}
