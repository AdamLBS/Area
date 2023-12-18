import React, { memo, useCallback } from 'react';
import {
  HeaderContainer,
  NavBarContainer,
  TitleContainer,
  Title,
  MenuContainer,
  MenuButton,
  DarkContainer,
  DarkModeButton,
  Stratos,
} from './NavigationBar.style';
import { IconMoon } from '@/lib/ui/design-system';
import { useRouter } from 'next/navigation';

export type NavBarProps = {
  pageName: string;
};

const NavigationBarComponent: React.FC<NavBarProps> = ({ pageName }) => {
  const router = useRouter();

  const handleRedirection = useCallback(
    (page: string) => {
      router.push(`/${page}`);
    },
    [router],
  );

  return (
    <NavBarContainer>
      <HeaderContainer>
        <TitleContainer>
          <Stratos />
          <Title>{pageName}</Title>
        </TitleContainer>
        <MenuContainer>
          <MenuButton onClick={() => handleRedirection(`dashboard`)}>
            Dashboard
          </MenuButton>
          <MenuButton onClick={() => handleRedirection(`settings`)}>
            Settings
          </MenuButton>
          <MenuButton onClick={() => handleRedirection(`documentation`)}>
            Documentation
          </MenuButton>
        </MenuContainer>
        <DarkContainer>
          <DarkModeButton>
            <IconMoon />
          </DarkModeButton>
        </DarkContainer>
      </HeaderContainer>
    </NavBarContainer>
  );
};

export const NavBar = memo(NavigationBarComponent);
