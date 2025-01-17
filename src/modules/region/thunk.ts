import { createAsyncThunk } from '@reduxjs/toolkit';
import { listRegions } from './resolver.ts';

export const listRegionThunk = createAsyncThunk('region/list', async () =>
  listRegions(),
);
