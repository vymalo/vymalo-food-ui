import { createAsyncThunk } from '@reduxjs/toolkit';
import { addShippingMethod, listShippingMethods } from '../../modules/shipment';

export interface ListShippingMethodsThunkArg {
	regionId: string;
	productIds?: string[];
}

export const listShippingMethodsThunk = createAsyncThunk(
	'shipment/listShippingMethods',
	async ({ regionId, productIds }: ListShippingMethodsThunkArg) => {
		return listShippingMethods(regionId, productIds);
	},
);

export interface AddShippingMethodThunkArg {
	cartId: string;
	shippingMethodId: string;
}

export const addShippingMethodThunk = createAsyncThunk(
	'shipment/addShippingMethod',
	async ({ cartId, shippingMethodId }: AddShippingMethodThunkArg) => {
		return addShippingMethod({ cartId, shippingMethodId });
	},
);