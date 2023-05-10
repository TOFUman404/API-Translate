import {
  Body,
  Controller,
  HttpCode,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TranslateService } from './translate.service';
import { TranslateTargetDto, TranslateTextSearchDto } from './translate.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@ApiTags('translate')
@Controller('translate')
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async translate(
    @Req() req,
    @Body() body: TranslateTextSearchDto,
    @Query() targetLanguage: TranslateTargetDto,
  ) {
    const translate = await this.translateService.translateText(
      body,
      targetLanguage,
    );

    if (translate) {
    }

    return translate;
  }
}
