import { useAppDispatch, useAppSelector } from '@modules/store';
import { useCallback } from 'react';
import { listRegionThunk } from './thunk';
import { setCurrentCountry } from './slice.ts';

export function useGetListRegionThunk() {
  const dispatch = useAppDispatch();
  return useCallback(async () => {
    await dispatch(listRegionThunk());
  }, [dispatch]);
}

export function useCountries() {
  const countryMap = useAppSelector((state) => state.region.countries);
  return Object.values(countryMap ?? {});
}

export function useCurrentCountry() {
  const countryMap = useAppSelector((state) => state.region.countries);
  const currentId = useAppSelector((state) => state.region.currentCountryId);
  if (!currentId) {
    return null;
  }

  return countryMap[currentId];
}

export function useSetCurrentCountryId() {
  const dispatch = useAppDispatch();
  return useCallback(
    (countryId: string) => {
      dispatch(setCurrentCountry(countryId));
    },
    [dispatch],
  );
}

export function useRegion() {
  const regions = useAppSelector((state) => state.region.regions);
  const countryRegions = useAppSelector((state) => state.region.countryRegions);
  const currentCountryId = useAppSelector(
    (state) => state.region.currentCountryId,
  );

  if (!currentCountryId) {
    return undefined;
  }

  const regionId = countryRegions[currentCountryId];
  if (!regionId) {
    return undefined;
  }

  return regions[regionId];
}