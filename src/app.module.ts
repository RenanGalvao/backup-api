import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackupModule } from './backup/backup.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BackupModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.SQL_HOST || 'localhost',
      port: Number(process.env.SQL_PORT) || 3306,
      username: process.env.SQL_USER || 'root',
      password: process.env.SQL_PASS || 'root',
      database: process.env.SQL_DB || 'test',
    }),
  ],
})
export class AppModule {}