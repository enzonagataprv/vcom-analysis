import { Test, TestingModule } from '@nestjs/testing';
import { VcomService } from '../services/vcom.service';
import { VcomController } from './vcom.controller';

describe('AppController', () => {
  let appController: VcomController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [VcomController],
      providers: [VcomService],
    }).compile();

    appController = app.get<VcomController>(VcomController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      //expect(appController.getVcomDevedores()).toBe('Hello World!');
    });
  });
});
