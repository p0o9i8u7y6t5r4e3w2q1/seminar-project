import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';

export const UserProviders = [
  UserService,
  {
    provide: 'UserRepository',
    useClass: Repository,
  },
  {
    provide: 'TARepository',
    useClass: Repository,
  },
];

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: UserProviders,
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
