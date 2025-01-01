import { createSlice } from '@reduxjs/toolkit';
import {
	addItemThunk,
	addShippingMethodThunk,
	createCartThunk,
	createPaymentSessionsThunk,
	getCartThunk,
	updateCartThunk,
	updateItemThunk,
} from '@store/thunks';
import { HttpTypes } from '@medusajs/types';

export interface CartState {
	current?: HttpTypes.StoreCart;
	loading: boolean;
}

const initialState = {
	current: undefined,
	loading: false,
} as CartState;

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addItemThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(addItemThunk.fulfilled, (state, action) => {
				state.current = action.payload;
				state.loading = false;
			});

		builder
			.addCase(updateItemThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateItemThunk.fulfilled, (state, action) => {
				state.current = action.payload;
				state.loading = false;
			});

		builder
			.addCase(createCartThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(createCartThunk.fulfilled, (state, action) => {
				state.current = action.payload;
				state.loading = false;
			});

		builder
			.addCase(getCartThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(getCartThunk.fulfilled, (state, action) => {
				state.loading = false;
				if (!action.payload) {
					return;
				}

				state.current = action.payload;
			});

		builder
			.addCase(updateCartThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateCartThunk.fulfilled, (state, action) => {
				state.current = action.payload;
				state.loading = false;
			});

		builder
			.addCase(createPaymentSessionsThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(createPaymentSessionsThunk.fulfilled, (state, action) => {
				state.current = action.payload;
				state.loading = false;
			});

		builder
			.addCase(addShippingMethodThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(addShippingMethodThunk.fulfilled, (state, action) => {
				state.current = action.payload;
				state.loading = false;
			});
	},
});

// eslint-disable-next-line no-empty-pattern
export const {} = cartSlice.actions;

export const reducerCart = cartSlice.reducer;
