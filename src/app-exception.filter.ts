import { 
  ExceptionFilter, 
  Catch, 
  ArgumentsHost, 
  HttpException,
  HttpStatus, 
  BadRequestException } from '@nestjs/common';
import { DumpValidation } from './backup/interface/dump-validation.interface';
import { ResponseMessage } from './response-message';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
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