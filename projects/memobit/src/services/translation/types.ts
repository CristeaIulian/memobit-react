export enum LanguageCode {
	En = 'en',
	Ro = 'ro',
}

export enum TranslationMode {
	RequestedLanguage = 'requested-language',
	DefaultLanguage = 'default-language',
	Missing = 'missing',
}

export interface TranslationDetails {
	translation: string;
	mode: TranslationMode;
}
