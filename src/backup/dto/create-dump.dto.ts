import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDumpDto {
  /**
  * Database name
  * @example 'mysql_database'
  */
  @IsString()
  @IsNotEmpty()
  database: string;

  /**
  * Optional file name for the dump file
  * @example 'dump_database'
  */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fileName?: string;
}