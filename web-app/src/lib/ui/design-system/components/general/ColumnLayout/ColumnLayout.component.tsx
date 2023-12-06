import React, { memo } from 'react';
import {
  Container,
  HeaderContainer,
  NameContainer,
} from './ColumnLayout.style';
import { IconStratos } from '@/lib/ui/design-system';

const ColumnLayoutComponent = () => {
  return (
    <Container>
      <HeaderContainer>
        <IconStratos />
        <NameContainer>Stratos</NameContainer>
      </HeaderContainer>
    </Container>
  );
};

export const ColumnLayout = memo(ColumnLayoutComponent);
