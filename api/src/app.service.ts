import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/service/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createMessage(body) {
    console.log(body);

    return this.prisma.message.create({
      data: body,
    });
  }
}
