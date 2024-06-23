export enum SameSiteCookieType_ {
	Strict = 'Strict',
	Lax = 'Lax',
	None = 'None',
}

export interface CookieOptions<T extends string> {
	name: string;
	value: T extends '' ? never : T;
	days?: number;
	sameSite?: SameSiteCookieType_;
}
