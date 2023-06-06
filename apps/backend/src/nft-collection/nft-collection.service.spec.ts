import { Test, TestingModule } from '@nestjs/testing';
import { NftCollectionService } from './nft-collection.service';

describe('NftCollectionService', () => {
  let service: NftCollectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NftCollectionService],
    }).compile();

    service = module.get<NftCollectionService>(NftCollectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
