import React, { memo } from 'react';
import { Card, Header, IconContainer } from './EventCard.style';
import { CardDescription } from '@/components/ui';
import { H3 } from '../Text';

export type ServiceCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const EventCardComponent: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <Card>
      <Header>
        <IconContainer>
          {React.cloneElement(icon as React.ReactElement, {
            size: 36,
            color: '#fff',
          })}
        </IconContainer>
        <H3>{title}</H3>
      </Header>
      <CardDescription>{description}</CardDescription>
    </Card>
  );
};

export const EventCard = memo(EventCardComponent);
