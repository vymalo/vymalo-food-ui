import { createBrowserRouter, Navigate } from 'react-router-dom';

export const router = createBrowserRouter([
	{
		lazy: () => import('@screens/outlet/main.outlet'),
		children: [
			{
				path: '/',
				lazy: () => import('@screens/outlet/app.outlet'),
				children: [
					{
						path: 'profile',
						lazy: () => import('@screens/profile.screen'),
					},
					{
						path: 'search',
						lazy: () => import('@screens/search.screen'),
					},
					{
						path: 'bag',
						lazy: () => import('@screens/bag.screen'),
					},
					{
						path: '',
						lazy: () => import('@screens/home.screen'),
					},
				],
			},
			{
				path: '/p',
				children: [
					{
						path: ':id',
						lazy: () => import('@screens/product.screen'),
					},
				],
			},
		],
	},
	{
		path: '/checkout',
		lazy: () => import('@screens/outlet/checkout.outlet'),
		children: [
			{
				path: '',
				lazy: () => import('@screens/checkout.screen'),
			},
		],
	},
	{
		path: '*',
		Component: () => <Navigate to="/" replace={true} />,
	},
]);
