import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/types';
import * as _ from 'lodash';

export const selectNotification = createSelector(
	(ro: RootState) => ro.notification.messages,
	(p) => p.filter(({ message }) => message.length > 0),
);

export const selectCartTotalItems = createSelector(
	(ro: RootState) => ro.cart.current,
	(p) => p?.items.reduce((acc, item) => acc + item.quantity, 0) || 0,
);

export const selectCartTotalPrice = createSelector(
	(ro: RootState) => ro.cart.current,
	(p) => p?.subtotal || 0,
);

export const selectCartItems = createSelector(
	(ro: RootState) => ro.cart.current,
	(p) => _.sortBy(p?.items || [], 'createdAt').reverse(),
);