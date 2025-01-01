import React from 'react';
import { CartMenuDropdown } from '@components/cart-menu-dropdown';

/**
 * Scan screen
 * @constructor React.FC
 */
export const Component: React.FC = () => {
	return (
		<div className="bg-base-100">
			<div className="container">
				<CartMenuDropdown />
			</div>
		</div>
	);
};
