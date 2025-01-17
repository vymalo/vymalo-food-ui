import { router } from './router.tsx';
import { RouterProvider as Provider } from 'react-router-dom';
import React from 'react';

export function RouterProvider() {
  return (
    <>
      <Provider router={router} />
    </>
  );
}