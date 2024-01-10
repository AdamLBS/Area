import React, { memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import {
  NavBarContainer,
  TitleContainer,
  NavBarText,
  NavigationMenuList,
  RightContainer,
} from './NavBarLandingPage.style';
import { IconStratos } from '../../icons';
import { NavigationMenu } from '@radix-ui/react-navigation-menu';

const NavBarLandingPageComponent: React.FC = () => {
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
      <TitleContainer>
        <IconStratos style={{ width: '25px', height: '42px' }} color="#fff" />
        <NavBarText>Stratos</NavBarText>
      </TitleContainer>
      <NavigationMenu>
        <NavigationMenuList>
          <Button
            variant="ghost"
            onClick={() => handleRedirection(`dashboard`)}
          >
            Dashboard
          </Button>
          <Button variant="ghost" onClick={() => handleRedirection(`settings`)}>
            Account
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleRedirection(`documentation`)}
          >
            Documentation
          </Button>
        </NavigationMenuList>
      </NavigationMenu>
      <RightContainer>
        <Button variant="default" onClick={() => handleRedirection(`login`)}>
          Login
        </Button>
        <Button variant="outline" onClick={() => handleRedirection(`register`)}>
          Register
        </Button>
        <Button variant="outline" size="icon" onClick={changeTheme}>
          {theme.theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </Button>
      </RightContainer>
    </NavBarContainer>
  );
};

export const NavBarLandingPage = memo(NavBarLandingPageComponent);
