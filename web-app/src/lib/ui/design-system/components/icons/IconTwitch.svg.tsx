import React, { memo } from 'react';

import { IconProps } from './constants';

export const IconTwitch = memo(({ ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="47"
    fill="none"
    viewBox="0 0 44 47"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4.778"
      d="M31.444 12.75v9.556M21.89 12.75v9.556M2.778 5.583v26.278a2.389 2.389 0 002.389 2.389h4.777v9.556L19.5 34.25h13.34c.635 0 1.242-.25 1.688-.7l5.77-5.767c.446-.449.7-1.056.7-1.691V5.583a2.389 2.389 0 00-2.39-2.389H5.165a2.389 2.389 0 00-2.386 2.39z"
    />
  </svg>
));
