export const extractChars = (text: string, numberOfInitials: number): string => {
	if (!text) {
		return '?';
	}

	if (numberOfInitials === 1 || !text.includes(' ')) {
		return text.charAt(0);
	}

	const words = text.split(' ');

	return `${words[0].charAt(0)}${words[1].charAt(0)}`;
};

export const getHexCodeByTextHash = (text: string, colorsNum: number): number => {
	if (text.length === 0) {
		return 0;
	}

	const charSum = text.split('').reduce((acc, char): number => {
		acc += char.charCodeAt(0);
		return acc;
	}, 0);

	return Math.abs(charSum) % colorsNum;
};
