import styled from 'styled-components';
import { Card as _Card } from '@/components/ui';

export const Card = styled(_Card)`
  display: flex;
  flex-direction: column;
  width: 445px;
  padding: 24px;
  gap: 6px;
`;

export const Header = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background-color: #94a3b8;
  border-radius: 6.667px;
`;
