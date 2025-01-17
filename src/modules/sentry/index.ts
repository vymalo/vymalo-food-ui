import * as Sentry from '@sentry/react';
import { getProjectEnvVariables } from '@modules/env';

const { envVariables } = getProjectEnvVariables();

export function initSentry() {
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
}