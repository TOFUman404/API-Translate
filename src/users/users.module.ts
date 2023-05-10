import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  imports: [],
  providers: [PrismaService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
