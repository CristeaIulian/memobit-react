import { isColorDark_ } from './color.utils';

describe('Color Utils', () => {
	test('isColorDark_ should return true for #435', () => {
		const isDark = isColorDark_('#435');

		expect(isDark).toBeTruthy();
	});

	test('isColorDark_ should return false for #faa', () => {
		const isDark = isColorDark_('#faa');

		expect(isDark).toBeFalsy();
	});

	test('isColorDark_ should return true for rgb(83, 17, 17)', () => {
		const isDark = isColorDark_('rgb(83, 17, 17)');

		expect(isDark).toBeTruthy();
	});

	test('isColorDark_ should return false for rgb(200, 200, 50)', () => {
		const isDark = isColorDark_('rgb(200, 200, 50)');

		expect(isDark).toBeFalsy();
	});
});
