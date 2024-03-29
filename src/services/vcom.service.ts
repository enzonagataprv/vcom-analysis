import { Injectable } from '@nestjs/common';
import { VcomReposistory } from '../repositories/vcom.repository';

@Injectable()
export class VcomService {
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

  getVcomRecebimentoParcelas() {
    this.vcomRepository.insertRecebimentoParcelas();
  }

  getVcomRecebimentos() {
    this.vcomRepository.insertRecebimentos();
  }
}
