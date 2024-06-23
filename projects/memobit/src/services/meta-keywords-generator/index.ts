import { stopWords } from './non-keywords';

export const getMetaKeywords = (title: string, description: string, wordsToIgnore: string[] = stopWords): string[] => {
	const wordsArr: string = `${title} ${description}`.replace(/[.,?!]/gi, '');

	const words: string[] = [...new Set(wordsArr.split(' '))];

	return words.filter((word: string): boolean => !wordsToIgnore.includes(word.toLowerCase()));
};
