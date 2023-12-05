'use client';
import React, { memo } from 'react';
import {
  LeftContainer,
  PageContainer,
  RightContainer,
} from './LoginPage.style';
import { PrimaryDefault } from '@/lib/ui/design-system';

const Login = () => {
  return (
    <PageContainer>
      <LeftContainer>
        <PrimaryDefault>Hello</PrimaryDefault>
      </LeftContainer>
      <RightContainer>
        <PrimaryDefault>Hello</PrimaryDefault>
      </RightContainer>
    </PageContainer>
  );
};

export const LoginPage = memo(Login);
