import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createMessage(body): string {
    console.log(body);

    return 'Hello World!';
  }
}
