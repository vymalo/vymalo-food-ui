import { AppImage } from '@components/image';
import { clsx } from 'clsx';
import { useEffect, useMemo } from 'react';
import { Loading } from 'react-daisyui';
import { useCountries, useCurrentCountry, useGetListRegionThunk, useSetCurrentCountryId } from '@modules/region';

export function RegionChangeDropdown() {
  const getRegions = useGetListRegionThunk();
  const countries = useCountries();
  const current = useCurrentCountry();
  const setCurrentCountryId = useSetCurrentCountryId();

  useEffect(() => {
    getRegions();
  }, [getRegions]);

  const iso2 = useMemo(() => current?.iso_2?.toUpperCase(), [current]);

  return (
    <div className='dropdown dropdown-end'>
      <div tabIndex={0} role='button' className='btn btn-circle btn-ghost'>
        {iso2 && (
          <AppImage
            width={32}
            height={32}
            className='h-8 w-8 rounded-full object-cover'
            alt={current?.display_name}
            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${iso2}.svg`}
          />
        )}
        {!iso2 && <Loading />}
      </div>
      <ul
        tabIndex={0}
        className='clear-bg menu dropdown-content z-[1] w-72 rounded-box p-2 shadow'>
        {countries.map((country) => (
          <li key={country.id} onClick={() => setCurrentCountryId(country.id)}>
            <a>
              <AppImage
                className={clsx('h-8 w-8 rounded-full object-cover', {
                  'ring ring-primary': country.id === current?.id,
                })}
                alt={country.display_name}
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.iso_2?.toUpperCase()}.svg`}
              />
              <span>{country.display_name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
