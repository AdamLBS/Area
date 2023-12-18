import styled from 'styled-components';
import { H2 } from '@/lib/ui/design-system';
import { IconStratos } from '@/lib/ui/design-system/components/icons/IconStratos.svg';
import { Button } from '@/components/ui';

export const NavBarContainer = styled.div`
  flex: 1;
  background-color: #09090b;
  display: flex;
  padding: 20px;
  flex-direction: column;
  gap: 10px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
`;

export const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
`;

export const Title = styled(H2)`
  color: #fafafa;
`;

export const MenuButton = styled(Button)`
  background-color: #09090b;
  &:hover {
    background-color: #1b1b1d;
  }
`;

export const DarkContainer = styled.div`
  display: flex;
  height: 40px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  flex: 1;
`;

export const DarkModeButton = styled(Button)`
  background-color: #09090b;
  border: 1px solid var(--border-border-input, #27272a);
  &:hover {
    background-color: #1b1b1d;
  }
`;

export const Stratos = styled(IconStratos)`
  width: 25px;
  height: 42px;
`;
