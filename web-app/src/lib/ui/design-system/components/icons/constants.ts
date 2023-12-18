import { SVGAttributes } from 'react';

export const DEFAULT_ICON_SIZE = 32;

export type IconProps = SVGAttributes<SVGSVGElement> & {
  size?: number;
};
