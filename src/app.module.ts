import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranslateController } from './translate/translate.controller';
import { TranslateService } from './translate/translate.service';
import { TranslateModule } from './translate/translate.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/strategy/local.strategy';
import { HistoryService } from './history/history.service';
import { HistoryController } from './history/history.controller';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [AuthModule, TranslateModule, UsersModule, HistoryModule],
  controllers: [AppController, TranslateController, HistoryController],
  providers: [
    AppService,
    AuthService,
    TranslateService,
    PrismaService,
    UsersService,
    LocalStrategy,
    HistoryService,
  ],
})
export class AppModule {}
