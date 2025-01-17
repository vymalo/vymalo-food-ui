import { ProductImages } from '@components/products/product-images.tsx';
import { ProductInfoTab } from '@components/products/product-info-tab.tsx';
import { ProductVariant } from '@components/products/product-variant.tsx';
import { clsx } from 'clsx';
import { useCallback } from 'react';
import { ArrowLeft } from 'react-feather';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useCurrentProduct } from '@modules/products';

export function ProductTemplate() {
  const product = useCurrentProduct();
  const { t: ta } = useTranslation('action');
  const goBackOrToHome = useCallback(() => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  }, []);
  const wideImages = (product.images ?? []).length >= 6;

  return (
    <>
      <Helmet title={product.title} />
      <div
        className={clsx(
          'container flex flex-col bg-base-100 px-0 py-1 sm:px-2 md:gap-4 lg:gap-8',
          {
            'lg:flex-row': !wideImages,
          },
        )}>
        <div
          className={clsx('sticky top-0 z-10 bg-base-100 md:top-16 lg:hidden', {
            'lg:order-2': wideImages,
          })}>
          <button className='btn btn-ghost' onClick={goBackOrToHome}>
            <ArrowLeft />
            {ta('go_back')}
          </button>
        </div>

        <div
          className={clsx('w-full px-4 pb-4 md:px-0 md:pb-0', {
            'w-full': wideImages,
            'basis-3/4 lg:order-2': !wideImages,
            'lg:order-1': wideImages,
          })}>
          <ProductImages images={product.images ?? []} />
        </div>

        <div
          className={clsx('flex gap-3 px-4 md:gap-y-6 md:px-0', {
            'basis-1/4 flex-col md:order-1 md:flex-row lg:flex-col':
              !wideImages,
            'flex-col justify-between md:order-3 md:flex-row': wideImages,
          })}>
          <div
            className={clsx('md:order-1 md:basis-1/2', {
              'basis-1/2': wideImages,
            })}>
            <div className='hidden lg:block'>
              <button
                className='btn btn-ghost btn-outline'
                onClick={goBackOrToHome}>
                <ArrowLeft />
                {ta('go_back')}
              </button>
            </div>

            <h2 className='text-3xl'>{product.title}</h2>
            <h4 className='text-xl'>{product.subtitle}</h4>

            {wideImages && (
              <div className='hidden md:block'>
                <p className='mb-4'>{product.description}</p>

                <ProductInfoTab />
              </div>
            )}
          </div>

          <div className='md:order-3 md:basis-1/2 lg:basis-1/3 xl:basis-1/4'>
            <ProductVariant />
          </div>

          <div
            className={clsx('md:order-4 md:hidden', {
              'lg:block': !wideImages,
            })}>
            <p className='my-8'>{product.description}</p>

            <ProductInfoTab />
          </div>
        </div>
      </div>
    </>
  );
}
