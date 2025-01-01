import { createSlice } from '@reduxjs/toolkit';
import { listShippingMethodsThunk } from '@store/thunks';

export interface ShipmentState {
	all: PricedShippingOption[];
	loading: boolean;
}

const initialState = {
	all: [],
	loading: false,
} as ShipmentState;

const shipmentSlice = createSlice({
	name: 'shipment',
	initialState,
	reducers: {},
	extraReducers: (builder) => {

		builder
			.addCase(listShippingMethodsThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(listShippingMethodsThunk.fulfilled, (state, action) => {
				state.all = action.payload;
				state.loading = false;
			});
	},
});

// eslint-disable-next-line no-empty-pattern
export const {} = shipmentSlice.actions;

export const reducerShipment = shipmentSlice.reducer;
