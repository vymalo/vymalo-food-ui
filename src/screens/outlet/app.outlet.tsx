import { Outlet } from 'react-router-dom';
import DownNav from '@components/down-nav';

export function Component() {
	return (
		<>
			<div className="p-4">
				<div className="flex flex-col gap-2 md:gap-4">
					<Outlet />
				</div>
			</div>
			<DownNav />
		</>
	);
}