import { createSlice } from '@reduxjs/toolkit';
import type { HttpTypes } from '@medusajs/types';
import { getProductThunk } from '@store/thunks';

export type FetchState = [
	HttpTypes.StoreProduct | undefined,
	boolean,
	unknown | undefined,
];

export interface ProductState {
	[key: string]: FetchState;
}

const initialState = {} as ProductState;

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getProductThunk.fulfilled, (state, action) => {
			state[action.meta.arg.id] = [action.payload, false, undefined];
		});
		builder.addCase(getProductThunk.rejected, (state, action) => {
			state[action.meta.arg.id] = [undefined, false, action.error];
		});
		builder.addCase(getProductThunk.pending, (state, action) => {
			state[action.meta.arg.id] = [undefined, true, undefined];
		});
	},
});

// eslint-disable-next-line no-empty-pattern
export const {} = productSlice.actions;

export const reducerProduct = productSlice.reducer;
