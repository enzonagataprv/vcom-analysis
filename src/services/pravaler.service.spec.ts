import { Test, TestingModule } from '@nestjs/testing';
import { PravalerService } from './pravaler.service';

describe('PravalerService', () => {
  let service: PravalerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PravalerService],
    }).compile();

    service = module.get<PravalerService>(PravalerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
