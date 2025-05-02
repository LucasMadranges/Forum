import { Controller, Get } from '@nestjs/common';
import { ThreadService } from './thread.service';

@Controller()
export class ThreadController {
    constructor(private readonly threadService: ThreadService) {}

    @Get()
    getHello(): string {
        return this.threadService.getHello();
    }
}
