import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
	reducerCart,
	reducerCustomer,
	reducerNotification,
	reducerProduct,
	reducerRegion,
	reducerShipment,
} from '@store/slices';
import { rtkQueryErrorLogger } from '@store/middlewares';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistConfig } from 'redux-persist/es/types';
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync';

const rootReducer = combineReducers({
	notification: reducerNotification,
	region: reducerRegion,
	product: reducerProduct,
	cart: reducerCart,
	shipment: reducerShipment,
	customer: reducerCustomer,
});

type State = ReturnType<typeof rootReducer>;

const whitelist: (keyof State)[] = ['region', 'cart', 'customer', 'shipment'];

const persistConfig: PersistConfig<State> = {
	key: 'root',
	storage,
	version: 1,
	whitelist: whitelist,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	// Adding the api middleware enables caching, invalidation, polling,
	// and other useful features of `rtk-query`.
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}).concat(
			import.meta.env.DEV ? [logger] : [],
			rtkQueryErrorLogger,
			createStateSyncMiddleware({
				whitelist: whitelist,
				channel: 'redux_vymalo_state_sync',
				broadcastChannelOption: {
					type: 'localstorage',
					webWorkerSupport: true,
				},
			}) as any,
		),
});

export const persistor = persistStore(store);

initMessageListener(store);

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
