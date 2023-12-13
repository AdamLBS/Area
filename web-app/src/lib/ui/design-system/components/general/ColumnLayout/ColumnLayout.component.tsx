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
import { IconGoogle } from '../../icons';
import { IconLinkedin } from '../../icons/IconLinkedin.svg';
import { IconTwitch } from '../../icons/IconTwitch.svg';
import { IconGithub } from '../../icons/IconGithub.svg';
import { IconDiscord } from '../../icons/IconDiscord.svg';
import { IconSpotify } from '../../icons/IconSpotify.svg';

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
