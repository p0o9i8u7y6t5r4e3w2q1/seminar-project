import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSemesterCourseDto, UpdateSemesterCourseDto } from './dto';
import { SemesterCourse } from '../../model/entity';
import { SemesterCourseRepository } from '../../model/repository';

// XXX 待測試
@Injectable()
export class SemesterCourseService {
  constructor(
    @InjectRepository(SemesterCourse)
    private readonly scRepository: SemesterCourseRepository,
  ) {}

  /**
   * 新增學期課程
   */
  async create(createSemesterCourseDto: CreateSemesterCourseDto) {
    try {
      console.log('create semester course params');
      console.log(createSemesterCourseDto);
      const semesterCourse = await this.scRepository.create(
        createSemesterCourseDto,
      );
      return await this.scRepository.save(semesterCourse);
    } catch (err) {
      console.log('fail to create semester course');
      return err;
    }
  }

  /**
   * 查詢所偶學期課程
   */
  async findAll(year: number, semester: number): Promise<SemesterCourse[]> {
    try {
      console.log('find semester course params');
      console.log({ year, semester });
      const semesterCourse = await this.scRepository.find({ year, semester });
      return semesterCourse;
    } catch (err) {
      console.log('fail to find semester course.');
    }
  }

  /**
   * 更新學期課程
   */
  async update(scID: string, updateSemesterCourseDto: UpdateSemesterCourseDto) {
    try {
      console.log(`update semester course params(id:${scID})`);
      console.log(updateSemesterCourseDto);
      return await this.scRepository.update(scID, updateSemesterCourseDto);
    } catch (err) {
      console.log('fail to update semester course.');
      return err;
    }
  }

  /**
   * 刪除一個學期課程
   */
  async delete(scID: string) {
    try {
      console.log(`delete semester course params (id:${scID})`);
      return await this.scRepository.delete(scID);
    } catch (err) {
      console.log('fail to delete semester course.');
      return err;
    }
  }
}
