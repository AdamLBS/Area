import React from 'react';
import { WatchEventPage } from '@/react/pages';

export default function Page({ params }: { params: { id: string } }) {
  return <WatchEventPage currentUuid={params.id} />;
}
