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

  @Get('vcom/boletos')
  getVcomBoletos() {
    return this.appService.getVcomBoletos();
  }

  @Get('vcom/recebimento_parcelas')
  getVcomRecebimentoParcelas() {
    return this.appService.getVcomRecebimentoParcelas();
  }

  @Get('vcom/recebimentos')
  getVcomRecebimentos() {
    return this.appService.getVcomRecebimentos();
  }
}
