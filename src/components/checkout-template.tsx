import { CheckoutUserInfo } from '@components/checkout-user-info';
import { useCallback, useId, useState } from 'react';
import { Collapse } from '@components/collapse';
import { CheckoutShippingAddress } from '@components/checkout-shipping-address';
import { ArrowUp } from 'react-feather';
import { CheckoutUserShipment } from '@components/checkout-user-shipment';

export function CheckoutTemplate() {
	const [step, setStep] = useState(0);
	const collapseName = useId();

	const goNext = useCallback(() => setStep(p => ++p), []);
	const goBack = useCallback(() => setStep(p => --p), []);

	return (
		<div>
			<h2 className="sr-only">
				Payment and shipping details
			</h2>

			<Collapse collapseName={collapseName} open={step === 0} title="Contact info">
				<CheckoutUserInfo
					onDone={goNext}
				/>
			</Collapse>

			<Collapse collapseName={collapseName} open={step === 1} title="Shipping address">
				<CheckoutShippingAddress
					goBack={goBack}
					onDone={goNext}
				/>
			</Collapse>

			<Collapse collapseName={collapseName} open={step === 2} title="Payment method">
				<CheckoutUserShipment
					goBack={goBack}
					onDone={goNext}
				/>
			</Collapse>

			<Collapse collapseName={collapseName} open={step === 3} title="Review order">
				<p>hello</p>
				<button
					className="btn btn-primary btn-outline max-md:btn-block"
					type="button"
					onClick={goBack}
				>
					<span>Back</span>
					<ArrowUp />
				</button>
			</Collapse>
		</div>
	);
}