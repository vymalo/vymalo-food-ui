import { menu } from './menu';
import { clsx } from 'clsx';
import { Link, useLocation } from 'react-router-dom';

export default function DownNav() {
  const { pathname } = useLocation();
  return (
    <div className='container z-50 md:hidden'>
      <div className='btm-nav'>
        {menu.map(({ path, key, Icon, Render }) =>
          Render ? (
            <Render
              key={key}
              link={
                <Link
                  to={path}
                  className={clsx('transition ease-in-out', {
                    'active text-primary': pathname === path,
                  })}>
                  <Icon className='h-5 w-5' />
                  <span className='btm-nav-label'>{key}</span>
                </Link>
              }
              bottom
            />
          ) : (
            <Link
              key={key}
              to={path}
              className={clsx('transition ease-in-out', {
                'active text-primary': pathname === path,
              })}>
              <Icon className='h-5 w-5' />
              <span className='btm-nav-label'>{key}</span>
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
