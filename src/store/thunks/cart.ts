import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	addItem,
	createCart,
	getCart,
	updateCart,
	updateItem,
} from '../../modules/cart';
import type { HttpTypes } from '@medusajs/types';

export interface AddItemThunkArgs {
	cartId: string;
	variantId: string;
	quantity: number;
}

export const addItemThunk = createAsyncThunk(
	'cart/addItem',
	async (args: AddItemThunkArgs) => {
		return await addItem(args);
	},
);

export interface UpdateItemThunkArgs {
	cartId: string;
	lineId: string;
	quantity: number;
}

export const updateItemThunk = createAsyncThunk(
	'cart/updateItem',
	async (args: UpdateItemThunkArgs) => {
		return await updateItem(args);
	},
);

export interface GetCartThunkArgs {
	cartId: string;
}

export const getCartThunk = createAsyncThunk(
	'cart/getCart',
	async ({ cartId }: GetCartThunkArgs) => {
		return await getCart(cartId);
	},
);

export interface CreateCartThunkArgs {
	data: HttpTypes.StoreCreateCart;
}

export const createCartThunk = createAsyncThunk(
	'cart/createCart',
	async ({ data }: CreateCartThunkArgs) => {
		return await createCart(data);
	},
);

export interface UpdateCartThunkArgs {
	cartId: string;
	data: HttpTypes.StoreUpdateCart;
}

export const updateCartThunk = createAsyncThunk(
	'cart/updateCart',
	async ({ cartId, data }: UpdateCartThunkArgs) => {
		return await updateCart(cartId, data);
	},
);
