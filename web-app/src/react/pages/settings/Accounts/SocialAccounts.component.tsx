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
import { useServices } from '@/react/hooks/oauth';

const Accounts = () => {
  const { theme } = useTheme();
  const [color, setColor] = React.useState('');
  const { data: services } = useServices();

  useEffect(() => {
    if (theme === 'dark') {
      setColor('#fff');
    } else {
      setColor('#000');
    }
  }, [theme]);

  const socialCards = useMemo(
    () => [
      {
        serviceName: 'Google',
        provider: 'google',
        connected: services?.some((service) => service.provider === 'google'),
        icon: <IconGoogle color={color} />,
      },
      {
        serviceName: 'Github',
        provider: 'github',
        connected: services?.some((service) => service.provider === 'github'),
        icon: <IconGithub color={color} />,
      },
      {
        serviceName: 'Linkedin',
        provider: 'linkedin',
        connected: services?.some((service) => service.provider === 'linkedin'),
        icon: <IconLinkedin color={color} />,
      },
      {
        serviceName: 'Spotify',
        provider: 'spotify',
        connected: services?.some((service) => service.provider === 'spotify'),
        icon: <IconSpotify color={color} />,
      },
      {
        serviceName: 'Twitch',
        provider: 'twitch',
        connected: services?.some((service) => service.provider === 'twitch'),
        icon: <IconTwitch color={color} />,
      },
      {
        serviceName: 'Discord',
        provider: 'discord',
        connected: services?.some((service) => service.provider === 'discord'),
        icon: <IconDiscord color={color} />,
      },
    ],
    [color, services],
  );

  return (
    <MainContainer>
      {socialCards.map((card, index) => (
        <SocialCard
          key={index}
          serviceName={card.serviceName}
          connected={card.connected || false}
          icon={card.icon}
          provider={card.provider}
        />
      ))}
    </MainContainer>
  );
};

export const SocialAccounts = memo(Accounts);
