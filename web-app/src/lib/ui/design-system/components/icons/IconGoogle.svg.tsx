import React, { memo } from 'react';
import { IconProps } from './constants';

export const IconGoogle = memo(({ ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="49"
    height="49"
    fill="none"
    viewBox="0 0 49 49"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4.778"
      d="M45.867 22.11a21.5 21.5 0 11-7.845-14.326L31.679 13.5a13.139 13.139 0 105.062 15.778h-9.854V22.11h18.98z"
    />
  </svg>
));
