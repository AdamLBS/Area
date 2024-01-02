'use client';
import { PrivateLayout } from '@/lib/ui/design-system';
import React, { memo } from 'react';

const Event: React.FC = () => {
  return <PrivateLayout pageName="Bridge">Event</PrivateLayout>;
};

export const EventPage = memo(Event);
