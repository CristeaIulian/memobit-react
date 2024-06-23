import React, { useEffect } from 'react';

export const useOutsideAlerter_ = (ref: React.RefObject<HTMLDivElement>, onOutsideClick: () => void) => {
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onOutsideClick();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onOutsideClick, ref]);
};
