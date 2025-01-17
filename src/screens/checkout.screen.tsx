import { CheckoutTemplate } from '@components/checkout-template';
import React, { Suspense } from 'react';

/**
 * Scan screen
 * @constructor React.FC
 */
export const Component: React.FC = () => {
  return (
    <div className='bg-base-100'>
      <Suspense>
        <CheckoutTemplate />
      </Suspense>
    </div>
  );
};
