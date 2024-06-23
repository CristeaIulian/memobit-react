export function kebabCase_(text: string): string {
	return text
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.replace(/[\s_]+/g, '-')
		.toLowerCase();
}

// Shopify tags are case-insensitive. There are other custom rules but there is no official documentation.
export function sanitizeTag_(tag: string): string {
	return tag.trim().toLowerCase();
}
