import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './types';
import { addNotification, FetchState, setCurrentCountry } from '@store/slices';
import {
	addItemThunk,
	addShippingMethodThunk,
	createCartThunk,
	createPaymentSessionsThunk,
	getCustomerThunk,
	getProductThunk,
	listRegionThunk,
	listShippingMethodsThunk,
	updateCartThunk,
	UpdateCartThunkArgs,
	updateItemThunk,
} from '@store/thunks';
import { useFormatAmount } from '../modules/price';
import { useCurrentProduct } from '../modules/helper';
import {
	selectCartItems,
	selectCartTotalItems,
	selectCartTotalPrice,
} from '@store/selectors';
import { HttpTypes } from '@medusajs/types';

export function useAddErrorNotification() {
	const dispatch = useAppDispatch();
	return useCallback(
		(msg: string) => {
			dispatch(addNotification(msg));
		},
		[dispatch],
	);
}

export function useGetListRegionThunk() {
	const dispatch = useAppDispatch();
	return useCallback(() => {
		dispatch(listRegionThunk());
	}, [dispatch]);
}

export function useCountries() {
	const countryMap = useAppSelector((state) => state.region.countries);
	return Object.values(countryMap ?? {});
}

export function useCurrentCountry() {
	const countryMap = useAppSelector((state) => state.region.countries);
	const currentId = useAppSelector((state) => state.region.currentCountryId);
	if (!currentId) {
		return null;
	}

	return countryMap[currentId];
}

export function useSetCurrentCountryId() {
	const dispatch = useAppDispatch();
	return useCallback(
		(countryId: number) => {
			dispatch(setCurrentCountry(countryId));
		},
		[dispatch],
	);
}

export function useRegion() {
	const regions = useAppSelector((state) => state.region.regions);
	const countryRegions = useAppSelector((state) => state.region.countryRegions);
	const currentCountryId = useAppSelector(
		(state) => state.region.currentCountryId,
	);

	if (!currentCountryId) {
		return undefined;
	}

	const regionId = countryRegions[currentCountryId];
	if (!regionId) {
		return undefined;
	}

	return regions[regionId];
}

export function useProductPrice(variantId?: string) {
	const product = useCurrentProduct();
	const region = useRegion();
	const formatAmount = useFormatAmount();

	const getPercentageDiff = useCallback(
		(original: number = 0, calculated: number = 0) => {
			const diff = original - calculated;
			const decrease = (diff / original) * 100;

			return decrease.toFixed();
		},
		[],
	);

	const cheapestPrice = useCallback(() => {
		if (!product || !product.variants?.length || !region) {
			return null;
		}

		const variants = product.variants;

		const cheapestVariant = variants.reduce((prev, curr) => {
			return (prev.calculated_price ?? 0) < (curr.calculated_price ?? 0)
				? prev
				: curr;
		});

		return {
			calculated_price: formatAmount({
				amount: cheapestVariant.calculated_price ?? 0,
				includeTaxes: false,
			}),
			original_price: formatAmount({
				amount: cheapestVariant.original_price ?? 0,
				includeTaxes: false,
			}),
			price_type: cheapestVariant.calculated_price_type,
			percentage_diff: getPercentageDiff(
				cheapestVariant.original_price ?? 0,
				cheapestVariant.calculated_price ?? 0,
			),
		};
	}, [formatAmount, getPercentageDiff, product, region]);

	const variantPrice = useCallback(() => {
		if (!product || !variantId || !region) {
			return null;
		}

		const variant = product.variants.find(
			(v) => v.id === variantId || v.sku === variantId,
		);

		if (!variant) {
			return null;
		}

		return {
			calculated_price: formatAmount({
				amount: variant.calculated_price ?? 0,
				includeTaxes: false,
			}),
			original_price: formatAmount({
				amount: variant.original_price ?? 0,
				includeTaxes: false,
			}),
			price_type: variant.calculated_price_type,
			percentage_diff: getPercentageDiff(
				variant.original_price ?? 0,
				variant.calculated_price ?? 0,
			),
		};
	}, [product, variantId, region, formatAmount, getPercentageDiff]);

	return {
		product,
		cheapestPrice: cheapestPrice(),
		variantPrice: variantPrice(),
	};
}

export function useGetProductById(productId: string): FetchState {
	const product = useAppSelector((state) => state.product[productId]);
	const dispatch = useAppDispatch();
	const region = useRegion();

	useEffect(() => {
		dispatch(getProductThunk({ id: productId, regionId: region?.id }));
	}, [dispatch, productId, region?.id]);

	return product ?? [undefined, true, undefined];
}

export function useUpdateCart(): (
	data: UpdateCartThunkArgs,
) => Promise<HttpTypes.StoreCart> {
	const dispatch = useAppDispatch();
	return useCallback(
		async (data: UpdateCartThunkArgs) => {
			const res = await dispatch(updateCartThunk(data));
			return res.payload as HttpTypes.StoreCart;
		},
		[dispatch],
	);
}

