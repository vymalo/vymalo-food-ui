import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCustomer } from './resolver.ts';

export const getCustomerThunk = createAsyncThunk(
  'customer/getCustomer',
  async () => {
    return await getCustomer();
  },
);
