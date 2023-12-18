import React, { memo, useCallback } from 'react';
import {
  HeaderContainer,
  NavBarContainer,
  TitleContainer,
  MenuContainer,
  DarkContainer,
  Stratos,
} from './NavigationBar.style';
import { H2, IconMoon } from '@/lib/ui/design-system';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';

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
          <H2>{pageName}</H2>
        </TitleContainer>
        <MenuContainer>
          <Button
            variant="ghost"
            onClick={() => handleRedirection(`dashboard`)}
          >
            Dashboard
          </Button>
          <Button variant="ghost" onClick={() => handleRedirection(`settings`)}>
            Settings
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleRedirection(`documentation`)}
          >
            Documentation
          </Button>
        </MenuContainer>
        <DarkContainer>
          <Button variant="outline" size="icon">
            <IconMoon />
          </Button>
        </DarkContainer>
      </HeaderContainer>
    </NavBarContainer>
  );
};

export const NavBar = memo(NavigationBarComponent);
