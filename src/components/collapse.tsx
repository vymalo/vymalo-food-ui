import { PropsWithChildren } from 'react';
import { clsx } from 'clsx';

export interface CollapseProps {
	open: boolean;
	collapseName: string;
	title: string;
}

export function Collapse({ collapseName, children, title, open }: PropsWithChildren<CollapseProps>) {
	return (
		<div className={clsx('collapse collapse-plus', {
			'collapse-open': open,
			'collapse-close': !open,
		})}>
			<input type="radio" name={collapseName} defaultChecked />

			<div className="collapse-title text-xl font-medium">
					<span>{title}</span>
			</div>

			<div className="collapse-content">
				{children}
			</div>
		</div>
	);
}
