import { useCartTotalItem } from '@store';
import { CartMenuDropdown } from '@components/cart-menu-dropdown';

export interface CartMenuProps {
	link: JSX.Element;
	bottom?: boolean;
}

export function CartMenu({ link, bottom }: CartMenuProps) {
	const total = useCartTotalItem();

	if (bottom) {
		return (
			<div tabIndex={100} role="button" className="indicator">
				{total > 0 && (
					<span className="indicator-item indicator-center badge badge-primary">
						{total}
					</span>
				)}
				{link}
			</div>
		);
	}

	return (
		<div className="dropdown dropdown-hover dropdown-end">
			<div role="button" tabIndex={100} className="indicator">
				{total > 0 && (
					<span className="indicator-item indicator-bottom badge badge-primary">
						{total}
					</span>
				)}
				{link}
			</div>

			<div
				tabIndex={100}
				className="dropdown-content bg-base-200/50 rounded-xl text-base-content z-[1] w-96 p-2 backdrop-blur-xl border border-base-300">
				<CartMenuDropdown showShoppingBag />
			</div>
		</div>
	);
}