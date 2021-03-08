import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  backup(database: string): string {
    return 'Hello World!';
  }
}
