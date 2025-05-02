import { NestFactory } from '@nestjs/core';
import { ThreadModule } from './thread.module';

async function bootstrap() {
  const app = await NestFactory.create(ThreadModule);
  await app.listen(process.env.port ?? 4001);
}
bootstrap();
