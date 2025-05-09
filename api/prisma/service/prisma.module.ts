import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 🔥 On l'exporte pour l'utiliser dans d'autres services
})
export class PrismaModule {}
