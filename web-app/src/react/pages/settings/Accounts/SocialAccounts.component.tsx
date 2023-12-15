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
  SocialCardContainer,
} from './SocialAccounts.style';
const Accounts = () => {
  const handleConnect = () => {
    console.log('connect');
  };

  const displaySocialCards = () => {
    const socialCards = [
      {
        serviceName: 'Google',
        connected: false,
        icon: <IconGoogleStyled />,
      },
      {
        serviceName: 'Github',
        connected: false,
        icon: <IconGithubStyled />,
      },
      {
        serviceName: 'Linkedin',
        connected: false,
        icon: <IconLinkedinStyled />,
      },
      {
        serviceName: 'Spotify',
        connected: false,
        icon: <IconSpotifyStyled />,
      },
      {
        serviceName: 'Twitch',
        connected: false,
        icon: <IconTwitchStyled />,
      },
      {
        serviceName: 'Discord',
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
        handleConnect={handleConnect}
      />
    ));
  };

  return <MainContainer>{displaySocialCards()}</MainContainer>;
};

export const SocialAccounts = memo(Accounts);
