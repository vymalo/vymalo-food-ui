import { ArrowDown, ArrowUp } from 'react-feather';

export interface CheckoutNavigationButtonProps {
  goBack?: () => void;
}

export function CheckoutNavigationButton({
  goBack,
}: CheckoutNavigationButtonProps) {
  return (
    <div className='flex flex-col gap-4 sm:flex-row'>
      {goBack && (
        <button
          className='btn btn-outline btn-primary'
          type='button'
          onClick={goBack}>
          <span>Back</span>
          <ArrowUp />
        </button>
      )}

      <button className='btn btn-primary' type='submit'>
        <span>Continue to shipping</span>
        <ArrowDown />
      </button>
    </div>
  );
}
