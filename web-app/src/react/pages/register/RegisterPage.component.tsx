'use client';
import React, { memo } from 'react';
import { PageContainer, RightContainer } from './RegisterPage.style';
import { ColumnLayout, PrimaryDefault } from '@/lib/ui/design-system';

const Register = () => {
  return (
    <PageContainer>
      <ColumnLayout />
      <RightContainer>
        <PrimaryDefault>Hello</PrimaryDefault>
      </RightContainer>
    </PageContainer>
  );
};

export const RegisterPage = memo(Register);
