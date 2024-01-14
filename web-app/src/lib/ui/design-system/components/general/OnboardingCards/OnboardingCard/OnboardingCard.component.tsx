import React, { memo } from 'react';
import { Card } from '@/components/ui';

// export type ServiceCardProps = {};

const OnboardingCardComponent = () => {
  return (
    <Card>
      <h1>test</h1>
    </Card>
  );
};

export const OnboardingCard = memo(OnboardingCardComponent);
