import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SemesterCourse } from '../../model/entity/semester-course.entity';

@Injectable()
export class SemesterCourseService {
  constructor(
    @InjectRepository(SemesterCourse)
    private readonly scRepository: Repository<SemesterCourse>,
  ) {}

  /**
   * 新增學期課程
   */
  create() {
    // TODO implement here
  }

  /**
   * 查詢所偶學期課程
   */
  findAll() {
    // TODO implement here
  }

  /**
   * 更新學期課程
   */
  update() {
    // TODO implement here
  }

  /**
   * 刪除一個學期課程
   */
  delete() {
    // TODO implement here
  }
}
