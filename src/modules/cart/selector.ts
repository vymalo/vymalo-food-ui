import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@modules/store';
import * as _ from 'lodash';

export const selectCartTotalItems = createSelector(
  (ro: RootState) => ro.cart.current,
  (p) => p?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0,
);

export const selectCartItems = createSelector(
  (ro: RootState) => ro.cart.current,
  (p) => _.sortBy(p?.items || [], 'createdAt').reverse(),
);