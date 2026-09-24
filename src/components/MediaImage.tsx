import type { ImgHTMLAttributes } from 'react';
import manifest from '../media-manifest.json';

type Media = {src:string; width:number; height:number; srcSet:string};
export function publicImage(src: string) {
  let key = src;
  try { key = decodeURIComponent(src); } catch { /* Keep malformed URLs unchanged. */ }
  return (manifest as Record<string,Media>)[key];
}
export default function MediaImage({src = '',alt = '',loading = 'lazy',sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',...props}: ImgHTMLAttributes<HTMLImageElement>) {
  const local = publicImage(src);
  const dimensions = src.match(/-(\d+)x(\d+)\.[a-z]+/i);
  let width = local?.width;
  let height = local?.height;
  if (!local && dimensions) {
    const url = new URL(src);
    width = Number(url.searchParams.get('w')) || Number(dimensions[1]);
    height = Number(url.searchParams.get('h')) || Math.round(width * Number(dimensions[2]) / Number(dimensions[1]));
  }
  return <img {...props} src={local?.src || src} alt={alt} width={width || props.width} height={height || props.height} srcSet={local?.srcSet || props.srcSet} sizes={sizes} loading={props.fetchPriority === 'high' ? 'eager' : loading} decoding="async"/>;
}
