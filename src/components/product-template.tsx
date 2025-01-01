import { ArrowLeft } from 'react-feather';
import { ProductImages } from '@components/product-images';
import { ProductVariant } from '@components/product-variant';
import { ProductInfoTab } from '@components/product-info-tab';
import { useCurrentProduct } from '../modules/helper';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { clsx } from 'clsx';
import { Helmet } from "react-helmet";

export function ProductTemplate() {
	const product = useCurrentProduct();
	const { t: ta } = useTranslation('action');
	const goBackOrToHome = useCallback(() => {
		if (window.history.length > 1) {
			window.history.back();
		} else {
			window.location.href = '/';
		}
	}, []);
	const wideImages = (product.images ?? []).length >= 6;

	return (
		<>
			<Helmet title={product.title} />
			<div
				className={clsx('container px-0 sm:px-2 bg-base-100 flex flex-col md:gap-4 lg:gap-8 py-1', {
					'lg:flex-row': !wideImages,
				})}
			>
				<div
					className={clsx('lg:hidden z-10 sticky top-0 md:top-16 bg-base-100', {
						'lg:order-2': wideImages,
					})}
				>
					<button className="btn btn-ghost" onClick={goBackOrToHome}>
						<ArrowLeft />
						{ta('go_back')}
					</button>
				</div>

				<div
					className={clsx('px-4 pb-4 md:px-0 md:pb-0 w-full', {
						'w-full': wideImages,
						'lg:order-2 basis-3/4': !wideImages,
						'lg:order-1': wideImages,
					})}
				>
					<ProductImages
						images={product.images ?? []}
					/>
				</div>

				<div className={clsx('px-4 md:px-0 flex gap-3 md:gap-y-6', {
					'md:order-1 flex-col md:flex-row lg:flex-col basis-1/4': !wideImages,
					'md:order-3 flex-col md:flex-row justify-between': wideImages,
				})}>
					<div className={clsx('md:order-1 md:basis-1/2', {
						'basis-1/2': wideImages,
					})}>
						<div className="hidden lg:block">
							<button className="btn btn-ghost btn-outline" onClick={goBackOrToHome}>
								<ArrowLeft />
								{ta('go_back')}
							</button>
						</div>

						<h2 className="text-3xl">
							{product.title}
						</h2>
						<h4 className="text-xl">
							{product.subtitle}
						</h4>

						{wideImages && (
							<div className="hidden md:block">
								<p className="mb-4">
									{product.description}
								</p>

								<ProductInfoTab />
							</div>
						)}
					</div>

					<div className="md:order-3 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
						<ProductVariant />
					</div>

					<div className={clsx('md:order-4 md:hidden', {
						'lg:block': !wideImages,
					})}>
						<p className="my-8">
							{product.description}
						</p>

						<ProductInfoTab />
					</div>

				</div>

			</div>
		</>
	);
}