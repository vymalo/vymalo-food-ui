import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProduct } from './resolver.ts';

interface GetProductThunkArgs {
  id: string;
  regionId?: string;
}

export const getProductThunk = createAsyncThunk(
  'product/getProduct',
  async ({ id, regionId }: GetProductThunkArgs) => {
    return await getProduct(id, regionId);
  },
);
