import { useEffect } from 'react';
import { ArrowLeft } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAddNotification } from '@modules/notification';

export interface ProductNotFoundProps {
  error?: unknown;
}

export default function ProductNotFound({ error: e }: ProductNotFoundProps) {
  const error = e as Error;
  const { t } = useTranslation('action');
  const addNotification = useAddNotification();

  useEffect(() => {
    addNotification({
      message: error?.message ?? 'product.not_found',
    });
  }, [addNotification, error?.message]);

  return (
    <div
      id="error-page"
      className="container flex flex-col bg-base-100 px-0 py-1 sm:px-2 md:gap-4 lg:gap-8">
      <div className="sticky top-0 z-10 bg-base-100">
        <Link to="/" className="btn btn-ghost">
          <ArrowLeft />
          {t('go_back')}
        </Link>
      </div>

      <div className="text-center">
        <h2 className="text-3xl">Product not found</h2>
        <p>{error.message}</p>
      </div>
    </div>
  );
}
