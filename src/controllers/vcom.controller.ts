import { Controller, Get } from '@nestjs/common';
import { VcomService } from '../services/vcom.service';

@Controller('vcom')
export class VcomController {
  constructor(private readonly vcomService: VcomService) {}

  @Get('devedores')
  getVcomDevedores() {
    return this.vcomService.getVcomVDevedores();
  }

  @Get('titulos')
  getVcomTitulos() {
    return this.vcomService.getVcomTitulos();
  }

  @Get('parcelas')
  getVcomParcelas() {
    return this.vcomService.getVcomParcelas();
  }

  @Get('boletos')
  getVcomBoletos() {
    return this.vcomService.getVcomBoletos();
  }

  @Get('recebimento_parcelas')
  getVcomRecebimentoParcelas() {
    return this.vcomService.getVcomRecebimentoParcelas();
  }

  @Get('recebimentos')
  getVcomRecebimentos() {
    return this.vcomService.getVcomRecebimentos();
  }
}
