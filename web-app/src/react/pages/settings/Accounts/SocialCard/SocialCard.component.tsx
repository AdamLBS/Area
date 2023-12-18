'use client';
import React, { memo, useCallback } from 'react';
import { SocialCardContainer, TitleContainer } from './SocialCard.style';
import { PrimaryMutted } from '@/lib/ui/design-system';

type CardsProps = {
  serviceName: string;
  connected: boolean;
  icon: React.ReactNode;
  provider: string;
  handleConnect: (provider: string) => void;
};

const Cards: React.FC<CardsProps> = ({
  serviceName,
  connected,
  icon,
  provider,
  handleConnect,
}) => {
  const onCardClick = useCallback(() => {
    handleConnect(provider);
  }, [handleConnect, provider]);

  return (
    <SocialCardContainer variant="outline" onClick={onCardClick}>
      <TitleContainer>
        {icon}
        {serviceName}
      </TitleContainer>
      <PrimaryMutted>{connected ? 'Connected' : 'Not linked'}</PrimaryMutted>
    </SocialCardContainer>
  );
};

export const SocialCard = memo(Cards);
