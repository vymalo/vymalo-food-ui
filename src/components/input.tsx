import { clsx } from 'clsx';
import { type FieldHookConfig, useField } from 'formik';
import type { InputHTMLAttributes, RefObject } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  ref?: RefObject<HTMLInputElement>;
}

export function Input({
  label,
  ...rest
}: Readonly<FieldHookConfig<string> & InputProps>) {
  const [inputProps, { error }] = useField({ ...rest });
  return (
    <label className='form-control w-full'>
      <div className='label'>
        <span className='label-text'>{label ?? rest.name}</span>
      </div>
      <input
        {...rest}
        {...inputProps}
        className={clsx('input input-bordered w-full', rest.className)}
      />
      {error ? (
        <div className='label'>
          <span className='label-text-alt text-error'>{error}</span>
        </div>
      ) : (
        ''
      )}
    </label>
  );
}
