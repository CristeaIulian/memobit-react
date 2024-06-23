import { createBem_ } from '@vitals/utils/bem';
import { memo } from 'react';

export const SpinnerStyleID_ = 'vtl-spinner';

export const spinnerBem_ = createBem_('Spinner');

interface SpinnerProps {
	size?: number;
}

/**
 * Warning: The spinner's style should be preloaded.
 * We want to make sure the spinner is visible even for fast loading scenarios so we need to preload the styles.
 * Make sure to preload the styles using the SpinnerStyleID_ or import the file altogether.
 * */
export const Spinner_ = memo(function Spinner({ size }: SpinnerProps) {
	const style = {
		fontSize: `${size}px`,
	};

	return <div className={spinnerBem_()} style={style} title="Loading..." />;
});
