import { Outlet } from 'react-router-dom';
import TopHeader from '@components/up-nav';
import { Footer } from '@components/footer';

export function Component() {
	return (
		<>
			<TopHeader />
			<div className="flex flex-col gap-2 md:gap-4">
				<Outlet />
			</div>
			<Footer />
		</>
	);
}