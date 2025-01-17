import { ProductProvider } from '@modules/products/context.tsx';
import { ProductTemplate } from '@components/products/product-template.tsx';
import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';

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
