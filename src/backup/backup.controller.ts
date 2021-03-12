import { Controller, Post, Body } from '@nestjs/common';
import { BackupServiceV1 } from './backup.service';
import { CreateDumpDto } from './dto/create-dump.dto';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ApiTags, ApiOperation, } from '@nestjs/swagger';

@ApiTags('v1')
@Controller('api/v1')
export class BackupControllerV1 {
  constructor(private readonly backupServiceV1: BackupServiceV1) {}

  @Post('backup')
  @ApiOperation({ summary: 'Dumps a mysql database' })
  async create(@Body(ValidationPipe) body: CreateDumpDto) {
    return await this.backupServiceV1.dump(body);
  }
}