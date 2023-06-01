import { Test, TestingModule } from '@nestjs/testing';
import { SyntheticRoleService } from './synthetic-role.service';

describe('SyntheticRoleService', () => {
  let service: SyntheticRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SyntheticRoleService],
    }).compile();

    service = module.get<SyntheticRoleService>(SyntheticRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
