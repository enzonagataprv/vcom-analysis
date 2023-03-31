import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VcomService } from './services/vcom.service';
import { VcomReposistory } from './repositories/vcom.repository';
import { ConfigModule } from '@nestjs/config';
import { VcomController } from './controllers/vcom.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      name: 'pravaler',
      type: 'postgres',
      host: process.env.PRV_DATABASE_HOST,
      port: +process.env.PRV_DATABASE_PORT,
      username: process.env.PRV_DATABASE_USER,
      password: process.env.PRV_DATABASE_PASSWORD,
      database: process.env.PRV_DATABASE_DATABASE_NAME,
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      name: 'vcom',
      type: 'mssql',
      host: process.env.VCOM_DATABASE_HOST,
      port: +process.env.VCOM_DATABASE_PORT,
      username: process.env.VCOM_DATABASE_USER,
      password: process.env.VCOM_DATABASE_PASSWORD,
      database: process.env.VCOM_DATABASE_DATABASE_NAME,
      options: { encrypt: false },
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      name: 'localhost',
      type: 'postgres',
      host: process.env.LOCAL_DATABASE_HOST,
      port: +process.env.LOCAL_DATABASE_PORT,
      username: process.env.LOCAL_DATABASE_USER,
      password: process.env.LOCAL_DATABASE_PASSWORD,
      database: process.env.LOCAL_DATABASE_DATABASE_NAME,
      synchronize: true,
    }),
  ],
  controllers: [VcomController],
  providers: [VcomService, VcomReposistory],
})
export class AppModule {}
