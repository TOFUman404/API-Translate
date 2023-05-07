import { Injectable } from '@nestjs/common';
import { Translate } from '@google-cloud/translate/build/src/v2';
import axios from 'axios';
import {
  ITranslateLanguageTarget,
  ITranslateTextSearch,
} from './translate.interface';

@Injectable()
export class TranslateService {
  private readonly baseUrl =
    'https://translation.googleapis.com/language/translate/v2';

  async translateText(
    body: ITranslateTextSearch,
    targetLanguage: ITranslateLanguageTarget,
  ) {
    const response = await this.googleTranslate(
      body.text,
      targetLanguage.target,
    );
    return {
      translatedText: response.translatedText,
      language: {
        target: targetLanguage.target,
        current: response.detectedSourceLanguage,
      },
    };
  }

  private async googleTranslate(text: string, targetLanguage: string) {
    const apiKey = process.env.GOOGLE_API_KEY;
    return await axios
      .post(
        this.baseUrl,
        {},
        {
          params: {
            key: apiKey,
            q: text,
            target: targetLanguage,
          },
        },
      )
      .then((response) => {
        return response.data.data.translations[0];
      });
  }
}
