import mysqldump from 'mysqldump';
import { statSync } from 'fs';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export function dumpDatabase(database: string){
    const logger = new Logger(this.name);

    if(!database){
        logger.log('No database provided. Aborting...');
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    // Dump
    const databaseWithTimestamp = `${new Date().toLocaleDateString().replace(/\//g, '-')}-${database}`;
    mysqldump({
      connection: {
          host: process.env.SQL_HOST || 'localhost',
          user: process.env.SQL_USER || 'root',
          password: process.env.SQL_PASS || '',
          database: database,
      },
      dumpToFile: `./dump/${databaseWithTimestamp}.sql`,   
    });

    // Verify if file was created
    if(!statSync(`./dump/${databaseWithTimestamp}.sql`).isFile()){
        // If not, throws an error
        logger.log(`Dump file ${databaseWithTimestamp} wasn\'t created. Please try again.`);
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

export default {
    dumpDatabase,
}