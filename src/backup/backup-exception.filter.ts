import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { DumpResponse } from './interface/dump-response.interface';
import { DumpValidation } from './interface/dump-validation.interface';

@Catch()
export class BackupExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    let resObj: DumpResponse;

    if(exception instanceof BadRequestException){
      const userFriendlyError = exception.getResponse() as DumpValidation;
      resObj = {
        message: exception.message,
        timestamp: Date.now(),
        data: userFriendlyError.message,
      };
    }
    else if(exception instanceof Error){
      resObj = {
        message: exception.message,
        timestamp: Date.now(),
        data: null,
      };
    }
    
    return response.status(HttpStatus.BAD_REQUEST).json(resObj); 
  }
}