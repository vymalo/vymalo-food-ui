import { AppImage } from '@components/image.tsx';
import { RegionChangeDropdown } from '@components/region-change-dropdown.tsx';
import { ThemeToggle } from '@components/theme-change-button.tsx';
import { menu } from './menu';
import { clsx } from 'clsx';
import { Navbar } from 'react-daisyui';
import { Link, useLocation } from 'react-router-dom';

export default function UpNav() {
  const { pathname } = useLocation();
  return (
    <div className="nav-border sticky top-0 z-20 bg-base-100">
      <div className="container hidden md:block">
        <Navbar>
          <Navbar.Start>
            <Link to="/" className="btn btn-ghost text-xl uppercase">
              <AppImage width={32} height={32} src="/vymalo.png" alt="Vymalo" />
              <span>Vymalo</span>
            </Link>
          </Navbar.Start>

          <Navbar.End className="gap-4">
            {menu.map(({ path, key, Icon, Render }) =>
              Render ? (
                <Render
                  key={key}
                  link={
                    <Link
                      key={key}
                      to={path}
                      className={clsx(
                        'btn btn-circle btn-ghost transition ease-in-out',
                        {
                          'btn-active text-primary': pathname === path,
                        },
                      )}>
                      <Icon />
                    </Link>
                  }
                />
              ) : (
                <Link
                  key={key}
                  to={path}
                  className={clsx(
                    'btn btn-circle btn-ghost transition ease-in-out',
                    {
                      'btn-active text-primary': pathname === path,
                    },
                  )}>
                  <Icon />
                </Link>
              ),
            )}
            <ThemeToggle />
            <RegionChangeDropdown />
          </Navbar.End>
        </Navbar>
      </div>
    </div>
  );
}
