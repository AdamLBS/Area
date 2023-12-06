import React, { memo } from 'react';
import {
  Container,
  HeaderContainer,
  NameContainer,
} from './ColumnLayout.style';
import Image from 'next/image';

const ColumnLayoutComponent = () => {
  return (
    <Container>
      <HeaderContainer>
        <Image src="/logo.svg" alt="Stratos Logo" width={20} height={32} />
        <NameContainer>Stratos</NameContainer>
      </HeaderContainer>
    </Container>
  );
};

export const ColumnLayout = memo(ColumnLayoutComponent);
