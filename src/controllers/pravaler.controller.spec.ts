import { Test, TestingModule } from '@nestjs/testing';
import { PravalerController } from './pravaler.controller';

describe('PravalerController', () => {
  let controller: PravalerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PravalerController],
    }).compile();

    controller = module.get<PravalerController>(PravalerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
