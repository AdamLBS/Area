'use client';
import React, { memo, useCallback } from 'react';
import {
  FormContainer,
  HeaderContainer,
  InputsContainer,
  LoginButton,
  MainContainer,
  PageContainer,
  RightContainer,
  Subtitle,
  Title,
} from './LoginPage.style';
import { ColumnLayout } from '@/lib/ui/design-system';
import { useRouter } from 'next/navigation';
import { LoginForm } from './LoginForm';

const Login = () => {
  const router = useRouter();

  const handleRegsiter = useCallback(() => {
    router.push('/register');
  }, [router]);

  return (
    <PageContainer>
      <ColumnLayout />
      <RightContainer>
        <LoginButton onClick={handleRegsiter}>Create an Account</LoginButton>
        <MainContainer>
          <FormContainer>
            <HeaderContainer>
              <Title>Sign In</Title>
              <Subtitle>Enter your account access below to sign in</Subtitle>
            </HeaderContainer>
            <InputsContainer>
              <LoginForm />
            </InputsContainer>
          </FormContainer>
        </MainContainer>
      </RightContainer>
    </PageContainer>
  );
};

export const LoginPage = memo(Login);
