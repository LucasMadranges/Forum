import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/service/prisma.module';
import { PrismaService } from '../prisma/service/prisma.service';

@Module({
  imports: [PrismaModule, PrismaService],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
