import { ToastMessage } from '@ua-src/contexts/toast-manager/toast-manager.messages';
import { appAlert } from '@ua-src/contexts/toast-manager/toast-manager.store';
import { sendError } from '@ua-src/utils/erorr-report';

export async function copyToClipboard(text: string): Promise<void> {
	try {
		await navigator.clipboard.writeText(text);
		appAlert(ToastMessage.TextCopied);
	} catch (err) {
		if (err instanceof Error || typeof err === 'string') {
			sendError(err);
		} else {
			sendError({ name: 'Error occurred on copy snippet', message: JSON.stringify(err) });
		}
	}
}
