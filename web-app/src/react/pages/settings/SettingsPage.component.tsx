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
import { SocialAccounts } from './Accounts';

enum Options {
  PROFILE = 'profile',
  ACCOUNTS = 'accounts',
  ADVANCED = 'advanced',
}

const Settings = () => {
  const [option, setCurrentOption] = React.useState(Options.ACCOUNTS);

  const handleActive = (value: Options) => {
    setCurrentOption(value);
  };

  const formRender = () => {
    switch (option) {
      case Options.PROFILE:
        return <UpdateForm />;
      case Options.ACCOUNTS:
        return <SocialAccounts />;
      case Options.ADVANCED:
        return <div>Advanced</div>;
      default:
        return <UpdateForm />;
    }
  };

  const getTitles = (option: Options) => {
    const titles = {
      profile: 'Profile',
      accounts: 'Accounts',
      advanced: 'Settings',
    };
    return titles[option] || 'Update Credentials';
  };

  const getSubTitles = (option: Options) => {
    const subTitles = {
      profile: 'Manage your account settings',
      accounts: 'Manage your credentials for the services',
      advanced: 'Manage your settings for the web application',
    };
    return subTitles[option] || 'Manage your login credentials';
  };

  const getBodyTitle = (option: Options) => {
    const titles = {
      profile: 'Update credentials',
      accounts: 'Connect social accounts',
      advanced: 'Advanced settings',
    };
    return titles[option] || 'Update Credentials';
  };

  const getDescription = (option: Options) => {
    const descriptions: Record<Options, string> = {
      profile: 'Manage your login credentials',
      accounts: 'Manage all your social accounts',
      advanced: 'Manage your advanced settings',
    };
    return descriptions[option] || 'Manage your login credentials';
  };

  return (
    <PageContainer>
      <Title>{getTitles(option)}</Title>
      <SubTitle>{getSubTitles(option)}</SubTitle>
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
            <H4>{getBodyTitle(option)}</H4>
            <PrimaryMutted>{getDescription(option)}</PrimaryMutted>
          </SettingsContentHeader>
          <Separator />
          <SettingsContentBody>{formRender()}</SettingsContentBody>
        </SettingsContent>
      </SettingsContainer>
    </PageContainer>
  );
};

export const SettingsPage = memo(Settings);
