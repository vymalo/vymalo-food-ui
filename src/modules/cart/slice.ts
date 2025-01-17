import { HttpTypes } from '@medusajs/types';
import { createSlice } from '@reduxjs/toolkit';
import {
  addItemThunk,
  createCartThunk,
  createPaymentSessionsThunk,
  getCartThunk,
  updateCartThunk,
  updateItemThunk,
} from './thunk';
import { addShippingMethodThunk } from '@modules/shipment';

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
  reducers: {
    clearCart: (state) => {
      state.current = undefined;
      state.loading = false;
    },
  },
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

export const { clearCart } = cartSlice.actions;

export const reducerCart = cartSlice.reducer;
