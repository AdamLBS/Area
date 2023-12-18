import React, { memo } from 'react';

import { IconProps, DEFAULT_ICON_SIZE } from './constants';

export const IconSpotify = memo(
  ({ size = DEFAULT_ICON_SIZE, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 49 49"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4.778"
        d="M14.568 24.435c5.972-3.519 13.14-2.324 17.917 1.26m-15.528 5.971c3.583-2.388 9.556-2.388 11.945 1.195M12.179 17.333c4.778-2.389 14.334-4.778 23.89 1.195M2.623 24.5a21.5 21.5 0 1043 0 21.5 21.5 0 00-43 0z"
      />
    </svg>
  ),
);
