import { CheckoutNavigationButton } from '@components/checkout-navigation-button';
import { Field, Form, Formik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useShipments } from '@modules/shipment';
import { useAddShippingMethod, useCart } from '@modules/cart';

const validationSchema = z.object({
  optionId: z.string(),
});

export interface FormValues {
  optionId: string;
}

export interface CheckoutUserInfoProps {
  onDone: () => void;
  goBack: () => void;
}

export function CheckoutUserShipment({
  goBack,
  onDone,
}: Readonly<CheckoutUserInfoProps>) {
  const all = useShipments();
  const cart = useCart();
  const addShippingMethod = useAddShippingMethod();
  const onSubmit = async (values: FormValues) => {
    await addShippingMethod({ shippingMethodId: values.optionId });
    onDone();
  };

  return (
    <Formik<FormValues>
      initialValues={{
        optionId: cart?.shipping_methods?.[0]?.shipping_option_id || '',
      }}
      validationSchema={toFormikValidationSchema<FormValues>(validationSchema)}
      onSubmit={onSubmit}>
      <Form className='flex flex-col gap-4'>
        <div className='grid grid-cols-2 gap-4'>
          {all.map((shipment) => (
            <div
              key={shipment.id}
              className='form-control w-full rounded-xl border border-primary p-2'>
              <label className='label cursor-pointer'>
                <div className='flex flex-col justify-between'>
                  <div>
                    <h3 className='text-lg font-semibold'>{shipment.name}</h3>
                    <p className='text-sm'>{shipment.provider_id}</p>
                  </div>
                  <div>
                    <p className='text-lg font-semibold'>{shipment.amount}</p>
                  </div>
                </div>
                <Field
                  type='radio'
                  className='radio checked:bg-primary'
                  name='optionId'
                  value={shipment.id}
                />
              </label>
            </div>
          ))}
        </div>

        <CheckoutNavigationButton goBack={goBack} />
      </Form>
    </Formik>
  );
}
