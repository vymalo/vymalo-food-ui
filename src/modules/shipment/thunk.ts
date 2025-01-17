import { createAsyncThunk } from '@reduxjs/toolkit';
import { addShippingMethod, listShippingMethods } from '@modules/shipment';

export interface ListShippingMethodsThunkArg {
  cartId: string;
}

export const listShippingMethodsThunk = createAsyncThunk(
  'shipment/listShippingMethods',
  async ({ cartId }: ListShippingMethodsThunkArg) => {
    return listShippingMethods(cartId);
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
