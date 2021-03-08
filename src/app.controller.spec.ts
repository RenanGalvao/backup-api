import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('AppController', () => {
  let appController: AppController;
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
      imports:[
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.SQL_HOST || 'localhost',
          port: parseInt(process.env.SQL_PORT) || 3306,
          username: process.env.SQL_USER || 'root',
          password: process.env.SQL_PASS || '',
          database: process.env.SQL_DB || 'test',
        })]
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('root', () => {
    it('should return "OK"', done => {
      appController.backup('u976699516_treinamento').then(data => {
        expect(data).toBe('OK');
        done();
      })     
    });
  });
});
