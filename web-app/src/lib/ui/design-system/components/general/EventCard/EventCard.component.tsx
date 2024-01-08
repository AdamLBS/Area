import React, { memo } from 'react';
import { Card, Header, IconContainer, Title } from './EventCard.style';
import { CardDescription } from '@/components/ui';

export type ServiceCardProps = {
  title?: string;
  description?: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

const EventCardComponent: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  onClick,
}) => {
  return (
    <Card onClick={onClick} variant="outline">
      <Header>
        <IconContainer>
          {React.cloneElement(icon as React.ReactElement, {
            size: 36,
            color: '#fff',
          })}
        </IconContainer>
        <Title>{title}</Title>
      </Header>
      <CardDescription>{description}</CardDescription>
    </Card>
  );
};

export const EventCard = memo(EventCardComponent);
