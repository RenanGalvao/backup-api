import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({
  host: `api.${process.env.HOST || 'localhost'}`,
  path: 'backup'
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':database')
  backup(@Param('database') database: string): Promise<string> {
    return this.appService.backup(database);
  }
}