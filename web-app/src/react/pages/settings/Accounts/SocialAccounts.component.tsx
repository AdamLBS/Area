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
const Accounts = () => {
  const handleConnect = (provider: string) => {
    console.log(provider);
  };

  const displaySocialCards = () => {
    const socialCards = [
      {
        serviceName: 'Google',
        provider: 'google',
        connected: false,
        icon: <IconGoogleStyled />,
      },
      {
        serviceName: 'Github',
        provider: 'github',
        connected: false,
        icon: <IconGithubStyled />,
      },
      {
        serviceName: 'Linkedin',
        provider: 'linkedin',
        connected: false,
        icon: <IconLinkedinStyled />,
      },
      {
        serviceName: 'Spotify',
        provider: 'spotify',
        connected: false,
        icon: <IconSpotifyStyled />,
      },
      {
        serviceName: 'Twitch',
        provider: 'twitch',
        connected: false,
        icon: <IconTwitchStyled />,
      },
      {
        serviceName: 'Discord',
        provider: 'discord',
        connected: false,
        icon: <IconDiscordStyled />,
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
