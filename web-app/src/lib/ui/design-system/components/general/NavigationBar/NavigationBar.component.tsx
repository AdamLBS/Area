import React, { memo, useCallback } from 'react';
import {
  HeaderContainer,
  PageContainer,
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

const NavigationBarComponent: React.FC<NavBarProps> = (pageName) => {
  const router = useRouter();
  const name = pageName.pageName;

  const handleDashboard = useCallback(() => {
    router.push('/dashboard');
  }, [router]);

  const handleSettings = useCallback(() => {
    router.push('/settings');
  }, [router]);

  const handleDocumentation = useCallback(() => {
    router.push('/documentation');
  }, [router]);

  return (
    <PageContainer>
      <HeaderContainer>
        <TitleContainer>
          <Stratos />
          <Title>{name}</Title>
        </TitleContainer>
        <MenuContainer>
          <MenuButton onClick={handleDashboard}>Dashboard</MenuButton>
          <MenuButton onClick={handleSettings}>Settings</MenuButton>
          <MenuButton onClick={handleDocumentation}>Documentation</MenuButton>
        </MenuContainer>
        <DarkContainer>
          <DarkModeButton>
            <IconMoon />
          </DarkModeButton>
        </DarkContainer>
      </HeaderContainer>
    </PageContainer>
  );
};

export const NavBar = memo(NavigationBarComponent);
