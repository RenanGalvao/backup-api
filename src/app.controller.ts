import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({
  host: 'api.localhost',
  path: 'backup'
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':database')
  backup(@Param('database') database: string): string {
    return this.appService.backup(database);
  }
}
