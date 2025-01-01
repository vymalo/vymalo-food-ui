import { clsx } from 'clsx';
import { useProductPrice } from '@store';
import { HttpTypes } from '@medusajs/types';

export interface ProductPriceProps {
	variant?: HttpTypes.StoreProductVariant;
}

export function ProductPrice({ variant }: ProductPriceProps) {
	const { cheapestPrice, variantPrice } = useProductPrice(variant?.id);

	const selectedPrice = variant ? variantPrice : cheapestPrice;

	if (!selectedPrice) {
		return (
			<div className='block w-32 h-9 bg-gray-100 animate-pulse rounded-full' />
		);
	}

	return (
		<div className='flex flex-col font-light text-error'>
			<span
				className={clsx('text-2xl', {
					'text-primary': selectedPrice.price_type === 'sale',
				})}
			>
				{!variant && 'From '}
				{selectedPrice.calculated_price}
			</span>

			{selectedPrice.price_type === 'sale' && (
				<>
					<p>
						<span className='text-red'>Original: </span>
						<span className='line-through'>{selectedPrice.original_price}</span>
					</p>
					<span className='text-red'>-{selectedPrice.percentage_diff}%</span>
				</>
			)}
		</div>
	);
}
