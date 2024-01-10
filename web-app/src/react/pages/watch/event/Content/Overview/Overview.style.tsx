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

export const DotsLoading = styled.div`
  width: 56px;
  height: 26.9px;
  align-self: center;
  justify-self: center;
  background:
    radial-gradient(circle closest-side, #7c3aed 90%, #0000) 0% 50%,
    radial-gradient(circle closest-side, #7c3aed 90%, #0000) 50% 50%,
    radial-gradient(circle closest-side, #7c3aed 90%, #0000) 100% 50%;
  background-size: calc(100% / 3) 13.4px;
  background-repeat: no-repeat;
  animation: dots-7ar3yq 1s infinite linear;
  @keyframes dots-7ar3yq {
    20% {
      background-position:
        0% 0%,
        50% 50%,
        100% 50%;
    }
    40% {
      background-position:
        0% 100%,
        50% 0%,
        100% 50%;
    }
    60% {
      background-position:
        0% 50%,
        50% 100%,
        100% 0%;
    }
    80% {
      background-position:
        0% 50%,
        50% 50%,
        100% 100%;
    }
  }
`;
