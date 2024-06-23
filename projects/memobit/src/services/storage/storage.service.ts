import { CookieOptions } from './storage.types';
import { toString_ } from '../general';

export enum StorageType_ {
	LocalStorage_ = 'localStorage',
	SessionStorage_ = 'sessionStorage',
}

export class StorageService_ {
	public static readSessionKey_(key: string): string | undefined {
		if (!StorageService_.isStorageAccessible_(StorageType_.SessionStorage_)) {
			return undefined;
		}

		const sessionCookie = window.sessionStorage?.getItem(key);
		return sessionCookie === null || sessionCookie === undefined ? undefined : sessionCookie;
	}

	public static writeSessionKey_(key: string, value: unknown): undefined {
		if (!StorageService_.isStorageAccessible_(StorageType_.SessionStorage_)) {
			return;
		}

		window.sessionStorage.setItem(key, toString_(value));
	}

	public static deleteSessionKey_(key: string): undefined {
		if (!StorageService_.isStorageAccessible_(StorageType_.SessionStorage_)) {
			return;
		}

		window.sessionStorage.removeItem(key);
	}

	public static writeLocalKey_(key: string, value: unknown, expirationDays: number = 0): void {
		const stringifiedValue = toString_(value);

		if (StorageService_.isStorageAccessible_(StorageType_.LocalStorage_)) {
			window.localStorage.setItem(key, stringifiedValue);
		} else {
			StorageService_.writeCookie_({ name: key, value: stringifiedValue, days: expirationDays });
		}
	}

	/**
	 * Reads a key from either LS either cookie
	 * @param key
	 */
	public static readLocalKey_(key: string): string | undefined {
		if (StorageService_.isStorageAccessible_(StorageType_.LocalStorage_)) {
			return window.localStorage.getItem(key) || undefined;
		}

		return StorageService_.readCookie_(key);
	}

	public static deleteLocalKey_(key: string): void {
		if (StorageService_.isStorageAccessible_(StorageType_.LocalStorage_)) {
			window.localStorage.removeItem(key);
		} else {
			StorageService_.deleteCookie_(key);
		}
	}

	public static isStorageAccessible_(storageType: StorageType_): boolean {
		const testVar = '__storage-test__';
		const testValue = 'test';

		try {
			if (!window[storageType]) {
				return false;
			}

			window[storageType].setItem(testVar, testValue);
			const testValueSaved: string | null = window[storageType].getItem(testVar);
			window[storageType].removeItem(testVar);

			return testValue === testValueSaved;
		} catch (e) {
			return false;
		}
	}

	public static hasCookiesEnabled_(): boolean {
		return window.document.cookie.length > 0;
	}

	public static clearLocalStorage = () => {
		if (StorageService_.isStorageAccessible_(StorageType_.LocalStorage_)) {
			window.localStorage.clear();
		}
	};

	public static readCookie_(key: string): string | undefined {
		try {
			const nameEQ = `${key}=`;
			const ca = StorageService_.getDocumentCookie_().split(';');

			for (let i = 0, max = ca.length; i < max; i += 1) {
				let c = ca[i];

				while (c.charAt(0) === ' ') {
					c = c.substring(1, c.length);
				}

				if (c.indexOf(nameEQ) === 0) {
					return c.substring(nameEQ.length, c.length) || undefined;
				}
			}
		} catch (_) {}

		return undefined;
	}

	public static writeCookie_<T extends string>({ name, value, days, sameSite }: CookieOptions<T>): void {
		try {
			let expires = '';
			if (days) {
				const date = new Date();
				date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
				expires = `; expires=${date.toUTCString()}`;
			}
			if (sameSite) {
				expires += `; SameSite=${sameSite}`;
			}

			const cookie = `${name}=${value}${expires}; path=/`;
			StorageService_.setDocumentCookie_(cookie);
		} catch (_) {}
	}

	public static deleteCookie_(name: string): void {
		try {
			StorageService_.writeCookie_({ name, value: '' as string, days: -1 });
		} catch (_) {}
	}

	protected static setDocumentCookie_(cookie: string): void {
		window.document.cookie = cookie;
	}

	protected static getDocumentCookie_(): string {
		return window.document.cookie;
	}
}
