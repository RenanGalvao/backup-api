import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

interface Body {
  message?: string;
  status?: number;
  timestamp?: number;
  data?: any;
}

export class ResponseMessage {
  @ApiProperty()
  message: string

  @ApiHideProperty()
  status?: number

  @ApiProperty()
  timestamp: number;

  @ApiProperty()
  data: any

  constructor(body: Body) {
    this.message = body.message;
    this.status = body.status == undefined ? 200 : body.status;
    this.timestamp = Date.now();
    this.data = body.data ?? null;
    return this;
  }
}