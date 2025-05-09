import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/service/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getHello() {
    return 'Hello World!';
  }

  async getMessages() {
    return this.prisma.message.findMany();
  }

  async createMessage(body) {
    return this.prisma.message.create({
      data: body,
    });
  }
}
