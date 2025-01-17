import type { ImgHTMLAttributes } from 'react';
import { toSharpUrl } from '@modules/utils.ts';
import icon from '/vymalo.svg';

export function AppImage({
                           src = icon,
                           width = 256,
                           height = 256,
                           ...rest
                         }: ImgHTMLAttributes<HTMLImageElement> & { src?: string | null }) {
  const finalSrc = !src?.startsWith('/') ? toSharpUrl(src, width, height) : src;
  return <img {...rest} width={width} height={height} src={finalSrc} />;
}
