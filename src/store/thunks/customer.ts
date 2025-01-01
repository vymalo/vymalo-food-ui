import { getCustomer } from '../../modules/customer';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getCustomerThunk = createAsyncThunk(
	'customer/getCustomer',
	async () => {
		return await getCustomer();
	},
);