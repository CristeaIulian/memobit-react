export const convertColor_ = <T extends string | undefined = string | undefined>(color: T): T => {
	if (!color?.trim()) {
		return color;
	}

	if (!color.includes('rgb') && !color.includes('#')) {
		return `#${color}` as T;
	}
	return color;
};

export const hexToRGB_ = (color: string, alpha?: number): string => {
	if (color.includes('rgb')) {
		return color;
	}

	let hex = color;
	if (hex.length < 5) {
		hex = hex.replace(/[^#]/g, '$&$&');
	}

	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);

	if (alpha) {
		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	}

	return `rgb(${r}, ${g}, ${b})`;
};

export const addOpacityToColor_ = <T extends string | undefined = string | undefined>(color: T, alpha: number): T => {
	if (!color || color.includes('rgba') || (color.includes('#') && color.length === 9)) {
		return color;
	}

	if (color.includes('rgb')) {
		const rgbValues = color.replace(/[^\d,]/g, '').split(',');
		const r = rgbValues[0];
		const g = rgbValues[1];
		const b = rgbValues[2];

		return `rgba(${r}, ${g}, ${b}, ${alpha})` as T;
	}

	if (color.includes('#') && color.length === 7) {
		const alphaHex = Math.round(alpha * 255)
			.toString(16)
			.padStart(2, '0');
		return `${color}${alphaHex}` as T;
	}

	return color;
};
