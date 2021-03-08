import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.SQL_HOST,
      port: parseInt(process.env.SQL_PORT) || 3306,
      username: process.env.SQL_USER || 'root',
      password: process.env.SQL_PASS || 'root',
      database: process.env.SQL_DB || 'test',
      entities: [join(__dirname, 'entity', '**', '*.entity{.ts,.js}')],
      migrations: [join(__dirname, 'migration', '**', '*{.ts,.js}')],
      cli: { migrationsDir: 'migration' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}