import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { BackupServiceV1 } from './backup.service';
import { Response } from 'express';
import { CreateDumpDto } from './dto/create-dump.dto';
import { DumpResponse } from './interface/dump-response.interface';
import { ValidationPipe } from '../validation.pipe';

@Controller('api/v1')
export class BackupControllerV1 {
  constructor(private readonly backupServiceV1: BackupServiceV1) {}

  @Post('backup')
  async create(@Body(ValidationPipe) body: CreateDumpDto, @Res() response: Response) {
    
    const res = await this.backupServiceV1.dump(body);
    
    if(!res){
      const dumpResponse: DumpResponse = {
        message: 'Database doesn\'t exists.',
        timestamp: Date.now(),
        data: null,
      };
      return response.status(HttpStatus.BAD_REQUEST).json(dumpResponse);
    }

    const dumpResponse: DumpResponse = {
      message: `Database ${ body.fileName ??  body.database} saved.`,
      timestamp: Date.now(),
      data: res,
    } 
    return response.json(dumpResponse);
  }
}