'use client';
import React, { memo } from 'react';
import { MainContainer } from './SocialAccounts.style';
import { SocialCard } from './SocialCard';
import {
  IconGoogleStyled,
  IconGithubStyled,
  IconLinkedinStyled,
  IconSpotifyStyled,
  IconTwitchStyled,
  IconDiscordStyled,
} from './SocialAccounts.style';
import { useTheme } from 'next-themes';

const Accounts = () => {
  const { theme } = useTheme();

  const color = theme === 'dark' ? '#fff' : '#000';

  const handleConnect = (provider: string) => {
    console.log(provider);
  };

  const displaySocialCards = () => {
    const socialCards = [
      {
        serviceName: 'Google',
        provider: 'google',
        connected: false,
        icon: <IconGoogleStyled color={color} />,
      },
      {
        serviceName: 'Github',
        provider: 'github',
        connected: false,
        icon: <IconGithubStyled color={color} />,
      },
      {
        serviceName: 'Linkedin',
        provider: 'linkedin',
        connected: false,
        icon: <IconLinkedinStyled color={color} />,
      },
      {
        serviceName: 'Spotify',
        provider: 'spotify',
        connected: false,
        icon: <IconSpotifyStyled color={color} />,
      },
      {
        serviceName: 'Twitch',
        provider: 'twitch',
        connected: false,
        icon: <IconTwitchStyled color={color} />,
      },
      {
        serviceName: 'Discord',
        provider: 'discord',
        connected: false,
        icon: <IconDiscordStyled color={color} />,
      },
    ];

    return socialCards.map((card, index) => (
      <SocialCard
        key={index}
        serviceName={card.serviceName}
        connected={card.connected}
        icon={card.icon}
        provider={card.provider}
        handleConnect={handleConnect}
      />
    ));
  };

  return <MainContainer>{displaySocialCards()}</MainContainer>;
};

export const SocialAccounts = memo(Accounts);
