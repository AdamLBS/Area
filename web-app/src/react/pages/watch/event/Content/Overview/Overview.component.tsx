import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Button,
} from '@/components/ui';
import { useEventStats } from '@/react/hooks/events';
import React, { memo } from 'react';
import {
  GraphCard,
  LastLogContainer,
  LastLogRightWrapper,
  LastLogsCard,
  LastLogsContainer,
  OverviewContainer,
  StatCard,
  StatCardDescription,
  StatCardsContainer,
  StatsContentContainer,
} from './Overview.style';
import {
  Activity,
  AlertOctagon,
  Megaphone,
  Zap,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from 'lucide-react';
import { H3, H4, PrimaryDefault } from '@/lib/ui/design-system';
import { OverviewGraph } from './Graph/Graph';

const getLogStatus = (status: 'success' | 'error' | 'failed') => {
  switch (status) {
    case 'success':
      return (
        <LastLogRightWrapper>
          <CheckCircle2
            color="#a1a1aa"
            style={{ margin: 0 }}
            strokeWidth={1}
            size={16}
          />
          <PrimaryDefault style={{ margin: 0 }}>Success</PrimaryDefault>
        </LastLogRightWrapper>
      );
    case 'error':
      return (
        <LastLogRightWrapper>
          <XCircle
            color="#a1a1aa"
            style={{ margin: 0 }}
            strokeWidth={1}
            size={16}
          />
          <PrimaryDefault style={{ margin: 0 }}>Error</PrimaryDefault>
        </LastLogRightWrapper>
      );
    case 'failed':
      return (
        <LastLogRightWrapper>
          <AlertTriangle
            color="#a1a1aa"
            style={{ margin: 0 }}
            strokeWidth={1}
            size={16}
          />
          <PrimaryDefault style={{ margin: 0 }}>Failed</PrimaryDefault>
        </LastLogRightWrapper>
      );
  }
};

export type EventContentProps = {
  eventUuid: string;
};

const OverviewComponent: React.FC<EventContentProps> = ({ eventUuid }) => {
  const { data: eventStats } = useEventStats(eventUuid);

  return (
    <OverviewContainer>
      <StatCardsContainer>
        <StatCard>
          <CardHeader className="flex-row justify-between items-center">
            <CardTitle>Calls</CardTitle>
            <Megaphone color="#a1a1aa" style={{ margin: 0 }} strokeWidth={1} />
          </CardHeader>
          <CardContent>
            <H3>7</H3>
            <StatCardDescription>calls from Discord event</StatCardDescription>
          </CardContent>
        </StatCard>
        <StatCard>
          <CardHeader className="flex-row justify-between items-center">
            <CardTitle>Responses</CardTitle>
            <Zap color="#a1a1aa" style={{ margin: 0 }} strokeWidth={1} />
          </CardHeader>
          <CardContent>
            <H3>7</H3>
            <StatCardDescription>
              responses from Discord event
            </StatCardDescription>
          </CardContent>
        </StatCard>
        <StatCard>
          <CardHeader className="flex-row justify-between items-center">
            <CardTitle>Errors</CardTitle>
            <AlertOctagon
              color="#a1a1aa"
              style={{ margin: 0 }}
              strokeWidth={1}
            />
          </CardHeader>
          <CardContent>
            <H3>7</H3>
            <StatCardDescription>errors during the call</StatCardDescription>
          </CardContent>
        </StatCard>
        <StatCard>
          <CardHeader className="flex-row justify-between items-center">
            <CardTitle>Today</CardTitle>
            <Activity color="#a1a1aa" style={{ margin: 0 }} strokeWidth={1} />
          </CardHeader>
          <CardContent>
            <H3>7</H3>
            <StatCardDescription>events sent today</StatCardDescription>
          </CardContent>
        </StatCard>
      </StatCardsContainer>
      <StatsContentContainer>
        <GraphCard>
          <CardHeader>
            <CardTitle>Uses</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewGraph />
          </CardContent>
        </GraphCard>
        <LastLogsCard>
          <CardHeader>
            <H4>Recent logs</H4>
            <StatCardDescription>The recent logs sent</StatCardDescription>
          </CardHeader>
          <CardContent>
            <LastLogsContainer>
              <LastLogContainer>
                <PrimaryDefault>Log-1</PrimaryDefault>
                {getLogStatus('success')}
              </LastLogContainer>
              <LastLogContainer>
                <PrimaryDefault>Log-2</PrimaryDefault>
                {getLogStatus('success')}
              </LastLogContainer>
              <LastLogContainer>
                <PrimaryDefault>Log-3</PrimaryDefault>
                {getLogStatus('success')}
              </LastLogContainer>
            </LastLogsContainer>
          </CardContent>
          <CardFooter>
            <Button variant="ghost">See all</Button>
          </CardFooter>
        </LastLogsCard>
      </StatsContentContainer>
    </OverviewContainer>
  );
};

export const Overview = memo(OverviewComponent);
