import type { Relation } from 'typeorm';
import { clsx } from 'clsx';
import { useMemo } from 'react';
import { Button } from 'react-daisyui';
import { Eye } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { toSharpUrl } from '@shared/images';
import { HttpTypes } from '@medusajs/types';

export interface ProductImagesProps {
	images: Relation<HttpTypes.StoreProductImage>[];
}

const smallClass = ({ idx, maxItems }: Record<string, number>) => [
	idx === 0 && maxItems === 1 && 'md:row-span-4 md:col-span-4',
	idx === 0 && maxItems > 1 && 'md:row-span-4 md:col-span-2',

	idx === 1 && maxItems === 2 && 'md:row-span-4 md:col-span-2',
	idx === 1 && maxItems > 2 && 'md:col-span-2 md:row-span-3',

	idx === 2 && maxItems === 3 && 'md:col-span-2 md:row-span-1',
	idx === 2 && maxItems > 3 && 'md:col-span-1 md:row-span-1',

	idx === 3 && 'md:col-span-1 md:row-span-1',
];

const largeClass = ({ idx }: Record<string, number>) => [
	idx === 0 && 'md:row-span-4 md:col-span-2',
	idx === 1 && 'md:row-span-2 md:col-span-2',
	idx === 2 && 'md:row-span-2 md:col-span-2',
	idx === 3 && 'hidden lg:block md:row-span-4 md:col-span-2',
	idx === 4 && 'hidden lg:block md:row-span-2 md:col-span-2',
	idx === 5 && 'hidden lg:block md:row-span-2 md:col-span-2',
];

// TODO Add modal view for images
export function ProductImages({ images }: ProductImagesProps) {
	const max = images.length >= 6 ? 6 : 4;
	const { t } = useTranslation('action');
	const maxItems = useMemo(() => images.length, [images]);
	const isMoreThanFour = useMemo(() => maxItems > max, [maxItems]);
	const subImages = useMemo(
		() => (isMoreThanFour ? images.slice(0, max) : images),
		[isMoreThanFour, images],
	);
	return (
		<div
			className={clsx(
				'h-[60vh] transition ease-in-out max-md:stack max-md:mb-4 max-md:w-full md:grid md:grid-row-4 md:gap-4',
				{
					'md:grid-cols-4': max === 4,
					'md:grid-cols-4 lg:grid-cols-8': max === 6,
					'md:h-[50vh] lg:h-[60vh] xl:h-[70vh]': max === 4,
					'md:h-[70vh]': max === 6,
				},
			)}
		>
			{subImages.map((image, idx) => (
				<div
					key={image.id}
					className={clsx(
						'relative h-full',
						max === 4
							? smallClass({ idx, maxItems })
							: largeClass({ idx, maxItems }),
					)}
				>
					{maxItems > max && idx === max - 1 && (
						<div className='hidden md:flex rounded md:rounded-l absolute top-0 left-0 bottom-0 right-0 z-10 bg-black/50 items-center justify-center backdrop-blur-sm'>
							<Button variant='outline' className='bg-base-100/20'>
								<Eye />
								<span>{t('seeMore')}</span>
							</Button>
						</div>
					)}
					<div
						className='object-cover w-full h-full cursor-pointer rounded md:rounded-l bg-center bg-no-repeat bg-cover'
						style={{ backgroundImage: `url(${toSharpUrl(image.url)})` }}
					/>
				</div>
			))}
		</div>
	);
}
