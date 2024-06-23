import { StorageService_, StorageType_ } from './storage.service';

describe('StorageService_', () => {
	let windowSpy: jest.SpyInstance;
	beforeEach(() => {
		windowSpy = jest.spyOn(window, 'window', 'get');
	});

	afterEach(() => {
		windowSpy.mockRestore();
	});

	it('should compute the localstorage', () => {
		const hasLS = StorageService_.isStorageAccessible_(StorageType_.LocalStorage_);
		expect(hasLS).toEqual(true);
	});

	it('should compute the SessionStorage', () => {
		const hasSS = StorageService_.isStorageAccessible_(StorageType_.SessionStorage_);
		expect(hasSS).toEqual(true);
	});

	it(' should writeLocalKey_ should create localstorage key with exact value', () => {
		const localKey = '__vitals_test123__';
		const expectedValue = 'test123';

		StorageService_.writeLocalKey_(localKey, expectedValue);

		const value = localStorage.getItem(localKey);
		localStorage.removeItem(localKey);

		expect(value).toEqual(expectedValue);
	});

	it('readLocalKey_ should read localstorage key for exact value', () => {
		const localKey = '__vitals_test123__';
		const expectedValue = 'test123';

		localStorage.setItem(localKey, expectedValue);
		const value = StorageService_.readLocalKey_(localKey);
		localStorage.removeItem(localKey);

		expect(value).toEqual(expectedValue);
	});

	it('deleteLocalKey_ should remove localstorage key', () => {
		const localKey = '__vitals_test123__';

		localStorage.setItem(localKey, '1');
		StorageService_.deleteLocalKey_(localKey);
		const value = localStorage.getItem(localKey);
		localStorage.removeItem(localKey);

		expect(value).toEqual(null);
	});
});
