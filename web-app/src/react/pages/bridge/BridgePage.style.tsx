import { Button } from '@/components/ui';
import { Card } from '@/components/ui/card';
import { PrimaryMutted } from '@/lib/ui/design-system';
import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

export const PageContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 10px;
`;

export const RightPanel = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex: 1;
`;

export const Text = styled(PrimaryMutted)`
  font-size: 20px;
`;

export const EventPanelButton = styled(Button)`
  width: fit-content;
  padding: 10px;
  gap: 10px;
`;

export const OnboardingComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  text-align: center;
`;
