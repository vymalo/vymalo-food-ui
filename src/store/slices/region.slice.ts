import { createSlice } from '@reduxjs/toolkit';
import { listRegionThunk } from '@store/thunks/region';
import { isArray } from 'lodash';
import { HttpTypes } from '@medusajs/types';

type CountryID = string;
type RegionID = string;

export interface RegionState {
	regions: Record<RegionID, HttpTypes.StoreRegion>;
	countries: Record<CountryID, HttpTypes.StoreRegionCountry>;
	countryRegions: Record<CountryID, RegionID>;
	currentCountryId?: CountryID;
}

const initialState = {
	regions: {},
	countryRegions: {},
} as RegionState;

const regionSlice = createSlice({
	name: 'region',
	initialState,
	reducers: {
		setCurrentCountry: (state, action) => {
			state.currentCountryId = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(listRegionThunk.fulfilled, (state, action) => {
			if (!isArray(action.payload.regions)) {
				return;
			}

			for (const region of action.payload.regions) {
				state.regions[region.id] = region;

				for (const country of (region.countries || [])) {
					state.countryRegions[country.id] = region.id;
					if (!state.countries) {
						state.countries = {};
					}
					state.countries[country.id] = country;
				}
			}

			// If there is no current country, set it to the first country in the first region
			if (!state.currentCountryId) {
				state.currentCountryId = action.payload.regions[0].countries?.[0].id;
			}

			// If the current country is not in the regions, set it to the first country in the first region
			if (!state.currentCountryId || !state.regions[state.countryRegions[state.currentCountryId]]) {
				state.currentCountryId = action.payload.regions[0].countries?.[0].id;
			}
		});
	},
});

export const {
	setCurrentCountry,
} = regionSlice.actions;

export const reducerRegion = regionSlice.reducer;
