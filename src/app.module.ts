import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VcomReposistory } from './vcom.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'vcom',
      type: 'mssql',
      host: '10.60.0.8',
      port: 1433,
      username: 'pravaler_consulta',
      password: '65@4aLWtIjXn',
      database: 'pravaler_cobsystems',
      options: { encrypt: false },
      synchronize: true,
      // synchronize: false,
      // entities: ['project1/*.entity.ts'],
      // subscribers: ['project1/*.subscriber.ts'],
      // migrations: ['project1/migrations/*.ts']
    }),
    TypeOrmModule.forRoot({
      name: 'localhost',
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'admin',
      password: 'admin',
      database: 'postgres',
      synchronize: true,
      // synchronize: false,
      // entities: ['project2/*.entity.ts'],
      // subscribers: ['project2/*.subscriber.ts'],
      // migrations: ['project2/migrations/*.ts'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, VcomReposistory],
})
export class AppModule {}
