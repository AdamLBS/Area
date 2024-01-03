import React from 'react';
import { EventPage } from '@/react/pages';

export default function Page({ params }: { params: { id: string } }) {
  return <EventPage currentUuid={params.id} />;
}
