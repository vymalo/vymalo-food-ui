import { Moon, Sun } from 'react-feather';
import { themeChange } from 'theme-change';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from 'react-daisyui';

type Theme = 'vymalo-light' | 'vymalo-dark';

const defaultTheme: Theme = 'vymalo-light';

const calculateNextTheme = (theme?: string): Theme => {
	if (theme === 'vymalo-light') {
		return 'vymalo-dark';
	}
	if (theme === 'vymalo-dark') {
		return 'vymalo-light';
	}
	return defaultTheme;
};

export function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>();
	useEffect(() => {
		if (theme) {
			localStorage.setItem('vymalo-theme', theme);
		}
	}, [theme]);

	useEffect(() => {
		themeChange(false);
		// 👆 false parameter is required for react project
	}, []);

	const onChange = useCallback(() => {
		setTheme((prev) => calculateNextTheme(prev));
	}, []);

	const nextTheme = useMemo(() => calculateNextTheme(theme), [theme]);

	useEffect(() => {
		if (!theme) {
			const t = (localStorage.getItem('vymalo-theme') as Theme) ?? defaultTheme;
			setTheme(t);
		}
	}, [theme]);

	return (
		<Button variant='outline' shape="circle" data-set-theme={nextTheme} onClick={onChange}>
			{/* sun icon */}
			{theme === 'vymalo-light' && <Sun className="h-6 w-6" />}

			{/* moon icon */}
			{theme === 'vymalo-dark' && <Moon className="h-6 w-6" />}
		</Button>
	);
}
