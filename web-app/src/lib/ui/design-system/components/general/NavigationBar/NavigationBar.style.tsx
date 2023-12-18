import styled from 'styled-components';
import { H2 } from '@/lib/ui/design-system';
import { IconStratos } from '@/lib/ui/design-system/components/icons/IconStratos.svg';

export const PageContainer = styled.div`
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
  flex: 1 0 0;
`;

export const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1 0 0;
`;

export const Title = styled(H2)`
  padding-top: 10px;
  color: var(--text-text-foreground, #fafafa);
  border-bottom: none;
`;

export const MenuButton = styled.button`
  background-color: #09090b;
  border: none;
  font-size: 14px;
  padding: 10px;
  border-radius: 5px;
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
  flex: 1 0 0;
`;

export const DarkModeButton = styled.button`
  display: flex;
  height: 40px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: var(--radius-rounded-md, 10px);
  border: 1px solid var(--border-border-input, #27272a);
  border-radius: 5px;
  &:hover {
    background-color: #1b1b1d;
  }
`;

export const Stratos = styled(IconStratos)`
  width: 25px;
  height: 42px;
`;
