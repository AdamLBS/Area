'use client';
import React, { memo, useEffect, useMemo } from 'react';
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
import { H4, IconStratos, PrimaryMutted, PrivateLayout } from '@/lib/ui/design-system';
import { UpdateForm } from './UpdateForm';
import { SocialAccounts } from './Accounts';
import { AdvancedSettings } from './Advanced';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveOAuth } from '@/api/oauth';

enum Options {
  PROFILE = 'profile',
  ACCOUNTS = 'accounts',
  ADVANCED = 'advanced',
}

const TITLES = {
  [Options.PROFILE]: 'Profile',
  [Options.ACCOUNTS]: 'Accounts',
  [Options.ADVANCED]: 'Settings',
};

const SUBTITLES = {
  [Options.PROFILE]: 'Manage your account settings',
  [Options.ACCOUNTS]: 'Manage your credentials for the services',
  [Options.ADVANCED]: 'Manage your settings for the web application',
};

const BODY_TITLES = {
  [Options.PROFILE]: 'Update credentials',
  [Options.ACCOUNTS]: 'Connect social accounts',
  [Options.ADVANCED]: 'Advanced settings',
};

const DESCRIPTIONS = {
  [Options.PROFILE]: 'Manage your login credentials',
  [Options.ACCOUNTS]: 'Manage all your social accounts',
  [Options.ADVANCED]: 'Manage your advanced settings',
};

const Settings = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [option, setCurrentOption] = React.useState(
    (searchParams.get('option') as Options) || Options.PROFILE,
  );
  const mutation = useMutation({
    mutationFn: saveOAuth,
    onSuccess: () => {
      router.replace('/settings?option=accounts');
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });

  const token = searchParams.get('token');
  useEffect(() => {
    if (token) {
      const authToken = localStorage.getItem('authToken');
      const provider = searchParams.get('provider');
      const refreshToken = searchParams.get('refreshToken');
      if (authToken && provider && refreshToken) {
        mutation.mutate({
          authToken,
          provider,
          token,
          refreshToken,
        });
      }
    }
  }, [token]);

  const handleActive = (value: Options) => {
    setCurrentOption(value);
  };

  const { displayFormRender } = useMemo(() => {
    const formRender = () => {
      switch (option) {
        case Options.PROFILE:
          return <UpdateForm />;
        case Options.ACCOUNTS:
          return <SocialAccounts />;
        case Options.ADVANCED:
          return <AdvancedSettings />;
        default:
          return <UpdateForm />;
      }
    };

    return {
      displayFormRender: formRender(),
    };
  }, [option]);

  const { displayOptionsButtons } = useMemo(() => {
    const optionButtons = [
      {
        option: Options.PROFILE,
        label: 'Profile',
      },
      {
        option: Options.ACCOUNTS,
        label: 'Accounts',
      },
      {
        option: Options.ADVANCED,
        label: 'Advanced settings',
      },
    ];

    const displayOptionsButtons = optionButtons.map((item) => (
      <ButtonOption
        key={item.option}
        onClick={() => handleActive(item.option)}
        active={option === item.option}
        variant="ghost"
      >
        {item.label}
      </ButtonOption>
    ));

    return { displayOptionsButtons };
  }, [option]);

  return (
    <PrivateLayout pageName="Settings" icon={<IconStratos />}>
      <PageContainer>
        <Title>{TITLES[option]}</Title>
        <SubTitle>{SUBTITLES[option]}</SubTitle>
        <Separator />
        <SettingsContainer>
          <SettingsOptions>{displayOptionsButtons}</SettingsOptions>
          <SettingsContent>
            <SettingsContentHeader>
              <H4>{BODY_TITLES[option]}</H4>
              <PrimaryMutted>{DESCRIPTIONS[option]}</PrimaryMutted>
            </SettingsContentHeader>
            <Separator />
            <SettingsContentBody>{displayFormRender}</SettingsContentBody>
          </SettingsContent>
        </SettingsContainer>
      </PageContainer>
    </PrivateLayout>
  );
};

export const SettingsPage = memo(Settings);
