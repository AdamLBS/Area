import React, { memo, useCallback } from 'react';
import {
  HeaderContainer,
  NavBarContainer,
  TitleContainer,
  MenuContainer,
  DarkContainer,
  Stratos,
} from './NavigationBar.style';
import { H2 } from '@/lib/ui/design-system';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { useTheme } from 'next-themes';
import { MoonIcon } from '@radix-ui/react-icons';

export type NavBarProps = {
  pageName: string;
};

const NavigationBarComponent: React.FC<NavBarProps> = ({ pageName }) => {
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
          <Button variant="outline" size="icon" onClick={changeTheme}>
            <MoonIcon />
          </Button>
        </DarkContainer>
      </HeaderContainer>
    </NavBarContainer>
  );
};

export const NavBar = memo(NavigationBarComponent);
