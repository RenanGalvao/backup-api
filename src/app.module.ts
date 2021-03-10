import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BackupModule } from './backup/backup.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BackupModule,
  ],
})
export class AppModule {}