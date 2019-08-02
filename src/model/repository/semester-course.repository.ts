import {
  EntityRepository,
  Repository,
  DeepPartial,
  SaveOptions,
} from 'typeorm';
import { SemesterCourse } from '../entity';

@EntityRepository(SemesterCourse)
export class SemesterCourseRepository extends Repository<SemesterCourse> {
  preload(
    entityLike: DeepPartial<SemesterCourse>,
  ): Promise<SemesterCourse | undefined> {
    if (entityLike.id == null) {
      (entityLike as SemesterCourse).combineID();
    }
    return super.preload(entityLike);
  }

  save(
    data: Array<DeepPartial<SemesterCourse>>,
    options?: SaveOptions,
  ): Promise<Array<DeepPartial<SemesterCourse>>>;
  save(
    data: DeepPartial<SemesterCourse>,
    options?: SaveOptions,
  ): Promise<DeepPartial<SemesterCourse>>;
  save(data: any, options?: any): any {
    if (Array.isArray(data)) {
      for (const e of data) {
        (e as SemesterCourse).combineID();
      }
    } else {
      (data as SemesterCourse).combineID();
    }
    return super.save(data, options);
  }
}
