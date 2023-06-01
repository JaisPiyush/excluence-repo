import { Test, TestingModule } from '@nestjs/testing';
import { UserIdController } from './user-id.controller';

describe('UserIdController', () => {
  let controller: UserIdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserIdController],
    }).compile();

    controller = module.get<UserIdController>(UserIdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
