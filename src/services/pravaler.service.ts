import { Injectable } from '@nestjs/common';
import { PravalerRepository } from 'src/repositories/pravaler.respository';

@Injectable()
export class PravalerService {
  constructor(private readonly pravalerRepository: PravalerRepository) {}

  async analisysByMonth() {
    const initialYear = 2022;
    const finalYear = 2023;
    const initialMonth = 0;
    const finalMonth = 11;

    for (let year = initialYear; year <= finalYear; year++) {
      for (let month = initialMonth; month <= finalMonth; month++) {
        const initialDate = new Date(year, month, 1, 0, 0, 0);
        const lastOfDayMonth = this.getLastDayOfMonth(
          initialDate.getFullYear(),
          initialDate.getMonth(),
        );
        const finalDate = new Date(
          year,
          initialDate.getMonth(),
          lastOfDayMonth,
          0,
          0,
          0,
        );
        console.log(`${initialDate} - ${finalDate}`);
        await this.pravalerRepository.getPaymentByDate(initialDate, finalDate);
      }
    }
  }

  //Pega o ultimo dia do mês
  getLastDayOfMonth(y, m) {
    return new Date(y, m + 1, 0).getDate();
  }
}
