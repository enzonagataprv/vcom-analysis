import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export class PravalerRepository {
  constructor(
    @InjectDataSource('pravaler')
    private pravalerDataSource: DataSource,
    @InjectDataSource('vcom')
    private vcomDataSource: DataSource,
  ) {}

  async getPaymentByDate(initialDate, finalDate) {
    const iniDate = `${initialDate.getFullYear()}-${
      initialDate.getMonth() + 1
    }-${initialDate.getDate()}`;
    const finDate = `${finalDate.getFullYear()}-${
      finalDate.getMonth() + 1
    }-${finalDate.getDate()}`;
    const query = `with alunos_ipca(sinsc, alu_contrato) as (
        select distinct pt.sinsc,pt.alu_contrato from prv_titulo pt
        inner join prv_titulo_log_atualizacao ptla on ptla.id = pt.id 
        where pt.ativo = 9090 and ptla.created_at  
        between $2 and $3
    )
    select
    LPAD(pp.cpf::varchar, 11, '0') as cpf,
    CASE WHEN pac.st_contrato_unico=true AND pac.contrato_conjunto IS NOT NULL 
                THEN pac.contrato_conjunto
                ELSE pac.alu_contrato
                END
                as numero_contrato,
    pt.seunum
    from public.prv_titulo pt
    inner join public.prv_alu_contrato pac on (pt.alu_contrato = pac.alu_contrato)
                                          and (pac.release_contrato = (select max(release_contrato) 
                                                                         from prv_alu_contrato 
                                                                        where alu_contrato = pac.alu_contrato
                                                                          and ativo = $1
                                                                        group by alu_contrato)) 
    inner join public.prv_proposta pp on (pp.id = pac.alu_contrato)
    left join public.prv_titulo_log_atualizacao ptala on (ptala.id = pt.id)
    where pt.ativo = $1
    and pac.ativo = $1
    and (pt.sinsc,pt.alu_contrato) in (select sinsc, alu_contrato from alunos_ipca)
    order by pt.sinsc, numero_contrato desc, pt.vecto
    ;`;
    const res = await this.pravalerDataSource.query(query, [
      1,
      iniDate,
      finDate,
    ]);
    for (const item of res) {
      const queryVcom = `
      select Seq_Bol from BOLETOS_EM be where be.Seq_Bol = ${item.seunum};
        `;
      const vcom_res = await this.vcomDataSource.query(queryVcom);
      if (vcom_res.lenght == 0) {
        console.log(item.seunum);
      } else {
        console.log(`Ok: ${item.seunum}`);
      }
    }
  }
}
