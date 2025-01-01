import { z } from "zod";
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Form, Formik } from 'formik';
import { useId } from 'react';
import { Input } from '@components/input';
import { CheckoutNavigationButton } from '@components/checkout-navigation-button';
import { useCart, useUpdateCart } from '@store';
import { removeEmptyValues } from '../modules/utils';
import { HttpTypes } from '@medusajs/types';

type SubType = Pick<HttpTypes.StoreCartAddress, 'postal_code' | 'metadata' | 'address_1' | 'address_2' | 'city' | 'company' | 'country_code' | 'province'>;

const validationSchema = z.object({
	metadata: z.object({}).optional(),
	company: z.string().optional(),
	address_1: z.string().optional(),
	address_2: z.string().optional(),
	city: z.string().optional(),
	country_code: z.string().optional(),
	province: z.string().optional(),
	postal_code: z.string().optional(),
});

export interface CheckoutUserInfoProps {
	onDone: (values: SubType) => void;
	goBack: () => void;
}

export function CheckoutShippingAddress({ onDone, goBack }: CheckoutUserInfoProps) {
	const id = useId();
	const cart = useCart();
	const updateCart = useUpdateCart();

	const onSubmit = async (values: HttpTypes.StoreCartAddress) => {
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
					...values,
				}),
			},
		});

		onDone(values);
	};

	return (
		<Formik<SubType>
			initialValues={{
				address_1: cart?.shipping_address?.address_1 || '',
				address_2: cart?.shipping_address?.address_2 || '',
				company: cart?.shipping_address?.company || '',
				postal_code: cart?.shipping_address?.postal_code || '',
				city: cart?.shipping_address?.city || '',
				country_code: cart?.shipping_address?.country_code || '',
				province: cart?.shipping_address?.province || '',
			}}
			validationSchema={toFormikValidationSchema<SubType>(validationSchema)}
			onSubmit={onSubmit}
		>
			<Form className="flex flex-col gap-4" id={id}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Input label="Address" name="address_1" autoComplete="address-line1" />
					<Input label="Address complement" name="address_2" autoComplete="address-line2" />
					<Input label="Company" name="company" autoComplete="organization" />
					<Input label="Postal code" name="postal_code" autoComplete="postal-code" />
					<Input label="City" name="city" autoComplete="address-level2" />
					<Input label="State / Province" name="province" autoComplete="address-level1" />
					<Input label="Country code" name="country_code" autoComplete="country" />
				</div>

				<CheckoutNavigationButton goBack={goBack} />
			</Form>
		</Formik>
	);
}
