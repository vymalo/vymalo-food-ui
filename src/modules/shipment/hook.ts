import { useCallback } from 'react';
import { useGetOrSetCart } from '@modules/cart';
import { useAppDispatch, useAppSelector } from '@modules/store';
import { listShippingMethodsThunk } from './thunk';


export function useListShippingMethods() {
  const dispatch = useAppDispatch();
  const getOrSetCart = useGetOrSetCart();
  return useCallback(async () => {
    const cart = await getOrSetCart();
    if (!cart) {
      return;
    }

    await dispatch(
      listShippingMethodsThunk({
        cartId: cart.id,
      }),
    );
  }, [dispatch, getOrSetCart]);
}

export function useShipments() {
  return useAppSelector((state) => state.shipment.all ?? []);
}