export function useGetOrSetCart() {
	const dispatch = useAppDispatch();
	const region = useRegion();
	const currentCard = useAppSelector((state) => state.cart.current);
	const updateCart = useUpdateCart();

	return useCallback(async () => {
		if (!currentCard) {
			const res = await dispatch(
				createCartThunk({ data: { region_id: region?.id } }),
			);
			return res.payload as typeof currentCard;
		}

		if (currentCard && currentCard.region_id !== region?.id) {
			const res = await updateCart({
				cartId: currentCard.id,
				data: { region_id: region?.id },
			});
			return res as typeof currentCard;
		}

		return currentCard;
	}, [currentCard, dispatch, region?.id, updateCart]);
}

interface AddToCartProps {
	variantId: string;
	quantity: number;
}

export function useAddToCart() {
	const addItem = useAddItem();
	const getOrSetCart = useGetOrSetCart();

	return useCallback(
		async ({ variantId, quantity }: AddToCartProps) => {
			const cart = await getOrSetCart();

			if (!cart) {
				throw new Error('missing_cart_id');
			}

			if (!variantId) {
				throw new Error('missing_product_variant_id');
			}

			try {
				await addItem({ cartId: cart.id, variantId, quantity });
			} catch (e) {
				console.error(e);
				throw new Error('error_adding_item_to_cart');
			}
		},
		[addItem, getOrSetCart],
	);
}

interface AddItemArgs {
	cartId: string;
	variantId: string;
	quantity: number;
}

export function useAddItem() {
	const dispatch = useAppDispatch();
	return useCallback(
		async ({ cartId, variantId, quantity }: AddItemArgs) => {
			const res = await dispatch(addItemThunk({ cartId, variantId, quantity }));
			return res.payload;
		},
		[dispatch],
	);
}

export function useCart() {
	return useAppSelector((state) => state.cart.current);
}

export function useCartTotalItem() {
	return useAppSelector(selectCartTotalItems);
}

export function useCartTotalPrice(includeTaxes = false) {
	const formatAmount = useFormatAmount();
	const subTotal = useAppSelector(selectCartTotalPrice);
	return formatAmount({ amount: subTotal, includeTaxes });
}

export function useCartItems() {
	return useAppSelector(selectCartItems);
}

interface UpdateLineItemArgs {
	lineId: string;
	quantity: number;
}

export function useUpdateLineItem() {
	const dispatch = useAppDispatch();
	const getOrSetCart = useGetOrSetCart();

	return useCallback(
		async ({ lineId, quantity }: UpdateLineItemArgs) => {
			const cart = await getOrSetCart();

			if (!cart) {
				throw new Error('missing_cart_id');
			}

			if (!lineId) {
				throw new Error('missing_product_lineId');
			}

			if (!lineId) {
				throw new Error('missing_lineItem_id');
			}

			try {
				await dispatch(updateItemThunk({ cartId: cart.id, lineId, quantity }));
			} catch (e) {
				console.error(e);
				throw new Error('error_updating_item_in_cart');
			}
		},
		[dispatch, getOrSetCart],
	);
}

export function useCreatePaymentSessions() {
	const dispatch = useAppDispatch();
	const getOrSetCart = useGetOrSetCart();
	return useCallback(async (provider_id: string) => {
		const cart = await getOrSetCart();
		if (!cart) {
			throw new Error('missing_cart_id');
		}

		const res = await dispatch(createPaymentSessionsThunk({ cart, provider_id }));
		return res.payload;
	}, [dispatch, getOrSetCart]);
}

export function useListShippingMethods() {
	const dispatch = useAppDispatch();
	const region = useRegion();
	return useCallback(
		async (productIds?: string[]) => {
			if (!region) {
				throw new Error('missing_region');
			}

			const res = await dispatch(
				listShippingMethodsThunk({
					regionId: region!.id,
					productIds,
				}),
			);
			return res.payload;
		},
		[dispatch, region],
	);
}

export function useShipments() {
	return useAppSelector((state) =>
		(state.shipment.all ?? []).filter((m) => !m.is_return),
	);
}

export function useGetCustomerThunk() {
	const dispatch = useAppDispatch();
	return useCallback(async () => {
		await dispatch(getCustomerThunk());
	}, [dispatch]);
}

export function useCustomer() {
	return useAppSelector((state) => state.customer.customer);
}

export function useCustomerIsLoading() {
	return useAppSelector((state) => state.customer.loading);
}

export function useAddShippingMethod() {
	const dispatch = useAppDispatch();
	const getOrSetCart = useGetOrSetCart();
	return useCallback(
		async ({ shippingMethodId }: { shippingMethodId: string }) => {
			const cart = await getOrSetCart();
			if (!cart) {
				throw new Error('missing_cart_id');
			}

			const res = await dispatch(
				addShippingMethodThunk({
					cartId: cart.id,
					shippingMethodId,
				}),
			);
			return res.payload;
		},
		[dispatch, getOrSetCart],
	);
}
