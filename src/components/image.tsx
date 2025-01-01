import type { ImgHTMLAttributes } from 'react';
import { toSharpUrl } from '@shared/images';

export function AppImage({
													 src = '/vymalo.svg',
													 width = 256,
													 height = 256,
													 ...rest
												 }: ImgHTMLAttributes<HTMLImageElement> & { src?: string | null }) {
	const finalSrc = !src?.startsWith('/') ? toSharpUrl(src!, width, height) : src;
	return (
		<img
			{...rest}
			width={width}
			height={height}
			src={finalSrc}
		/>
	);
}
