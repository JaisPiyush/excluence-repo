import { Test, TestingModule } from '@nestjs/testing';
import { DiscordSyntheticRoleController } from './discord-synthetic-role.controller';

describe('DiscordSyntheticRoleController', () => {
  let controller: DiscordSyntheticRoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscordSyntheticRoleController],
    }).compile();

    controller = module.get<DiscordSyntheticRoleController>(DiscordSyntheticRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
