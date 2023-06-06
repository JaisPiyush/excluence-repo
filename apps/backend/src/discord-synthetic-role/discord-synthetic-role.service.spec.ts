import { Test, TestingModule } from '@nestjs/testing';
import { DiscordSyntheticRoleService } from './discord-synthetic-role.service';

describe('DiscordSyntheticRoleService', () => {
  let service: DiscordSyntheticRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscordSyntheticRoleService],
    }).compile();

    service = module.get<DiscordSyntheticRoleService>(DiscordSyntheticRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
