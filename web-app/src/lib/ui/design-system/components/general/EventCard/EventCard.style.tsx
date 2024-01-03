import styled from 'styled-components';
import { Card as _Card } from '@/components/ui';
import { H3 } from '../Text';

export const Card = styled(_Card)`
  display: flex;
  flex-direction: column;
  max-width: 445px;
  min-width: 320px;
  width: 100%;
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

export const Title = styled(H3)`
  text-transform: capitalize;
`;
