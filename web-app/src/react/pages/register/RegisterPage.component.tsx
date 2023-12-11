'use client';
import React, { memo, useCallback, useState } from 'react';
import {
  FormContainer,
  HeaderContainer,
  LoginButton,
  MainContainer,
  PageContainer,
  RightContainer,
  Subtitle,
  Title,
} from './RegisterPage.style';
import { ColumnLayout } from '@/lib/ui/design-system';
import { useRouter } from 'next/navigation';
import { TABS } from './constants';
import { RegisterForm } from './RegisterForm';
import { MailForm } from './MailForm';

const Register = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TABS>(TABS.STEP_1);

  const handleLogin = useCallback(() => {
    router.push('/login');
  }, [router]);

  return (
    <PageContainer>
      <ColumnLayout />
      <RightContainer>
        <LoginButton onClick={handleLogin}>Log in</LoginButton>
        <MainContainer>
          {activeTab == TABS.STEP_1 && (
            <FormContainer>
              <HeaderContainer>
                <Title>Create an account</Title>
                <Subtitle>
                  Enter your email below to create your account
                </Subtitle>
              </HeaderContainer>
              <MailForm onNextStep={() => setActiveTab(TABS.STEP_2)} />
            </FormContainer>
          )}
          {activeTab == TABS.STEP_2 && (
            <FormContainer>
              <HeaderContainer>
                <Title>Create an account</Title>
                <Subtitle>Enter your username and your password</Subtitle>
              </HeaderContainer>
              <RegisterForm onCancel={() => setActiveTab(TABS.STEP_1)} />
            </FormContainer>
          )}
        </MainContainer>
      </RightContainer>
    </PageContainer>
  );
};

export const RegisterPage = memo(Register);
