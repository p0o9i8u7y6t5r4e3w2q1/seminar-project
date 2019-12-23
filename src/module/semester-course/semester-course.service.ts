import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSemesterCourseDto, UpdateSemesterCourseDto } from './dto';
import { SemesterCourse, User, Course } from '../../model/entity';
import { SemesterCourseRepository } from '../../model/repository';

// XXX 待測試
@Injectable()
export class SemesterCourseService {
  constructor(
    @InjectRepository(SemesterCourseRepository)
    private readonly scRepository: SemesterCourseRepository,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  /**
   * 新增學期課程
   */
  async create(dto: CreateSemesterCourseDto) {
    if (dto.courseName) {
      this.courseRepository.insert(
        new Course({ id: dto.courseID, name: dto.courseName }),
      );
    }
    const semesterCourse = this.scRepository.create(dto);
    return await this.scRepository.save(semesterCourse);
  }

  /**
   * 查詢特定學期課程
   */
  async findOne(scID: string, relations?: string[]) {
    return await this.scRepository.findOne(scID, { relations });
  }

  /**
   * 查詢所有學期課程
   */
  async findAll(year: number, semester: number): Promise<SemesterCourse[]> {
    const semesterCourse = await this.scRepository.find({
      where: { year, semester },
      relations: ['teacher', 'course'],
    });
    return semesterCourse;
  }

  /**
   * 針對user的角色類別，查詢所有當學期課程
   */
  async findByUser(user: Partial<User>, year: number, semester: number) {
    return await this.scRepository.findByUser(
      year,
      semester,
      user.id,
      user.roleID,
    );
  }

  /**
   * 更新學期課程
   */
  async update(scID: string, updateDto: UpdateSemesterCourseDto) {
    return await this.scRepository.update(scID, updateDto);
  }

  /**
   * 刪除一個學期課程
   */
  async delete(scID: string) {
    return await this.scRepository.delete(scID);
  }

  async findStudents(scID: string) {
    const sc = await this.scRepository.findOne(scID, {
      relations: ['students'],
    });
    return sc.students;
  }
}
