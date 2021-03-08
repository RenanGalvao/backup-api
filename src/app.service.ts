import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { dumpDatabase } from './lib/helpers';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private connection: Connection) {}

  async backup(database: string): Promise<string> {

    // Verify if database exists
    const db = await this.connection.query(`SELECT SCHEMA_NAME
      FROM INFORMATION_SCHEMA.SCHEMATA
      WHERE SCHEMA_NAME = '${database}'`) as  Array<any>;

    if(db.length > 0){
      this.logger.log(`Database ${database} exists. Creating...`);
      dumpDatabase(database);
      this.logger.log(`Database ${database} saved in ./dump.`);
    }else{
      this.logger.log('Database doesn\'t exists. Aborting...');
      throw new HttpException('Database doesn\'t exists.', HttpStatus.BAD_REQUEST);
    }

    return 'OK';
  }
}
