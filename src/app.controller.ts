import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('vcom/devedores')
  getVcomDevedores() {
    return this.appService.getVcomVDevedores();
  }

  @Get('vcom/titulos')
  getVcomTitulos() {
    return this.appService.getVcomTitulos();
  }

  @Get('vcom/parcelas')
  getVcomParcelas() {
    return this.appService.getVcomParcelas();
  }
}
