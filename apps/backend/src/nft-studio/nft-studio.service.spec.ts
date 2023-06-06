import { Test, TestingModule } from '@nestjs/testing';
import { NftStudioService } from './nft-studio.service';

describe('NftStudioService', () => {
  let service: NftStudioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NftStudioService],
    }).compile();

    service = module.get<NftStudioService>(NftStudioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
