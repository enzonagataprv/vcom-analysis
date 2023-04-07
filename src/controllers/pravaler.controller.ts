import { Controller, Get } from '@nestjs/common';
import { PravalerService } from 'src/services/pravaler.service';

@Controller('pravaler')
export class PravalerController {
  constructor(private readonly pravalerService: PravalerService) {}
  @Get('date')
  getVcomDevedores() {
    return this.pravalerService.analisysByMonth();
  }
}
