import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranslateController } from './translate/translate.controller';
import { TranslateService } from './translate/translate.service';
import { TranslateModule } from './translate/translate.module';

@Module({
  imports: [TranslateModule],
  controllers: [AppController, TranslateController],
  providers: [AppService, TranslateService],
})
export class AppModule {}
