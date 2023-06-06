import { Test, TestingModule } from '@nestjs/testing';
import { NftStudioController } from './nft-studio.controller';

describe('NftStudioController', () => {
  let controller: NftStudioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NftStudioController],
    }).compile();

    controller = module.get<NftStudioController>(NftStudioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
