import './index.scss';
import 'barcode-detector/side-effects';
import * as Sentry from '@sentry/react';
import { ErrorBoundary } from '@sentry/react';
import { i18nFn } from '@i18n';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { App } from './app';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@store';
import { Provider } from 'react-redux';
import { getProjectEnvVariables } from './project-env-variables';

const { envVariables } = getProjectEnvVariables();

async function main() {
	const sentryDSN = envVariables.VITE_SENTRY_DSN;
	if (sentryDSN) {
		Sentry.init({
			dsn: sentryDSN,
			integrations: [
				Sentry.browserTracingIntegration(),
				Sentry.replayIntegration(),
			],
			// Performance Monitoring
			tracesSampleRate: 1.0, //  Capture 100% of the transactions
			// Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
			tracePropagationTargets: ['localhost', /^https:\/\/localhost:\d+\/api/],
			// Session Replay
			replaysSessionSampleRate: 0.1,
			replaysOnErrorSampleRate: 1.0,
		});
	}

	const i18n = await i18nFn();

	const rootElement = document.getElementById('root') as HTMLElement;
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<ErrorBoundary showDialog>
				<I18nextProvider i18n={i18n}>
					<Provider store={store}>
						<PersistGate loading={null} persistor={persistor}>
							<App />
						</PersistGate>
					</Provider>
				</I18nextProvider>
			</ErrorBoundary>
		</React.StrictMode>,
	);
}

main();
