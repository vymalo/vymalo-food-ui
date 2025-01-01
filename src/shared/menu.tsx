import { Home, Search, ShoppingBag, User } from 'react-feather';
import { CartMenu } from '@components/cart-menu';

export const menu: MenuItem[] = [
	{
		path: '/',
		key: 'home',
		Icon: Home,
	},
	{
		path: '/search',
		key: 'search',
		Icon: Search,
	},
	{
		path: '/bag',
		key: 'bag',
		Icon: ShoppingBag,
		Render: ({ link, bottom }) => <CartMenu bottom={bottom} link={link} />,
	},
	{
		path: '/profile',
		key: 'profile',
		Icon: User,
	},
];

export interface MenuItem {
	readonly path: string;
	readonly key: string;
	readonly Icon: React.FC<{ className?: string }>;
	readonly Render?: ({link, bottom}: {link: JSX.Element, bottom?: boolean}) => JSX.Element;
}