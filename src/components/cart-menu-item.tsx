import { Link } from 'react-router-dom';
import { Minus, Plus } from 'react-feather';
import { useUpdateLineItem } from '@store';
import { useFormatAmount } from '../modules/price';
import { AppImage } from '@components/image';
import { HttpTypes } from '@medusajs/types';

export interface CartMenuItemProps {
	lineItem: HttpTypes.StoreCartLineItem
}

export function CartMenuItem({lineItem}: CartMenuItemProps) {
	const formatAmount = useFormatAmount();
	const updateLineItem = useUpdateLineItem();
	const handleUpdate = async (quantity: number) => {
		await updateLineItem({lineId: lineItem.id, quantity});
	}

	return (
		<li className="flex items-center py-4 gap-2">
			<AppImage
				width={92}
				height={92}
				alt={lineItem.variant?.product?.title}
				src={lineItem.thumbnail ?? '/vymalo.svg'}
				className="h-16 w-16 flex-none rounded-md border border-neutral-content"
			/>

			<div className="flex-auto">
				<h3 className="font-medium text-base-content">
					<Link to={`/p/${lineItem.variant?.product?.id}`}>{lineItem.title}</Link>
				</h3>
				<p className="text-base-content text-opacity-60">
					{lineItem.variant?.title} x {lineItem.quantity}
				</p>
			</div>

			<div className="flex flex-col justify-center">
				<h4 className="font-semibold text-lg text-red-600">
					{formatAmount({
						amount: lineItem.unit_price * lineItem.quantity,
						includeTaxes: false,
					})}
				</h4>
			</div>

			<div className='flex flex-col gap-2'>
				<button onClick={() => handleUpdate(lineItem.quantity + 1)} className='btn btn-circle btn-outline btn-sm btn-ghost'>
					<Plus className='w-4 h-4' />
				</button>
				<button onClick={() => handleUpdate(lineItem.quantity - 1)} className='btn btn-circle btn-outline btn-sm btn-ghost'>
					<Minus className='w-4 h-4' />
				</button>
			</div>
		</li>
	)
}