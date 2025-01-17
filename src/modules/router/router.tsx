import { createBrowserRouter, Navigate } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    lazy: () => import('@screens/outlet/main.outlet.tsx'),
    children: [
      {
        path: '/',
        lazy: () => import('@screens/outlet/app.outlet.tsx'),
        children: [
          {
            path: 'profile',
            lazy: () => import('@screens/profile.screen.tsx'),
          },
          {
            path: 'search',
            lazy: () => import('@screens/search.screen.tsx'),
          },
          {
            path: 'bag',
            lazy: () => import('@screens/bag.screen.tsx'),
          },
          {
            path: '',
            lazy: () => import('@screens/home.screen.tsx'),
          },
        ],
      },
      {
        path: '/p',
        children: [
          {
            path: ':id',
            lazy: () => import('@screens/product.screen.tsx'),
          },
        ],
      },
    ],
  },
  {
    path: '/checkout',
    lazy: () => import('@screens/outlet/checkout.outlet.tsx'),
    children: [
      {
        path: '',
        lazy: () => import('@screens/checkout.screen.tsx'),
      },
    ],
  },
  {
    path: '*',
    Component: () => <Navigate to='/' replace={true} />,
  },
]);
