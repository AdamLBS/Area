import React, { memo } from 'react';

import { IconProps, DEFAULT_ICON_SIZE } from './constants';

export const IconLinkedin = memo(
  ({ size = DEFAULT_ICON_SIZE, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 44 43"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4.778"
        d="M12.333 19.111v11.945m0-19.112v.024m9.556 19.088V19.11m9.555 11.945v-7.167a4.778 4.778 0 10-9.555 0M2.778 7.167a4.778 4.778 0 014.778-4.778h28.666A4.778 4.778 0 0141 7.167v28.666a4.778 4.778 0 01-4.778 4.778H7.556a4.778 4.778 0 01-4.778-4.778V7.167z"
      />
    </svg>
  ),
);
