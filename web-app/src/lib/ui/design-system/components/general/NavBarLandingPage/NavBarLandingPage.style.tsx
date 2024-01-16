import styled from 'styled-components';
import { NavigationMenuList as NavigationMenuList_ } from '@radix-ui/react-navigation-menu';
import { Button as Button_ } from '@/components/ui';

export const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
`;

export const NavBarText = styled.h2`
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: 36px;
  letter-spacing: -0.75px;
`;

export const NavigationMenuList = styled(NavigationMenuList_)`
  display: flex;
  min-width: 444px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  border-radius: 61px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
`;

export const RightContainer = styled.div`
  display: flex;
  height: 40px;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 10px;
  flex: 1;
`;

export const ButtonHover = styled(Button_)`
  border-radius: var(--radius-rounded-md, 20px);
  border: 1px solid transparent;
  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #27272a;
  }
`;
