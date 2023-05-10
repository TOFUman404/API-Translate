import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UsersModule } from '../users/users.module';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
  imports: [UsersModule],
  controllers: [HistoryController],
  providers: [HistoryService, PrismaService],
  exports: [HistoryService],
})
export class HistoryModule {}
