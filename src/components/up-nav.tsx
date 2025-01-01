import { Navbar } from 'react-daisyui';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { ThemeToggle } from '@components/theme-change-button';
import { RegionChangeDropdown } from '@components/region-change-dropdown';
import { menu } from '@shared/menu';
import { AppImage } from '@components/image';

export default function UpNav() {
	const { pathname } = useLocation();
	return (
		<div className="nav-border z-20 sticky top-0 bg-base-100">
			<div className="container hidden md:block">
				<Navbar>
					<Navbar.Start>
						<Link
							to="/"
							className="btn btn-ghost uppercase text-xl"
						>
							<AppImage
								width={32}
								height={32}
								src="/vymalo.png"
								alt="Vymalo"
							/>
							<span>Vymalo</span>
						</Link>
					</Navbar.Start>

					<Navbar.End className="gap-4">
						{menu.map(({ path, key, Icon, Render }) => Render
							? <Render
								key={key}
								link={(
									<Link
										key={key}
										to={path}
										className={clsx('transition ease-in-out btn btn-ghost btn-circle', {
											'btn-active text-primary': pathname === path,
										})}
									>
										<Icon />
									</Link>
								)}
							/>
							:
							<Link
								key={key}
								to={path}
								className={clsx('transition ease-in-out btn btn-ghost btn-circle', {
									'btn-active text-primary': pathname === path,
								})}
							>
								<Icon />
							</Link>,
						)}
						<ThemeToggle />
						<RegionChangeDropdown />
					</Navbar.End>
				</Navbar>
			</div>
		</div>
	);
}