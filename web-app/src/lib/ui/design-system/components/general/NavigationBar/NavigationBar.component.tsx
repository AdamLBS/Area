import React, { ReactNode, memo, useCallback } from 'react';
import {
  HeaderContainer,
  NavBarContainer,
  TitleContainer,
  MenuContainer,
  DarkContainer,
  IconContainer,
} from './NavigationBar.style';
import { H2 } from '@/lib/ui/design-system';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

export type NavBarProps = {
  pageName: string;
  icon: ReactNode;
};

const NavigationBarComponent: React.FC<NavBarProps> = ({ pageName, icon }) => {
  const router = useRouter();
  const { setTheme } = useTheme();
  const theme = useTheme();

  const changeTheme = () => {
    if (theme.theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

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
          <IconContainer>
            {React.cloneElement(icon as React.ReactElement, {
              size: 42,
              color: '#fff',
            })}
          </IconContainer>
          <H2>{pageName}</H2>
        </TitleContainer>
        <MenuContainer>
          <Button variant="ghost" onClick={() => handleRedirection(`bridge`)}>
            Bridge
          </Button>
          <Button variant="ghost" onClick={() => handleRedirection(`watch`)}>
            Watch
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
          <Button variant="outline" size="icon" onClick={changeTheme}>
            {theme.theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </Button>
        </DarkContainer>
      </HeaderContainer>
    </NavBarContainer>
  );
};

export const NavBar = memo(NavigationBarComponent);
