import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UsersModule } from '../users/users.module';
import { HistoryController } from './history.controller';

@Module({
  controllers: [HistoryController],
  providers: [PrismaService],
  imports: [UsersModule],
})
export class HistoryModule {}
