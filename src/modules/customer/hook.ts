import { useAppDispatch, useAppSelector } from '@modules/store';
import { useCallback } from 'react';
import { getCustomerThunk } from './thunk';

export function useGetCustomerThunk() {
  const dispatch = useAppDispatch();
  return useCallback(async () => {
    await dispatch(getCustomerThunk());
  }, [dispatch]);
}

export function useCustomer() {
  return useAppSelector((state) => state.customer.customer);
}

export function useCustomerIsLoading() {
  return useAppSelector((state) => state.customer.loading);
}