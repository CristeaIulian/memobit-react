import { hexToRgb, HSBColor, rgbToHsb } from '@shopify/polaris';

export interface RgbValue {
	red: number;
	green: number;
	blue: number;
}

export function getHashedHex(value: string): string {
	return value.startsWith('#') ? value : `#${value}`;
}

export function hexToHsb(value: string): HSBColor {
	return rgbToHsb(hexToRgb(getHashedHex(value)));
}

export const colorRegexPattern = '^[A-Fa-f0-9]{6}$';
export const colorRegex: RegExp = new RegExp(colorRegexPattern);

export function isValidHexColor(color: string): boolean {
	return colorRegex.test(color);
}

export const stringToColour = (input: string): string => {
	let hash: number = 0;

	for (let i = 0; i < input.length; i++) {
		// eslint-disable-next-line no-bitwise
		hash = input.charCodeAt(i) + ((hash << 5) - hash);
	}
	let colour: string = '#';
	for (let i = 0; i < 3; i++) {
		// eslint-disable-next-line no-bitwise
		const value = (hash >> (i * 8)) & 0xff;
		colour += `00${value.toString(16)}`.substr(-2);
	}

	return colour;
};
