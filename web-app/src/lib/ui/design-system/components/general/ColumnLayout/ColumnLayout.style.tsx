import styled from 'styled-components';
import { PrimaryLarge } from '@/lib/ui/design-system';

export const Container = styled.div`
  flex: 1;
  background-color: #18181b;
  padding: 32px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const NameContainer = styled(PrimaryLarge)`
  font-weight: 500;
`;
