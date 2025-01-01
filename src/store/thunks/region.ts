import { createAsyncThunk } from '@reduxjs/toolkit';
import { listRegions } from '../../modules/region';

export const listRegionThunk = createAsyncThunk(
	'region/list',
	async () => listRegions(),
);