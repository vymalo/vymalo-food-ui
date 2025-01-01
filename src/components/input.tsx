import { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import { clsx } from 'clsx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
}

export function Input({ label, ...rest }: InputProps) {
	const [inputProps, { error }] = useField({ ...rest });
	return (
		<label className="form-control w-full">
			<div className="label">
				<span className="label-text">{label ?? rest.name}</span>
			</div>
			<input
				{...rest}
				{...inputProps}
				className={clsx('input input-bordered w-full', rest.className)}
			/>
			{error ? (
				<div className="label">
				<span className="label-text-alt text-error">
						{error}
				</span>
				</div>
			) : ''}
		</label>
	);
}