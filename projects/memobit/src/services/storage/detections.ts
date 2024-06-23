export function isStorageAccessible_(type: 'session' | 'local'): boolean {
	try {
		const testKey = '__v__';
		const storage = type === 'session' ? window.sessionStorage : window.localStorage;

		if (!storage) {
			return false;
		}

		storage.setItem(testKey, '0');
		storage.getItem(testKey);
		storage.removeItem(testKey);

		return true;
	} catch (_) {}

	return false;
}
