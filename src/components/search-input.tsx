import { ChangeEvent, ComponentProps, FormEvent, RefObject } from 'react';
import { Search, X } from 'react-feather';
import { Button } from 'react-daisyui';

export type ControlledSearchBoxProps = ComponentProps<'div'> & {
	inputRef: RefObject<HTMLInputElement>;
	onChange(event: ChangeEvent): void;
	onReset(event: FormEvent): void;
	onSubmit?(event: FormEvent): void;
	value: string;
};

export function SearchInput({
															inputRef,
															onChange,
															onReset,
															onSubmit,
															value,
															...props
														}: ControlledSearchBoxProps) {
	const placeholder = 'Type here to search...';
	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		event.stopPropagation();

		if (onSubmit) {
			onSubmit(event);
		}

		if (inputRef.current) {
			inputRef.current.blur();
		}
	};

	const handleReset = (event: FormEvent) => {
		event.preventDefault();
		event.stopPropagation();

		onReset(event);

		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	return (
		<div {...props} className="w-full mb-4 md:mb-8 sticky top-4 z-10">
			<form className="container" action="" noValidate onSubmit={handleSubmit} onReset={handleReset}>
				<label className="w-full input input-bordered flex items-center gap-2 bg-white">
					<Search />
					<input
						ref={inputRef}
						autoComplete="off"
						autoCorrect="off"
						autoCapitalize="off"
						placeholder={placeholder}
						spellCheck={false}
						value={value}
						onChange={onChange}
						className="grow border-0"
					/>
					{value && (
						<Button
							shape="circle"
							size="sm"
							color="ghost"
							onClick={handleReset}
							type="button"
						>
							<X />
						</Button>
					)}
				</label>
			</form>
		</div>
	);
}