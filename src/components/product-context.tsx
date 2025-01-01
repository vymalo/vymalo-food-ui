import { createContext, lazy, PropsWithChildren } from 'react';
import { useGetProductById } from '@store';
import { Loading } from 'react-daisyui';
import { HttpTypes } from '@medusajs/types';

const ProductNotFound = lazy(() => import('@components/product-not-found'));

export const ProductContext = createContext<HttpTypes.StoreProduct>(null as any);

interface ProductProviderProps {
	productId: string;
}

export function ProductProvider({ children, productId }: PropsWithChildren<ProductProviderProps>) {
	const [product = undefined, loading = false, error = undefined] = useGetProductById(productId);

	if (loading) {
		return <Loading />;
	}

	if (error || !product) {
		return <ProductNotFound error={error} />;
	}

	return (
		<ProductContext.Provider value={product}>
			{children}
		</ProductContext.Provider>
	);
}
