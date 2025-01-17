import type { HttpTypes } from '@medusajs/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addItem,
  createCart, createPaymentSessions,
  getCart,
  updateCart,
  updateItem,
} from './resolvers.ts';

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

export interface CreatePaymentSessionsThunk {
  cart: HttpTypes.StoreCart;
  provider_id: string;
}

export const createPaymentSessionsThunk = createAsyncThunk(
  'cart/createPaymentSessions',
  async ({ cart, provider_id }: CreatePaymentSessionsThunk) =>
    createPaymentSessions(cart, provider_id),
);
