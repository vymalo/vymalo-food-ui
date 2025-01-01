import { createSlice } from '@reduxjs/toolkit';
import { getCustomerThunk } from '@store';
import type { HttpTypes } from '@medusajs/types';

export interface CustomerState {
	customer?: HttpTypes.StoreCustomer;
	loading: boolean;
}

const initialState = {
	loading: false,
} as CustomerState;

const CustomerSlice = createSlice({
	name: 'customer',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getCustomerThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(getCustomerThunk.fulfilled, (state, action) => {
				state.customer = action.payload;
				state.loading = false;
			});
	},
});

// eslint-disable-next-line no-empty-pattern
export const {} = CustomerSlice.actions;

export const reducerCustomer = CustomerSlice.reducer;
