import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response {
  message: string;
  timestamp: number;
  data: any;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response> {
    const http = context.switchToHttp();
    const res = http.getResponse();

    return next.handle().pipe(map(data => { 
      res.status(data.status); 
      return {
        message: data.message,
        timestamp: data.timestamp,
        data: data.data,
      };
    }));
  }
}