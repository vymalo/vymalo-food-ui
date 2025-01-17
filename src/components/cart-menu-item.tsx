import { AppImage } from '@components/image';
import { HttpTypes } from '@medusajs/types';
import { Minus, Plus } from 'react-feather';
import { Link } from 'react-router-dom';
import { useUpdateLineItem } from '@modules/cart';
import { useQuickPricesForVariant } from '@modules/products';

export interface CartMenuItemProps {
  lineItem: HttpTypes.StoreCartLineItem;
}

export function CartMenuItem({ lineItem }: Readonly<CartMenuItemProps>) {
  const updateLineItem = useUpdateLineItem();
  const pricesForVariant = useQuickPricesForVariant(lineItem.variant);
  const handleUpdate = async (quantity: number) => {
    await updateLineItem({ lineId: lineItem.id, quantity });
  };

  return (
    <li className='flex items-center gap-2 py-4'>
      <AppImage
        width={92}
        height={92}
        alt={lineItem.variant?.product?.title}
        src={lineItem.thumbnail ?? '/vymalo.svg'}
        className='h-16 w-16 flex-none rounded-md border border-neutral-content'
      />

      <div className='flex-auto'>
        <h3 className='font-medium text-base-content'>
          <Link to={`/p/${lineItem.variant?.product?.id}`}>
            {lineItem.title}
          </Link>
        </h3>
        <p className='text-base-content text-opacity-60'>
          {lineItem.variant?.title} x {lineItem.quantity}
        </p>
      </div>

      <div className='flex flex-col justify-center'>
        <h4 className='text-lg font-semibold text-red-600'>
          {pricesForVariant?.calculated_price}
        </h4>
      </div>

      <div className='flex flex-col gap-2'>
        <button
          onClick={() => handleUpdate(lineItem.quantity + 1)}
          className='btn btn-circle btn-ghost btn-outline btn-sm'>
          <Plus className='h-4 w-4' />
        </button>
        <button
          onClick={() => handleUpdate(lineItem.quantity - 1)}
          className='btn btn-circle btn-ghost btn-outline btn-sm'>
          <Minus className='h-4 w-4' />
        </button>
      </div>
    </li>
  );
}
