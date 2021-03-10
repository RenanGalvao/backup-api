import { Injectable, Logger } from '@nestjs/common';
import mysqldump from 'mysqldump';
import { DumpRequest } from './interface/dump-request.interface';

@Injectable()
export class BackupServiceV1 {
  private readonly logger = new Logger(BackupServiceV1.name);

  async dump(body: DumpRequest) {
    const databaseWithTimestamp = `${new Date().toLocaleString().replace(/[\/\s]/g, '-')}-${body.fileName ?? body.database}`;
    const res = await mysqldump({
      connection: {
          host: process.env.SQL_HOST || 'localhost',
          user: process.env.SQL_USER || 'root',
          password: process.env.SQL_PASS || '',
          database: body.database,
      },
      dumpToFile: `./dump/${databaseWithTimestamp}.sql`,   
    });
    
    if(res){
      this.logger.log(`Database ${databaseWithTimestamp} saved in ./dump.`);
    }else{
      this.logger.log('Database doesn\'t exists. Aborting...');
    }
    return res;
  }
}
