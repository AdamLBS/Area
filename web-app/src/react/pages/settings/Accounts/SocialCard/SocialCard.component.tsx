'use client';
import React, { memo, useCallback } from 'react';
import { SocialCardContainer, TitleContainer } from './SocialCard.style';
import { PrimaryMutted } from '@/lib/ui/design-system';
import { signIn } from 'next-auth/react';

type CardsProps = {
  serviceName: string;
  connected: boolean;
  icon: React.ReactNode;
  provider: string;
};

const Cards: React.FC<CardsProps> = ({
  serviceName,
  connected,
  icon,
  provider,
}) => {
  const onCardClick = useCallback(() => {
    signIn(provider);
  }, [provider]);

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
