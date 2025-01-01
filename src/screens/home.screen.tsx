import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Scan screen
 * @constructor React.FC
 */
export const Component: React.FC = () => {
	const { t } = useTranslation('home');
	return (
		<div className="bg-base-100">
			{t('welcome')}
		</div>
	);
};
