import { CardDescription, CardTitle, Toaster } from '@/components/ui';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEvent } from '@/react/hooks/events';
import React, { memo } from 'react';
import {
  Card,
  CardHeader,
  Container,
  Tabs,
  TabsContent,
} from './Content.style';
import { Overview } from './Overview/Overview.component';

export type EventContentProps = {
  eventUuid: string;
};

const EventContentComponent: React.FC<EventContentProps> = ({ eventUuid }) => {
  const { data: event } = useEvent(eventUuid);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{event?.name}</CardTitle>
        <CardDescription>{event?.description}</CardDescription>
      </CardHeader>
      <Container>
        <Tabs defaultValue="overview" style={{ display: 'flex', gap: '24px' }}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Overview eventUuid={eventUuid} />
          </TabsContent>
          <TabsContent value="logs">
            <Card />
          </TabsContent>
        </Tabs>
      </Container>
      <Toaster />
    </Card>
  );
};

export const Content = memo(EventContentComponent);
