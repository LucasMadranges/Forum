import { Module } from '@nestjs/common';
import { ThreadController } from './thread.controller';
import { ThreadService } from './thread.service';

@Module({
  imports: [],
  controllers: [ThreadController],
  providers: [ThreadService],
})
export class ThreadModule {}
