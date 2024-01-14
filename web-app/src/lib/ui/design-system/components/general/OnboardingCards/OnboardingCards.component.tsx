import React, { memo } from 'react';
import { OnboardingComponent } from './OnboardingCards.style';
import { OnboardingCard } from './OnboardingCard';

// export type ServiceCardProps = {};

const OnboardingCardsComponents = () => {
  return (
    <OnboardingComponent>
      <OnboardingCard />
    </OnboardingComponent>
  );
};

export const OnboardingCards = memo(OnboardingCardsComponents);
