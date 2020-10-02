export class ResponseWrapper<T> {
  status: Status;
  message: Message;
  data: T;
}

export class Status {
  code: string;
}

export class Message {
  short: string;
  detail: string;
}
