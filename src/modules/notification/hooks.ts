import { useCallback } from 'react';
import { addNotification, type NotifMessage, removeNotification } from './slice.ts';
import { useAppDispatch, useAppSelector } from '@modules/store';
import { selectNotification } from './selector';

export function useAddNotification() {
  const dispatch = useAppDispatch();
  return useCallback((notification: Omit<NotifMessage, 'id'>) => {
    dispatch(addNotification(notification));
  }, [dispatch]);
}

export function useRemoveNotification() {
  const dispatch = useAppDispatch();
  return useCallback((id: string) => {
    dispatch(removeNotification(id));
  }, [dispatch]);
}

export function useNotification() {
  return useAppSelector(selectNotification);
}

