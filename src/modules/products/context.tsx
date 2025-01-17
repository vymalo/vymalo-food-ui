import { HttpTypes } from '@medusajs/types';
import { createContext, lazy, PropsWithChildren } from 'react';
import { Loading } from 'react-daisyui';
import { useGetProductById } from './hook';

const ProductNotFound = lazy(() => import('@components/products/product-not-found.tsx'));

export const ProductContext = createContext<HttpTypes.StoreProduct | undefined>(
  undefined,
);

interface ProductProviderProps {
  productId: string;
}

export function ProductProvider({
  children,
  productId,
}: PropsWithChildren<ProductProviderProps>) {
  const [product = undefined, loading = false, error = undefined] =
    useGetProductById(productId);

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
