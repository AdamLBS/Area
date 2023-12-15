import React, { memo } from 'react';
import {
  Container,
  Description,
  DescriptionContainer,
  ColumnContainer,
  Logo,
  LogoContainer,
  MainContainer,
  NameContainer,
  ServicesContainer,
  TitleContainer,
} from './ColumnLayout.style';
import {
  IconDiscord,
  IconGithub,
  IconGoogle,
  IconLinkedin,
  IconSpotify,
  IconTwitch,
} from '@/lib/ui/design-system';
import { useTheme } from 'next-themes';

const ColumnLayoutComponent = () => {
  const { theme } = useTheme();
  const color = theme === 'dark' ? '#fff' : '#000';

  return (
    <Container backgroundColor={theme === 'dark' ? '#18181b' : '#f3f4f6'}>
      <MainContainer>
        <ColumnContainer>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          <TitleContainer>
            <NameContainer>
              Link all your services. Simple. Fast. Efficient.
            </NameContainer>
          </TitleContainer>
        </ColumnContainer>
        <DescriptionContainer>
          <Description>Some services available</Description>
          <ServicesContainer>
            <IconGoogle color={color} />
            <IconLinkedin color={color} />
            <IconTwitch color={color} />
            <IconGithub color={color} />
            <IconDiscord color={color} />
            <IconSpotify color={color} />
          </ServicesContainer>
        </DescriptionContainer>
      </MainContainer>
    </Container>
  );
};

export const ColumnLayout = memo(ColumnLayoutComponent);
