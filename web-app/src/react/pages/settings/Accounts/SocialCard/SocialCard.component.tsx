'use client';
import React, { memo } from 'react';
import { SocialCardContainer, TitleContainer, Icon } from './SocialCard.style';
import { PrimaryMutted } from '@/lib/ui/design-system';

type Props = {
  serviceName: string;
  connected: boolean;
  icon: React.ReactNode;
  provider: string;
  handleConnect: (provider: string) => void;
};

const Cards = (props: Props) => {
  const { serviceName, connected, icon, provider, handleConnect } = props;

  return (
    <SocialCardContainer
      variant="outline"
      onClick={() => handleConnect(provider)}
    >
      <TitleContainer>
        {icon}
        {serviceName}
      </TitleContainer>
      <PrimaryMutted>{connected ? 'Connected' : 'Not linked'}</PrimaryMutted>
    </SocialCardContainer>
  );
};

export const SocialCard = memo(Cards);
