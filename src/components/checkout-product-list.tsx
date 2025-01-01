import { useCart } from '@store';
import { AppImage } from '@components/image';
import { useFormatAmount } from '../modules/price';
import { useMemo } from 'react';

export function CheckoutProductList() {
	const formatAmount = useFormatAmount();
	const cart = useCart();
	const lineItems = useMemo(() => cart?.items ?? [], [cart?.items]);

	const tax = useMemo(() => formatAmount({
		amount: cart?.tax_total ?? 0,
		includeTaxes: false,
	}), [cart?.tax_total, formatAmount]);

	const shipping_total = useMemo(() => formatAmount({
		amount: cart?.shipping_total ?? 0,
		includeTaxes: false,
	}), [cart?.shipping_total, formatAmount]);

	const total = useMemo(() => formatAmount({
		amount: cart?.total ?? 0,
		includeTaxes: false,
	}), [cart?.total, formatAmount]);

	const subtotal = useMemo(() => formatAmount({
		amount: cart?.subtotal ?? 0,
		includeTaxes: false,
	}), [cart?.subtotal, formatAmount]);

	return (
		<>
			<div
				className="bg-primary text-primary-content min-h-full w-4/5 max-md:pt-16 py-8 px-4 lg:px-16 lg:z-[90] lg:!fixed lg:!top-0 lg:!bottom-0 lg:!right-0 lg:!w-[50vw]">
				<dl>
					<dt className="text-sm font-medium opacity-50">Amount due</dt>
					<dd className="mt-1 text-3xl font-bold tracking-tight">{total}</dd>
				</dl>

				<ul role="list" className="divide-y divide-white divide-opacity-10 text-sm font-medium">
					{lineItems.map((lineItem) => (
						<li key={lineItem.id} className="flex items-center space-x-4 py-6">
							<AppImage
								alt={lineItem.title}
								src={lineItem.thumbnail ?? '/vymalo.svg'}
								className="h-20 w-20 flex-none rounded-md object-cover object-center"
							/>
							<div className="flex-auto space-y-1">
								<h3 className="text-primary-content">
									{lineItem.variant?.product?.title}
								</h3>
								<p className="text-primary-content text-opacity-60">
									{lineItem.variant?.title} x {lineItem.quantity}
								</p>
							</div>
							<p className="flex-none text-base font-medium text-primary-content">
								{formatAmount({
									amount: lineItem.unit_price * lineItem.quantity,
									includeTaxes: false,
								})}
							</p>
						</li>
					))}
				</ul>

				<dl className="space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium">
					<div className="flex items-center justify-between">
						<dt>Subtotal</dt>
						<dd>{subtotal}</dd>
					</div>

					<div className="flex items-center justify-between">
						<dt>Shipping</dt>
						<dd>{shipping_total}</dd>
					</div>

					<div className="flex items-center justify-between">
						<dt>Taxes</dt>
						<dd>{tax}</dd>
					</div>

					<div
						className="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-primary-content">
						<dt className="text-2xl">Total</dt>
						<dd className="text-2xl">{total}</dd>
					</div>
				</dl>

			</div>
		</>
	);
}