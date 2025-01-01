import { useCallback, useMemo } from 'react';
import _ from 'lodash';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useRegion } from '@store';
import { useCurrentProduct } from './helper';

// Add currencies that don't need to be divided by 100
const noDivisionCurrencies = [
	'xaf',
	'xof',
];

export const useFindCheapestRegionPrice = () => {
	const regionId = useRegion()?.id;
	const product = useCurrentProduct();
	return useMemo(() => {
		const regionPrices = product.variants?.reduce((acc, v) => {
			if (!v.prices) {
				return acc;
			}

			const price = v.prices.find((p) => p.region_id === regionId);
			if (price) {
				acc.push(price);
			}

			return acc;
		}, [] as MoneyAmount[]);

		if (!regionPrices?.length) {
			return undefined;
		}

		return regionPrices.reduce((acc, p) => (acc.amount > p.amount ? p : acc));
	}, [product.variants, regionId]);
};

export const useFindCheapestCurrencyPrice = () => {
	const region = useRegion();
	const product = useCurrentProduct();
	return useMemo(() => {
		const currencyPrices = product.variants?.reduce((acc, v) => {
			if (!v.prices) {
				return acc;
			}

			const price = v.prices.find((p) => p.currency_code === region?.currency_code);
			if (price) {
				acc.push(price);
			}

			return acc;
		}, [] as MoneyAmount[]);

		if (!currencyPrices.length) {
			return undefined;
		}

		return currencyPrices.reduce((acc, p) => (acc.amount > p.amount ? p : acc));
	}, [product.variants, region?.currency_code]);
};

export const useFindCheapestPrice = () => {
	const cheapestRegionPrice = useFindCheapestRegionPrice();
	const cheapestCurrencyPrice = useFindCheapestCurrencyPrice();
	const { t } = useTranslation('common');
	const formatAmount = useFormatAmount();

	return useMemo(() => {
		const cheapestPrice = cheapestRegionPrice || cheapestCurrencyPrice;

		if (cheapestPrice) {
			return formatAmount({
				amount: cheapestPrice.amount,
			});
		}

		return t('no_price');
	}, [cheapestRegionPrice, cheapestCurrencyPrice, t, formatAmount]);
};

export interface FormatVariantPriceParams {
	variant: ProductVariant;
	includeTaxes?: boolean;
	minimumFractionDigits?: number;
	maximumFractionDigits?: number;
	locale?: string;
}

export const useFormatVariantPrice = () => {
	const computeVariantPrice = useComputeVariantPrice();
	const region = useRegion();

	return useCallback(({ variant, includeTaxes = true, ...rest }: FormatVariantPriceParams) => {
		const amount = computeVariantPrice({ variant, includeTaxes });
		return convertToLocale({
			amount,
			currency_code: region?.currency_code,
			...rest,
		});
	}, [computeVariantPrice, region?.currency_code]);
};

export interface ComputeVariantPriceParams {
	variant: ProductVariant;
	includeTaxes?: boolean;
}

export const useComputeVariantPrice = () => {
	const getAmount = useGetVariantPrice();
	const computeAmount = useComputeAmount();
	return useCallback(({ variant, includeTaxes = true }: ComputeVariantPriceParams) => {
		const amount = getAmount(variant);
		return computeAmount({ amount, includeTaxes });
	}, [computeAmount, getAmount]);
};

export const useGetVariantPrice = () => {
	const region = useRegion();
	return useCallback((variant: ProductVariant) => {
		const price = variant?.prices?.find(
			(p) =>
				p.currency_code.toLowerCase() === region?.currency_code?.toLowerCase(),
		);

		return price?.amount || 0;
	}, [region]);
};

export interface ComputeAmountParams {
	amount: number;
	includeTaxes?: boolean;
}

export const useComputeAmount = () => {
	const region = useRegion();
	const taxRate = useGetTaxRate();

	return useMemo(() => ({ amount, includeTaxes = true }: ComputeAmountParams) => {
		const toDecimal = convertToDecimal(amount, region);
		return toDecimal * (1 + (includeTaxes ? taxRate : 0));
	}, [region, taxRate]);
};

export interface FormatAmountParams {
	amount: number;
	includeTaxes?: boolean;
	minimumFractionDigits?: number;
	maximumFractionDigits?: number;
	locale?: string;
}

export const useFormatAmount = () => {
	const region = useRegion();
	const taxAwareAmount = useComputeAmount();

	return useCallback(({ amount, includeTaxes = true, ...rest }: FormatAmountParams) => {
		const taxAmount = taxAwareAmount({ amount, includeTaxes });
		return convertToLocale({
			amount: taxAmount,
			currency_code: region?.currency_code,
			...rest,
		});
	}, [taxAwareAmount, region]);
};

export const convertToDecimal = (amount: number, region?: Region) => {
	const divisor = noDivisionCurrencies.includes(
		region?.currency_code?.toLowerCase() ?? '',
	)
		? 1
		: 100;

	return Math.floor(amount) / divisor;
};

export const useGetTaxRate = () => {
	const region = useRegion();
	return useMemo(() => (region && !isEmpty(region) ? region?.tax_rate / 100 : 0), [region]);
};

export const convertToLocale = ({
																	amount,
																	currency_code,
																	minimumFractionDigits,
																	maximumFractionDigits,
																	locale = 'en-US',
																}: ConvertToLocaleParams) => {
	return currency_code && !isEmpty(currency_code)
		? new Intl.NumberFormat(locale, {
			style: 'currency',
			currency: currency_code,
			minimumFractionDigits,
			maximumFractionDigits,
		}).format(amount)
		: amount.toString();
};


interface ConvertToLocaleParams {
	amount: number;
	currency_code?: string;
	minimumFractionDigits?: number;
	maximumFractionDigits?: number;
	locale?: string;
}

export function useProductVariantPrice() {
	const region = useRegion();

	return useCallback((variant: PricedVariant) => {
		const price = _.find(variant.prices, (p) => p.region_id === region?.id);
		return price?.amount || 0;
	}, [region?.id]);
}
