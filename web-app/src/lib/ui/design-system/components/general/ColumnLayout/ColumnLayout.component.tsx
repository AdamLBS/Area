import React, { memo } from 'react';
import {
  Container,
  Description,
  DescriptionContainer,
  FormContainer,
  Logo,
  LogoContainer,
  MainContainer,
  NameContainer,
  ServiceContainer,
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
        <FormContainer>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          <TitleContainer>
            <NameContainer>
              Link all your services. Simple. Fast. Efficient.
            </NameContainer>
          </TitleContainer>
        </FormContainer>
        <DescriptionContainer>
          <Description>Some services available</Description>
          <ServiceContainer>
            <IconGoogle />
            <IconLinkedin />
            <IconTwitch />
            <IconGithub />
            <IconDiscord />
            <IconSpotify />
          </ServiceContainer>
        </DescriptionContainer>
      </MainContainer>
    </Container>
  );
};

export const ColumnLayout = memo(ColumnLayoutComponent);
