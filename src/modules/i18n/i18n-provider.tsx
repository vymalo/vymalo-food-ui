import { PropsWithChildren, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { i18nFn } from './i18n';
import type { i18n as I18n } from 'i18next';

const init18n = () => i18nFn();

export function I18nProvider({ children }: PropsWithChildren) {
  const [i18n, setI18n] = useState<I18n>();
  useEffect(() => {
    init18n().then((v) => setI18n(v));
  }, []);

  if (!i18n) return (
    <div>
      Loading languages...
    </div>
  );

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}