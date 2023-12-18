import React, { memo } from 'react';

import { IconProps } from './constants';

export const IconGithub = memo(({ ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="46"
    height="49"
    fill="none"
    viewBox="0 0 46 49"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4.778"
      d="M17.109 41.13C6.837 44.473 6.837 35.156 2.775 33.962m28.667 11.944v-8.36c0-2.39.239-3.345-1.194-4.779 6.689-.716 13.138-3.344 13.138-14.333a10.99 10.99 0 00-3.105-7.644c.933-2.48.847-5.228-.239-7.645 0 0-2.628-.717-8.361 3.106a29.383 29.383 0 00-14.811 0c-5.734-3.823-8.361-3.106-8.361-3.106a10.033 10.033 0 00-.24 7.645 10.989 10.989 0 00-3.105 7.644c0 10.989 6.45 13.617 13.14 14.333-1.434 1.434-1.434 2.867-1.195 4.778v8.361"
    />
  </svg>
));
