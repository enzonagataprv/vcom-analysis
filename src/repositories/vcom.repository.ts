import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class VcomReposistory {
  constructor(
    @InjectDataSource('vcom')
    private vcomDataSource: DataSource,
    @InjectDataSource('localhost')
    private localhost: DataSource,
  ) {}

  public maxRowsPerPage = 200000;

  async insertDevedores() {
    console.log('Inserindo Devedores');
    const createTableLocalHost = `CREATE TABLE IF NOT EXISTS VCOM_V_DEVEDORES(
      COD_DEV	    int not null,
      NOME_DEV	  varchar not null,
      COD_PES	    int not null,
      CPFCGC_PES  varchar not null,
      OBS_DEV	    text
    )`;
    await this.localhost.query(createTableLocalHost);
    const query = 'select * From V_DEVEDORES vd';
    const res = await this.vcomDataSource.query(query);
    for (const item of res) {
      await this.localhost.query(
        `insert into VCOM_V_DEVEDORES (COD_DEV, NOME_DEV, COD_PES, CPFCGC_PES, OBS_DEV) VALUES ($1,$2,$3,$4,$5)`,
        [
          item.COD_DEV,
          item.NOME_DEV,
          item.COD_PES,
          item.CPFCGC_PES,
          item.OBS_DEV,
        ],
      );
      console.log('Inserido');
    }
  }

  async insertTitulos() {
    console.log('Inserindo titulos');
    const createTableLocalHost = `
    CREATE TABLE IF NOT EXISTS VCOM_TITULOS(
      COD_CRED int,
      COD_DEV int,
      COD_TIT int,
      CONTRATO_TIT varchar,
      DT_CONTRATO_TIT date,
      QUITADO_TIT varchar,
      DEVOLVIDO_TIT varchar,
      DATA_UP date,
      DATA_CAD date,
      COD_IMP int,
      PRIMARY KEY (COD_TIT)
    ) 
    `;
    await this.localhost.query(createTableLocalHost);
    console.log('Verificando a quantidade de páginas');
    const queryCount = `SELECT COUNT(COD_TIT) as total FROM TITULOS`;
    const resQueryCount = await this.vcomDataSource.query(queryCount);
    const totalRows = resQueryCount[0].total;
    console.log(`Total de Registros ${totalRows}`);
    const pages = this.calcPages(totalRows);
    console.log(`Total de paginas ${pages}`);
    for (let page = 0; page <= pages; page++) {
      console.log(`Iniciando a página ${page}`);
      const query = `select COD_CRED,COD_DEV,COD_TIT,CONTRATO_TIT,DT_CONTRATO_TIT ,QUITADO_TIT,DEVOLVIDO_TIT,DATA_UP ,DATA_CAD ,COD_IMP from TITULOS t ORDER BY COD_TIT OFFSET ${
        this.maxRowsPerPage * page
      } ROWS FETCH NEXT ${this.maxRowsPerPage} ROWS ONLY;`;
      const res = await this.vcomDataSource.query(query);
      for (const item of res) {
        await this.localhost.query(
          `INSERT INTO vcom_titulos
        (cod_cred, cod_dev, cod_tit, contrato_tit, dt_contrato_tit, quitado_tit, devolvido_tit, data_up, data_cad, cod_imp)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
        `,
          [
            item.COD_CRED,
            item.COD_DEV,
            item.COD_TIT,
            item.CONTRATO_TIT,
            item.DT_CONTRATO_TIT,
            item.QUITADO_TIT,
            item.DEVOLVIDO_TIT,
            item.DATA_UP,
            item.DATA_CAD,
            item.COD_IMP,
          ],
        );
        console.log('Titulo inserido');
      }
    }
    console.log('Titulos Inseridos');
  }

  async insertParcelas() {
    console.log('Inserindo parcelas');
    const createTableLocalHost = `
    CREATE TABLE IF NOT EXISTS VCOM_PARCELAS(
      COD_PARC int, 
      COD_TIT int, 
      NUMERO_PARC int, 
      DEVOLVIDO_PARC varchar, 
      VR_PARC float,
      VCTO_PARC date, 
      COD_IMP int,
      PRIMARY KEY (COD_PARC)
    )
    `;
    await this.localhost.query(createTableLocalHost);
    console.log('Verificando a quantidade de páginas');
    const queryCount = `SELECT COUNT(COD_PARC) as total FROM PARCELAS`;
    const resQueryCount = await this.vcomDataSource.query(queryCount);
    const totalRows = resQueryCount[0].total;
    console.log(`Total de Registros ${totalRows}`);
    const pages = this.calcPages(totalRows);
    console.log(`Total de paginas ${pages}`);
    for (let page = 0; page <= pages; page++) {
      console.log(`Iniciando a página ${page}`);
      const query = `SELECT COD_PARC, COD_TIT, NUMERO_PARC, DEVOLVIDO_PARC, VR_PARC,VCTO_PARC, COD_IMP FROM parcelas ORDER BY COD_PARC OFFSET ${
        this.maxRowsPerPage * page
      } ROWS FETCH NEXT ${this.maxRowsPerPage} ROWS ONLY;`;

      const res = await this.vcomDataSource.query(query);
      for (const item of res) {
        await this.localhost.query(
          `INSERT INTO public.vcom_parcelas
        (cod_parc, cod_tit, numero_parc, devolvido_parc, vr_parc, vcto_parc, cod_imp)
        VALUES($1, $2, $3, $4, $5, $6, $7);
        `,
          [
            item.COD_PARC,
            item.COD_TIT,
            item.NUMERO_PARC,
            item.DEVOLVIDO_PARC,
            item.VR_PARC,
            item.VCTO_PARC,
            item.COD_IMP,
          ],
        );
        console.log('Inserido');
      }
      console.log(`Página ${page} inserida`);
    }
  }

  async insertBoletos() {
    console.log('Inserindo boletos');
    const createTableLocalHost = `
    CREATE TABLE IF NOT EXISTS VCOM_BOLETOS(
      Cod_BEm int, 
      Seq_Bol bigint, 
      Cod_Tit bigint,
      DataVencimento date, 
      ValorVencimento float,
      DataDocumento date,
      DATA_UP date,
      COD_IMP int,
      PRIMARY KEY (Cod_BEm)
    )
    `;
    await this.localhost.query(createTableLocalHost);
    console.log('Verificando a quantidade de páginas');
    const queryCount = `SELECT COUNT(Cod_BEm) as total FROM BOLETOS_EM`;
    const resQueryCount = await this.vcomDataSource.query(queryCount);
    const totalRows = resQueryCount[0].total;
    console.log(`Total de Registros ${totalRows}`);
    const pages = this.calcPages(totalRows);
    console.log(`Total de paginas ${pages}`);
    for (let page = 0; page <= pages; page++) {
      console.log(`Iniciando a página ${page}`);
      const query = `select Cod_BEm, Seq_Bol, Cod_Tit,DataVencimento, ValorVencimento,DataDocumento,DATA_UP,COD_IMP from BOLETOS_EM be ORDER BY Cod_BEm OFFSET ${
        this.maxRowsPerPage * page
      } ROWS FETCH NEXT ${this.maxRowsPerPage} ROWS ONLY;`;

      const res = await this.vcomDataSource.query(query);
      for (const item of res) {
        await this.localhost.query(
          `INSERT INTO public.vcom_boletos
          (cod_bem, seq_bol, cod_tit, datavencimento, valorvencimento, datadocumento, data_up, cod_imp)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8);
          ;
        `,
          [
            item.Cod_BEm,
            item.Seq_Bol,
            item.Cod_Tit,
            item.DataVencimento,
            item.ValorVencimento,
            item.DataDocumento,
            item.DATA_UP,
            item.COD_IMP,
          ],
        );
        console.log('Inserido');
      }
      console.log(`Página ${page} inserida`);
    }
  }

  async insertRecebimentoParcelas() {
    console.log('Inserindo recebimento de parcelas');
    const createTableLocalHost = `
    CREATE TABLE IF NOT EXISTS VCOM_RECEBIMENTOS_PARCELAS(
      COD_REC int, 
      COD_PARC int, 
      VR_PAGO float, 
      DATA_UP date,
      PRIMARY KEY (COD_REC)
    )
    `;
    await this.localhost.query(createTableLocalHost);
    console.log('Verificando a quantidade de páginas');
    const queryCount = `SELECT COUNT(COD_REC) as total FROM VCOM_RECEBIMENTOS_PARCELAS`;
    const resQueryCount = await this.vcomDataSource.query(queryCount);
    const totalRows = resQueryCount[0].total;
    console.log(`Total de Registros ${totalRows}`);
    const pages = this.calcPages(totalRows);
    console.log(`Total de paginas ${pages}`);
    for (let page = 0; page <= pages; page++) {
      console.log(`Iniciando a página ${page}`);
      const query = `select COD_REC, COD_PARC, VR_PAGO, DATA_UP from RECEBIMENTOS_PARCELAS rp ORDER BY COD_REC OFFSET ${
        this.maxRowsPerPage * page
      } ROWS FETCH NEXT ${this.maxRowsPerPage} ROWS ONLY;`;

      const res = await this.vcomDataSource.query(query);
      for (const item of res) {
        await this.localhost.query(
          `INSERT INTO vcom_recebimentos_parcelas
          (cod_rec, cod_parc, vr_pago, data_up)
          VALUES($1, $2, $3, $4);
        `,
          [item.COD_REC, item.COD_PARC, item.VR_PAGO, item.DATA_UP],
        );
        console.log('Inserido');
      }
      console.log(`Página ${page} inserida`);
    }
  }

  async insertRecebimentos() {
    console.log('Inserindo recebimentos');
    const createTableLocalHost = `
    CREATE TABLE IF NOT EXISTS VCOM_RECEBIMENTOS(
      COD_REC int,
      COD_TIT int, 
      VALOR_RECEBIDO_REC float,
      DT_PGTO_REC date, 
      DATA_CAD date, 
      DATA_UP date,
      DT_BAIXA_REC date,
      COD_BEM int,
      COD_IMP int, 
      PRIMARY KEY (COD_REC)
    )
    `;
    await this.localhost.query(createTableLocalHost);
    console.log('Verificando a quantidade de páginas');
    const queryCount = `SELECT COUNT(COD_REC) as total FROM RECEBIMENTOS`;
    const resQueryCount = await this.vcomDataSource.query(queryCount);
    const totalRows = resQueryCount[0].total;
    console.log(`Total de Registros ${totalRows}`);
    const pages = this.calcPages(totalRows);
    console.log(`Total de paginas ${pages}`);
    for (let page = 0; page <= pages; page++) {
      console.log(`Iniciando a página ${page}`);
      const query = `select COD_REC, COD_TIT, VALOR_RECEBIDO_REC,DT_PGTO_REC, DATA_CAD, DATA_UP,DT_BAIXA_REC, COD_BEM, COD_IMP from RECEBIMENTOS r order by COD_REC OFFSET ${
        this.maxRowsPerPage * page
      } ROWS FETCH NEXT ${this.maxRowsPerPage} ROWS ONLY;`;

      const res = await this.vcomDataSource.query(query);
      for (const item of res) {
        await this.localhost.query(
          `INSERT INTO vcom_recebimentos
          (cod_rec, cod_tit, valor_recebido_rec, dt_pgto_rec, data_cad, data_up, dt_baixa_rec, cod_bem, cod_imp)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);
        `,
          [
            item.COD_REC,
            item.COD_TIT,
            item.VALOR_RECEBIDO_REC,
            item.DT_PGTO_REC,
            item.DATA_CAD,
            item.DATA_UP,
            item.DT_BAIXA_REC,
            item.COD_BEM,
            item.COD_IMP,
          ],
        );
        console.log('Inserido');
      }
      console.log(`Página ${page} inserida`);
    }
  }

  calcPages(totalRows) {
    let pages;
    const totalPages = Math.round(totalRows / this.maxRowsPerPage);
    const rest = totalRows % this.maxRowsPerPage;
    if (rest > 0) {
      pages = totalPages + 1;
    } else {
      pages = totalPages;
    }
    return pages;
  }
}
