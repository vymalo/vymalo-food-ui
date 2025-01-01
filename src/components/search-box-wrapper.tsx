import { ChangeEvent, ReactElement, ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { useSearchBox, UseSearchBoxProps } from 'react-instantsearch';
import { useNavigate } from 'react-router-dom';

type SearchBoxProps = {
	children: (state: {
		value: string;
		inputRef: RefObject<HTMLInputElement>;
		onChange: (event: ChangeEvent<HTMLInputElement>) => void;
		onReset: () => void;
	}) => ReactNode;
} & UseSearchBoxProps;

export function SearchBoxWrapper({ children, ...rest }: SearchBoxProps) {
	const { query, refine } = useSearchBox(rest);
	const [value, setValue] = useState(query);
	const inputRef = useRef<HTMLInputElement>(null);

	const nav = useNavigate();

	const onReset = () => {
		setValue('');
	};

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.currentTarget.value);
	};

	const onSubmit = () => {
		if (value) {
			nav(`/search/results/${value}`);
		}
	};

	useEffect(() => {
		if (query !== value) {
			refine(value);
		}
		// We don't want to track when the InstantSearch query changes.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	useEffect(() => {
		// We bypass the state update if the input is focused to avoid concurrent
		// updates when typing.
		if (document.activeElement !== inputRef.current && query !== value) {
			setValue(query);
		}
		// We don't want to track when the React state value changes.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const state = {
		value,
		inputRef,
		onChange,
		onSubmit,
		onReset,
	};

	return children(state) as ReactElement;
}