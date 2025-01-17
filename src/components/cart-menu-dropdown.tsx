import { CartMenuItem } from '@components/cart-menu-item';
import { Divider } from 'react-daisyui';
import { ArrowRight } from 'react-feather';
import { Link } from 'react-router-dom';
import { useCartItems, useCartTotalPrice } from '@modules/cart';

interface CartMenuDropdownProps {
  showShoppingBag?: boolean;
}

export function CartMenuDropdown({
                                   showShoppingBag = false,
                                 }: Readonly<CartMenuDropdownProps>) {
  const items = useCartItems();
  const totalPrice = useCartTotalPrice();

  return (
    <div className="px-2">
      <h3 className="text-xl text-base-content">Shopping bag</h3>

      <ul role="list">
        {items.map((product) => (
          <CartMenuItem key={product.id} lineItem={product} />
        ))}
      </ul>

      <Divider />
      <div className="flex justify-between text-base font-medium text-red-600">
        <p>Subtotal</p>
        <p>{totalPrice}</p>
      </div>

      <Link to="/checkout" className="btn btn-primary btn-block mt-6">
        <span>Checkout</span>
        <ArrowRight />
      </Link>

      {showShoppingBag && (
        <Link to="/bag" className="btn btn-ghost btn-block mt-2">
          View Shopping Bag
        </Link>
      )}
    </div>
  );
}
