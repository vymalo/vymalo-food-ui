import { useCountries, useCurrentCountry, useGetListRegionThunk, useSetCurrentCountryId } from '@store';
import { useEffect, useMemo } from 'react';
import { clsx } from 'clsx';
import { Loading } from 'react-daisyui';
import { AppImage } from '@components/image';

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
		<div className="dropdown dropdown-end">
			<div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
				{iso2 && (
					<AppImage
						width={32}
						height={32}
						className="object-cover w-8 h-8 rounded-full"
						alt={current?.display_name}
						src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${iso2}.svg`}
					/>
				)}
				{!iso2 && (
					<Loading />
				)}
			</div>
			<ul tabIndex={0} className="dropdown-content menu clear-bg rounded-box z-[1] w-72 p-2 shadow">
				{countries.map((country) => (
					<li key={country.id} onClick={() => setCurrentCountryId(country.id)}>
						<a>
							<AppImage
								className={clsx('object-cover w-8 h-8 rounded-full', {
									'ring ring-primary': country.id === current?.id,
								})}
								alt={country.display_name}
								src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.iso_2.toUpperCase()}.svg`}
							/>
							<span>{country.display_name}</span>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}