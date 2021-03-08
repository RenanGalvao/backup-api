import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.SQL_HOST || 'localhost',
      port: parseInt(process.env.SQL_PORT) || 3306,
      username: process.env.SQL_USER || 'root',
      password: process.env.SQL_PASS || '',
      database: process.env.SQL_DB || 'test',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}