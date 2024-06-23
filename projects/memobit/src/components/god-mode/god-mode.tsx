import { Icon, Tooltip } from '@shopify/polaris';
import { QuestionMarkMajor } from '@shopify/polaris-icons';
import React, { FC, memo, PropsWithChildren, ReactNode } from 'react';

import { useIsGodMode } from '@ua-src/contexts/shop-details/shop-details.selectors';
import { createBem } from '@ua-src/utils/bem';

import './god-mode.scss';

export interface GodModeProps extends PropsWithChildren<{}> {
	children: ReactNode;
	grow?: boolean;
}

const bem = createBem('GodMode');

export const GodMode: FC<GodModeProps> = memo(function GodModeComponent({ children, grow }: GodModeProps): JSX.Element {
	const isGodMode = useIsGodMode();

	return (
		<>
			{isGodMode && (
				<div className={bem({ modifiers: { Grow: grow ?? false } })}>
					<div className={bem('Notice')}>
						<Tooltip content="This is visible ONLY in GodMode" preferredPosition="above">
							<Icon source={QuestionMarkMajor} />
						</Tooltip>
					</div>
					{children}
				</div>
			)}
		</>
	);
});
