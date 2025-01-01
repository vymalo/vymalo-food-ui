import { ArrowDown, ArrowUp } from 'react-feather';

export interface CheckoutNavigationButtonProps {
	goBack?: () => void;
}

export function CheckoutNavigationButton({goBack}: CheckoutNavigationButtonProps) {
	return (
		<div className='flex flex-col sm:flex-row gap-4'>
			{goBack && (
				<button
					className="btn btn-primary btn-outline"
					type="button"
					onClick={goBack}>
					<span>Back</span>
					<ArrowUp />
				</button>
			)}

			<button className="btn btn-primary" type="submit">
				<span>Continue to shipping</span>
				<ArrowDown />
			</button>
		</div>
	)
}