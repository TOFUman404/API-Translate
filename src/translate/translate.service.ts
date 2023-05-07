import { Injectable } from '@nestjs/common';
import { Translate } from '@google-cloud/translate/build/src/v2';
import axios from 'axios';
import { ITranslateLanguageTarget, ITranslateTextSearch } from "./translate.interface";

@Injectable()
export class TranslateService {
  private readonly baseUrl =
    'https://translation.googleapis.com/language/translate/v2';

  async translateText(
    body: ITranslateTextSearch,
    targetLanguage: ITranslateLanguageTarget,
  ): Promise<string> {
    const apiKey = process.env.GOOGLE_API_KEY;
    const response = await axios.post(
      this.baseUrl,
      {},
      {
        params: {
          key: apiKey,
          q: body.text,
          target: targetLanguage.target,
        },
      },
    );
    return response.data.data.translations[0].translatedText;
  }
}
