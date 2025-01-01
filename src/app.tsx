import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import { Notification } from '@components/notification';
import { Helmet } from 'react-helmet';

export function App() {
	return (
		<>
			<Helmet title="Vymalo, E-Commerce made simple" titleTemplate="%s | Vymalo" />
			<RouterProvider router={router} />
			<Notification />
		</>
	);
}