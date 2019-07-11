import { Test, TestingModule } from '@nestjs/testing';
import { InformService } from './inform.service';

describe('InformService', () => {
  let service: InformService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InformService],
    }).compile();

    service = module.get<InformService>(InformService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
