export const compactCurrencyFormatter: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
	notation: 'compact',
	currency: 'USD',
	style: 'currency',
});

export const usdCurrencyFormatter: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
	currency: 'USD',
	style: 'currency',
});
