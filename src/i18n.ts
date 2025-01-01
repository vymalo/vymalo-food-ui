import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ChainedBackend, { ChainedBackendOptions } from 'i18next-chained-backend';
import LocalStorageBackend, { LocalStorageBackendOptions } from 'i18next-localstorage-backend';
import HttpApi, { HttpBackendOptions } from 'i18next-http-backend';
import * as _ from 'lodash';
import { axiosInstance } from './modules/http';

const filterWell = <T>(list: T[]) => _.filter(list, _.isObject) as T[];

export async function i18nFn() {
	await i18n
		.use(LanguageDetector)
		.use(initReactI18next)
		.use(ChainedBackend)
		.init<ChainedBackendOptions>({
			fallbackLng: 'en',
			ns: ['common'],
			defaultNS: ['common'],
			supportedLngs: ['en', 'de', 'fr'],
			interpolation: {
				escapeValue: false,
			},
			backend: {
				backends: filterWell([import.meta.env.PROD && LocalStorageBackend, HttpApi]),
				backendOptions: filterWell([
					import.meta.env.PROD && {
						expirationTime: 3 * (24 * 60 * 60 * 1000), // 3 days
					} as LocalStorageBackendOptions,
					{
						loadPath: '/i18n/{{lng}}/{{ns}}.json',
						request: async (_, url, __, callback) => {
							try {
								const { data, status } = await axiosInstance.get<Record<string, unknown>>(url);
								callback(null, { status, data });
							} catch (error) {
								callback(error, { status: 500, data: {} });
							}
						},
					} as HttpBackendOptions,
				]),
			},
		});
	return i18n;
}
