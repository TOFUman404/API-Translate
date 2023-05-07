import {
  Body,
  Controller,
  HttpCode,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TranslateService } from './translate.service';
import { TranslateTargetDto, TranslateTextSearchDto } from './translate.dto';

@ApiTags('translate')
@Controller('translate')
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async translate(
    @Body() body: TranslateTextSearchDto,
    @Query() targetLanguage: TranslateTargetDto,
  ) {
    return this.translateService.translateText(body, targetLanguage);
  }
}
