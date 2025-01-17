import 'barcode-detector/side-effects';
import './index.scss';

import ReactDOM from 'react-dom/client';
import React, { StrictMode } from 'react';
import { DefaultHeader } from '@components/default-header';
import { Notification } from '@modules/notification';
import { ErrorBoundary } from '@sentry/react';
import { RouterProvider } from '@modules/router';
import { initTracing } from '@modules/tracing';
import { I18nProvider } from '@modules/i18n';
import { initSentry } from '@modules/sentry';
import { StoreProvider } from '@modules/store/provider';
import { Versioning } from '@modules/versioning';

function main() {
  initTracing();
  initSentry();

  const rootElement = document.getElementById('root') as HTMLElement;
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ErrorBoundary showDialog>
        <I18nProvider>
          <StoreProvider>
            <Versioning />
            <DefaultHeader />
            <RouterProvider />
            <Notification />
          </StoreProvider>
        </I18nProvider>
      </ErrorBoundary>
    </StrictMode>,
  );
}

main();
