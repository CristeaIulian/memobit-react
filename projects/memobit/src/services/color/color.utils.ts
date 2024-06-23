import { hexToRGB_ } from './color-conversion';

const computeHsp = (red: number, green: number, blue: number): number =>
	Math.sqrt(0.299 * (red * red) + 0.587 * (green * green) + 0.114 * (blue * blue));

export const isColorDark_ = (color: string): boolean => {
	const rgbaColor = hexToRGB_(color);

	const matchRgba: RegExpMatchArray | null = rgbaColor.match(
		/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
	);
	if (matchRgba) {
		const [, red, green, blue] = matchRgba;
		return computeHsp(Number(red), Number(green), Number(blue)) <= 127.5;
	}

	return false;
};
