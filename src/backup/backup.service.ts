import { Injectable, Logger } from '@nestjs/common';
import mysqldump from 'mysqldump';
import { DumpRequest } from './interface/dump-request.interface';
import { ResponseMessage } from '../response-message';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Connection } from 'typeorm';
import * as path from 'path';

@Injectable()
export class BackupServiceV1 {
  private readonly logger = new Logger(BackupServiceV1.name);
  constructor(private connection: Connection) {}

  async dump(body: DumpRequest) {
    const databaseWithTimestamp = `${new Date().toLocaleString().replace(/[\/\s:]/g, '-')}-${body.fileName ?? body.database}`;
    const res = await mysqldump({
      connection: {
          host: process.env.SQL_HOST || 'localhost',
          user: process.env.SQL_USER || 'root',
          password: process.env.SQL_PASS || '',
          database: body.database,
      },
      dumpToFile: path.join(path.resolve('dump'), `${databaseWithTimestamp}.sql`),
    });
    
    if(res){
      this.logger.log(`Database ${databaseWithTimestamp} saved in ./dump.`);
      return new ResponseMessage({
        message: `Database ${ body.fileName ??  body.database} saved.`,
        status: 201,
        data: res,
      });
    }else{
      this.logger.log('Database doesn\'t exists. Aborting...');
      return new ResponseMessage({
        message: 'Database doesn\'t exists.',
        status: 400,
        data: null,
      });
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_6PM)
  async handleCron(){
    try{
      // Retrieve all databases
      const databases = await this.connection.query('SELECT schema_name FROM information_schema.schemata');

      // databases[0] = information schema
      for(let i = 1; i < databases.length; i++){
        await this.dump({database: databases[i].schema_name});
      }
    }catch{
      // retries after 1 minute
      setTimeout(() => {
        this.handleCron();
      }, 60 * 1000);
    }
  }
}
