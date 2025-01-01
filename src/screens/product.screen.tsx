import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { ProductProvider } from '@components/product-context';
import { ProductTemplate } from '@components/product-template';

/**
 * Scan screen
 * @constructor React.FC
 */
export const Component: React.FC = () => {
	const { id } = useParams();
	return (
		<Suspense>
			<ProductProvider productId={id!}>
				<ProductTemplate />
			</ProductProvider>
		</Suspense>
	);
};
