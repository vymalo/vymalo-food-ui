import { useCallback } from 'react';
import { Alert, Button, Toast } from 'react-daisyui';
import { X } from 'react-feather';
import { useAppDispatch } from '@modules/store';
import { removeNotification } from './slice.ts';
import { useNotification } from './hooks';

export function Notification() {
  const notifications = useNotification();
  const dispatch = useAppDispatch();
  const remove = useCallback(
    (id: string) => () => {
      dispatch(removeNotification(id));
    },
    [dispatch],
  );
  return (
    <Toast className="z-10" horizontal="start" vertical="bottom">
      {notifications.map((notification) => (
        <Alert key={notification.id} status="error">
          <Button
            onClick={remove(notification.id)}
            size="sm"
            color="ghost"
            shape="circle">
            <X />
          </Button>
          <h4>{notification.message}</h4>
          <span>{notification.description}</span>
        </Alert>
      ))}
    </Toast>
  );
}
