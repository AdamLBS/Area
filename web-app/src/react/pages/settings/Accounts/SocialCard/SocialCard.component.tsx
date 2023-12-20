'use client';
import React, { memo, useCallback } from 'react';
import {
  SocialCardContainer,
  TitleContainer,
  ConnectContainer,
  Connected,
} from './SocialCard.style';
import { BadgeCheck } from 'lucide-react';
import { PrimaryMutted } from '@/lib/ui/design-system';
import { signIn } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';

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
      {connected ? (
        <ConnectContainer>
          <BadgeCheck size={16} color="#6D28D9" />
          <Connected>Connected </Connected>
        </ConnectContainer>
      ) : (
        <PrimaryMutted>Not linked</PrimaryMutted>
      )}
    </SocialCardContainer>
  );
};

export const SocialCard = memo(Cards);
