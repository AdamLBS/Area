import {
  Button,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { H3, H4, PrimaryDefault } from '@/lib/ui/design-system';
import { useEventStats } from '@/react/hooks/events';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Megaphone,
  XCircle,
  Zap,
} from 'lucide-react';
import React, { memo } from 'react';
import { OverviewGraph } from './Graph/Graph';
import {
  DotsLoading,
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
  const { data: eventStats, isLoading } = useEventStats(eventUuid);

  return (
    <OverviewContainer>
      {eventStats && !isLoading && (
        <>
          <StatCardsContainer>
            <StatCard>
              <CardHeader className="flex-row justify-between items-center">
                <CardTitle>Calls</CardTitle>
                <Megaphone
                  color="#a1a1aa"
                  style={{ margin: 0 }}
                  strokeWidth={1}
                />
              </CardHeader>
              <CardContent>
                <H3>{eventStats.total}</H3>
                <StatCardDescription>
                  {`calls from the Bridge`}
                </StatCardDescription>
              </CardContent>
            </StatCard>
            <StatCard>
              <CardHeader className="flex-row justify-between items-center">
                <CardTitle>Responses</CardTitle>
                <Zap color="#a1a1aa" style={{ margin: 0 }} strokeWidth={1} />
              </CardHeader>
              <CardContent>
                <H3>{eventStats.success}</H3>
                <StatCardDescription>
                  {`responses from the Bridge`}
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
                <H3>{eventStats.errors}</H3>
                <StatCardDescription>
                  errors during the call
                </StatCardDescription>
              </CardContent>
            </StatCard>
            <StatCard>
              <CardHeader className="flex-row justify-between items-center">
                <CardTitle>Today</CardTitle>
                <Activity
                  color="#a1a1aa"
                  style={{ margin: 0 }}
                  strokeWidth={1}
                />
              </CardHeader>
              <CardContent>
                <H3>{eventStats.today}</H3>
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
                <OverviewGraph uses={eventStats.logsByMonth} />
              </CardContent>
            </GraphCard>
            <LastLogsCard>
              <CardHeader>
                <H4>Recent logs</H4>
                <StatCardDescription>The recent logs sent</StatCardDescription>
              </CardHeader>
              <CardContent>
                <LastLogsContainer>
                  {eventStats.lastLogs.map((log, index) => (
                    <LastLogContainer key={index}>
                      <PrimaryDefault>{`LOG-${log.log_id}`}</PrimaryDefault>
                      {getLogStatus(log.status)}
                    </LastLogContainer>
                  ))}
                </LastLogsContainer>
              </CardContent>
              <CardFooter>
                <Button variant="ghost">See all</Button>
              </CardFooter>
            </LastLogsCard>
          </StatsContentContainer>
        </>
      )}
      {isLoading && <DotsLoading />}
    </OverviewContainer>
  );
};

export const Overview = memo(OverviewComponent);
