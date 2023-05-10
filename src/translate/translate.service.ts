import { Injectable } from '@nestjs/common';
import { Translate } from '@google-cloud/translate/build/src/v2';
import axios from 'axios';
import {
  ITranslateLanguageTarget,
  ITranslateTextSearch,
} from './interface/translate.interface';

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
      text: response.translatedText,
      target: targetLanguage.target,
      current: response.detectedSourceLanguage,
      isPalindrome: await this.isPalindrome(response.translatedText),
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

  private async isPalindrome(str: string): Promise<boolean> {
    const lowerStr: string = str.toLowerCase();
    const cleanedStr: string = lowerStr.replace(/[^a-z0-9]/g, '');
    const reversedStr: string = cleanedStr.split('').reverse().join('');
    return cleanedStr === reversedStr;
  }
}
