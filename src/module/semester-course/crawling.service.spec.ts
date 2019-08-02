import { Test, TestingModule } from '@nestjs/testing';
import { CrawlingService } from './crawling.service';
import { Repository } from 'typeorm';
import { SemesterCourse } from '../../model/entity';
import fs = require('fs');

class MockTeacherRepository {
  find() {
    return [{ id: 'z1000022', name: '劉任修' }];
  }
}

export const CrawlingProviders = [
  CrawlingService,
  { provide: 'SemesterCourseRepository', useClass: Repository },
  { provide: 'TeacherRepository', useClass: MockTeacherRepository },
];

describe('CrawlingService', () => {
  let service: CrawlingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: CrawlingProviders,
    }).compile();

    service = module.get<CrawlingService>(CrawlingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('importSemesterCourses', () => {
    return service.importSemesterCourses();
  });

  /*
  test('analyzeWebPage', () => {
    (service as any).parseSemesterCourse(
      fs.readFileSync(
        'D:/HOME/Documents/practice/nestjs-project/Searching Result.html',
      ),
    );
    // expect(courses).toEqual([result]);
  });
   */
});
