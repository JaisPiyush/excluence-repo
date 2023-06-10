import { Test, TestingModule } from '@nestjs/testing';
import { NftCollectionController } from './nft-collection.controller';

describe('NftCollectionController', () => {
  let controller: NftCollectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NftCollectionController],
    }).compile();

    controller = module.get<NftCollectionController>(NftCollectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
