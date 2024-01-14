import styled from 'styled-components';
import { Card, CardHeader, CardContent } from '@/components/ui';

export const CardComponent = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

export const CardHeaderComponent = styled(CardHeader)`
  padding-bottom: 12px;
`;

export const CardContentComponent = styled(CardContent)`
  padding-bottom: 12px;
`;
