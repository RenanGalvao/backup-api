interface Body {
  message?: string;
  status?: number;
  timestamp?: number;
  data?: any;
}

export class ResponseMessage {
  message: string
  status?: number
  timestamp: number;
  data: any

  constructor(body: Body) {
    this.message = body.message;
    this.status = body.status == undefined ? 200 : body.status;
    this.timestamp = Date.now();
    this.data = body.data ?? null;
    return this;
  }
}