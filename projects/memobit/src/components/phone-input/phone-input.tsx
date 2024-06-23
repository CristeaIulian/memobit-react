import React, { FC, memo, useCallback, useRef, useState } from 'react';
import { FlagPlaceholder_ } from '@vitals/utils/constants/other-constants';
import { createBem_ } from '@vitals/utils/bem';
import { useOutsideAlerter_ } from './phone-input.hook';
import { CountryPhonePrefix_ } from './types';

const bem = createBem_('PhoneInput');

interface PhoneInputProps {
	countryCode?: string;
	countryPrefixes?: CountryPhonePrefix_[];
	wrapperClass?: string;
	onChange: (option: any) => void;
}
export const PhoneInput_: FC<PhoneInputProps> = memo(function PhoneInput({
	countryCode,
	countryPrefixes,
	wrapperClass,
	onChange,
}: PhoneInputProps) {
	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const [selectedPrefix, setSelectedPrefix] = useState<CountryPhonePrefix_ | undefined>(
		countryPrefixes?.find((prefix: CountryPhonePrefix_) => prefix.c_ === countryCode?.toLowerCase())
	);

	const [inputValue, setInputValue] = useState<string>('');

	const handleChange = useCallback(
		({ target }: { target: EventTarget | null }) => {
			const value = (target as HTMLInputElement)?.value;

			const numberInput = value.replace(/[()\s]+/g, '');
			const mask =
				countryPrefixes?.find((country: CountryPhonePrefix_) => country.c_ === selectedPrefix?.c_)?.m_ || '';

			let formattedPhoneNumber = '';
			let maskIndex = 0;

			for (let i = 0; i < numberInput.length; ) {
				if (maskIndex < mask.length) {
					if (mask[maskIndex] === 'X') {
						formattedPhoneNumber += numberInput[i];
						i += 1;
					} else {
						formattedPhoneNumber += mask[maskIndex];
					}
					maskIndex += 1;
				} else {
					formattedPhoneNumber += numberInput[i];
					i += 1;
				}
			}

			setInputValue(formattedPhoneNumber);
			onChange(`+${selectedPrefix?.p_}${numberInput}`);
		},
		[countryPrefixes, onChange, selectedPrefix?.c_, selectedPrefix?.p_]
	);

	const toggleDropdown = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen]);

	const handleOptionClick = useCallback((option: CountryPhonePrefix_) => {
		setSelectedPrefix(option);
		setIsOpen(false);
	}, []);

	useOutsideAlerter_(wrapperRef, () => {
		if (isOpen) {
			setIsOpen(false);
		}
	});

	const flagModifier = selectedPrefix?.c_ ? { [selectedPrefix?.c_]: true } : undefined;

	return (
		<div className={wrapperClass} ref={wrapperRef}>
			<div className={bem()}>
				<div className={bem('Dropdown')} onClick={toggleDropdown}>
					<img
						src={FlagPlaceholder_}
						className={bem('Flag', flagModifier)}
						style={{
							backgroundPosition: `-${selectedPrefix?.l_}px 0px`,
							height: `${selectedPrefix?.h_ ?? '14'}px`,
						}}
						width={20}
						height={14}
						alt="Country Flag"
					/>
					<div className={bem('Arrow', { Open: isOpen })}>&nbsp;</div>
				</div>
				<span className={bem('Prefix')}>+{selectedPrefix?.p_}</span>
				<input
					autoComplete="off"
					id="phone"
					type="tel"
					className={bem('Input')}
					value={inputValue}
					onChange={handleChange}
					required
					placeholder={selectedPrefix?.m_}
				/>
			</div>
			{isOpen && (
				<ul className={bem('Options')}>
					{countryPrefixes?.map((option: CountryPhonePrefix_) => {
						return (
							<li
								className={bem('Option', { Selected: option.c_ === selectedPrefix?.c_ })}
								key={option.c_}
								value={option.c_}
								onClick={() => handleOptionClick(option)}
							>
								<img
									src={FlagPlaceholder_}
									className={bem('Flag', { [option.c_]: true })}
									style={{
										backgroundPosition: `-${option.l_}px 0px`,
										height: `${option.h_ ?? '14'}px`,
									}}
									width={20}
									height={14}
									alt="Country Flag"
								/>
								<span>{option.n_}</span>
								<span className={bem('OptionPrefix')}>+{option.p_}</span>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
});
