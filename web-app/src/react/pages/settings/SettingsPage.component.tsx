'use client';
import React, { memo } from 'react';
import {
  PageContainer,
  Title,
  SubTitle,
  Separator,
  SettingsContainer,
  SettingsContent,
  SettingsOptions,
  ButtonOption,
  SettingsContentHeader,
  SettingsContentBody,
} from './SettingsPage.style';
import { H4, PrimaryMutted } from '@/lib/ui/design-system';
import { UpdateForm } from './UpdateForm';

enum Options {
  PROFILE = 'profile',
  ACCOUNTS = 'accounts',
  ADVANCED = 'advanced',
}

const Settings = () => {
  const [option, setCurrentOption] = React.useState('profile');

  const handleActive = (value: Options) => {
    setCurrentOption(value);
  };

  const formRender = () => {
    switch (option) {
      case Options.PROFILE:
        return <UpdateForm />;
      case Options.ACCOUNTS:
        return <div>Accounts</div>;
      case Options.ADVANCED:
        return <div>Advanced</div>;
      default:
        return <UpdateForm />;
    }
  };

  return (
    <PageContainer>
      <Title>Profile</Title>
      <SubTitle>Manage your account settings</SubTitle>
      <Separator />
      <SettingsContainer>
        <SettingsOptions>
          <ButtonOption
            onClick={() => handleActive(Options.PROFILE)}
            active={option === Options.PROFILE}
            variant="ghost"
          >
            Profile
          </ButtonOption>
          <ButtonOption
            onClick={() => handleActive(Options.ACCOUNTS)}
            active={option === Options.ACCOUNTS}
            variant="ghost"
          >
            Accounts
          </ButtonOption>
          <ButtonOption
            onClick={() => handleActive(Options.ADVANCED)}
            active={option === Options.ADVANCED}
            variant="ghost"
          >
            Advanced settings
          </ButtonOption>
        </SettingsOptions>
        <SettingsContent>
          <SettingsContentHeader>
            <H4>Update Credentials</H4>
            <PrimaryMutted>Manage your login credentials</PrimaryMutted>
          </SettingsContentHeader>
          <Separator />
          <SettingsContentBody>{formRender()}</SettingsContentBody>
        </SettingsContent>
      </SettingsContainer>
    </PageContainer>
  );
};

export const SettingsPage = memo(Settings);
