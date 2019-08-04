import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import * as cheerio from 'cheerio';
import fs = require('fs');
import { SemesterCourseRepository } from '../../model/repository';
import { SemesterCourse, Teacher, Course } from '../../model/entity';

@Injectable()
export class CrawlingService {
  constructor(
    @InjectRepository(SemesterCourseRepository)
    private readonly scRepository: SemesterCourseRepository,
    @InjectRepository(Teacher)
    private readonly tchRepository: Repository<Teacher>,
  ) {}

  private readonly depts: string[] = ['H3', 'R3']; // ['H3', 'R3', 'R7'];
  private teachers: Teacher[];

  async importSemesterCourses(): Promise<any> {
    this.teachers = await this.tchRepository.find();
    const { year, semester } = await this.findYearAndSemester();
    let semesterCourses: SemesterCourse[] = [];

    for (const dept of this.depts) {
      const response = await this.fetchSemesterCoursesPage(
        year,
        semester,
        dept,
      );
      const tmp = this.parseSemesterCourses(year, semester, response.data);
      semesterCourses = semesterCourses.concat(tmp);
    }
    return await this.scRepository.save(semesterCourses);
  }

  private fetchSemesterCoursesPage(
    year: number,
    semester: number,
    dept: string,
  ) {
    return axios.get(
      // `http://course-query.acad.ncku.edu.tw/qry/qry001.php?dept_no=${dept}`,
      `http://course-query.acad.ncku.edu.tw/qry/qry002.php?syear=0${year}&sem=${semester}&dept_no=${dept}`,
    );
    /*
    return {
      data: fs.readFileSync(
        'D:/HOME/Documents/practice/nestjs-project/Searching Result.html',
      ),
    };
    */
  }

  private parseSemesterCourses(
    year: number,
    semester: number,
    data: any,
  ): SemesterCourse[] {
    const semesterCourses: SemesterCourse[] = [];
    const $ = cheerio.load(data);
    $('tr').each((trIndex: number, tr: any) => {
      if ($(tr).attr('class') === 'tr_header') {
        return;
      }

      let hasNull: boolean = false;
      const semCourse = new SemesterCourse({ year, semester });
      $(tr)
        .find('td')
        .each((tdIndex: number, td: any) => {
          const text = $(td)
            .text()
            .trim();
          switch (tdIndex) {
            case 3: // courseID -- require
              if (text === '') hasNull = true;
              else semCourse.courseID = text;
              break;
            case 4: // courseNo
              semCourse.courseNo = text;
              break;
            case 10: // course name -- require
              const courseName = $(td)
                .find('a')
                .text()
                .trim();
              if (courseName === '') hasNull = true;
              else {
                semCourse.course = new Course({
                  id: semCourse.courseID,
                  name: courseName,
                });
              }
              break;
            case 13: // teacher name -- require
              if (text !== '') {
                const teacher = this.teachers.find(e => e.name === text);
                if (teacher != null) semCourse.teacherID = teacher.id;
                else hasNull = true;
              }
              break;
            case 16: // time -- require
              if (text !== '') {
                semCourse.time = text.replace(/\[/g, ',[').replace(/^,/, '');
              } else hasNull = true;
              break;
            case 17: // classroomID -- require
              const roomID: string = $(td)
                .find('a')
                .attr('name');
              if (roomID != null && roomID.startsWith('61')) {
                semCourse.classroomID = roomID.trim();
              } else hasNull = true;
              break;
          }
        });
      if (!hasNull) {
        console.log(semCourse);
        semesterCourses.push(semCourse);
      }
    });

    return semesterCourses;
  }

  private async findYearAndSemester() {
    const response = await axios.get(
      'http://course-query.acad.ncku.edu.tw/qry/',
    );
    const $ = cheerio.load(response.data);
    const year: number = Number($('#syear').text());
    const semester: number = Number($('#sem').text());

    return { year, semester };
  }
}
