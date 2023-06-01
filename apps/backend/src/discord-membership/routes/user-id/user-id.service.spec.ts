import { Test, TestingModule } from '@nestjs/testing';
import { UserIdService } from './user-id.service';

describe('UserIdService', () => {
  let service: UserIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserIdService],
    }).compile();

    service = module.get<UserIdService>(UserIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
