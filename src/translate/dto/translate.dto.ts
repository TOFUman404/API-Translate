import { ApiProperty } from '@nestjs/swagger';

import { IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import {
  ITranslateLanguageTarget,
  TranslateLanguage,
} from '../interface/translate.interface';

export class TranslateTextSearchDto {
  @ApiProperty({
    description: 'The text to translate',
  })
  @IsString()
  @Type(() => String)
  @MaxLength(1000)
  text: string;
}

export class TranslateTargetDto implements ITranslateLanguageTarget {
  @ApiProperty({
    description:
      'The target language to translate to (en = English, es = Spanish, th = Thai)',
    enum: TranslateLanguage,
    default: TranslateLanguage.ENGLISH,
  })
  target: TranslateLanguage;
}
