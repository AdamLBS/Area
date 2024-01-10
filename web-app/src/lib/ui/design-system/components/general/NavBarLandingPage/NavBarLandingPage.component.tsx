import React, { memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
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
          <Button variant="ghost" onClick={() => handleRedirection(`bridge`)}>
            Bridge
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
      </RightContainer>
    </NavBarContainer>
  );
};

export const NavBarLandingPage = memo(NavBarLandingPageComponent);
