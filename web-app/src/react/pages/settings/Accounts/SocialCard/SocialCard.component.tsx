'use client';
import React, { memo } from 'react';
import { SocialCardContainer, TitleContainer, Icon } from './SocialCard.style';
import { PrimaryMutted } from '@/lib/ui/design-system';

type Props = {
  serviceName: string;
  connected: boolean;
  icon: React.ReactNode;
  handleConnect: () => void;
};

const Cards = (props: Props) => {
  const { serviceName, connected, icon, handleConnect } = props;

  return (
    <SocialCardContainer variant="outline" onClick={handleConnect}>
      <TitleContainer>
        {icon}
        {serviceName}
      </TitleContainer>
      <PrimaryMutted>{connected ? 'Connected' : 'Not linked'}</PrimaryMutted>
    </SocialCardContainer>
  );
};

export const SocialCard = memo(Cards);
