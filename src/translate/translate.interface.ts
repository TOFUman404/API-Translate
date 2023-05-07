export interface ITranslateTextSearch {
  text: string;
}

export enum TranslateLanguage {
  ENGLISH = 'en',
  SPANISH = 'es',
  THAI = 'th',
}

export interface ITranslateLanguageTarget {
  target: TranslateLanguage;
}
