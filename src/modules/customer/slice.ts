import type { HttpTypes } from '@medusajs/types';
import { createSlice } from '@reduxjs/toolkit';
import { getCustomerThunk } from './thunk';

export interface CustomerState {
  customer?: HttpTypes.StoreCustomer;
  loading: boolean;
}

const initialState = {
  loading: false,
} as CustomerState;

const Slice = createSlice({
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
export const {} = Slice.actions;

export const reducerCustomer = Slice.reducer;
