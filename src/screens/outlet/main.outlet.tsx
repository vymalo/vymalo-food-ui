import { Footer } from '@components/footer';
import TopHeader from '@components/nav/up-nav.tsx';
import { Outlet } from 'react-router-dom';

export function Component() {
  return (
    <main>
      <TopHeader />
      <div className='flex flex-col gap-2 md:gap-4'>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
