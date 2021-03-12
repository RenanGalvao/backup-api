import { Injectable, Logger } from '@nestjs/common';
import mysqldump from 'mysqldump';
import { DumpRequest } from './interface/dump-request.interface';
import { ResponseMessage } from '../common/messages/response-message';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Connection } from 'typeorm';
import { fileNameTimestamp } from '../common/helpers'; 

@Injectable()
export class BackupServiceV1 {
  private readonly logger = new Logger(BackupServiceV1.name);
  constructor(private connection: Connection) {}

  async dump(body: DumpRequest) {
    const fileName = fileNameTimestamp(body.fileName ?? body.database);
    const res = await mysqldump({
      connection: {
          host: process.env.SQL_HOST || 'localhost',
          user: process.env.SQL_USER || 'root',
          password: process.env.SQL_PASS || '',
          database: body.database,
      },
      dumpToFile: `./dump/${fileName}`,
    });
    
    if(res){
      this.logger.log(`Database ${fileName} saved in ./dump.`);
      return new ResponseMessage({
        message: `Database ${ body.fileName ?? body.database} saved.`,
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
      const databases = await this.connection.query(`
        SELECT schema_name 
        FROM information_schema.schemata  
        WHERE schema_name 
        NOT IN('information_schema', 'mysql', 'performance_schema')`);

      for(let i = 0; i < databases.length; i++){
        await this.dump({database: databases[i].schema_name});
      }
    }catch{
      setTimeout(() => {
        this.handleCron();
      }, 60 * 1000);
    }
  }
}
