import { removeNotification, selectNotification, useAppDispatch, useAppSelector } from '@store';
import { Alert, Button, Toast } from 'react-daisyui';
import { useCallback } from 'react';
import { X } from 'react-feather';

export function Notification() {
	const notifications = useAppSelector(selectNotification);
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
						shape="circle"
					>
						<X />
					</Button>
					<span>{notification.message}</span>
				</Alert>
			))}
		</Toast>
	);
}
