import { createAsyncThunk } from '@reduxjs/toolkit';
import { createPaymentSessions } from '../../modules/payment';
import { HttpTypes } from '@medusajs/types';

export interface CreatePaymentSessionsThunk {
	cart: HttpTypes.StoreCart;
	provider_id: string;
}

export const createPaymentSessionsThunk = createAsyncThunk(
	'cart/createPaymentSessions',
	async ({ cart, provider_id }: CreatePaymentSessionsThunk) =>
		createPaymentSessions(cart, provider_id),
);
