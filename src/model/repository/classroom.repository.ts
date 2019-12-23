import { EntityRepository, Repository } from 'typeorm';
import {
  Classroom,
  ScheduleChange,
  MakeupCourseForm,
  BookingForm,
} from '../entity';
import { DatePeriodRange } from '../common';
import { FormPendingProgress } from '../../util';
import { uniqueArrayFn } from '../../module/shared';

@EntityRepository(Classroom)
export class ClassroomRepository extends Repository<Classroom> {
  async findAvailableClassrooms(
    timeRange: DatePeriodRange,
  ): Promise<Classroom[]> {
    const notAvailableClassrooms = await this.findNotAvailableClassrooms(
      timeRange,
    );

    if (notAvailableClassrooms.length == 0) {
      return this.find();
    } else {
      return this.createQueryBuilder('classroom')
        .where('classroom.id NOT IN (:...classroomIDs)', {
          classroomIDs: notAvailableClassrooms,
        })
        .printSql()
        .getMany();
    }
  }

  private async findNotAvailableClassrooms(
    timeRange: DatePeriodRange,
  ): Promise<string[]> {
    const tempQuery = this.manager
      .createQueryBuilder(ScheduleChange, 'sc')
      .select('DISTINCT sc.classroomID');

    return await timeRange
      .makeWhereSelectQuery(tempQuery, 'sc.timeRange', '')
      .printSql()
      .getRawMany()
      .then(result => result.map((data: any) => data.room_id));
  }

  async findPendingClassrooms(
    classroomIDs: string[],
    timeRange: DatePeriodRange,
  ): Promise<string[]> {
    const mfpromise = this.rawFindPendingClassrooms(
      classroomIDs,
      timeRange,
      MakeupCourseForm,
    );
    const bfpromise = this.rawFindPendingClassrooms(
      classroomIDs,
      timeRange,
      BookingForm,
    );
    const duplicateIDs = [...(await mfpromise), ...(await bfpromise)];
    return uniqueArrayFn(duplicateIDs, x => x);
  }

  private async rawFindPendingClassrooms(
    classroomIDs: string[],
    timeRange: DatePeriodRange,
    type: any,
  ): Promise<string[]> {
    const tempQuery = this.manager
      .createQueryBuilder(type, 'form')
      .select('DISTINCT form.classroomID')
      .where('form.classroomID IN (:...roomIDs)', { roomIDs: classroomIDs })
      .andWhere('form.progress IN (:...progresses)', {
        progresses: FormPendingProgress,
      });
    return timeRange
      .makeWhereSelectQuery(tempQuery, 'form.timeRange', 'and')
      .printSql()
      .getRawMany()
      .then(result => result.map(data => data.room_id));
  }
}
