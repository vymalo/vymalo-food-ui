import { Link } from 'react-router-dom';
import { useAddErrorNotification } from '@store';
import { useEffect } from 'react';
import { ArrowLeft } from 'react-feather';
import { useTranslation } from 'react-i18next';

export interface ProductNotFoundProps {
	error?: unknown;
}

export default function ProductNotFound({ error: e }: ProductNotFoundProps) {
	const error = e as Error;
	const { t } = useTranslation('action');
	const addNotification = useAddErrorNotification();

	useEffect(() => {
		addNotification(error?.message ?? 'Product not found');
	}, [addNotification, error?.message]);

	return (
		<div
			id='error-page'
			className='container px-0 sm:px-2 bg-base-100 flex flex-col md:gap-4 lg:gap-8 py-1'
		>
			<div className='z-10 sticky top-0 bg-base-100'>
				<Link to='/' className='btn btn-ghost'>
					<ArrowLeft />
					{t('go_back')}
				</Link>
			</div>

			<div className='text-center'>
				<h2 className='text-3xl'>Product not found</h2>
				<p>{error.message}</p>
			</div>
		</div>
	);
}
