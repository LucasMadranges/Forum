import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMessages() {
    return this.appService.getMessages();
  }

  @Post('/message')
  createMessage(@Body() body): Promise<{
    message: string;
    id: number;
    username: string;
  }> {
    return this.appService.createMessage(body);
  }
}
