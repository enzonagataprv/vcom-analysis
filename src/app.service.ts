import { Injectable } from '@nestjs/common';
import { VcomReposistory } from './vcom.repository';

@Injectable()
export class AppService {
  constructor(private readonly vcomRepository: VcomReposistory) {}

  getVcomVDevedores() {
    this.vcomRepository.insertDevedores();
  }

  getVcomTitulos() {
    this.vcomRepository.insertTitulos();
  }

  getVcomParcelas() {
    this.vcomRepository.insertParcelas();
  }

  getVcomBoletos() {
    this.vcomRepository.insertBoletos();
  }
}
