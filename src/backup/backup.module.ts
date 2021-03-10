import { Module } from '@nestjs/common';
import { BackupControllerV1 } from './backup.controller';
import { BackupServiceV1 } from './backup.service';

@Module({
  controllers: [BackupControllerV1],
  providers: [BackupServiceV1],
})
export class BackupModule {}