import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDumpDto {
    
    @IsString()
    @IsNotEmpty()
    database: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    fileName: string;
}