'use client';
import React, { memo, useEffect, useMemo } from 'react';
import { MainContainer } from './SocialAccounts.style';
import { SocialCard } from './SocialCard';
import {
  IconDiscord,
  IconGithub,
  IconGoogle,
  IconLinkedin,
  IconSpotify,
  IconTwitch,
} from '@/lib/ui/design-system';
import { useTheme } from 'next-themes';

const Accounts = () => {
  const { theme } = useTheme();
  const [color, setColor] = React.useState('');

  useEffect(() => {
    if (theme === 'dark') {
      setColor('#fff');
    } else {
      setColor('#000');
    }
  }, [theme]);

  const { displaySocialCards } = useMemo(() => {
    const socialCards = [
      {
        serviceName: 'Google',
        provider: 'google',
        connected: true,
        icon: <IconGoogle color={color} />,
      },
      {
        serviceName: 'Github',
        provider: 'github',
        connected: false,
        icon: <IconGithub color={color} />,
      },
      {
        serviceName: 'Linkedin',
        provider: 'linkedin',
        connected: false,
        icon: <IconLinkedin color={color} />,
      },
      {
        serviceName: 'Spotify',
        provider: 'spotify',
        connected: false,
        icon: <IconSpotify color={color} />,
      },
      {
        serviceName: 'Twitch',
        provider: 'twitch',
        connected: false,
        icon: <IconTwitch color={color} />,
      },
      {
        serviceName: 'Discord',
        provider: 'discord',
        connected: false,
        icon: <IconDiscord color={color} />,
      },
    ];

    const displaySocialCards = socialCards.map((card, index) => (
      <SocialCard
        key={index}
        serviceName={card.serviceName}
        connected={card.connected}
        icon={card.icon}
        provider={card.provider}
      />
    ));

    return { displaySocialCards };
  }, [color]);

  return <MainContainer>{displaySocialCards}</MainContainer>;
};

export const SocialAccounts = memo(Accounts);
