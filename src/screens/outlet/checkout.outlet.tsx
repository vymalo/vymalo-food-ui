import { Link, Outlet } from 'react-router-dom';
import { ThemeToggle } from '@components/theme-change-button';
import { AppImage } from '@components/image';
import { ShoppingCart, X } from 'react-feather';
import { useGetCustomerThunk, useListShippingMethods } from '@store';
import { useEffect, useId } from 'react';
import { CheckoutProductList } from '@components/checkout-product-list';

export function Component() {
	//const createPaymentSessions = useCreatePaymentSessions();
	const listShippingMethods = useListShippingMethods();
	const getCustomerThunk = useGetCustomerThunk();
	const id = useId();

	useEffect(() => {
		//createPaymentSessions();
		listShippingMethods();
		getCustomerThunk();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className='drawer drawer-end lg:drawer-open'>
				<input id={id} type='checkbox' className='drawer-toggle' />
				<div className='drawer-content lg:w-[50vw]'>
					<div className='sticky top-0 inset-x-0 z-50 group bg-base-100 border-b border-b-base-300'>
						<div className='container'>
							<nav className='navbar'>
								<div className='navbar-start'>
									<button className='btn btn-ghost uppercase text-xl'>
										<AppImage
											width={32}
											height={32}
											src='/vymalo.png'
											alt='Vymalo'
											className='h-8'
										/>
										<span>Vymalo</span>
									</button>
								</div>

								<div className='navbar-end flex gap-2 md:gap-4 lg:gap-6'>
									<Link to='/bag' className='btn btn-circle btn-outline'>
										<X />
									</Link>

									<ThemeToggle />

									<label
										htmlFor={id}
										className='btn btn-outline btn-circle drawer-button lg:hidden'
									>
										<ShoppingCart />
									</label>
								</div>
							</nav>
						</div>
					</div>

					<div className='container'>
						<div className='lg:ml-auto pt-4 sm:p-4'>
							<Outlet />
						</div>
					</div>
				</div>

				<div className='drawer-side'>
					<label
						htmlFor={id}
						aria-label='close sidebar'
						className='drawer-overlay'
					></label>
					<CheckoutProductList />
				</div>
			</div>
		</>
	);
}
