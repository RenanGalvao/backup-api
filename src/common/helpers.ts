import * as fs from 'fs';
import { Logger } from '@nestjs/common';
const logger = new Logger('Helpers');

export function fileNameTimestamp(database: string){
    return `${new Date().toLocaleString().replace(/[\/\s:]/g, '-')}-${database}.sql`;
}

export async function removeBadDump(database: string){
    const regex = new RegExp(`${database}.sql$`);
    const fileList = fs.readdirSync('./dump');
    
    for(const file of fileList){
        if(regex.test(file)){
            fs.unlinkSync(`./dump/${file}`);
            logger.log(`Removed bad dump: ${file}`);
        }
    }
}