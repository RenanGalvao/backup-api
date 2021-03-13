import { 
  ExceptionFilter, 
  Catch, 
  ArgumentsHost, 
  HttpException,
  HttpStatus, 
  BadRequestException } from '@nestjs/common';
import { DumpValidation } from '../../backup/interface/dump-validation.interface';
import { ResponseMessage } from '../messages/response-message';
import { Request, Response } from 'express';
import { removeBadDump } from '../helpers'; 
import { DumpRequest } from '../../backup/interface/dump-request.interface';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request<{}, {}, DumpRequest>>();
    const status =
      exception instanceof Error
        ? HttpStatus.BAD_REQUEST
        : exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if(exception instanceof BadRequestException){
      const userFriendlyError = exception.getResponse() as DumpValidation;
      const responseMessage = new ResponseMessage({
        message: exception.message,
        data: userFriendlyError.message,
      });

      response
      .status(status) 
      .json({
        message: responseMessage.message,
        timestamp: responseMessage.timestamp,
        data: responseMessage.data,
      });
      return
    }
    else if(exception instanceof Error && exception.message.includes('denied')){
      removeBadDump(request.body.fileName ?? request.body.database);
    }

    const responseMessage = new ResponseMessage({
      message: exception.message,
      data: null,
    });

    response
    .status(status)
    .json({
      message: responseMessage.message,
      timestamp: responseMessage.timestamp,
      data: responseMessage.data,
    });
  }
}