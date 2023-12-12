import React, { memo } from 'react';
import {
  Container,
  FormContainer,
  Logo,
  LogoContainer,
  MainContainer,
  NameContainer,
  TitleContainer,
} from './ColumnLayout.style';

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
      </MainContainer>
    </Container>
  );
};

export const ColumnLayout = memo(ColumnLayoutComponent);
