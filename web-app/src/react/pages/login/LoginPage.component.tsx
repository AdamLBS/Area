'use client';
import React, { memo } from 'react';
import { PageContainer, RightContainer } from './LoginPage.style';
import { ColumnLayout, PrimaryDefault } from '@/lib/ui/design-system';

const Login = () => {
  return (
    <PageContainer>
      <ColumnLayout />
      <RightContainer>
        <PrimaryDefault>Hello</PrimaryDefault>
      </RightContainer>
    </PageContainer>
  );
};

export const LoginPage = memo(Login);
