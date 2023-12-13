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

const ColumnLayoutComponent = () => {
  return (
    <Container>
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
            <IconGoogle />
            <IconLinkedin />
            <IconTwitch />
            <IconGithub />
            <IconDiscord />
            <IconSpotify />
          </ServicesContainer>
        </DescriptionContainer>
      </MainContainer>
    </Container>
  );
};

export const ColumnLayout = memo(ColumnLayoutComponent);
