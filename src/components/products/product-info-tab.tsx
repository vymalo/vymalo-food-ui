import { useCurrentProduct } from '@modules/products';

export function ProductInfoTab() {
  const product = useCurrentProduct();
  return (
    <div>
      <div className='grid grid-cols-2 gap-x-2 lg:gap-x-8'>
        <div className='flex flex-col gap-y-4'>
          {product.material && (
            <div>
              <span className='font-semibold'>Material</span>
              <p>{product.material}</p>
            </div>
          )}

          {product.origin_country && (
            <div>
              <span className='font-semibold'>Country of origin</span>
              <p>{product.origin_country}</p>
            </div>
          )}

          {product.type && (
            <div>
              <span className='font-semibold'>Type</span>
              <p>{product.type.value}</p>
            </div>
          )}
        </div>

        <div className='flex flex-col gap-y-4'>
          {product.weight && (
            <div>
              <span className='font-semibold'>Type</span>
              <p>{product.weight} g</p>
            </div>
          )}

          {product.length && product.width && product.height && (
            <div>
              <span className='font-semibold'>Dimensions</span>
              <p>
                {`${product.length}L x ${product.width}W x ${product.height}H`}
              </p>
            </div>
          )}
        </div>
      </div>

      {product.tags?.length ? (
        <div>
          <span className='font-semibold'>Tags</span>
        </div>
      ) : null}
    </div>
  );
}
