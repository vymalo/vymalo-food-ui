import { Button } from 'react-daisyui';
import * as _ from 'lodash';
import { HttpTypes } from '@medusajs/types';

type OptionSelectProps = {
	option: HttpTypes.StoreProductOption;
	current: string;
	updateOption: (option: Record<string, string>) => void;
	title: string;
};

export function ProductOption({
	option,
	current,
	updateOption,
	title,
}: OptionSelectProps) {
	const filteredOptions = _.uniq(option.values?.map((v) => v.value));

	return (
		<div className='flex flex-col gap-y-2 md:gap-y-4'>
			<div className='sm:hidden join w-full'>
				<span className='join-item btn btn-sm'>{title}</span>
				<select
					onChange={({ target: { value: v } }) =>
						updateOption({ [option.id]: v })
					}
					className='join-item w-full select select-sm'
				>
					<option />
					{filteredOptions.map((v) => (
						<option key={v} value={v}>
							{v}
						</option>
					))}
				</select>
			</div>

			<span className='text-sm hidden sm:block'>Select {title}</span>
			<div className='gap-2 hidden sm:flex sm:flex-row sm:flex-wrap'>
				{filteredOptions.map((v) => (
					<Button
						variant={v !== current ? 'outline' : undefined}
						color={v === current ? 'primary' : undefined}
						onClick={() => updateOption({ [option.id]: v })}
						key={v}
					>
						{v}
					</Button>
				))}
			</div>
		</div>
	);
}
