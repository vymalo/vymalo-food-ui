import DownNav from '@components/nav/down-nav.tsx';
import { Outlet } from 'react-router-dom';

export function Component() {
  return (
    <>
      <div className='p-4'>
        <div className='flex flex-col gap-2 md:gap-4'>
          <Outlet />
        </div>
      </div>
      <DownNav />
    </>
  );
}
