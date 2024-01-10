import { Card } from '@/components/ui';
import { PrimarySmall } from '@/lib/ui/design-system';
import styled from 'styled-components';

export const OverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  height: 100%;
`;

export const StatCardsContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;
`;

export const StatCard = styled(Card)`
  width: 100%;
`;

export const StatsContentContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;
`;

export const StatCardDescription = styled(PrimarySmall)`
  color: #a1a1aa;
`;

export const GraphCard = styled(Card)`
  flex: 5;
`;

export const LastLogsCard = styled(Card)`
  flex: 2;
`;

export const LastLogsContainer = styled.div`
  display: flex;
  padding: 0px 24px 24px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const LastLogContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #27272a;
`;

export const LastLogRightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
`;
