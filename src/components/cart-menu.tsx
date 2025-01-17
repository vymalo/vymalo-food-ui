import { CartMenuDropdown } from '@components/cart-menu-dropdown';
import { ReactNode } from 'react';
import { useCartTotalItem } from '@modules/cart';

export interface CartMenuProps {
  link: ReactNode;
  bottom?: boolean;
}

export function CartMenu({ link, bottom }: CartMenuProps) {
  const total = useCartTotalItem();

  if (bottom) {
    return (
      <div tabIndex={100} role='button' className='indicator'>
        {total > 0 && (
          <span className='badge indicator-item badge-primary indicator-center'>
            {total}
          </span>
        )}
        {link}
      </div>
    );
  }

  return (
    <div className='dropdown dropdown-end dropdown-hover'>
      <div role='button' tabIndex={100} className='indicator'>
        {total > 0 && (
          <span className='badge indicator-item badge-primary indicator-bottom'>
            {total}
          </span>
        )}
        {link}
      </div>

      <div
        tabIndex={100}
        className='dropdown-content z-[1] w-96 rounded-xl border border-base-300 bg-base-200/50 p-2 text-base-content backdrop-blur-xl'>
        <CartMenuDropdown showShoppingBag />
      </div>
    </div>
  );
}
