import { Test, TestingModule } from '@nestjs/testing';
import { SyntheticRoleController } from './synthetic-role.controller';

describe('SyntheticRoleController', () => {
  let controller: SyntheticRoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SyntheticRoleController],
    }).compile();

    controller = module.get<SyntheticRoleController>(SyntheticRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
