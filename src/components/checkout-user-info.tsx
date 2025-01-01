import { z } from 'zod';
import { Form, Formik } from 'formik';
import { useId } from 'react';
import { Input } from '@components/input';
import { CheckoutNavigationButton } from '@components/checkout-navigation-button';
import { useCart, useUpdateCart } from '@store';
import { removeEmptyValues } from '../modules/utils';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { HttpTypes } from '@medusajs/types';

export interface CheckoutUserInfoData {
	firstname: string;
	lastname: string;
	phone: string;
	email: string;
}

const validationSchema = z.object({
	firstname: z.string(),
	lastname: z.string(),
	phone: z.string(),
	email: z.string().email('required.email'),
});

export interface CheckoutUserInfoProps {
	onDone: (values: CheckoutUserInfoData) => void;
	goBack?: () => void;
}

export function CheckoutUserInfo({ onDone, goBack }: CheckoutUserInfoProps) {
	const id = useId();
	const cart = useCart();
	const updateCart = useUpdateCart();

	const onSubmit = async (values: CheckoutUserInfoData) => {
		if (!cart) {
			return;
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { id, created_at, updated_at, customer_id, ...rest } = cart.shipping_address || {};
		await updateCart({
			cartId: cart.id,
			data: {
				shipping_address: removeEmptyValues({
					...(rest as HttpTypes.StoreCartAddress),
					first_name: values.firstname,
					last_name: values.lastname,
					phone: values.phone,
				}),
				email: values.email,
			},
		});

		onDone(values);
	};

	return (
		<Formik<CheckoutUserInfoData>
			initialValues={{
				firstname: cart?.shipping_address?.first_name || '',
				lastname: cart?.shipping_address?.last_name || '',
				phone: cart?.shipping_address?.phone || '',
				email: cart?.email || '',
			}}
			validationSchema={toFormikValidationSchema<CheckoutUserInfoData>(validationSchema)}
			onSubmit={onSubmit}
		>
			<Form className="flex flex-col gap-4" id={id}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Input label="Firstname" name="firstname" />
					<Input label="Lastname" name="lastname" />
					<Input label="Email" name="email" type="email" />
					<Input label="Phone number" name="phone" type="tel" />
				</div>

				<CheckoutNavigationButton goBack={goBack} />
			</Form>
		</Formik>
	);
};
