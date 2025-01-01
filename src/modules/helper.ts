import { useContext } from 'react';
import { ProductContext } from '@components/product-context';

export function useCurrentProduct() {
	return useContext(ProductContext)!;
}
