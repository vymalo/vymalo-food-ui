import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

export function DefaultHeader() {
  const { i18n } = useTranslation();
  return (
    <Helmet
      defaultTitle='Vymalo, E-Commerce made simple'
      titleTemplate='%s | Vymalo'
      htmlAttributes={{ lang: i18n.language }}
    />
  );
}
