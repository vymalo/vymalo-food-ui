import * as _ from 'lodash';
import { isEmpty } from 'lodash';
import { getProjectEnvVariables } from '@modules/env';

const { envVariables } = getProjectEnvVariables();

export const toSharpUrl = (
  url: string,
  width: number | string = 1000,
  height: number | string = 1000,
) => {
  const viteImageSharpenerUrl = envVariables.VITE_IMAGE_SHARPENER_URL;
  if (!viteImageSharpenerUrl) {
    return url;
  }
  return `${viteImageSharpenerUrl}/api/image/url?url=${encodeURIComponent(url)}&width=${width}&height=${height}`;
};


export function removeEmptyValues<T>(obj: T): T {
  const clean = _.omitBy(obj as any, _.isNil);
  const nested = _.mapValues(clean, (v) => {
    if (typeof v === 'object') {
      return removeEmptyValues(v);
    }
    return v;
  });
  return _.reduce(
    _.entries(nested),
    (acc, [k, v]) => {
      if (typeof v === 'object' && _.isEmpty(v)) {
        return acc;
      }
      return { ...acc, [k]: v };
    },
    {} as T,
  );
}

export const convertToLocale = ({
  amount,
  currency_code,
  minimumFractionDigits,
  maximumFractionDigits,
  locale = 'en-US',
}: ConvertToLocaleParams) => {
  if (!amount) {
    return '';
  }

  return currency_code && !isEmpty(currency_code)
    ? new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency_code,
        minimumFractionDigits,
        maximumFractionDigits,
      }).format(amount)
    : amount.toString();
};

interface ConvertToLocaleParams {
  amount?: number | null;
  currency_code?: string | null;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  locale?: string;
}

export const getPercentageDiff = (
  original?: number | null,
  calculated?: number | null,
) => {
  if (!original || !calculated) {
    return undefined;
  }
  const diff = original - calculated;
  const decrease = (diff / original) * 100;

  return decrease.toFixed();
};
