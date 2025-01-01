import { useCartItems, useCartTotalPrice } from '@store';
import { Link } from 'react-router-dom';
import { CartMenuItem } from '@components/cart-menu-item';
import { ArrowRight } from 'react-feather';
import { Divider } from 'react-daisyui';

interface CartMenuDropdownProps {
	showShoppingBag?: boolean;
}

export function CartMenuDropdown({ showShoppingBag = false }: CartMenuDropdownProps) {
	const items = useCartItems();
	const totalPrice = useCartTotalPrice();

	return (
		<div className="px-2">
			<h3 className="text-base-content text-xl">Shopping bag</h3>

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

			<Link to="/checkout" className="btn btn-block btn-primary mt-6">
				<span>Checkout</span>
				<ArrowRight />
			</Link>

			{showShoppingBag && (
				<Link to="/bag" className="btn btn-block btn-ghost mt-2">
					View Shopping Bag
				</Link>
			)}
		</div>
	);
}